<template>
  <tr :title="item.name">
    <template v-if="item.isParent">
      <td colspan="4">
        <router-link :to="item.link" class="small">{{item.name}}</router-link>
      </td>
    </template>
    <template v-if="!item.isParent">
      <td>
        <router-link
          :to="item.link"
          v-if="item.isDir"
          class="text-ellipsis"
          style="max-width: 200px;"
        >{{item.name}}</router-link>
        <span class="text-ellipsis" style="max-width: 200px;" v-if="item.isFile">{{item.name}}</span>
      </td>
      <td>
        <code v-if="fileAddress">{{fileAddress}}</code>
      </td>
      <td>
        <span
          class="small text-info"
          v-if="item.isFile"
          title="大小 / 修改时间"
        >{{item.size | showSize}} &nbsp; / &nbsp; {{item.mtime | showDate}}</span>
      </td>
      <td>
        <button
          class="btn btn-danger btn-sm"
          @click="doDeleteFile(item)"
          :title="`删除文件 ${item.name}`"
        >删除</button> &nbsp;
        <a
          v-if="downloadLink"
          class="btn btn-default btn-sm"
          target="blank"
          :href="downloadLink"
          :title="`下载文件 ${item.name}`"
        >下载</a> &nbsp;
      </td>
    </template>
  </tr>
</template>
<script>
import {
  ShareStore,
  combinePath,
  deleteFile,
  deleteDir,
  humanSize
} from "../lib";
import { parseJSON, format } from "date-fns";

export default {
  props: {
    item: {
      required: true
    },
    path: {
      required: true
    }
  },
  data() {
    return {};
  },
  methods: {
    doDeleteFile(item) {
      let fn = deleteFile;
      if (item.isDir) {
        fn = deleteDir;
      }
      fn(this.path, this.item.name).then(res => {
        if (res.success) {
          this.$emit("delete-file", item);
        } else {
          this.$emit("alert", {
            html: `<b>${this.item.name}</b> 删除失败: ${res.message}`,
            type: "danger",
            closeable: true,
            time: 5 * 1000
          });
        }
      });
    }
  },
  filters: {
    showSize(size) {
      return humanSize(size).size + humanSize(size).unit;
    },
    showDate(date) {
      if (typeof date === "string") {
        return format(parseJSON(date), "yyyy-MM-dd HH:mm:ss").toString();
      }
      return "";
    }
  },
  computed: {
    downloadLink() {
      if (this.item.isFile) {
        return `/api/file?name=${encodeURIComponent(
          this.item.name
        )}&path=${encodeURIComponent(this.path)}`;
      }
      return undefined;
    },
    fileAddress() {
      if (this.item.isParent) {
        return "";
      }
      return combinePath(
        ShareStore.config.pathSeperator,
        ShareStore.config.clientRootPath,
        this.path,
        this.item.name
      );
    }
  }
};
</script>