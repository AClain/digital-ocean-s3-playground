import { GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl as S3GetSignedUrl } from "@aws-sdk/s3-request-presigner";
import "dotenv/config";
import { getBucketName } from "./config";
import { createS3Client } from "./s3-client";

const s3Client = createS3Client();
const BUCKET_NAME: string = getBucketName();

/**
 * @param path - bucket file path
 */
async function getSignedUrl(path: string) {
  const command = new GetObjectCommand({
    Bucket: BUCKET_NAME,
    Key: path,
  });
  const url = await S3GetSignedUrl(s3Client, command, { expiresIn: 3600 });

  console.log(`Presigned URL: ${url}`);
}

let [, , path]: string[] = process.argv;

getSignedUrl(path);
