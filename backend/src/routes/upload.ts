import express from "express";
import multer from "multer";
import {deleteFromYandex, uploadToYandex} from "../yandexStorage";

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

// uploadRouter.delete('/delete-by-url', async (req, res) => {
//     try {
//         const {url} = req.body;
//
//         if (!url) {
//             return res.status(400).json({message: "URL is required"});
//         }
//
//         await deleteFromYandex(url);
//
//         res.json({message: "File deleted successfully", url});
//     } catch (e) {
//         console.error(e);
//         res.status(500).json({message: "Delete error"});
//     }
// })

export default uploadRouter;