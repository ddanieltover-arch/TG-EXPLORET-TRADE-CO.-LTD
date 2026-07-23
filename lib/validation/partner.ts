import { z } from "zod";

export const partnerApplicationSchema = z.object({
  companyName: z.string().trim().min(2).max(120),
  contactName: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(160),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  country: z.string().trim().min(2).max(80),
  marketsServed: z.string().trim().max(500).optional().or(z.literal("")),
  message: z.string().trim().max(5000).optional().or(z.literal("")),
  website: z.string().max(0).optional(),
});

export type PartnerApplicationInput = z.infer<typeof partnerApplicationSchema>;
