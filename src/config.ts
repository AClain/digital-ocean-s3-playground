import { S3ClientConfig } from "@aws-sdk/client-s3";
import type { EnvironmentConfig } from "./types";

export function getS3Config(): S3ClientConfig {
  return {
    region: process.env.DO_SPACES_REGION as string,
    endpoint: process.env.DO_SPACES_ENDPOINT as string,
    forcePathStyle: false,
    credentials: {
      accessKeyId: process.env.DO_SPACES_ACCESS_KEY_ID as string,
      secretAccessKey: process.env.DO_SPACES_SECRET_ACCESS_KEY as string,
    },
  };
}

export function getBucketName(): string {
  return process.env.DO_SPACES_BUCKET as string;
}

export function validateEnvironment(): void {
  const required: Array<keyof EnvironmentConfig> = [
    "DO_SPACES_ACCESS_KEY_ID",
    "DO_SPACES_SECRET_ACCESS_KEY",
    "DO_SPACES_BUCKET",
    "DO_SPACES_REGION",
    "DO_SPACES_ENDPOINT",
  ];

  const missing: string[] = required.filter((key) => !process.env[key]);

  if (missing.length > 0) {
    console.error("Error: Missing required environment variables:");
    missing.forEach((key) => console.error(`  - ${key}`));
    console.error(
      "\nPlease set these variables in your .env file or environment.",
    );
    process.exit(1);
  }
}
