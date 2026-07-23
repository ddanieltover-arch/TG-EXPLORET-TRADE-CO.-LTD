import { z } from "zod";

export const quoteRequestSchema = z.object({
  companyName: z.string().trim().min(2).max(120),
  contactName: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(160),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  country: z.string().trim().min(2).max(80),
  productLabel: z.string().trim().min(2).max(160),
  quantityText: z.string().trim().min(1).max(120),
  destination: z.string().trim().min(2).max(160),
  incoterm: z.enum(["FOB", "CIF", "EXW", "CNF", "OTHER"]).optional(),
  targetDate: z.string().optional().or(z.literal("")),
  message: z.string().trim().max(5000).optional().or(z.literal("")),
  website: z.string().max(0).optional(), // honeypot
});

export type QuoteRequestInput = z.infer<typeof quoteRequestSchema>;
