import bcrypt from "bcryptjs";
import { AdminRole, PrismaClient, PublishStatus } from "@prisma/client";

const prisma = new PrismaClient();

/**
 * Catalogue aligned to reference category structure
 * (https://www.fremcoltd.com/product-category/rice and
 *  https://www.fremcoltd.com/product-category/edible-cooking-oil).
 * Product names follow that range; descriptions are original TG Export Trade copy.
 */

type SeedProduct = {
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  specs: { label: string; value: string; unit?: string }[];
  packaging: { name: string; sizeLabel: string; notes?: string }[];
};

/**
 * Product photography in public/media/products is original commissioned imagery,
 * shared between SKUs of the same visual class. Client-supplied photos replace it
 * either by overwriting the file or per-product via the admin image uploader.
 */
const REFERENCE_IMAGE_BY_SLUG: Record<string, string> = {
  "high-oleic-sunflower-oil": "/media/products/frem/high-oleic-sunflower-oil.webp",
  "long-life-frying-oil": "/media/products/frem/long-life-frying-oil.webp",
  "rbd-corn-oil": "/media/products/frem/rbd-corn-oil.webp",
  "rbd-groundnut-peanut-oil": "/media/products/frem/rbd-groundnut-peanut-oil.webp",
  "rbd-palm-oil-36-39": "/media/products/frem/rbd-palm-oil-36-39.webp",
  "rbd-palm-olein": "/media/products/frem/rbd-palm-olein.webp",
  "rbd-rapeseed-canola-oil": "/media/products/frem/rbd-rapeseed-canola-oil.webp",
  "rbd-soybean-oil": "/media/products/frem/rbd-soybean-oil.webp",
  "rbdw-sunflower-oil": "/media/products/frem/rbdw-sunflower-oil.webp",
  "1121-sella-basmati-rice": "/media/products/frem/1121-sella-basmati-rice.webp",
  "arborio-rice": "/media/products/frem/arborio-rice.webp",
  "irri-6-long-grain-rice": "/media/products/frem/irri-6-long-grain-rice.webp",
  "japonica-rice": "/media/products/frem/japonica-rice.webp",
  "jasmine-rice-thai-hom-mali": "/media/products/frem/jasmine-rice-thai-hom-mali.webp",
  "parboiled-rice-5-broken": "/media/products/frem/parboiled-rice-5-broken.webp",
  "quality-brown-rice": "/media/products/frem/quality-brown-rice.webp",
  "irri-9-long-grain-rice": "/media/products/frem/irri-9-long-grain-rice.webp",
  "thai-brown-jasmine-rice": "/media/products/frem/thai-brown-jasmine-rice.webp",
  "thai-glutinous-rice": "/media/products/frem/thai-glutinous-rice.webp",
  "thai-glutinous-rice-25-broken": "/media/products/frem/thai-glutinous-rice-25-broken.webp",
  "thai-hom-patum-rice": "/media/products/frem/thai-hom-patum-rice.webp",
  "thai-jasmine-black-cargo-rice": "/media/products/frem/thai-jasmine-black-cargo-rice.webp",
  "thai-jasmine-red-cargo-rice": "/media/products/frem/thai-jasmine-red-cargo-rice.webp",
  "thai-long-grain-rice": "/media/products/frem/thai-long-grain-rice.webp",
  "thai-parboiled-rice": "/media/products/frem/thai-parboiled-rice.webp",
  "thai-riceberry-rice": "/media/products/frem/thai-riceberry-rice.webp",
  "thai-white-rice-10-broken": "/media/products/frem/thai-white-rice-10-broken.webp",
  "thai-white-rice-100-broken": "/media/products/frem/thai-white-rice-100-broken.webp",
  "thai-white-rice-100-sortexed": "/media/products/frem/thai-white-rice-100-sortexed.webp",
  "thai-white-rice-25-broken": "/media/products/frem/thai-white-rice-25-broken.webp",
  "white-rice-5-broken": "/media/products/frem/white-rice-5-broken.webp",
};

const PRODUCT_IMAGE_BY_SLUG: Record<string, string> = {
  "high-oleic-sunflower-oil": "oil-sunflower",
  "rbdw-sunflower-oil": "oil-sunflower",
  "long-life-frying-oil": "oil-vegetable",
  "vegetable-oil": "oil-vegetable",
  "rbd-corn-oil": "oil-corn",
  "rbd-groundnut-peanut-oil": "oil-groundnut",
  "rbd-palm-oil-36-39": "oil-palm",
  "rbd-palm-olein": "oil-palm",
  "rbd-rapeseed-canola-oil": "oil-canola",
  "rbd-soybean-oil": "oil-soybean",
  "olive-oil": "oil-olive",
  "coconut-oil": "oil-coconut",
  "sesame-oil": "oil-sesame",

  "1121-sella-basmati-rice": "rice-basmati",
  "arborio-rice": "rice-short-grain",
  "japonica-rice": "rice-short-grain",
  "irri-6-long-grain-rice": "rice-white-long-grain",
  "irri-9-long-grain-rice": "rice-white-long-grain",
  "thai-long-grain-rice": "rice-white-long-grain",
  "thai-white-rice-10-broken": "rice-white-long-grain",
  "thai-white-rice-100-sortexed": "rice-white-long-grain",
  "white-rice-5-broken": "rice-white-long-grain",
  "jasmine-rice-thai-hom-mali": "rice-jasmine",
  "thai-hom-patum-rice": "rice-jasmine",
  "parboiled-rice-5-broken": "rice-parboiled",
  "thai-parboiled-rice": "rice-parboiled",
  "quality-brown-rice": "rice-brown",
  "thai-brown-jasmine-rice": "rice-brown",
  "thai-glutinous-rice": "rice-glutinous",
  "thai-glutinous-rice-25-broken": "rice-glutinous",
  "thai-white-rice-25-broken": "rice-broken",
  "thai-white-rice-100-broken": "rice-broken",
  "thai-jasmine-black-cargo-rice": "rice-black-cargo",
  "thai-jasmine-red-cargo-rice": "rice-red-cargo",
  "thai-riceberry-rice": "rice-riceberry",
};

