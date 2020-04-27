<template>
  <div>
    <ol class="breadcrumb" v-if="share.config.title">
      <li>
        <a href="javascript:void(0)">{{share.config.title}}</a>
      </li>
    </ol>
    <div class="container-fluid" style="margin-top: 1em;">
      <div class="panel panel-default">
        <div class="panel-heading">拖拽/选择文件上传</div>
        <div class="panel-body">
          <file-upload :path="route.path" @upload-success="onUploadSuccess" />
        </div>
      </div>
      <div class="panel panel-primary">
        <div class="panel-heading">文件管理</div>
        <div class="panel-body">
          <div class="col-row">
            <div class="col-sm-4 col-xs-12">
              <div class="input-group input-group-sm">
                <input type="text" class="form-control" placeholder="请输入目录名称" v-model="vm.dirName" />
                <span class="input-group-btn">
                  <button class="btn btn-default" type="button" @click="doCreateDir">创建目录</button>
                </span>
              </div>
            </div>
          </div>
        </div>

        <table class="table table-bordered">
          <thead>
            <tr>
              <th>名称</th>
              <th>路径</th>
              <th>信息</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody>
            <file-item
              v-for="item in files.data"
              :key="item.path || item.name"
              :item="item"
              :path="route.path"
              @delete-file="onDeleteFile"
            />
          </tbody>
          <tfoot>
            <tr>
              <td colspan="4">
                <span style="padding-right: 10px; font-size: 12px">
                  文件数量:
                  <mark>{{fileTotalCount}}</mark>
                </span>
                <span style="padding-right: 10px; font-size: 12px">
                  总大小:
                  <mark>{{fileTotalSize}}</mark>
                </span>
              </td>
            </tr>
          </tfoot>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import {
  getRandomStr,
  getFiles,
  createDir,
  ShareStore,
  humanSize
} from "../lib";
import FileItem from "../components/FileItem";
import FileUpload from "../components/FileUpload";

export default {
  data() {
    return {
      share: ShareStore,
      files: {
        data: [],
        totalCount: null,
        totalSize: 0
      },
      vm: {
        dirName: ""
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
      this.files.totalSize = 0;
      getFiles(routePath).then(res => {
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
            this.files.totalSize += item.size || 0;
            return item;
          });
        this.files.totalCount = res.totalCount;
        if (typeof this.route.parent === "string") {
          const randomKey = getRandomStr();

          this.files.data.unshift({
            isParent: true,
            isDir: true,
            isFile: false,
            link:
              (decodeURIComponent(location.pathname) + randomKey).replace(
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
      if (this.files.data.filter(f => f.name === file.name).length) {
        return;
      }
      this.files.data.push(file);
    },
    doCreateDir() {
      const name = this.vm.dirName;
      createDir(this.route.path, name).then(response => {
        if (response.success) {
          window.location.reload();
        }
      });
    }
  },
  computed: {
    fileTotalCount() {
      return this.files.data.filter(item => item.isFile).length;
    },
    fileTotalSize() {
      const totalSize = this.files.data.reduce(
        (prev, next) => prev + (next.size || 0),
        0
      );
      const result = humanSize(totalSize);

      return result.size + result.unit;
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