import path from "path";
let BASE_DIR = path.resolve(process.env.BASE_DIR_PATH || "./");
export function updateBaseDirPath(newPath: string) {
    BASE_DIR = path.resolve(newPath);
    console.log("update base dir to ", BASE_DIR);
}

export function getBaseDirPath() {
    return BASE_DIR;
}