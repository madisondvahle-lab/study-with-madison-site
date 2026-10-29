import assert from "node:assert/strict";
import test from "node:test";

// COACHING_TEST_URL=http://localhost:4175 node --test tests/coaching-packages.test.mjs
async function render(path = "/") {
  assert.ok(process.env.COACHING_TEST_URL, "Set COACHING_TEST_URL to the running local preview URL");
  const response = await fetch(new URL(path, process.env.COACHING_TEST_URL), {
    headers: { accept: "text/html" },
  });
  assert.equal(response.status, 200);
  return (await response.text()).split("</main>")[0].replace(/<!--[\s\S]*?-->/g, "");
}

function text(html) {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
}

test("three targeted tutoring packages show exact prices, savings, and existing checkouts", async () => {
  const html = await render();
  const cards = html.match(/<article class="package-card"[^>]*>[\s\S]*?<\/article>/g);
  assert.equal(cards?.length, 3);
  for (const [index, name, price, checkout] of [
    [0, "Single Tutoring Session", "$75", "60-min-session"],
    [1, "3-Session Tutoring Package", "$210", "packages/2d195e26-b850-4682-a30f-14de5c8361f2"],
    [2, "5-Session Tutoring Package", "$325", "packages/274033c2-9972-4d01-9b6d-c620ed5112b2"],
  ]) {
    assert.ok(cards[index].includes(name));
    assert.ok(cards[index].includes(price));
    assert.ok(cards[index].includes(`href="https://calendly.com/studywithmadisonrn/${checkout}"`));
  }
  assert.match(text(cards[1]), /\$70 per session/);
  assert.match(text(cards[1]), /Save \$15 compared with three individual \$75 sessions/);
  assert.match(text(cards[2]), /\$65 per session/);
  assert.match(text(cards[2]), /Save \$50 compared with five individual \$75 sessions/);
  assert.equal(3 * 75 - 210, 15);
  assert.equal(5 * 75 - 325, 50);
  assert.doesNotMatch(html, /60-min-single-session|72afc34c-f344-47ad-802c-2e95db646cec|8-Session|\$150|\$235|\$360/);
});

test("four coaching cards offer only approved 60-minute checkouts and total hours", async () => {
  const html = await render();
  const cards = html.match(/<article class="coaching-tier[^"]*"[^>]*>[\s\S]*?<\/article>/g);
  assert.equal(cards?.length, 4);
  for (const [index, id, hours, price, checkout] of [
    [0, "starter", 8, "$400", "5b6fa8d0-259e-4628-a5ad-7f7006ed279c"],
    [1, "momentum", 12, "$600", "7e351df8-fe9c-4770-b9af-6384c07a120d"],
    [2, "intensive", 18, "$900", "a2b18332-9cae-49a7-b271-73aa21430278"],
    [3, "complete", 24, "$1,350", "59f23d78-b246-45bb-808d-8c0d7c821a1f"],
  ]) {
    const card = cards[index];
    assert.ok(card.includes(`id="nclex-${id}"`));
    assert.ok(card.includes(price));
    assert.ok(text(card).includes(`${hours} private coaching hours`));
    assert.ok(text(card).includes(`${hours} × 60-minute sessions`));
    assert.ok(card.includes(`href="https://calendly.com/studywithmadisonrn/packages/${checkout}"`));
    assert.doesNotMatch(card, /type="radio"|90-minute/);
  }
  assert.match(cards[0], /Start Here/);
  assert.doesNotMatch(cards[0], /retake support|complimentary|priority|messaging|CAT/i);
  assert.match(cards[2], /class="coaching-tier featured"/);
  assert.match(cards[2], /Recommended for NCLEX Retakers/);
  assert.match(cards[3], /Most Comprehensive/);
  assert.match(text(cards[3]), /one 3-hour Live CAT · 27 total live hours/);
  assert.match(text(cards[3]), /Post-CAT review uses regular coaching hours/);
  assert.doesNotMatch(html, /8cd657fe-bb52-454a-9be9-ffdab8505466|24aac88d-0760-484e-ad1a-d64609049825|\$840/);
});

