<template>
  <div>
    <file-upload :path="route.path" @upload-success="onUploadSuccess" />
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
import { getRandomStr, getJSON } from "../lib";
import FileItem from "../components/FileItem";
import FileUpload from "../components/FileUpload";

export default {
  data() {
    return {
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
            name: "上一级目录"
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
    onDeleteFile(item) {
      const index = this.files.data.indexOf(item);
      this.files.data.splice(index, 1);
    },
    onUploadSuccess(file) {
      this.files.data.push(file);
    }
  },
  components: {
    "file-item": FileItem,
    "file-upload": FileUpload
  },
  watch: {
    $route: "onRouteChange"
  }
};
</script>