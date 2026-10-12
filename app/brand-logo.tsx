import Image from "next/image";

type BrandLogoProps = {
  href?: string;
  label?: string;
};

export function BrandLogo({
  href = "/",
  label = "Study With Madison home",
}: BrandLogoProps) {
  return (
    <a className="brand brand-logo" href={href} aria-label={label}>
      <Image
        src="/study-with-madison-logo.png"
        alt=""
        width={1540}
        height={726}
        unoptimized
      />
    </a>
  );
}
