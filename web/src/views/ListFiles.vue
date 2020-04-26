<template>
  <div>
    <ol>
      <li v-for="(item, $index) in files.data" :key="item.path">
        <router-link :to="item.link" v-if="item.isDir">{{item.name}}</router-link>
        <span v-if="item.isFile">{{item.name}}</span> &nbsp;
        <button v-if="item.isFile" class="btn btn-warning btn-xs" @click="deleteFile(item, $index)">Delete</button> &nbsp; 
        <a
          v-if="item.downloadLink"
          class="btn btn-default btn-xs"
          target="blank"
          :href="item.downloadLink"
        >Download</a>
      </li>
    </ol>
    <div id="drag">
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
  </div>
</template>
<script>
import { readFileToBase64, getRandomStr } from "../lib/utils";
import { request, getJSON, postJSON } from "../lib/api";

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
        path: undefined
      },
      status: {
        process: []
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
        this.files.data = res.files.map(item => {
          item.link = `${location.pathname}/${item.name}`;
          if (item.isFile) {
            item.downloadLink = `/api/file?name=${encodeURIComponent(
              item.name
            )}&path=${encodeURIComponent(this.route.path)}`;
          }
          return item;
        });
        if (typeof routePath === "string" && routePath !== "/") {
          this.files.data.unshift({
            isDir: true,
            isFile: false,
            link: res.parent.name,
            name: ".."
          });
        }
      });
    },
    onRouteChange() {
      this.route.path = this.$route.params.pathMatch || "/";
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
    deleteFile(item) {
      request("DELETE", "/api/files", null, {
        name: item.name,
        path: this.route.path
      }).then(res => {
        if (res.success) {
          const index = this.files.data.indexOf(item);
          this.files.data.splice(index, 1);
        }
      });
    }
  },
  watch: {
    $route: "onRouteChange"
  }
};
</script>