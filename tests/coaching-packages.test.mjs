import assert from "node:assert/strict";
import test from "node:test";

// Run against a local preview: COACHING_TEST_URL=http://localhost:4175 node --test tests/coaching-packages.test.mjs
async function render(path = "/") {
  assert.ok(process.env.COACHING_TEST_URL, "Set COACHING_TEST_URL to the running local preview URL");
  const response = await fetch(new URL(path, process.env.COACHING_TEST_URL), {
    headers: { accept: "text/html" },
  });
  assert.equal(response.status, 200);
  return (await response.text()).split("</main>")[0];
}

test("coaching cards default to the approved 60-minute checkouts", async () => {
  const html = await render();
  const cards = html.match(/<article class="coaching-tier[^"]*"[^>]*>[\s\S]*?<\/article>/g);
  assert.equal(cards?.length, 3);
  const [momentum, intensive, complete] = cards;

  assert.match(momentum, /\$400/);
  assert.match(momentum, /12 private 60-minute sessions/);
  assert.match(momentum, /12 total private coaching hours/);
  assert.doesNotMatch(momentum, /type="radio"/);

  for (const [card, hours, price, checkout] of [
    [intensive, 18, "$840", "a2b18332-9cae-49a7-b271-73aa21430278"],
    [complete, 21, "$1,350", "59f23d78-b246-45bb-808d-8c0d7c821a1f"],
  ]) {
    assert.ok(card.includes(price));
    assert.match(card, new RegExp(`${hours}<!-- --> private <!-- -->60<!-- -->-minute sessions`));
    assert.match(card, new RegExp(`${hours}<!-- --> total private coaching hours`));
    assert.match(card, /<input(?=[^>]*type="radio")(?=[^>]*checked="")(?=[^>]*value="60")[^>]*>/);
    assert.match(card, /<input(?=[^>]*type="radio")(?=[^>]*value="90")[^>]*>/);
    assert.ok(card.includes(`href="https://calendly.com/studywithmadisonrn/packages/${checkout}"`));
  }

  assert.match(complete, /Most Supported/);
  assert.match(complete, /separate appointment with up to three hours reserved/);
  assert.match(complete, /without deducting coaching hours/);
  assert.match(complete, /Detailed post-CAT review and individualized study-plan adjustments during regular coaching hours/);
  assert.match(complete, /After purchase, Madison personally provides booking instructions for your one included Live CAT simulation/);
  assert.match(complete, /CAT booking access is provided manually, not automatically/);
  assert.doesNotMatch(complete, /awaiting confirmation|Before purchasing/);
});

test("FAQ explains separate CAT access and review within coaching hours", async () => {
  const html = await render("/faq");
  assert.match(html, /one separate Live CAT appointment with up to three hours reserved, at no extra cost and without using coaching hours/);
  assert.match(html, /counts toward the 21 coaching hours/);
  assert.match(html, /performance patterns, clinical judgment, priority weaknesses/);
  assert.match(html, /After purchase of either Complete Support format, Madison personally provides eligible students with CAT booking instructions/);
  assert.match(html, /CAT booking access is provided manually, not automatically/);
  assert.match(html, /Madison tracks completion so each student uses only their one included simulation/);
  assert.doesNotMatch(html, /awaiting confirmation|confirm CAT booking access with Madison before purchasing/);
});

test("coaching updates preserve retake eligibility and payment disclosures", async () => {
  const html = await render();
  for (const count of [3, 5]) {
    assert.ok(html.includes(`${count} complimentary 60-minute sessions if you do not pass.`));
  }
  assert.match(html, /8 additional complimentary 60-minute sessions if you do not pass, subject to the eligibility terms below/);
  assert.match(html, /follow their agreed study commitments/);
  assert.match(html, /within 90 days of their final coaching session/);
  assert.match(html, /within 6 months of a confirmed unsuccessful attempt/);
  assert.match(html, /Coaching does not guarantee an NCLEX outcome/);
  assert.match(html, /\$0\.50 booking charge per package purchase/);
});
