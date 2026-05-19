import {
  ObjectCannedACL,
  PutObjectCommand,
  S3ServiceException,
} from "@aws-sdk/client-s3";
import "dotenv/config";
import * as fs from "fs";
import * as path from "path";
import { getBucketName } from "./config";
import { createS3Client } from "./s3-client";
import { isValidACL } from "./types";

const s3Client = createS3Client();
const BUCKET_NAME: string = getBucketName();

/**
 * @param localFilePath - local path to the file
 * @param destinationPath - destination path in the bucket
 * @param ACL - privacy of the file
 */
async function uploadFile(
  localFilePath: string,
  destinationPath: string,
  ACL: ObjectCannedACL,
): Promise<void> {
  try {
    if (!localFilePath || !destinationPath) {
      console.error(
        "Usage: ts-node upload.ts <local-file-path> <destination-path>",
      );
      console.error(
        "Example: ts-node upload.ts ./myfile.txt folder/myfile.txt",
      );
      process.exit(1);
    }

    if (!fs.existsSync(localFilePath)) {
      console.error(`Error: File not found: ${localFilePath}`);
      process.exit(1);
    }

    const stats: fs.Stats = fs.statSync(localFilePath);
    if (stats.isDirectory()) {
      console.error(`Error: Path is a directory, not a file: ${localFilePath}`);
      process.exit(1);
    }

    const fileStream = fs.createReadStream(localFilePath);
    const fileName = path.basename(localFilePath);

    console.log(`Uploading ${fileName} to ${destinationPath}...`);

    const putObjectCommand = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: destinationPath,
      Body: fileStream,
      ACL,
    });

    try {
      const response = await s3Client.send(putObjectCommand);
      const accessUrl = `https://${BUCKET_NAME}.${process.env.DO_SPACES_REGION}.digitaloceanspaces.com/${destinationPath}`;
      console.log("Upload successful!");
      console.log("Raw data:", response);
      console.log(`File URL: ${accessUrl}`);
      console.log(`ETag: ${response.ETag}`);
    } catch (caught) {
      if (
        caught instanceof S3ServiceException &&
        caught.name === "EntityTooLarge"
      ) {
        console.error(
          `Error from S3 while uploading object to ${BUCKET_NAME}. \
The object was too large. To upload objects larger than 5GB, use the S3 console (160GB max) \
or the multipart upload API (5TB max).`,
        );
      } else if (caught instanceof S3ServiceException) {
        console.error(
          `Error from S3 while uploading object to ${BUCKET_NAME}.  ${caught.name}: ${caught.message}`,
        );
      } else {
        throw caught;
      }
    }
  } catch (error) {
    console.error("Upload failed:", (error as Error).message);
    process.exit(1);
  }
}

const [, , localFilePath]: string[] = process.argv;

const ACLArg = process.argv[4];
const ACL: ObjectCannedACL = isValidACL(ACLArg) ? ACLArg : "private";
if (!isValidACL(ACLArg)) {
  console.log("ACL was not valid. Fallback to 'private'.");
}

let destinationPath = process.argv[3];
if (process.env.DO_SPACES_ROOT_FOLDER) {
  destinationPath = `${process.env.DO_SPACES_ROOT_FOLDER}/${destinationPath}`;
}

uploadFile(localFilePath, destinationPath, ACL);
