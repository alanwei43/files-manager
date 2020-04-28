import express from "express";
import { Controller } from "./";
import { getConfigurations } from "../config";

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
            res.json(getConfigurations());
        });
    }
}