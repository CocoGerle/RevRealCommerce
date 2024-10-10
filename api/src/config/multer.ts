import Multer, { memoryStorage } from "multer";

const storage = memoryStorage();

export const upload = Multer({
  storage,
});
