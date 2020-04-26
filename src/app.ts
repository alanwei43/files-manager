import express from "express";
import bodyParser from "body-parser";
import { Controller } from "./controllers";
import path from "path";

class App {
    public app: express.Application;
    public port: Number;

    constructor(controllers: Controller[], port: Number) {
        this.app = express();
        this.port = port;

        this.initializeMiddlewares();
        this.initializeControllers(controllers);
    }

    private initializeMiddlewares() {
        this.app.use(bodyParser.json({
            limit: "50mb"
        }));
        this.app.use(bodyParser.urlencoded({ extended: true }));
        this.app.use((req, res, next) => {
            if (req.path.startsWith("/api")) {
                next();
                return;
            }
            if (req.path.startsWith("/js") || req.path.startsWith("/css")) {
                res.sendFile(path.resolve(path.join("static", req.path)));
                return;
            }
            res.sendFile(path.resolve("static/index.html"));
        })
    }

    private initializeControllers(controllers: Controller[]) {
        controllers.forEach((controller) => {
            this.app.use('/', controller.router);
        });
    }

    public listen() {
        this.app.listen(this.port, () => {
            console.log(`App listening on the port ${this.port}`);
        });
    }
}

export default App;