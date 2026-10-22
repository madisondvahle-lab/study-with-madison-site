import assert from "node:assert/strict";
import test from "node:test";

// Run against a local preview with SITE_TEST_URL=http://localhost:4177.
async function homepage() {
  assert.ok(process.env.SITE_TEST_URL, "Set SITE_TEST_URL to the running local preview URL");
  const response = await fetch(process.env.SITE_TEST_URL);
  assert.equal(response.status, 200);
  return (await response.text()).split("</main>")[0];
}

test("desktop and mobile navigation share the approved links in order", async () => {
  const html = await homepage();
  const nav = html.match(/<nav class="nav home-nav"[\s\S]*?<\/nav>/)?.[0];
  assert.ok(nav);
  const expected = [
    ["#how-it-works", "How It Works"],
    ["#services", "Tutoring"],
    ["#nclex-coaching", "NCLEX Coaching"],
    ["/faq", "FAQ"],
    ["/blog", "Blog"],
    ["#about", "About"],
  ];
  for (const className of ["nav-links", "home-mobile-links"]) {
    const group = nav.match(new RegExp(`<div class="${className}">([\\s\\S]*?)</div>`))?.[1];
    assert.ok(group);
    assert.deepEqual(
      [...group.matchAll(/<a href="([^"]+)">([^<]+)<\/a>/g)].map((match) => [match[1], match[2]]),
      expected,
    );
  }
  assert.doesNotMatch(nav, /href="#student-portal"|>Services</);
  assert.match(nav, /student-login\.html/);
  assert.match(nav, /href="#choose-session">Get Started/);
  assert.match(nav, /<summary[^>]*>Menu<\/summary>/);
});

test("hero CTAs offer distinct destinations while preserving primary CTA", async () => {
  const html = await homepage();
  const hero = html.match(/<div class="hero-actions">([\s\S]*?)<\/div>/)?.[1];
  assert.ok(hero);
  assert.match(hero, /class="button" href="#choose-session">Explore Your Options <span>→<\/span>/);
  assert.match(hero, /class="text-link" href="#how-it-works">How Tutoring Works <span>↓<\/span>/);
});