type CatalogueImage = { url: string; alt: string; isPrimary: boolean };

function productImages(item: SeedProduct, categorySlug: string): CatalogueImage[] {
  const isRice = categorySlug === "rice";
  const primary =
    REFERENCE_IMAGE_BY_SLUG[item.slug] ??
    `/media/products/${PRODUCT_IMAGE_BY_SLUG[item.slug] ?? (isRice ? "rice-jasmine" : "oil-vegetable")}.webp`;
  const context = isRice ? "rice-sacks" : "oil-bulk";

  return [
    {
      url: primary,
      alt: isRice
        ? `${item.name} — uncooked grains shown close up`
        : `${item.name} — bottled product presentation`,
      isPrimary: true,
    },
    {
      url: `/media/products/${context}.webp`,
      alt: isRice
        ? `Export packing context for ${item.name} — woven bags on pallets`
        : `Bulk packing context for ${item.name} — drums and IBC totes`,
      isPrimary: false,
    },
  ];
}

const OIL_PRODUCTS: SeedProduct[] = [
  {
    slug: "high-oleic-sunflower-oil",
    name: "High Oleic Sunflower Oil",
    shortDescription: "High-oleic sunflower oil for frying stability and wholesale programmes.",
    description:
      "High oleic sunflower oil for retail, foodservice, and industrial buyers who need heat stability and consistent quality. Typical uses include deep frying and packaged foods where oxidative stability matters. Store sealed, away from heat and light. Exact grade, packaging, and Incoterms confirmed at quotation.",
    specs: [
      { label: "Type", value: "High oleic sunflower oil" },
      { label: "Processing", value: "Confirm at quote (RBD / RBDW)" },
      { label: "Application", value: "Frying & retail packing" },
      { label: "Storage", value: "Cool, dry, sealed — confirm with sales" },
      { label: "Origin", value: "Confirm at quote" },
    ],
    packaging: [
      { name: "Retail bottles", sizeLabel: "0.5–5 L" },
      { name: "Jerry cans / drums", sizeLabel: "confirm at quote" },
      { name: "Flexitank / bulk", sizeLabel: "confirm at quote" },
    ],
  },
  {
    slug: "long-life-frying-oil",
    name: "Long Life Frying Oil",
    shortDescription: "Frying oil formulated for extended commercial frying cycles.",
    description:
      "Long-life frying oil for foodservice and industrial kitchens that run extended fry cycles. Suitability for specific fryer programmes, filter regimes, and packing formats is confirmed with sales at quotation. Store sealed and away from heat; shelf guidance is product-specific.",
    specs: [
      { label: "Type", value: "Long life frying oil" },
      { label: "Application", value: "Commercial frying" },
      { label: "Storage", value: "Cool, dry, sealed — confirm with sales" },
      { label: "Origin", value: "Confirm at quote" },
    ],
    packaging: [
      { name: "Retail bottles", sizeLabel: "0.5–5 L" },
      { name: "Jerry cans / drums", sizeLabel: "confirm at quote" },
      { name: "Flexitank / bulk", sizeLabel: "confirm at quote" },
    ],
  },
  {
    slug: "rbd-corn-oil",
    name: "RBD Corn Oil",
    shortDescription: "RBD corn oil for retail, food manufacturing, and export buyers.",
    description:
      "Refined, bleached, and deodorised corn oil for wholesale, food manufacturing, and export. Common buyer uses include retail bottling and foodservice frying. Commercial terms, packing, and shipment schedule are confirmed at quotation. Store sealed, cool, and away from light.",
    specs: [
      { label: "Type", value: "RBD corn oil" },
      { label: "Processing", value: "RBD" },
      { label: "Application", value: "Retail & foodservice" },
      { label: "Storage", value: "Cool, dry, sealed — confirm with sales" },
      { label: "Grade", value: "Confirm at quote" },
      { label: "Origin", value: "Confirm at quote" },
    ],
    packaging: [
      { name: "Retail bottles", sizeLabel: "0.5–5 L" },
      { name: "Jerry cans / drums", sizeLabel: "confirm at quote" },
      { name: "Flexitank / bulk", sizeLabel: "confirm at quote" },
    ],
  },
  {
    slug: "rbd-groundnut-peanut-oil",
    name: "RBD Groundnut / Peanut Oil",
    shortDescription: "RBD groundnut (peanut) oil for culinary and wholesale programmes.",
    description:
      "Refined groundnut / peanut oil for importers and distributors supplying culinary and wholesale programmes. Grade, allergen labelling needs, and packaging are confirmed at quotation — spot prices are not published on this site. Store sealed and cool.",
    specs: [
      { label: "Type", value: "RBD groundnut / peanut oil" },
      { label: "Processing", value: "RBD" },
      { label: "Application", value: "Culinary & wholesale" },
      { label: "Storage", value: "Cool, dry, sealed — confirm with sales" },
      { label: "Grade", value: "Confirm at quote" },
      { label: "Origin", value: "Confirm at quote" },
    ],
    packaging: [
      { name: "Retail bottles", sizeLabel: "0.5–5 L" },
      { name: "Jerry cans / drums", sizeLabel: "confirm at quote" },
      { name: "Flexitank / bulk", sizeLabel: "confirm at quote" },
    ],
  },
  {
    slug: "rbd-palm-oil-36-39",
    name: "RBD Palm Oil (36–39)",
    shortDescription: "RBD palm oil in the 36–39 melting-point band for industrial buyers.",
    description:
      "RBD palm oil in the 36–39 melting-point band for food manufacturing and wholesale programmes. Melting profile, packing, and Incoterms are confirmed at quotation. Handle and store according to product temperature guidance from sales — avoid uncontrolled heat cycles.",
    specs: [
      { label: "Type", value: "RBD palm oil" },
      { label: "Processing", value: "RBD" },
      { label: "Melting band", value: "36–39" },
      { label: "Application", value: "Food manufacturing" },
      { label: "Storage", value: "Per melting profile — confirm with sales" },
      { label: "Origin", value: "Confirm at quote" },
    ],
    packaging: [
      { name: "Drums", sizeLabel: "confirm at quote" },
      { name: "Flexitank / bulk", sizeLabel: "confirm at quote" },
    ],
  },
  {
    slug: "rbd-palm-olein",
    name: "RBD Palm Olein",
    shortDescription: "RBD palm olein for frying, retail packing, and bulk export.",
    description:
      "RBD palm olein for retail bottling, foodservice frying, and industrial edible-oil programmes. Specifications and packing are confirmed with the sales team at quotation. Store sealed; temperature guidance depends on grade and destination climate.",
    specs: [
      { label: "Type", value: "RBD palm olein" },
      { label: "Processing", value: "RBD" },
      { label: "Application", value: "Frying, retail, bulk export" },
      { label: "Storage", value: "Sealed; climate guidance from sales" },
      { label: "Grade", value: "Confirm at quote" },
      { label: "Origin", value: "Confirm at quote" },
    ],
    packaging: [
      { name: "Retail bottles", sizeLabel: "0.5–5 L" },
      { name: "Jerry cans / drums", sizeLabel: "confirm at quote" },
      { name: "Flexitank / bulk", sizeLabel: "confirm at quote" },
    ],
  },
  {
    slug: "rbd-rapeseed-canola-oil",
    name: "RBD Rapeseed / Canola Oil",
    shortDescription: "RBD rapeseed (canola) oil for wholesale and foodservice buyers.",
    description:
      "Refined rapeseed / canola oil for wholesale, foodservice, and international trade. Exact grade, packaging, and shipment terms are confirmed at quotation. Store sealed, cool, and away from light.",
    specs: [
      { label: "Type", value: "RBD rapeseed / canola oil" },
      { label: "Processing", value: "RBD" },
      { label: "Application", value: "Wholesale & foodservice" },
      { label: "Storage", value: "Cool, dry, sealed — confirm with sales" },
      { label: "Grade", value: "Confirm at quote" },
      { label: "Origin", value: "Confirm at quote" },
    ],
    packaging: [
      { name: "Retail bottles", sizeLabel: "0.5–5 L" },
      { name: "Jerry cans / drums", sizeLabel: "confirm at quote" },
      { name: "Flexitank / bulk", sizeLabel: "confirm at quote" },
    ],
  },
  {
    slug: "rbd-soybean-oil",
    name: "RBD Soybean Oil",
    shortDescription: "RBD soybean oil for industrial, retail, and export programmes.",
    description:
      "Refined, bleached, and deodorised soybean oil for industrial, retail, and export programmes. Packaging and Incoterms are confirmed at quotation. Store sealed and cool; ask sales about destination-specific packing.",
    specs: [
      { label: "Type", value: "RBD soybean oil" },
      { label: "Processing", value: "RBD" },
      { label: "Application", value: "Industrial, retail, export" },
      { label: "Storage", value: "Cool, dry, sealed — confirm with sales" },
      { label: "Grade", value: "Confirm at quote" },
      { label: "Origin", value: "Confirm at quote" },
    ],
    packaging: [
      { name: "Retail bottles", sizeLabel: "0.5–5 L" },
      { name: "Jerry cans / drums", sizeLabel: "confirm at quote" },
      { name: "Flexitank / bulk", sizeLabel: "confirm at quote" },
    ],
  },
  {
    slug: "rbdw-sunflower-oil",
    name: "RBDW Sunflower Oil",
    shortDescription: "RBDW sunflower oil for bottled and bulk export supply.",
    description:
      "RBDW sunflower oil for bottled and bulk export supply. Grade purity, packing formats, and commercial terms are confirmed at quotation. Typical buyer uses include retail bottles and foodservice. Store sealed, cool, and away from light.",
    specs: [
      { label: "Type", value: "RBDW sunflower oil" },
      { label: "Processing", value: "RBDW" },
      { label: "Application", value: "Bottled & bulk export" },
      { label: "Storage", value: "Cool, dry, sealed — confirm with sales" },
      { label: "Grade", value: "Confirm at quote" },
      { label: "Origin", value: "Confirm at quote" },
    ],
    packaging: [
      { name: "Retail bottles", sizeLabel: "0.5–5 L" },
      { name: "Jerry cans / drums", sizeLabel: "confirm at quote" },
      { name: "Flexitank / bulk", sizeLabel: "confirm at quote" },
    ],
  },
  {
    slug: "olive-oil",
    name: "Olive Oil",
    shortDescription: "Olive oil for culinary, retail packing, and wholesale programmes.",
    description:
      "Olive oil for culinary, retail, and wholesale programmes. Grade (extra virgin, virgin, refined, or blended) and packing are confirmed at quotation — spot prices are not published on this site. Store sealed, cool, and away from light.",
    specs: [
      { label: "Type", value: "Olive oil" },
      { label: "Grade", value: "Confirm at quote (EVOO / virgin / refined / blend)" },
      { label: "Application", value: "Culinary, retail, wholesale" },
      { label: "Storage", value: "Cool, dry, sealed — confirm with sales" },
      { label: "Origin", value: "Confirm at quote" },
    ],
    packaging: [
      { name: "Retail bottles", sizeLabel: "0.25–5 L" },
      { name: "Jerry cans / drums", sizeLabel: "confirm at quote" },
      { name: "Flexitank / bulk", sizeLabel: "confirm at quote" },
    ],
  },
  {
    slug: "coconut-oil",
    name: "Coconut Oil",
    shortDescription: "Coconut oil for food manufacturing, retail, and export buyers.",
    description:
      "Coconut oil for food manufacturing, retail packing, and export. Processing style (RBD or virgin) and packing formats are confirmed with sales at quotation. Store sealed; solidification at cooler temperatures is normal for this oil type.",
    specs: [
      { label: "Type", value: "Coconut oil" },
      { label: "Processing", value: "Confirm at quote (RBD / virgin)" },
      { label: "Application", value: "Food manufacturing & retail" },
      { label: "Storage", value: "Sealed; may solidify when cool" },
      { label: "Origin", value: "Confirm at quote" },
    ],
    packaging: [
      { name: "Retail bottles / jars", sizeLabel: "0.5–5 L" },
      { name: "Jerry cans / drums", sizeLabel: "confirm at quote" },
      { name: "Flexitank / bulk", sizeLabel: "confirm at quote" },
    ],
  },
  {
    slug: "sesame-oil",
    name: "Sesame Oil",
    shortDescription: "Sesame oil for culinary and specialty wholesale programmes.",
    description:
      "Sesame oil for culinary and specialty wholesale programmes. Toasted versus refined grade, allergen labelling needs, and packing are confirmed at quotation. Store sealed and cool, away from light.",
    specs: [
      { label: "Type", value: "Sesame oil" },
      { label: "Grade", value: "Confirm at quote (toasted / refined)" },
      { label: "Application", value: "Culinary & specialty wholesale" },
      { label: "Storage", value: "Cool, dry, sealed — confirm with sales" },
      { label: "Origin", value: "Confirm at quote" },
    ],
    packaging: [
      { name: "Retail bottles", sizeLabel: "0.25–2 L" },
      { name: "Jerry cans / drums", sizeLabel: "confirm at quote" },
    ],
  },
  {
    slug: "vegetable-oil",
    name: "Vegetable Oil",
    shortDescription: "Blended vegetable oil for retail, foodservice, and bulk export.",
    description:
      "Blended vegetable oil for retail bottling, foodservice frying, and bulk export. Blend composition, packing formats, and Incoterms are confirmed at quotation. Store sealed, cool, and away from light.",
    specs: [
      { label: "Type", value: "Blended vegetable oil" },
      { label: "Blend", value: "Confirm at quote" },
      { label: "Application", value: "Retail, foodservice, bulk export" },
      { label: "Storage", value: "Cool, dry, sealed — confirm with sales" },
      { label: "Origin", value: "Confirm at quote" },
    ],
    packaging: [
      { name: "Retail bottles", sizeLabel: "0.5–5 L" },
      { name: "Jerry cans / drums", sizeLabel: "confirm at quote" },
      { name: "Flexitank / bulk", sizeLabel: "confirm at quote" },
    ],
  },
];

