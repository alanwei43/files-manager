import path from "path";
import fs from "fs";

export interface FileInfo {
    path: string,
    stat: fs.Stats
}

export function recursiveFiles(baseDir: string, options: { recursive?: boolean, dirFilter?: (info: FileInfo) => boolean, depth?: number }): Array<FileInfo> {
    if (typeof options !== "object") {
        options = {};
    }
    if (typeof options.recursive !== "boolean") {
        options.recursive = true;
    }
    if (typeof options.dirFilter !== "function") {
        options.dirFilter = () => true;
    }
    if (typeof options.depth !== "number") {
        options.depth = -1;
    }
    try {
        const files = fs.readdirSync(baseDir)
            .map(f => path.join(baseDir, f))
            .map(f => ({
                stat: fs.statSync(f),
                path: path.resolve(f)
            }));

        if (options.recursive) {
            const children = files.filter(f => f.stat.isDirectory())
                .filter(options.dirFilter)
                .reduce((prev, next) => prev.concat(recursiveFiles(next.path, options)), []);
            return files.filter(f => f.stat.isFile()).concat(children);
        }
        return files;
    } catch (err) {
        return [];
    }
}