import App from "./app";
import { FilesController } from "./controllers";

const app = new App([
    new FilesController("/api")
], parseInt(process.env.PORT) || 3005);

app.listen();