const RICE_PRODUCTS: SeedProduct[] = [
  {
    slug: "1121-sella-basmati-rice",
    name: "1121 Sella Basmati Rice",
    shortDescription: "Long-grain 1121 Sella basmati for aromatic rice programmes.",
    description:
      "1121 Sella basmati rice for wholesale and foodservice buyers seeking long-grain aromatic rice. Crop year, broken ratio, and packing confirmed at quotation.",
    specs: [
      { label: "Variety", value: "1121 Sella basmati" },
      { label: "Grain type", value: "Long grain" },
      { label: "Moisture", value: "14 max", unit: "%" },
    ],
    packaging: [
      { name: "Retail bags", sizeLabel: "1–5 kg" },
      { name: "Commercial bags", sizeLabel: "25–50 kg" },
    ],
  },
  {
    slug: "arborio-rice",
    name: "Arborio Rice",
    shortDescription: "Arborio rice for risotto-style and specialty culinary programmes.",
    description:
      "Arborio rice for importers and foodservice distributors. Moisture, purity, and packing confirmed at quotation.",
    specs: [
      { label: "Variety", value: "Arborio" },
      { label: "Moisture", value: "14 max", unit: "%" },
      { label: "Broken", value: "confirm at quote" },
    ],
    packaging: [
      { name: "Retail bags", sizeLabel: "1–5 kg" },
      { name: "Commercial bags", sizeLabel: "25–50 kg" },
    ],
  },
  {
    slug: "irri-6-long-grain-rice",
    name: "IRRI-6 Long Grain Rice",
    shortDescription: "IRRI-6 long-grain rice for wholesale and industrial buyers.",
    description:
      "IRRI-6 long-grain rice for export programmes. Grain length, broken ratio, and packing confirmed at quotation.",
    specs: [
      { label: "Variety", value: "IRRI-6" },
      { label: "Grain type", value: "Long grain" },
      { label: "Moisture", value: "14 max", unit: "%" },
      { label: "Broken", value: "5 max typical", unit: "%" },
    ],
    packaging: [
      { name: "Retail bags", sizeLabel: "1–5 kg" },
      { name: "Commercial bags", sizeLabel: "25–50 kg" },
    ],
  },
  {
    slug: "japonica-rice",
    name: "Japonica Rice",
    shortDescription: "Short- to medium-grain japonica rice for specialty markets.",
    description:
      "Japonica rice for buyers who specify short/medium grain and sticky cooking texture. Exact milling and packing confirmed at quotation.",
    specs: [
      { label: "Variety", value: "Japonica" },
      { label: "Grain type", value: "Short to medium" },
      { label: "Moisture", value: "14 max", unit: "%" },
    ],
    packaging: [
      { name: "Retail bags", sizeLabel: "1–5 kg" },
      { name: "Commercial bags", sizeLabel: "25–50 kg" },
    ],
  },
  {
    slug: "jasmine-rice-thai-hom-mali",
    name: "Jasmine Rice (Thai Hom Mali)",
    shortDescription: "Fragrant Thai Hom Mali jasmine rice for retail and foodservice.",
    description:
      "Thai Hom Mali style jasmine rice for wholesale and export. Buyers typically evaluate fragrance, broken ratio, and packing for retail or foodservice programmes. Broken ratio, crop year, and packing are confirmed at quotation. Store in a cool, dry place away from strong odours.",
    specs: [
      { label: "Variety", value: "Thai Hom Mali (jasmine)" },
      { label: "Grain type", value: "Long grain" },
      { label: "Moisture", value: "14 max", unit: "%" },
      { label: "Broken", value: "confirm at quote" },
      { label: "Storage", value: "Cool, dry — confirm with sales" },
      { label: "Origin", value: "Thailand" },
    ],
    packaging: [
      { name: "Retail bags", sizeLabel: "1–5 kg", notes: "MOQ confirm at quote" },
      { name: "Commercial bags", sizeLabel: "25–50 kg", notes: "MOQ confirm at quote" },
    ],
  },
  {
    slug: "parboiled-rice-5-broken",
    name: "Parboiled Rice 5% Broken",
    shortDescription: "Parboiled rice with up to 5% broken for export programmes.",
    description:
      "Parboiled rice (5% broken basis) for importers and industrial buyers. Specs and packing confirmed at quotation.",
    specs: [
      { label: "Type", value: "Parboiled" },
      { label: "Broken", value: "5 max", unit: "%" },
      { label: "Moisture", value: "14 max", unit: "%" },
    ],
    packaging: [
      { name: "Retail bags", sizeLabel: "1–5 kg" },
      { name: "Commercial bags", sizeLabel: "25–50 kg" },
    ],
  },
  {
    slug: "quality-brown-rice",
    name: "Quality Brown Rice",
    shortDescription: "Brown rice with bran retained for health-oriented programmes.",
    description:
      "Quality brown rice for wholesale buyers. Moisture, broken ratio, and packing confirmed at quotation.",
    specs: [
      { label: "Type", value: "Brown rice" },
      { label: "Moisture", value: "14 max", unit: "%" },
      { label: "Broken", value: "5 max typical", unit: "%" },
    ],
    packaging: [
      { name: "Retail bags", sizeLabel: "1–5 kg" },
      { name: "Commercial bags", sizeLabel: "25–50 kg" },
    ],
  },
  {
    slug: "irri-9-long-grain-rice",
    name: "IRRI-9 Long Grain Rice",
    shortDescription: "IRRI-9 long-grain rice for wholesale and export buyers.",
    description:
      "IRRI-9 long-grain rice for international trade. Grain length, broken ratio, and packing confirmed at quotation.",
    specs: [
      { label: "Variety", value: "IRRI-9" },
      { label: "Grain type", value: "Long grain" },
      { label: "Moisture", value: "14 max", unit: "%" },
      { label: "Broken", value: "5 max typical", unit: "%" },
    ],
    packaging: [
      { name: "Retail bags", sizeLabel: "1–5 kg" },
      { name: "Commercial bags", sizeLabel: "25–50 kg" },
    ],
  },
  {
    slug: "thai-brown-jasmine-rice",
    name: "Thai Brown Jasmine Rice",
    shortDescription: "Brown jasmine rice retaining bran and aromatic character.",
    description:
      "Thai brown jasmine rice for specialty and health-oriented wholesale programmes. Specs and packing confirmed at quotation.",
    specs: [
      { label: "Variety", value: "Thai brown jasmine" },
      { label: "Grain type", value: "Long grain" },
      { label: "Colour", value: "Brown" },
    ],
    packaging: [
      { name: "Retail bags", sizeLabel: "1–5 kg" },
      { name: "Commercial bags", sizeLabel: "25–50 kg" },
    ],
  },
  {
    slug: "thai-glutinous-rice",
    name: "Thai Glutinous Rice",
    shortDescription: "Sticky Thai glutinous rice for culinary and wholesale programmes.",
    description:
      "Thai glutinous (sticky) rice for foodservice and retail packing programmes. Specs and packing confirmed at quotation.",
    specs: [
      { label: "Variety", value: "Glutinous" },
      { label: "Texture", value: "Sticky when cooked" },
      { label: "Moisture", value: "14 max", unit: "%" },
    ],
    packaging: [
      { name: "Retail bags", sizeLabel: "1–5 kg" },
      { name: "Commercial bags", sizeLabel: "25–50 kg" },
    ],
  },
  {
    slug: "thai-glutinous-rice-25-broken",
    name: "Thai Glutinous Rice 25% Broken",
    shortDescription: "Glutinous rice with up to 25% broken for value programmes.",
    description:
      "Thai glutinous rice (25% broken) for buyers who accept higher broken content. Packing and commercial terms confirmed at quotation.",
    specs: [
      { label: "Variety", value: "Glutinous" },
      { label: "Broken", value: "25 max", unit: "%" },
      { label: "Moisture", value: "14 max", unit: "%" },
    ],
    packaging: [
      { name: "Commercial bags", sizeLabel: "25–50 kg" },
    ],
  },
  {
    slug: "thai-hom-patum-rice",
    name: "Thai Hom Patum Rice",
    shortDescription: "Pathum Thani (Hom Patum) aromatic rice for export buyers.",
    description:
      "Thai Hom Patum (Pathum Thani) rice for wholesale programmes. Fragrance profile, broken ratio, and packing confirmed at quotation.",
    specs: [
      { label: "Variety", value: "Hom Patum / Pathum Thani" },
      { label: "Grain type", value: "Long grain aromatic" },
      { label: "Moisture", value: "confirm at quote" },
    ],
    packaging: [
      { name: "Retail bags", sizeLabel: "1–5 kg" },
      { name: "Commercial bags", sizeLabel: "25–50 kg" },
    ],
  },
  {
    slug: "thai-jasmine-black-cargo-rice",
    name: "Thai Jasmine Black Cargo Rice",
    shortDescription: "Black cargo jasmine rice with bran retained for specialty markets.",
    description:
      "Thai jasmine black cargo rice for specialty wholesale programmes. Specs and packing confirmed at quotation.",
    specs: [
      { label: "Type", value: "Black cargo jasmine" },
      { label: "Milling", value: "Husk removed; bran retained" },
      { label: "Origin", value: "Thailand" },
    ],
    packaging: [
      { name: "Retail bags", sizeLabel: "1–5 kg" },
      { name: "Commercial bags", sizeLabel: "25–50 kg" },
    ],
  },
  {
    slug: "thai-jasmine-red-cargo-rice",
    name: "Thai Jasmine Red Cargo Rice",
    shortDescription: "Red cargo jasmine rice for specialty and health-oriented buyers.",
    description:
      "Thai jasmine red cargo rice for wholesale export. Specs and packing confirmed at quotation.",
    specs: [
      { label: "Type", value: "Red cargo jasmine" },
      { label: "Grain type", value: "Long grain" },
      { label: "Origin", value: "Thailand" },
    ],
    packaging: [
      { name: "Retail bags", sizeLabel: "1–5 kg" },
      { name: "Commercial bags", sizeLabel: "25–50 kg" },
    ],
  },
  {
    slug: "thai-long-grain-rice",
    name: "Thai Long Grain Rice",
    shortDescription: "Thai long-grain white rice for general wholesale programmes.",
    description:
      "Thai long-grain rice for importers and distributors. Broken ratio and packing confirmed at quotation.",
    specs: [
      { label: "Grain type", value: "Long grain" },
      { label: "Colour", value: "White" },
      { label: "Moisture", value: "14 max", unit: "%" },
      { label: "Broken", value: "confirm at quote" },
    ],
    packaging: [
      { name: "Retail bags", sizeLabel: "1–5 kg" },
      { name: "Commercial bags", sizeLabel: "25–50 kg" },
    ],
  },
  {
    slug: "thai-parboiled-rice",
    name: "Thai Parboiled Rice",
    shortDescription: "Thai parboiled rice for foodservice and industrial buyers.",
    description:
      "Thai parboiled rice for export programmes. Broken ratio, moisture, and packing confirmed at quotation.",
    specs: [
      { label: "Type", value: "Parboiled" },
      { label: "Moisture", value: "14 max", unit: "%" },
      { label: "Broken", value: "confirm at quote" },
    ],
    packaging: [
      { name: "Retail bags", sizeLabel: "1–5 kg" },
      { name: "Commercial bags", sizeLabel: "25–50 kg" },
    ],
  },
  {
    slug: "thai-riceberry-rice",
    name: "Thai Riceberry Rice",
    shortDescription: "Thai Riceberry specialty rice for premium retail programmes.",
    description:
      "Thai Riceberry rice for specialty wholesale and retail packing. Specs and packing confirmed at quotation.",
    specs: [
      { label: "Variety", value: "Riceberry" },
      { label: "Origin", value: "Thailand" },
      { label: "Broken", value: "confirm at quote" },
    ],
    packaging: [
      { name: "Retail bags", sizeLabel: "1–5 kg" },
      { name: "Commercial bags", sizeLabel: "25–50 kg" },
    ],
  },
  {
    slug: "thai-white-rice-10-broken",
    name: "Thai White Rice 10% Broken",
    shortDescription: "Thai white long-grain rice with up to 10% broken.",
    description:
      "Thai white rice (10% broken) for wholesale export. Packing and commercial terms confirmed at quotation.",
    specs: [
      { label: "Type", value: "White rice" },
      { label: "Broken", value: "10 max", unit: "%" },
      { label: "Moisture", value: "14 max", unit: "%" },
    ],
    packaging: [
      { name: "Commercial bags", sizeLabel: "25–50 kg" },
    ],
  },
  {
    slug: "thai-white-rice-100-broken",
    name: "Thai White Rice 100% Broken",
    shortDescription: "Fully broken Thai white rice for industrial and value programmes.",
    description:
      "Thai white rice 100% broken for buyers specifying full-broken grades. Packing confirmed at quotation.",
    specs: [
      { label: "Type", value: "White rice broken" },
      { label: "Broken", value: "100", unit: "%" },
      { label: "Moisture", value: "confirm at quote" },
    ],
    packaging: [
      { name: "Commercial bags", sizeLabel: "25–50 kg" },
    ],
  },
  {
    slug: "thai-white-rice-100-sortexed",
    name: "Thai White Rice 100% Sortexed",
    shortDescription: "Sortexed Thai white rice for premium purity programmes.",
    description:
      "Thai white rice 100% sortexed for buyers who specify optical sorting. Specs and packing confirmed at quotation.",
    specs: [
      { label: "Type", value: "White rice" },
      { label: "Sorting", value: "100% sortexed" },
      { label: "Moisture", value: "confirm at quote" },
    ],
    packaging: [
      { name: "Retail bags", sizeLabel: "1–5 kg" },
      { name: "Commercial bags", sizeLabel: "25–50 kg" },
    ],
  },
  {
    slug: "thai-white-rice-25-broken",
    name: "Thai White Rice 25% Broken",
    shortDescription: "Thai white long-grain rice with up to 25% broken.",
    description:
      "Thai white rice (25% broken) for wholesale programmes. Packing and Incoterms confirmed at quotation.",
    specs: [
      { label: "Type", value: "White rice" },
      { label: "Broken", value: "25 max", unit: "%" },
      { label: "Moisture", value: "14 max", unit: "%" },
    ],
    packaging: [
      { name: "Commercial bags", sizeLabel: "25–50 kg" },
    ],
  },
  {
    slug: "white-rice-5-broken",
    name: "White Rice 5% Broken",
    shortDescription: "White rice with up to 5% broken for standard export grades.",
    description:
      "White rice (5% broken) for importers and distributors. Specs and packing confirmed at quotation.",
    specs: [
      { label: "Type", value: "White rice" },
      { label: "Broken", value: "5 max", unit: "%" },
      { label: "Moisture", value: "14 max", unit: "%" },
    ],
    packaging: [
      { name: "Retail bags", sizeLabel: "1–5 kg" },
      { name: "Commercial bags", sizeLabel: "25–50 kg" },
    ],
  },
];

