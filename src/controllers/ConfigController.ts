import express from "express";
import { Controller } from "./";
import { getBaseDirPath } from "../config";
import Config from "../config/config.json";
import path from "path";

export class ConfigController implements Controller {
    public router: express.Router;
    private basePath: string;
    constructor(basePath?: string) {
        this.router = express.Router();
        this.basePath = basePath;
        this.initRouters()
    }
    initRouters() {
        this.router.get(`${this.basePath}/config`, (req, res) => {
            if (Config.pathSeperator === null) {
                Config.pathSeperator = path.sep;
            }
            if (Config.sysRootPath === null) {
                Config.sysRootPath = getBaseDirPath();
            }
            res.json(Config);
        });
    }
}