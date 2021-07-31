import ffmpeg from "fluent-ffmpeg";

export const resolutionConverter = (
  filename: any,
  outputDirectory: string,
  outputFileName: string
) => {
  const basename = (str: any) => {
    let base = new String(str).substring(str.lastIndexOf("/") + 1);
    if (base.lastIndexOf(".") != -1) {
      base = base.substring(0, base.lastIndexOf("."));
    }
    return base;
  };
  const baseName = basename(filename);
  ffmpeg(`${outputDirectory}${filename}`)
    .output(`${outputFileName}/480p${baseName}.mp4`)
    .videoCodec("libx264")
    .size("640x480")
    .format("mp4")

    .output(`${outputFileName}/720p${baseName}.mp4`)
    .videoCodec("libx264")
    .size("1280x720")
    .format("mp4")

    .on("error", (err: any) => {
      console.log("An error occured:" + err.message);
    })
    .on("progress", (progress: any) => {
      console.log("Frames..." + progress.frames);
    })
    .on("end", () => {
      console.log("Finished Procressing");
    })
    .run();
};