async function removeLegacySugarCatalogue() {
  const sugar = await prisma.category.findUnique({ where: { slug: "sugar" } });
  if (!sugar) return;

  const products = await prisma.product.findMany({
    where: { categoryId: sugar.id },
    select: { id: true },
  });
  const ids = products.map((p) => p.id);
  if (ids.length > 0) {
    await prisma.productImage.deleteMany({ where: { productId: { in: ids } } });
    await prisma.productSpecification.deleteMany({ where: { productId: { in: ids } } });
    await prisma.productPackaging.deleteMany({ where: { productId: { in: ids } } });
    await prisma.quoteRequest.updateMany({
      where: { productId: { in: ids } },
      data: { productId: null },
    });
    await prisma.product.deleteMany({ where: { id: { in: ids } } });
  }
  await prisma.category.delete({ where: { id: sugar.id } });
  console.log("Removed legacy sugar catalogue.");
}

async function deleteProductsByIds(ids: string[]) {
  if (ids.length === 0) return;
  await prisma.productImage.deleteMany({ where: { productId: { in: ids } } });
  await prisma.productSpecification.deleteMany({ where: { productId: { in: ids } } });
  await prisma.productPackaging.deleteMany({ where: { productId: { in: ids } } });
  await prisma.quoteRequest.updateMany({
    where: { productId: { in: ids } },
    data: { productId: null },
  });
  await prisma.product.deleteMany({ where: { id: { in: ids } } });
}

