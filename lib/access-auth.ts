import { env } from "cloudflare:workers";

type AccessClaims = {
  aud?: string | string[];
  exp?: number;
  iss?: string;
  email?: string;
  sub?: string;
};

type Jwks = {
  keys: Array<JsonWebKey & { kid?: string }>;
};

type AccessEnv = typeof env & {
  ACCESS_AUDIENCE?: string;
  ACCESS_TEAM_DOMAIN?: string;
};

const accessEnv = env as AccessEnv;

function decodeBase64Url(value: string): ArrayBuffer {
  const normalized = value.replace(/-/g, "+").replace(/_/g, "/");
  const padded = normalized.padEnd(Math.ceil(normalized.length / 4) * 4, "=");
  const binary = atob(padded);
  return Uint8Array.from(binary, (character) => character.charCodeAt(0)).buffer;
}

function decodeJson<T>(value: string): T {
  return JSON.parse(new TextDecoder().decode(decodeBase64Url(value))) as T;
}

async function getAccessKey(kid: string): Promise<CryptoKey | null> {
  const teamDomain = accessEnv.ACCESS_TEAM_DOMAIN;
  if (!teamDomain) return null;

  const response = await fetch(`https://${teamDomain}/cdn-cgi/access/certs`);
  if (!response.ok) return null;

  const jwks = (await response.json()) as Jwks;
  const key = jwks.keys.find((candidate) => candidate.kid === kid);
  if (!key) return null;

  return crypto.subtle.importKey(
    "jwk",
    key,
    { hash: "SHA-256", name: "RSASSA-PKCS1-v1_5" },
    false,
    ["verify"],
  );
}

export async function requireAccess(request: Request): Promise<AccessClaims | null> {
  const token = request.headers.get("Cf-Access-Jwt-Assertion");
  const audience = accessEnv.ACCESS_AUDIENCE;
  const teamDomain = accessEnv.ACCESS_TEAM_DOMAIN;
  if (!token || !audience || !teamDomain) return null;

  const [encodedHeader, encodedPayload, encodedSignature] = token.split(".");
  if (!encodedHeader || !encodedPayload || !encodedSignature) return null;

  const header = decodeJson<{ alg?: string; kid?: string }>(encodedHeader);
  const claims = decodeJson<AccessClaims>(encodedPayload);
  if (header.alg !== "RS256" || !header.kid || !claims.exp || claims.exp <= Date.now() / 1000) return null;

  const expectedIssuer = `https://${teamDomain}`;
  const audiences = Array.isArray(claims.aud) ? claims.aud : [claims.aud];
  if (claims.iss !== expectedIssuer || !audiences.includes(audience)) return null;

  const key = await getAccessKey(header.kid);
  if (!key) return null;

  const valid = await crypto.subtle.verify(
    { hash: "SHA-256", name: "RSASSA-PKCS1-v1_5" },
    key,
    decodeBase64Url(encodedSignature),
    new TextEncoder().encode(`${encodedHeader}.${encodedPayload}`),
  );

  return valid ? claims : null;
}
