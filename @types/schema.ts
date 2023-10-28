import { z } from "zod";

const EmptySchema = z.object({});

export type EmptyObject = typeof EmptySchema;