async function pruneCategoryToSlugs(categoryId: string, keepSlugs: string[]) {
  const obsolete = await prisma.product.findMany({
    where: { categoryId, slug: { notIn: keepSlugs } },
    select: { id: true, slug: true },
  });
  if (obsolete.length === 0) return;
  await deleteProductsByIds(obsolete.map((p) => p.id));
  console.log(
    `Pruned ${obsolete.length} obsolete product(s): ${obsolete.map((p) => p.slug).join(", ")}`,
  );
}

async function upsertCatalogueProduct(
  categoryId: string,
  categorySlug: string,
  item: SeedProduct,
) {
  const product = await prisma.product.upsert({
    where: { slug: item.slug },
    update: {
      name: item.name,
      shortDescription: item.shortDescription,
      description: item.description,
      categoryId,
      status: PublishStatus.PUBLISHED,
      publishedAt: new Date(),
    },
    create: {
      slug: item.slug,
      name: item.name,
      shortDescription: item.shortDescription,
      description: item.description,
      categoryId,
      status: PublishStatus.PUBLISHED,
      publishedAt: new Date(),
    },
  });

  await prisma.productSpecification.deleteMany({ where: { productId: product.id } });
  await prisma.productSpecification.createMany({
    data: item.specs.map((spec, i) => ({
      productId: product.id,
      label: spec.label,
      value: spec.value,
      unit: spec.unit,
      sortOrder: i + 1,
    })),
  });

  await prisma.productPackaging.deleteMany({ where: { productId: product.id } });
  await prisma.productPackaging.createMany({
    data: item.packaging.map((pack, i) => ({
      productId: product.id,
      name: pack.name,
      sizeLabel: pack.sizeLabel,
      notes: pack.notes,
      sortOrder: i + 1,
    })),
  });

  const images = productImages(item, categorySlug);
  await prisma.productImage.deleteMany({ where: { productId: product.id } });
  await prisma.productImage.createMany({
    data: images.map((img, i) => ({
      productId: product.id,
      url: img.url,
      alt: img.alt,
      sortOrder: i + 1,
      isPrimary: img.isPrimary,
    })),
  });

  return product.id;
}

