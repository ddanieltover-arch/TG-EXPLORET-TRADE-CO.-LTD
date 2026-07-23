/**
 * Sprint 17 QA-003c — service-layer interactive checks (same path forms use after Zod).
 * Run: npx tsx scripts/qa-interactive.ts
 */
import { createInquiry } from "../services/inquiryService";
import { createDealerApplication, createDistributorApplication } from "../services/partnerService";
import { createQuoteRequest } from "../services/quoteService";
import { prisma } from "../server/db";

async function main() {
  const stamp = Date.now();
  const results: { name: string; ok: boolean; detail: string }[] = [];

  try {
    const quote = await createQuoteRequest({
      companyName: `QA Co ${stamp}`,
      contactName: "QA Tester",
      email: `qa.quote.${stamp}@example.com`,
      phone: "",
      country: "Singapore",
      productLabel: "ICUMSA 45 White Refined Sugar",
      quantityText: "1 container",
      destination: "Singapore",
      incoterm: "FOB",
      targetDate: "",
      message: "Sprint 17 automated QA",
      website: "",
    });
    results.push({ name: "RFQ create", ok: true, detail: quote.referenceCode });
  } catch (e) {
    results.push({ name: "RFQ create", ok: false, detail: String(e) });
  }

  try {
    await createQuoteRequest({
      companyName: "Bot",
      contactName: "Bot",
      email: "bot@example.com",
      phone: "",
      country: "US",
      productLabel: "Sugar",
      quantityText: "1",
      destination: "US",
      website: "http://spam.example",
    } as never);
    results.push({ name: "RFQ honeypot", ok: false, detail: "should have rejected" });
  } catch {
    results.push({ name: "RFQ honeypot", ok: true, detail: "rejected" });
  }

  try {
    const inq = await createInquiry({
      companyName: "QA Co",
      contactName: "QA Tester",
      email: `qa.inq.${stamp}@example.com`,
      phone: "",
      country: "Thailand",
      message: "Sprint 17 contact form automated check message.",
      website: "",
    });
    results.push({ name: "Inquiry create", ok: true, detail: inq.id });
  } catch (e) {
    results.push({ name: "Inquiry create", ok: false, detail: String(e) });
  }

  try {
    const d = await createDealerApplication({
      companyName: `Dealer QA ${stamp}`,
      contactName: "QA Tester",
      email: `qa.dealer.${stamp}@example.com`,
      phone: "",
      country: "Malaysia",
      marketsServed: "MY, SG",
      message: "Sprint 17",
      website: "",
    });
    results.push({ name: "Dealer create", ok: true, detail: d.id });
  } catch (e) {
    results.push({ name: "Dealer create", ok: false, detail: String(e) });
  }

  try {
    const dist = await createDistributorApplication({
      companyName: `Dist QA ${stamp}`,
      contactName: "QA Tester",
      email: `qa.dist.${stamp}@example.com`,
      phone: "",
      country: "Indonesia",
      marketsServed: "ID",
      message: "Sprint 17",
      website: "",
    });
    results.push({ name: "Distributor create", ok: true, detail: dist.id });
  } catch (e) {
    results.push({ name: "Distributor create", ok: false, detail: String(e) });
  }

  const [quotes, inquiries, dealers, distributors, publishedCerts] = await Promise.all([
    prisma.quoteRequest.count({ where: { email: { contains: `qa.quote.${stamp}` } } }),
    prisma.inquiry.count({ where: { email: { contains: `qa.inq.${stamp}` } } }),
    prisma.dealerApplication.count({ where: { email: { contains: `qa.dealer.${stamp}` } } }),
    prisma.distributorApplication.count({ where: { email: { contains: `qa.dist.${stamp}` } } }),
    prisma.certification.count({ where: { status: "PUBLISHED" } }),
  ]);

  results.push({
    name: "DB persistence",
    ok: quotes === 1 && inquiries === 1 && dealers === 1 && distributors === 1,
    detail: `q=${quotes} i=${inquiries} d=${dealers} dist=${distributors}`,
  });
  results.push({
    name: "Certifications draft-only public",
    ok: publishedCerts === 0,
    detail: `published=${publishedCerts}`,
  });

  console.log(JSON.stringify({ stamp, results }, null, 2));
  const failed = results.filter((r) => !r.ok);
  await prisma.$disconnect();
  if (failed.length) process.exit(1);
}

main().catch(async (e) => {
  console.error(e);
  await prisma.$disconnect();
  process.exit(1);
});
