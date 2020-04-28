import express from "express";
import bodyParser from "body-parser";
import { Controller } from "./controllers";
import path from "path";
import Config from "./config/config.json";

class App {
    public app: express.Application;
    public port: Number;

    constructor(controllers: Controller[], port: Number) {
        this.app = express();
        this.port = port;

        this.initializeMiddlewares();
        this.initializeControllers(controllers);
        this.handlerError();
    }

    private handlerError() {
        this.app.use(function (err: any, req: any, res: any, next: any) {
            console.error(err.stack)
            res.status(500).json({
                success: false,
                message: err.message
            });
        });
    }
    private initializeMiddlewares() {
        this.app.use(bodyParser.json({
            limit: (Config.uploadFileSize || "50") + "mb"
        }));
        this.app.use(bodyParser.urlencoded({ extended: true }));
        const staticDir = path.resolve(path.join(__dirname, "../static"));
        console.log("web app dir:", staticDir);
        this.app.use((req, res, next) => {
            if (req.path.startsWith("/api")) {
                next();
                return;
            }
            if (req.path.startsWith("/js") || req.path.startsWith("/resources")) {
                res.sendFile(path.join(staticDir, req.path));
                return;
            }
            res.sendFile(path.join(staticDir, "index.html"));
        });
    }

    private initializeControllers(controllers: Controller[]) {
        controllers.forEach((controller) => {
            this.app.use('/', controller.router);
        });
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on the port ${this.port}, access by http://localhost:${this.port}/files-manager `);
        });
    }
}

export default App;