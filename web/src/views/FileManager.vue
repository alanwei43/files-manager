<template>
  <div id="drag">
    <div>
      <input type="file" @change="selectFile" multiple />
    </div>
    <div>
      <div v-for="process in status.process" :key="process.key" v-show="process.show">
        <b>{{process.name}}</b>
        <span v-if="process.load === 'loading'">正在上传</span>
        <span v-if="process.load === 'fail'">上传失败 {{process.error}}</span>
        <span v-if="process.load === 'success'">上传成功</span>
      </div>
    </div>
    <ol>
      <file-item
        v-for="item in files.data"
        :key="item.path || item.name"
        :item="item"
        :path="route.path"
        @delete-file="onDeleteFile"
      />
    </ol>
  </div>
</template>
<script>
import { readFileToBase64, getRandomStr } from "../lib/utils";
import { getJSON, postJSON } from "../lib/api";
import FileItem from "../components/FileItem";

export default {
  data() {
    return {
      config: {
        randomName: false
      },
      files: {
        data: []
      },
      route: {
        path: undefined,
        parent: undefined
      },
      status: {
        process: [],
        onDraging: false
      }
    };
  },
  mounted() {
    this.loadFiles();
    this.onRouteChange();
    this.initDrag();
  },
  methods: {
    loadFiles() {
      if (!this.route.path) {
        return;
      }
      const routePath = this.route.path;
      getJSON("/api/files", { path: routePath }).then(res => {
        if (routePath !== this.route.path) {
          return;
        }
        this.files.data = res.files
          .map(item => ({
            ctime: item.ctime,
            isDir: item.isDir,
            isFile: item.isFile,
            mtime: item.mtime,
            name: item.name,
            path: item.path,
            size: item.size
          }))
          .map(item => {
            item.link = `${location.pathname}/${item.name}`;
            if (item.isFile) {
              item.downloadLink = `/api/file?name=${encodeURIComponent(
                item.name
              )}&path=${encodeURIComponent(this.route.path)}`;
            }
            return item;
          });
        if (typeof this.route.parent === "string") {
          const randomKey = getRandomStr();

          this.files.data.unshift({
            isDir: true,
            isFile: false,
            link:
              (location.pathname + randomKey).replace(
                this.route.path + randomKey,
                ""
              ) + this.route.parent,
            name: ".."
          });
        }
      });
    },
    onRouteChange() {
      this.route.path = this.$route.params.pathMatch || "/";
      if (typeof this.route.path === "string" && this.route.path !== "/") {
        this.route.parent =
          this.route.path
            .split("/")
            .slice(0, -1)
            .join("/") || "/";
      } else {
        this.route.parent = undefined;
      }
      this.loadFiles();
    },
    selectFile(event) {
      const files = event.target.files || [];
      files.forEach(f => this.uploadFile(f));
    },
    uploadFile(file) {
      let fileName = file.name;
      if (this.config.randomName) {
        const ext = file.name.split(".").slice(-1);
        fileName = getRandomStr() + "." + ext;
      }

      const processInfo = {
        key: getRandomStr(),
        name: file.name,
        path: this.route.path,
        load: "loading",
        error: undefined,
        show: true
      };
      this.status.process.push(processInfo);
      readFileToBase64(file)
        .then(data =>
          postJSON("/api/files", {
            name: fileName,
            path: this.route.path,
            data: data
          })
        )
        .then(res => {
          if (res.success) {
            processInfo.load = "success";
            this.files.data.push({
              ctime: new Date().toJSON(),
              isDir: false,
              isFile: true,
              mtime: new Date().toJSON(),
              name: fileName,
              path: undefined,
              size: file.size
            });
            return "success";
          } else {
            throw new Error("upload_fail");
          }
        })
        .catch(err => {
          processInfo.load = "fail";
          processInfo.error = err.message || err;
          return "fail";
        })
        .then(status => {
          setTimeout(
            () => (processInfo.show = false),
            status === "success" ? 3000 : 5000
          );
        });
    },
    initDrag() {
      const ele = document.querySelector("#drag");
      ["dragenter", "dragover", "dragleave", "drop"].forEach(eventName => {
        ele.addEventListener(
          eventName,
          e => {
            e.preventDefault();
            e.stopPropagation();
          },
          false
        );
      });
      ["dragenter", "dragover"].forEach(eventName => {
        ele.addEventListener(
          eventName,
          () => (this.status.onDraging = true),
          false
        );
      });
      ["dragleave", "drop"].forEach(eventName => {
        ele.addEventListener(
          eventName,
          () => (this.status.onDraging = false),
          false
        );
      });
      ele.addEventListener(
        "drop",
        event => {
          const files = event.dataTransfer.files || [];
          files.forEach(f => this.uploadFile(f));
        },
        false
      );
    },
    onDeleteFile(item) {
      const index = this.files.data.indexOf(item);
      this.files.data.splice(index, 1);
    }
  },
  components: {
    "file-item": FileItem
  },
  watch: {
    $route: "onRouteChange"
  }
};
</script>