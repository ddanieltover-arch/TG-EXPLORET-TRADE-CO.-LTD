import bcrypt from "bcryptjs";
import { AdminRole, PrismaClient, PublishStatus } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  const adminEmail = (process.env.SEED_ADMIN_EMAIL ?? "sales@tgetradecoltd.com").toLowerCase();
  const adminPassword = process.env.SEED_ADMIN_PASSWORD ?? "ChangeMeAdmin123!";
  const passwordHash = await bcrypt.hash(adminPassword, 12);

  await prisma.user.upsert({
    where: { email: adminEmail },
    update: { passwordHash, name: "Site Admin", role: AdminRole.SUPER_ADMIN },
    create: {
      email: adminEmail,
      passwordHash,
      name: "Site Admin",
      role: AdminRole.SUPER_ADMIN,
    },
  });

  const sugar = await prisma.category.upsert({
    where: { slug: "sugar" },
    update: {},
    create: { slug: "sugar", name: "Sugar", sortOrder: 1 },
  });
  const rice = await prisma.category.upsert({
    where: { slug: "rice" },
    update: {},
    create: { slug: "rice", name: "Rice", sortOrder: 2 },
  });

  const icumsa = await prisma.product.upsert({
    where: { slug: "icumsa-45-white-refined" },
    update: {
      description:
        "Refined cane sugar oriented to buyers who specify high whiteness and consistent crystal quality for beverages and confectionery. Final commercial terms via quotation.",
      status: PublishStatus.PUBLISHED,
      publishedAt: new Date(),
    },
    create: {
      slug: "icumsa-45-white-refined",
      name: "ICUMSA 45 White Refined Sugar",
      shortDescription: "High-whiteness refined cane sugar for beverages and confectionery.",
      description:
        "Refined cane sugar oriented to buyers who specify high whiteness and consistent crystal quality for beverages and confectionery. Final commercial terms via quotation.",
      categoryId: sugar.id,
      status: PublishStatus.PUBLISHED,
      publishedAt: new Date(),
    },
  });

  const jasmine = await prisma.product.upsert({
    where: { slug: "thai-jasmine-hom-mali" },
    update: {
      description:
        "Fragrant Thai Hom Mali style long-grain rice for retail, foodservice, and wholesale programmes. Exact crop-year and broken ratios confirmed at quotation.",
      status: PublishStatus.PUBLISHED,
      publishedAt: new Date(),
    },
    create: {
      slug: "thai-jasmine-hom-mali",
      name: "Thai Jasmine Rice (Hom Mali)",
      shortDescription: "Fragrant long-grain rice for retail and foodservice programmes.",
      description:
        "Fragrant Thai Hom Mali style long-grain rice for retail, foodservice, and wholesale programmes. Exact crop-year and broken ratios confirmed at quotation.",
      categoryId: rice.id,
      status: PublishStatus.PUBLISHED,
      publishedAt: new Date(),
    },
  });

  await prisma.productSpecification.deleteMany({ where: { productId: icumsa.id } });
  await prisma.productSpecification.createMany({
    data: [
      { productId: icumsa.id, label: "ICUMSA", value: "45 max", sortOrder: 1 },
      { productId: icumsa.id, label: "Polarization", value: "99.80 min", unit: "%", sortOrder: 2 },
      { productId: icumsa.id, label: "Moisture", value: "0.06 max", unit: "%", sortOrder: 3 },
      { productId: icumsa.id, label: "Ash", value: "0.04 max", unit: "%", sortOrder: 4 },
    ],
  });

  await prisma.productPackaging.deleteMany({ where: { productId: icumsa.id } });
  await prisma.productPackaging.createMany({
    data: [
      { productId: icumsa.id, name: "PP bag", sizeLabel: "50 kg", sortOrder: 1 },
      { productId: icumsa.id, name: "Jumbo bag", sizeLabel: "1 MT", sortOrder: 2 },
    ],
  });

  await prisma.productSpecification.deleteMany({ where: { productId: jasmine.id } });
  await prisma.productSpecification.createMany({
    data: [
      { productId: jasmine.id, label: "Moisture", value: "14 max", unit: "%", sortOrder: 1 },
      { productId: jasmine.id, label: "Broken", value: "confirm at quote", sortOrder: 2 },
      { productId: jasmine.id, label: "Grain type", value: "Long grain", sortOrder: 3 },
    ],
  });

  await prisma.productPackaging.deleteMany({ where: { productId: jasmine.id } });
  await prisma.productPackaging.createMany({
    data: [
      { productId: jasmine.id, name: "Retail bags", sizeLabel: "1–5 kg", sortOrder: 1 },
      { productId: jasmine.id, name: "Commercial bags", sizeLabel: "25–50 kg", sortOrder: 2 },
    ],
  });

  // Local placeholders (public/media). Replace with Cloudinary / client photos in production.
  await prisma.productImage.deleteMany({ where: { productId: { in: [icumsa.id, jasmine.id] } } });
  await prisma.productImage.createMany({
    data: [
      {
        productId: icumsa.id,
        url: "/media/products/sugar-primary.svg",
        alt: "Refined white sugar — placeholder graphic",
        sortOrder: 1,
        isPrimary: true,
      },
      {
        productId: icumsa.id,
        url: "/media/products/sugar-secondary.svg",
        alt: "Sugar packaging context — placeholder graphic",
        sortOrder: 2,
        isPrimary: false,
      },
      {
        productId: jasmine.id,
        url: "/media/products/rice-primary.svg",
        alt: "Thai jasmine rice — placeholder graphic",
        sortOrder: 1,
        isPrimary: true,
      },
      {
        productId: jasmine.id,
        url: "/media/products/rice-secondary.svg",
        alt: "Rice packaging context — placeholder graphic",
        sortOrder: 2,
        isPrimary: false,
      },
    ],
  });

  await prisma.sitePage.upsert({
    where: { slug: "about" },
    update: {},
    create: {
      slug: "about",
      title: "About TG Exploret Trade Co., Ltd",
      body: `TG Exploret Trade Co., Ltd is a Thailand-based company established in 2018. We focus on sugar and rice for wholesale and export buyers who need clarity on grade, packaging, and shipment coordination.

Contact: sales@tgetradecoltd.com`,
      status: PublishStatus.PUBLISHED,
    },
  });

  await prisma.sitePage.upsert({
    where: { slug: "export-markets" },
    update: {},
    create: {
      slug: "export-markets",
      title: "Export markets",
      body: `We support international buyers with clear product scope and Incoterms discussion (FOB, CIF, EXW, CNF). Destination lists publish when confirmed by the business.`,
      status: PublishStatus.PUBLISHED,
    },
  });

  // Placeholder draft only — do not invent client certifications as published.
  const existingCert = await prisma.certification.findFirst({
    where: { name: "Placeholder — confirm with client" },
  });
  if (!existingCert) {
    await prisma.certification.create({
      data: {
        name: "Placeholder — confirm with client",
        issuer: "Pending confirmation",
        summary:
          "Draft entry for CMS training. Keep DRAFT until the business confirms real certificates.",
        status: PublishStatus.DRAFT,
        sortOrder: 99,
      },
    });
  }

  console.log("Seed complete.");
  console.log(`Admin login: ${adminEmail} / (SEED_ADMIN_PASSWORD or ChangeMeAdmin123!)`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
