import { S3Client } from "@aws-sdk/client-s3";
import { getS3Config, validateEnvironment } from "./config";

export function createS3Client(): S3Client {
  validateEnvironment();
  const config = getS3Config();
  return new S3Client(config);
}
