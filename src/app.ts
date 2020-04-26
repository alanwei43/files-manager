import express from "express";
import bodyParser from "body-parser";
import { promises as fs } from "fs";
import { sep } from "path";

const app = express();
const PORT: Number = 8002

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", express.static(`${__dirname}/www`));

app.all("/gitlab", (req, res) => {
    const logPath = `${__dirname}${sep}www${sep}${Date.now()}.log`;
    fs.writeFile(logPath, JSON.stringify(req.body)).then(value => {
        res.send(`${logPath}: Write okay`);
    }, error => {
        res.send(`${logPath}: Write failed: ${error}`);
    });
});

app.listen(PORT, () => {
    console.log(`listen ${PORT}`);
});