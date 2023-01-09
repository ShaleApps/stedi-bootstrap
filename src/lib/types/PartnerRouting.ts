import z from "zod";

const DestinationWebhookSchema = z.strictObject({
  type: z.literal("webhook"),
  url: z.string(),
});

const DestinationBucketSchema = z.strictObject({
  type: z.literal("bucket"),
  bucketName: z.string(),
  path: z.string(),
});

const DestinationSchema = z.strictObject({
  mappingId: z.string().optional(),
  destination: z.discriminatedUnion("type", [
    DestinationWebhookSchema,
    DestinationBucketSchema,
  ]),
});

export type Destination = z.infer<typeof DestinationSchema>;

export const PartnershipSchema = z.strictObject({
  applicationIds: z.record(z.string(), z.string()),
  transactionSets: z.array(
    z.strictObject({
      description: z.string().optional(),
      sendingPartnerId: z.string(),
      receivingPartnerId: z.string(),
      usageIndicatorCode: z.union([
        z.literal("P"),
        z.literal("T"),
        z.literal("I"),
      ]),
      guideIds: z.array(z.string()),
      destinations: z.array(DestinationSchema),
    })
  ),
});

export type Partnership = z.infer<typeof PartnershipSchema>;

export const ISAPartnerIdLookupSchema = z.strictObject({
  partnerId: z.string(),
});
export type ISAPartnerIdLookup = z.infer<typeof ISAPartnerIdLookupSchema>;