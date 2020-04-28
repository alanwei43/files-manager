# 文件管理系统

## Docker 运行

```bash
docker run -d -p 33022:8080 \
  -v $PWD/config.json:/app/dist/config/config.json \
  -v $PWD/files:/data \
  --name files-manager \
  alanway/files-manager:latest
```

```js
// config.json 文件
{
  "title": "文件管理系统", // 标题
  "clientRootPath": "/mock", //前端展示的路径
  "uploadFileSize": 50 // 最大文件上传限制, 单位 MB
}
```

访问 `localhost:33022/files-manager`

## NPM 使用

```bash
npm install @js-core/files-manager -g --registry=https://registry.npm.taobao.org
files-manager --port 8080 --base-dir ./
```