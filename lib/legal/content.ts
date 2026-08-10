import {
  COMPANY_ADDRESS_SINGLE_LINE,
  COMPANY_EMAIL,
  COMPANY_LEGAL_NAME,
  COMPANY_ORIGIN,
  COMPANY_WEBSITE,
} from "@/lib/brand";

export type LegalSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type LegalRelatedLink = {
  href: string;
  title: string;
  description: string;
};

export type LegalDocument = {
  slug: "privacy" | "terms" | "cookies";
  title: string;
  description: string;
  lastUpdated: string;
  intro?: string;
  sections: LegalSection[];
  relatedLinks?: LegalRelatedLink[];
};

const reviewNotice =
  "This page is a working draft for website publication. It is not legal advice and must be reviewed by qualified counsel before it is treated as final.";

export const LEGAL_DOCUMENTS: Record<LegalDocument["slug"], LegalDocument> = {
  privacy: {
    slug: "privacy",
    title: "Privacy Policy",
    description: `How ${COMPANY_LEGAL_NAME} collects, uses, and protects personal and business information when you visit our website or enquire about rice and refined edible cooking oils.`,
    lastUpdated: "2026-08-06",
    intro: `This policy explains how ${COMPANY_LEGAL_NAME} handles personal and business information when you visit ${COMPANY_WEBSITE}, request a quotation, send a contact message, or apply as a dealer or distributor. We supply refined edible cooking oils and rice to wholesale and export buyers — we do not sell unrelated commodity lines through this site.`,
    sections: [
      {
        heading: "Who we are",
        paragraphs: [
          `${COMPANY_LEGAL_NAME} (“we”, “us”) operates ${COMPANY_WEBSITE} from ${COMPANY_ORIGIN}. Our office address is ${COMPANY_ADDRESS_SINGLE_LINE}. We use personal data only for legitimate business purposes related to export enquiries, partner applications, and website operation.`,
          `Privacy questions: ${COMPANY_EMAIL}.`,
          reviewNotice,
        ],
      },
      {
        heading: "Information we collect",
        paragraphs: [
          "We collect information you voluntarily provide and limited technical data needed to operate and secure the website.",
        ],
        bullets: [
          "Name, email, phone, company name, and country from contact, quotation, and partner forms",
          "Product interest, volume, destination, preferred Incoterms, and message text you submit",
          "Technical data such as IP address, browser type, and pages visited, as needed for security and site operation",
        ],
      },
      {
        heading: "How we use your information",
        paragraphs: [
          "Your information is used solely for legitimate business purposes related to our rice and refined cooking oil export operations and website functionality.",
        ],
        bullets: [
          "Responding to enquiries, quotations, and partner applications",
          "Clarifying product grades, packing options, documentation, and shipment discussions",
          "Sending service-related communications about your request (primarily by email)",
          "Improving website performance, preventing abuse, and meeting legal obligations",
        ],
      },
      {
        heading: "Legal basis for processing",
        paragraphs: [
          "Depending on your location and the nature of the request, we process personal data on one or more of the following bases.",
        ],
        bullets: [
          "Consent, when you voluntarily submit a form",
          "Steps prior to a contract, when you request a quotation or commercial discussion",
          "Legitimate interests in operating an export business, fraud prevention, and site security",
          "Legal obligation where required by Thai or other applicable law",
        ],
      },
      {
        heading: "Data sharing and third parties",
        paragraphs: [
          "We do not sell your personal information. Data may be shared only with trusted service providers who assist our operations under confidentiality and purpose limits, or when the law requires disclosure.",
        ],
        bullets: [
          "Transactional email and hosting providers that power form delivery and the website",
          "Database and storage providers used to retain enquiry and application records",
          "Logistics or documentation partners only when necessary to fulfil a confirmed commercial shipment",
          "Authorities when required by law or valid legal process",
        ],
      },
      {
        heading: "Retention and security",
        paragraphs: [
          "We retain enquiry and application records only as long as needed for sales follow-up, operational records, and applicable legal requirements, then delete or anonymise them when no longer required.",
          "We use HTTPS on the website and limit access to authorised personnel on a need-to-know basis. No method of transmission or storage is perfectly secure; we work to reduce risk with practical safeguards.",
        ],
      },
      {
        heading: "Your rights and choices",
        paragraphs: [
          "Subject to applicable law, you may request access, correction, or deletion of personal data we hold about you, or raise a concern about how we process it. Contact us at the email above. If you are in a jurisdiction with additional rights (for example under GDPR), we will handle requests in line with those rules where they apply.",
        ],
        bullets: [
          "Request a copy of data we hold about you",
          "Ask us to correct inaccurate information",
          "Ask us to delete data when we no longer need it and law does not require retention",
        ],
      },
      {
        heading: "International transfers",
        paragraphs: [
          `Our operations are based in ${COMPANY_ORIGIN}. Service providers may process data in other countries. Where required, we use appropriate safeguards for cross-border transfers.`,
        ],
      },
      {
        heading: "Accuracy of website information",
        paragraphs: [
          "We aim to keep product descriptions and site content accurate for commercial evaluation. Specifications, packing options, and availability can change. Always confirm grade, packaging, and documents for a specific shipment with sales before relying on website content for purchasing decisions.",
        ],
      },
      {
        heading: "Changes to this policy",
        paragraphs: [
          "We may update this policy as our practices or legal requirements change. The “Last updated” date at the top of this page will change when we publish revisions.",
        ],
      },
    ],
    relatedLinks: [
      {
        href: "/contact",
        title: "Contact us",
        description: "Reach sales for privacy or general enquiries.",
      },
      {
        href: "/request-quote",
        title: "Request a quote",
        description: "Submit a quotation request for rice or refined cooking oils.",
      },
      {
        href: "/cookies",
        title: "Cookie policy",
        description: "How we use essential cookies and session tools.",
      },
      {
        href: "/terms",
        title: "Terms of use",
        description: "Rules for using this website and commercial information.",
      },
    ],
  },
  terms: {
    slug: "terms",
    title: "Terms of Use",
    description: `Terms governing use of the ${COMPANY_LEGAL_NAME} website.`,
    lastUpdated: "2026-08-06",
    intro: `These terms govern your use of ${COMPANY_WEBSITE}. The site provides company and product information for business buyers of refined edible cooking oils and rice.`,
    sections: [
      {
        heading: "Acceptance",
        paragraphs: [
          `By using ${COMPANY_WEBSITE}, you agree to these Terms of Use. If you do not agree, do not use the site.`,
          reviewNotice,
        ],
      },
      {
        heading: "Website purpose",
        paragraphs: [
          "This website provides company and product information for business buyers and a way to request quotations or register interest as a dealer or distributor. Content is for general commercial information and does not constitute a binding offer to sell.",
        ],
      },
      {
        heading: "Quotations and orders",
        paragraphs: [
          "Submitting a quotation request or application does not create a contract. Prices, availability, Incoterms, certifications, and shipment details are confirmed only in written commercial correspondence from us.",
          "Product specifications on the site may be updated without notice. Always confirm grade, packaging, and documents for a specific shipment with sales.",
        ],
      },
      {
        heading: "Accuracy and limitations",
        paragraphs: [
          "We aim to keep information accurate, but we do not warrant that the site is complete, current, or error-free. To the fullest extent permitted by law, we are not liable for decisions made solely on website content.",
        ],
      },
      {
        heading: "Intellectual property",
        paragraphs: [
          `Text, branding, images, and materials on this site are owned by ${COMPANY_LEGAL_NAME} or our licensors. You may not copy or redistribute them for commercial use without our written permission. Automated scraping or harvesting of content at scale without permission is prohibited.`,
        ],
      },
      {
        heading: "Acceptable use",
        paragraphs: [
          "You must not misuse the site (including attempting to disrupt security, scrape content at scale without permission, or submit false or abusive enquiries).",
        ],
      },
      {
        heading: "Governing law",
        paragraphs: [
          "These terms are governed by the laws of Thailand, without prejudice to mandatory consumer or local law rights that may apply to you.",
          `Contact: ${COMPANY_EMAIL}. Office: ${COMPANY_ADDRESS_SINGLE_LINE}.`,
        ],
      },
    ],
    relatedLinks: [
      {
        href: "/privacy",
        title: "Privacy policy",
        description: "How we handle enquiry and website data.",
      },
      {
        href: "/cookies",
        title: "Cookie policy",
        description: "Essential cookies and admin session tools.",
      },
      {
        href: "/contact",
        title: "Contact us",
        description: "Questions about these terms.",
      },
    ],
  },
  cookies: {
    slug: "cookies",
    title: "Cookie Policy",
    description: `How ${COMPANY_LEGAL_NAME} uses cookies and similar technologies on this website.`,
    lastUpdated: "2026-08-06",
    intro: "Cookies are small files stored on your device. Similar technologies may include local storage used by the site or hosting platform.",
    sections: [
      {
        heading: "Overview",
        paragraphs: [reviewNotice],
      },
      {
        heading: "What we use today",
        paragraphs: [
          "Essential cookies and session mechanisms are used to operate the public site and to keep administrators signed in to the private admin area (authentication session cookies).",
          "We do not currently run a third-party advertising cookie suite on this site. If we add analytics or marketing cookies later, this policy and any consent banner will be updated before those technologies are enabled.",
        ],
      },
      {
        heading: "Managing cookies",
        paragraphs: [
          "You can control cookies through your browser settings. Blocking essential cookies may prevent parts of the site (including admin login) from working.",
        ],
      },
      {
        heading: "Contact",
        paragraphs: [
          `Questions about cookies or privacy: ${COMPANY_EMAIL}. Office: ${COMPANY_ADDRESS_SINGLE_LINE}. See also our Privacy Policy.`,
        ],
      },
    ],
    relatedLinks: [
      {
        href: "/privacy",
        title: "Privacy policy",
        description: "Broader data practices for enquiries and the website.",
      },
      {
        href: "/contact",
        title: "Contact us",
        description: "Ask about cookies or privacy.",
      },
    ],
  },
};
