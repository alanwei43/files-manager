#! /usr/bin/env node

import App from "./app";
import { FilesController, ConfigController } from "./controllers";
import yargs from "yargs";
import { refreshConfigurations, getConfigurations } from "./config";
import path from "path";


const argv = yargs
    .option("port", {
        alias: "p",
        description: "端口号",
        type: "number",
        default: "8080"
    })
    .option("base-dir", {
        alias: "d",
        description: "文件管理的根目录",
        type: "string",
        default: "./"
    })
    .option("config-path", {
        alias: "c",
        description: "配置文件路径",
        type: "string",
        default: path.join(__dirname, "./config/config.json")
    })
    .version("0.0.4")
    .help()
    .alias('help', 'h').argv;

const c = getConfigurations();
if (typeof argv["base-dir"] === "string") {
    c.baseDir = path.resolve(argv["base-dir"]);
}
refreshConfigurations(argv["config-path"]);

const app = new App([
    new FilesController("/api"),
    new ConfigController("/api"),
], parseInt(argv.port));

console.log("[config] configuration is\n", JSON.stringify(getConfigurations(), null, "\t"))

app.listen();
