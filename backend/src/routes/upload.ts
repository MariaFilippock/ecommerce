import express from "express";
import multer from "multer";
import {uploadToYandex} from "../yandexStorage";

const uploadRouter = express.Router();
const storage = multer.memoryStorage();
const upload = multer({storage});

uploadRouter.post('/upload', upload.single("file"), async (req, res) => {
    const file = req.file;
    try {
        if (!file || !file.buffer || !file.originalname || !file.mimetype) {
            // выбрасываем, если чего-то нет
            throw new Error("Файл не загружен или повреждён");
        }
        const ext = file.originalname.substring(file.originalname.lastIndexOf("."));
        const base = file.originalname
            .substring(0, file.originalname.lastIndexOf("."))
            .replace(/\s+/g, "_")
            .replace(/[^\w-]/g, "");

        const fileName = `${base}-${Date.now()}${ext}`;

        const url = await uploadToYandex(file.buffer, fileName, file.mimetype);
        res.json({url});
    } catch (e) {
        console.error(e);
        res.status(500).json({message: "Upload error"});
    }
});

export default uploadRouter;