async function main() {
  const adminEmail = (process.env.SEED_ADMIN_EMAIL ?? "sales@tgeptrade.com").toLowerCase();
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

  await removeLegacySugarCatalogue();

  const cookingOil = await prisma.category.upsert({
    where: { slug: "cooking-oil" },
    update: { name: "Edible Cooking Oil", sortOrder: 1 },
    create: { slug: "cooking-oil", name: "Edible Cooking Oil", sortOrder: 1 },
  });
  const rice = await prisma.category.upsert({
    where: { slug: "rice" },
    update: { name: "Rice", sortOrder: 2 },
    create: { slug: "rice", name: "Rice", sortOrder: 2 },
  });

  for (const oil of OIL_PRODUCTS) {
    await upsertCatalogueProduct(cookingOil.id, "cooking-oil", oil);
  }
  await pruneCategoryToSlugs(
    cookingOil.id,
    OIL_PRODUCTS.map((p) => p.slug),
  );

  for (const riceItem of RICE_PRODUCTS) {
    await upsertCatalogueProduct(rice.id, "rice", riceItem);
  }
  await pruneCategoryToSlugs(
    rice.id,
    RICE_PRODUCTS.map((p) => p.slug),
  );

  await prisma.sitePage.upsert({
    where: { slug: "about" },
    update: {
      title: "Trusted wholesale supply of rice and refined cooking oils",
      body: `TG Export Trade Company Limited is a Thailand-based company established in 2018. We supply refined edible cooking oils and rice to wholesale and export buyers who need clear grade information, practical packaging options, and coordinated shipment discussions.

Our commercial focus is dual-core: refined and specialty edible oils for retail, foodservice, and industrial programmes, alongside rice varieties and broken grades suited to importers, distributors, and food manufacturers. We do not dilute that focus with unrelated commodity lines such as sugar, fertilizer, or other multi-commodity ranges.

From inquiry to shipment discussions, we emphasise transparent communication, consistent grade expectations, and documentation support aligned to destination requirements. Buyers work with us through structured quotation requests — product, volume, destination, and preferred Incoterms — so sales conversations start with usable commercial context.

Quality and food-safety certifications appear on this website only after the business confirms which documents are held. Until then, we invite buyers to ask sales which certificates can be provided for a given shipment.

Contact: sales@tgeptrade.com`,
      status: PublishStatus.PUBLISHED,
    },
    create: {
      slug: "about",
      title: "Trusted wholesale supply of rice and refined cooking oils",
      body: `TG Export Trade Company Limited is a Thailand-based company established in 2018. We supply refined edible cooking oils and rice to wholesale and export buyers who need clear grade information, practical packaging options, and coordinated shipment discussions.

Our commercial focus is dual-core: refined and specialty edible oils for retail, foodservice, and industrial programmes, alongside rice varieties and broken grades suited to importers, distributors, and food manufacturers. We do not dilute that focus with unrelated commodity lines such as sugar, fertilizer, or other multi-commodity ranges.

From inquiry to shipment discussions, we emphasise transparent communication, consistent grade expectations, and documentation support aligned to destination requirements. Buyers work with us through structured quotation requests — product, volume, destination, and preferred Incoterms — so sales conversations start with usable commercial context.

Quality and food-safety certifications appear on this website only after the business confirms which documents are held. Until then, we invite buyers to ask sales which certificates can be provided for a given shipment.

Contact: sales@tgeptrade.com`,
      status: PublishStatus.PUBLISHED,
    },
  });

  await prisma.sitePage.upsert({
    where: { slug: "export-markets" },
    update: {
      title: "Export markets and shipment terms",
      body: `TG Export Trade supports international buyers of edible cooking oils and rice with clear product scope and structured quotation discussions.

Incoterms commonly discussed with buyers include FOB, CIF, EXW, and CNF. The appropriate term for a shipment depends on destination, packing, and logistics arrangements confirmed with sales.

Documentation typically requested for food commodity imports may include commercial invoice, packing list, bill of lading, and — where applicable — certificates of analysis or origin. Exact document sets vary by destination market and are confirmed per order.

A public list of destination countries will be published when the business confirms markets it actively serves. Until then, include your destination country or port in the quotation request so we can advise feasibility.`,
      status: PublishStatus.PUBLISHED,
    },
    create: {
      slug: "export-markets",
      title: "Export markets and shipment terms",
      body: `TG Export Trade supports international buyers of edible cooking oils and rice with clear product scope and structured quotation discussions.

Incoterms commonly discussed with buyers include FOB, CIF, EXW, and CNF. The appropriate term for a shipment depends on destination, packing, and logistics arrangements confirmed with sales.

Documentation typically requested for food commodity imports may include commercial invoice, packing list, bill of lading, and — where applicable — certificates of analysis or origin. Exact document sets vary by destination market and are confirmed per order.

A public list of destination countries will be published when the business confirms markets it actively serves. Until then, include your destination country or port in the quotation request so we can advise feasibility.`,
      status: PublishStatus.PUBLISHED,
    },
  });

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
  console.log(
    `Cooking oil products: ${OIL_PRODUCTS.length}; rice products: ${RICE_PRODUCTS.length}`,
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
