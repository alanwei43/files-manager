<template>
  <tr>
    <td>
      <router-link :to="item.link" v-if="item.isDir">{{item.name}}</router-link>
      <span v-if="item.isFile">{{item.name}}</span> &nbsp;
    </td>
    <td>
      <code v-if="fileAddress">{{fileAddress}}</code>
    </td>
    <td>
      <button v-if="!item.isParent" class="btn btn-warning btn-xs" @click="doDeleteFile(item)">删除</button> &nbsp;
      <a
        v-if="downloadLink"
        class="btn btn-default btn-xs"
        target="blank"
        :href="downloadLink"
      >下载</a> &nbsp;
      <!-- <span v-if="item.isFile" class="btn btn-default btn-xs">打开</span> -->
    </td>
  </tr>
</template>
<script>
import { ShareStore, combinePath, deleteFile, deleteDir } from "../lib";
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
  mounted() {},
  methods: {
    doDeleteFile(item) {
      let fn = deleteFile;
      if(item.isDir){
        fn = deleteDir;
      }
      fn(this.path, this.item.name).then(res => {
        if (res.success) {
          this.$emit("delete-file", item);
        }
      });
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