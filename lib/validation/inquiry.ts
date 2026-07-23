import { z } from "zod";

export const inquirySchema = z.object({
  companyName: z.string().trim().max(120).optional().or(z.literal("")),
  contactName: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(160),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  country: z.string().trim().max(80).optional().or(z.literal("")),
  message: z.string().trim().min(10).max(5000),
  website: z.string().max(0).optional(),
});

export type InquiryInput = z.infer<typeof inquirySchema>;
