import { ObjectCannedACL } from "@aws-sdk/client-s3";

interface EnvironmentConfig {
  DO_SPACES_REGION: string;
  DO_SPACES_ENDPOINT: string;
  DO_SPACES_ACCESS_KEY_ID: string;
  DO_SPACES_SECRET_ACCESS_KEY: string;
  DO_SPACES_BUCKET: string;
  DO_SPACES_OWNER_ID: string;
}

// ACL guard
const validACLs: ObjectCannedACL[] = [
  "private",
  "public-read",
  "public-read-write",
  "aws-exec-read",
  "authenticated-read",
  "bucket-owner-read",
  "bucket-owner-full-control",
];
function isValidACL(acl: string | undefined): acl is ObjectCannedACL {
  return acl !== undefined && validACLs.includes(acl as ObjectCannedACL);
}

export { isValidACL };
export type { EnvironmentConfig };