test("retakers reach coaching, and comparison follows cards with all requested dimensions", async () => {
  const html = await render();
  assert.match(html, /<section[^>]*id="nclex-coaching"[^>]*aria-labelledby="coaching-title"/);
  assert.match(html, /<aside class="retaker-guidance"[\s\S]*?href="#nclex-coaching"/);
  assert.ok(html.indexOf('id="nclex-complete"') < html.indexOf('class="coaching-comparison"'));
  const table = html.match(/<table class="coaching-comparison-table">[\s\S]*?<\/table>/)?.[0];
  assert.ok(table);
  assert.equal((table.match(/scope="col"/g) ?? []).length, 5);
  for (const feature of [
    "Price", "Total private coaching hours", "Initial performance evaluation",
    "Individualized study roadmap", "Targeted practice assignments", "Clinical judgment coaching",
    "Performance monitoring", "Accountability and support", "Live CAT experience",
  ]) assert.ok(table.includes(feature));
  assert.match(html, /class="coaching-comparison-mobile"/);
  assert.match(table, /Not included/);
  assert.doesNotMatch(html, /pay the difference|upgrade checkout|Upgrade now/i);
});

test("retake eligibility, support boundaries, Klarna, and historical agreements remain explicit", async () => {
  const html = await render();
  const plain = text(html);
  for (const count of [3, 5, 8]) {
    assert.ok(plain.includes(`${count} complimentary 60-minute sessions if you do not pass.`));
  }
  assert.match(plain, /not cumulative benefits across tiers/);
  assert.match(plain, /follow their agreed study commitments/);
  assert.match(plain, /within 90 days of their final coaching session/);
  assert.match(plain, /within 6 months of a confirmed unsuccessful attempt/);
  assert.match(plain, /Coaching does not guarantee an NCLEX outcome/);
  assert.match(plain, /priority handling within that same response window/);
  assert.match(plain, /Unlimited messaging, on-demand tutoring, and urgent clinical guidance are not included/);
  assert.match(plain, /\$0\.50 booking charge per package purchase/);
  assert.match(plain, /original purchase agreement, included benefits, session format, and booking access remain unchanged/);
  assert.match(plain, /Access is not provisioned automatically/);
  assert.match(plain, /within seven days/);
  assert.match(html, /student-login\.html/);
});

test("FAQ reflects the new programs and manual CAT access without changing historical purchases", async () => {
  const html = await render("/faq");
  const plain = text(html);
  assert.match(plain, /24 private coaching hours and one separate 3-hour Live CAT/);
  assert.match(plain, /count toward the 24 coaching hours/);
  assert.match(plain, /27 total live hours/);
  assert.match(plain, /CAT booking access is provided manually, not automatically/);
  assert.match(plain, /Madison tracks completion so each student uses only their one included simulation/);
  assert.match(plain, /Previously purchased packages retain their original session format/);
  assert.match(plain, /Starter includes its listed progress review, not between-session messaging or complimentary retake sessions/);
  for (const [hours, price] of [[8, "$400"], [12, "$600"], [18, "$900"], [24, "$1,350"]]) {
    assert.ok(plain.includes(`${hours} private coaching hours for ${price}`));
  }
  assert.doesNotMatch(plain, /90-minute|21 coaching hours|\$840/);
});

test("terms and strategy session preserve package credits and historical agreement protections", async () => {
  const terms = text(await render("/terms-of-service"));
  const home = text(await render());
  assert.match(terms, /Existing purchases retain their original session formats/);
  assert.match(terms, /Previously purchased Nursing School Semester Support/);
  assert.match(terms, /tutoring or coaching package within seven days/);
  assert.match(home, /tutoring or coaching package within seven days/);
  assert.match(terms, /refunded to the original payment method/);
});
