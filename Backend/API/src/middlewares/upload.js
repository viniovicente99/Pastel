import multer from 'multer';
import { Upload } from "@aws-sdk/lib-storage";
import { s3 } from "../s3/s3.js"; 


const storage = multer.memoryStorage();
const upload = multer({ storage });

export const uploadToS3 = async (file) => {
    const upload = new Upload({
        client: s3,
        params: {
            Bucket: "pastel-app", 
            Key: `${Date.now()}-${file.originalname}`,
            Body: file.buffer,
        },
    });

    const result = await upload.done();
    return result.Location; 
};

export default upload;
