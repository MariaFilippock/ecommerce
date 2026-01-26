import {S3Client, PutObjectCommand, DeleteObjectCommand, DeleteObjectCommandOutput} from "@aws-sdk/client-s3";
import dotenv from "dotenv";

if (process.env.NODE_ENV !== "production") {
    dotenv.config();
}

export const s3 = new S3Client({
    region: process.env.YANDEX_REGION,
    endpoint: process.env.YANDEX_ENDPOINT,
    credentials: {
        accessKeyId: process.env.YANDEX_ACCESS_KEY!,
        secretAccessKey: process.env.YANDEX_SECRET_KEY!
    }
});

const bucket = process.env.YANDEX_BUCKET;

export const uploadToYandex = async (fileBuffer: Buffer, fileName: string, mimeType: string): Promise<string> => {
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

export const deleteFromYandex = (urls: string[]): Promise<DeleteObjectCommandOutput[]> => {
    const requests = urls.map(url => {
        const key = url.split(`${bucket}/`)[1];

        return s3.send(
            new DeleteObjectCommand({
                Bucket: bucket,
                Key: key,
            })
        );
    });
    
    return Promise.all(requests);
};