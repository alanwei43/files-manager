import express from "express";
import { Controller } from "./controllers";
import { recursiveFiles } from "../services";
import path from "path";
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
    }
    listFiles(rootPath: string, response: express.Response) {
        const files = recursiveFiles(rootPath, {
            recursive: false,
            dirFilter: info => info.path.indexOf("node_modules") === -1
        }).map(item => ({
            path: item.path,
            isDir: item.stat.isDirectory(),
            isFile: item.stat.isFile(),
            size: item.stat.size,
            fileName: path.basename(item.path),
            mtime: item.stat.mtime,
            ctime: item.stat.ctime
        }));
        response.json({
            root: rootPath,
            totalCount: files.length,
            files: files
        });
    }
    uploadFile(dirPath: string, fileName: string, fileData: string, response: express.Response) {
    }
    deleteFile(fileFullPath: string) {
    }
}