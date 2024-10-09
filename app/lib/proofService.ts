// app/lib/proofService.ts
import { storage } from "./appwrite";

const bucketId = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID;

if (!bucketId) {
  throw new Error("Appwrite bucket ID must be defined in .env.local");
}

export const uploadProof = async (file: File) => {
  try {
    const response = await storage.createFile(bucketId, "unique()", file);
    return response;
  } catch (error) {
    console.error("Error uploading proof:", error);
    throw error; // Optional: rethrow the error if you want to handle it higher up
  }
};

export const getProofURL = (fileId: string) => {
  return storage.getFilePreview(bucketId, fileId);
};
