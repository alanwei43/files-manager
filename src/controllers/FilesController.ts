import express from "express";
import { Controller } from "./";
import { recursiveFiles } from "../services";
import path from "path";
import { getConfigurations } from "../config";
import fs from "fs";

export class FilesController implements Controller {
    public router: express.Router;
    private basePath: string;
    constructor(basePath?: string) {
        this.router = express.Router();
        this.basePath = basePath;
        this.initRouters()
    }
    initRouters() {
        this.router.get(`${this.basePath}/files`, (req, res) => {
            const rootPath = (req.query.path || __dirname) + "";
            this.listFiles(rootPath, res);
        });
        this.router.post(`${this.basePath}/files`, this.uploadFile);
        this.router.delete(`${this.basePath}/files`, this.deleteFile);
        this.router.get(`${this.basePath}/file`, this.downloadFile);
        this.router.post(`${this.basePath}/dir`, this.createDir);
        this.router.delete(`${this.basePath}/dir`, this.createDir);
    }
    listFiles(rootPath: string, response: express.Response) {
        const rootPathVal = path.resolve(path.join(getConfigurations().baseDir, rootPath));
        const files = recursiveFiles(rootPathVal, {
            recursive: false,
            dirFilter: info => info.path.indexOf("node_modules") === -1
        }).map(item => ({
            path: item.path,
            isDir: item.stat.isDirectory(),
            isFile: item.stat.isFile(),
            size: item.stat.size,
            name: path.basename(item.path),
            mtime: item.stat.mtime,
            ctime: item.stat.ctime
        })).sort((prev, next) => {
            if (prev.isDir && next.isFile) {
                return -1;
            }
            if (prev.isFile && next.isDir) {
                return 1;
            }
            return prev.name > next.name ? 1 : -1;
        });
        response.json({
            rootPath: rootPathVal,
            totalCount: files.length,
            files: files,
            parent: {
                path: path.dirname(rootPathVal),
                name: path.basename(path.dirname(rootPathVal))
            }
        });
    }
    uploadFile(req: express.Request, res: express.Response) {
        const fileName = req.body.name;
        const filePath = path.join(getConfigurations().baseDir, req.body.path, fileName),
            base64 = req.body.data;
        const buffer = Buffer.from(base64, 'base64');
        fs.writeFileSync(filePath, buffer, { encoding: "utf8", mode: 0o666 });
        res.json({
            success: true
        });
    }
    deleteFile(req: express.Request, res: express.Response) {
        const fileName = req.body.name;
        const filePath = path.join(getConfigurations().baseDir, req.body.path, fileName);
        fs.unlinkSync(filePath);
        return res.json({
            success: true
        });
    }
    downloadFile(req: express.Request, res: express.Response) {
        const fileName = (req.query.name || "") + "";
        const filePath = path.resolve(path.join(getConfigurations().baseDir, (req.query.path || "") + "", fileName));
        res.download(filePath, fileName);
    }
    createDir(req: express.Request, res: express.Response) {
        /**
         * {name: "dir_name", path: "/hello/world"}
         */
        const fullDirPath = path.join(getConfigurations().baseDir, req.body.path || "", req.body.name || "");
        if (req.method.toLowerCase() === "post") {
            fs.mkdirSync(fullDirPath, {
                recursive: true
            });
        }
        if (req.method.toLowerCase() === "delete") {
            fs.rmdirSync(fullDirPath);
        }
        res.json({
            success: true,
            result: {
                relDir: fullDirPath,
                absDir: path.resolve(fullDirPath),
            }
        });
    }
}