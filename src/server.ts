import App from "./app";
import { FilesController } from "./controllers";
import yargs from "yargs";
import { updateBaseDirPath } from "./config";


const argv = yargs
    .option("port", {
        alias: "p",
        description: "监听端口号",
        type: "number",
        default: "8080"
    })
    .option("base-dir", {
        alias: "d",
        description: "文件管理的根目录",
        type: "string",
        default: "./"
    })
    .help()
    .alias('help', 'h').argv;

updateBaseDirPath(argv["base-dir"]);

const app = new App([
    new FilesController("/api"),
], parseInt(argv.port));

app.listen();
