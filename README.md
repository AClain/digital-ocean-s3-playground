# DigitalOcean S3 Playground (Javascript SDK)

This project provides TypeScript scripts to interact with DigitalOcean Spaces

## Setup

### Install dependencies

```bash
npm install
```

### Dependencies

| Name                            | Description                                     |
| ------------------------------- | ----------------------------------------------- |
| `@aws-sdk/client-s3`            | Create a client (connection) to AWS S3 services |
| `@aws-sdk/s3-request-presigner` | Allows to generate presigned URL for given path |

### Environment variables

Copy `.env.example` into a `.env` file or export these variables

```bash
export DO_SPACES_ACCESS_KEY_ID=<access-key>
export DO_SPACES_SECRET_ACCESS_KEY=<secret-access-key>
export DO_SPACES_BUCKET=<bucket>
export DO_SPACES_REGION=<region>
export DO_SPACES_ENDPOINT=<endpoint>
# optional
export DO_SPACES_ROOT_FOLDER=<root-folder>
```

## Scripts usage

### Upload file

Upload a local file to the DigitalOcean Space

```bash
npm run dev -- src/upload.ts <path-to-local-file> <desired-path-to-file-in-bucket>
```

Upload a local file with a specific privacy (ACL)

```bash
npm run dev -- src/upload.ts <path-to-local-file> <desired-path-to-file-in-bucket> <ACL>
npm run dev -- src/upload.ts <path-to-local-file> <desired-path-to-file-in-bucket> public-read
```

Get a presigned url for a given path

```bash
npm run dev -- src/getSignedUrl.ts <path-to-file-in-bucket>
```

## Available commands

| Command                         | Description           |
| ------------------------------- | --------------------- |
| `npm run dev -- <path-to-file>` | Run file with ts-node |

## Environment variables

| Variable                      | Description                        |
| ----------------------------- | ---------------------------------- |
| `DO_SPACES_ACCESS_KEY_ID`     | DigitalOcean Spaces access key     |
| `DO_SPACES_SECRET_ACCESS_KEY` | DigitalOcean Spaces secret key     |
| `DO_SPACES_BUCKET`            | Bucket name                        |
| `DO_SPACES_REGION`            | Region                             |
| `DO_SPACES_ENDPOINT`          | Endpoint URL                       |
| `DO_SPACES_ROOT_FOLDER`       | (optional) Base bucket folder path |

# Sources

- [S3Client API](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/s3/)
- [Presigned URL](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/Package/-aws-sdk-s3-presigned-post/)
- [PutObjectCommand](https://docs.aws.amazon.com/AWSJavaScriptSDK/v3/latest/client/s3/command/PutObjectCommand/)
