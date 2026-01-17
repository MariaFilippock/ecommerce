import AWS from 'aws-sdk'; //для работы с Object Storage

const s3 = new AWS.S3({
    endpoint: process.env.YANDEX_ENDPOINT,
    region: process.env.YANDEX_REGION,
    accessKeyId: process.env.YANDEX_ACCESS_KEY,
    secretAccessKey: process.env.YANDEX_SECRET_KEY,
    signatureVersion: "v4",
});

