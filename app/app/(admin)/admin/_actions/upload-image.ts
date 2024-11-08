"use server";
import { writeFile } from "fs/promises";
import path from "path";

export default async function uploadImage(formData: FormData) {
  try {
    const file = formData.get("file");
    if (!file) {
      throw new Error("No file uploaded");
    }

    const bytes = await (file as File).arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Save to public folder as Whalel.png
    const filePath = path.join(process.cwd(), "public", "Whalel.png");
    await writeFile(filePath, new Uint8Array(buffer));

    return {
      data: "Successfully uploaded image",
      error: null,
    };
  } catch (error) {
    console.error("Error saving image:", error);
    return {
      data: null,
      error: "Failed to save image",
    };
  }
}
