<template>
  <div>
    <input type="file" @change="selectFile" multiple />
    <hr v-if="status.showedAlertCounts" />
    <alert ref="Alert" style="width: auto; display: inline-block" @showed-alerts="alerts => status.showedAlertCounts = alerts.length" />
  </div>
</template>
<script>
import { readFileToBase64, getRandomStr, postJSON, ShareStore } from "../lib";
import Alert from "./Alert";

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
        showedAlertCounts: 0,
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
      const size = file.size / 1024 / 1024;
      if (size > ShareStore.config.uploadFileSize) {
        this.$refs.Alert.alert({
          html: `<b>${file.name}</b> 文件超出最大限制 ${ShareStore.config.uploadFileSize}MB`,
          type: "danger",
          closeable: true
        });
        return;
      }
      let fileName = file.name;
      if (this.config.randomName) {
        const ext = file.name.split(".").slice(-1);
        fileName = getRandomStr() + "." + ext;
      }

      const alert = this.$refs.Alert.alert({
        html: `<b>${fileName}</b> 正在上传`,
        type: "info"
      });

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
            throw new Error(res.message || "upload_fail");
          }
        })
        .catch(err => {
          return err.message;
        })
        .then(status => {
          if (status === "success") {
            alert.type = "success";
            alert.html = `<b>${fileName}</b> 上传成功`;
            setTimeout(function() {
              alert.show = false;
            }, 2 * 1000);
          } else {
            alert.type = "danger";
            alert.html = `<b>${fileName}</b> 上传失败: ${status}`;
            alert.closeable = true;
          }
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
  },
  components: {
    alert: Alert
  }
};
</script>