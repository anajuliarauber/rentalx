import fs from "fs"

export const deleteFile = async (filename: string) => {
  // verify if the file exists
  try {
    await fs.promises.stat(filename)
  } catch {
    return
  }

  // remove file
  await fs.promises.unlink(filename)

}