<template>
  <tr :title="item.name">
    <template v-if="item.isParent">
      <td colspan="3">
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
        <button class="btn btn-danger btn-xs" @click="doDeleteFile(item)">删除</button> &nbsp;
        <a
          v-if="downloadLink"
          class="btn btn-default btn-xs"
          target="blank"
          :href="downloadLink"
        >下载</a> &nbsp;
      </td>
    </template>
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
      if (item.isDir) {
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