import { writeFile, mkdir, access } from "fs/promises";
import { NextRequest, NextResponse } from "next/server";
import path from "path";
import os from "os";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const files = formData.getAll("files");

    // Create path to myfolder on desktop
    const uploadDir = path.join(process.env.IMG_PATH!, "img");

    // Create upload directory if it doesn't exist with full permissions
    try {
      await mkdir(uploadDir, { recursive: true, mode: 0o777 });
    } catch (error) {
      console.error("Error creating directory:", error);
    }

    const savedFiles = [];

    for (const file of files) {
      try {
        const buffer = Buffer.from(await (file as File).arrayBuffer());
        const fileName = (file as File).name;

        // Generate unique filename
        const uniqueFileName = await generateUniqueFileName(
          uploadDir,
          fileName
        );
        const filePath = path.join(uploadDir, uniqueFileName);

        // Save the file with explicit permissions
        await writeFile(filePath, new Uint8Array(buffer), { mode: 0o666 });

        savedFiles.push({
          originalName: fileName,
          savedName: uniqueFileName,
          path: filePath,
        });
      } catch (fileError) {
        throw fileError;
      }
    }

    return NextResponse.json({
      success: true,
      files: savedFiles,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: "Failed to upload files",
        details: error,
      },
      { status: 500 }
    );
  }
}

async function generateUniqueFileName(
  dir: string,
  originalName: string
): Promise<string> {
  const ext = path.extname(originalName);
  const nameWithoutExt = path.basename(originalName, ext);
  let finalName = originalName;
  let counter = 0;

  while (true) {
    try {
      const filePath = path.join(dir, finalName);
      await access(filePath);
      // File exists, try next number
      counter++;
      finalName = `${nameWithoutExt}(${counter})${ext}`;
    } catch {
      // File doesn't exist, we can use this name
      break;
    }
  }

  return finalName;
}
