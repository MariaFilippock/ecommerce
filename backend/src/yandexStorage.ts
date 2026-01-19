import {S3Client, PutObjectCommand} from "@aws-sdk/client-s3";
// import path from "path";
import dotenv from "dotenv";

if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

export const s3 = new S3Client({
    region: 'ru-central1',
    endpoint: 'https://storage.yandexcloud.net',
    credentials: {
        accessKeyId: process.env.YANDEX_ACCESS_KEY!,
        secretAccessKey: process.env.YANDEX_SECRET_KEY!
    }
});

export const uploadToYandex = async (fileBuffer: Buffer, fileName: string, mimeType: string): Promise<string> => {
    const bucket = process.env.YANDEX_BUCKET;
    const key = `temporary/${fileName}`;

    await s3.send(
        new PutObjectCommand({
            Bucket: bucket,
            Key: key,
            Body: fileBuffer,
            ContentType: mimeType,
            ACL: "public-read",
        })
    );

    return `https://storage.yandexcloud.net/${bucket}/${key}`;
};
