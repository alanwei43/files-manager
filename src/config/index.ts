import path from "path";
import fs from "fs";


const targetConfig: any = {
    title: "文件管理系统",
    uploadFileSize: 50, // 上传文件限制, 单位 MB
    clientRootPath: "/mock", // 前端展示的根目录
    runRootPath: path.resolve("./"),
    pathSeperator: path.sep,
    baseDir: path.resolve("./"), //资源管理根目录
    editorAddress: ""
};
const proxyConfig: any = new Proxy(targetConfig, {
    set: function (target, prop: any, val: any) {
        console.log(`[config] update ${prop} to ${val}`)
        target[prop] = val;
        return true;
    }
});

export function refreshConfigurations(configPath: string) {
    if (typeof configPath === "string") {
        const config: any = JSON.parse(fs.readFileSync(configPath, { encoding: "utf8" }).toString());
        Object.keys(config).forEach(key => {
            if (proxyConfig[key] === config[key]) {
                return;
            }
            proxyConfig[key] = config[key];
        });
    }
}

export function getConfigurations(): {
    title: string,
    clientRootPath: string,
    uploadFileSize: number,
    runRootPath: string,
    pathSeperator: string,
    baseDir: string
} {
    return proxyConfig;
}