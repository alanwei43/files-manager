<template>
  <div>
    <input type="file" @change="selectFile" multiple />
    <div class="small" v-for="process in status.process" :key="process.key" v-show="process.show" :class="{'text-info': process.load === 'loading', 'text-success': process.load === 'success', 'text-danger': process.load === 'fail'}">
      <mark>{{process.name}}</mark>
      <span v-if="process.load === 'loading'">正在上传</span>
      <span v-if="process.load === 'fail'">上传失败 {{process.error}}</span>
      <span v-if="process.load === 'success'">上传成功</span>
    </div>
  </div>
</template>
<script>
import { readFileToBase64, getRandomStr, postJSON } from "../lib";
export default {
  props: {
    path: {
      required: true
    }
  },
  data() {
    return {
      config: {
        randomName: false
      },
      status: {
        process: [],
        onDraging: false
      }
    };
  },
  mounted() {
    this.initDrag();
  },
  methods: {
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
        path: this.path,
        load: "loading",
        error: undefined,
        show: true
      };
      this.status.process.push(processInfo);
      readFileToBase64(file)
        .then(data =>
          postJSON("/api/files", {
            name: fileName,
            path: this.path,
            data: data
          })
        )
        .then(res => {
          if (res.success) {
            processInfo.load = "success";
            this.$emit("upload-success", {
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
            status === "success" ? 2000 : 5000
          );
        });
    },
    initDrag() {
      const ele = document.documentElement;
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
    }
  }
};
</script>