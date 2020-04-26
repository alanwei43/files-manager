<template>
  <li>
    <router-link :to="item.link" v-if="item.isDir">{{item.name}}</router-link>
    <span v-if="item.isFile">{{item.name}}</span> &nbsp;
    <button
      v-if="item.isFile"
      class="btn btn-warning btn-xs"
      @click="deleteFile(item)"
    >Delete</button> &nbsp;
    <a
      v-if="downloadLink"
      class="btn btn-default btn-xs"
      target="blank"
      :href="downloadLink"
    >Download</a>
  </li>
</template>
<script>
import { request } from "../lib/api";
export default {
  props: {
    item: {
      required: true
    },
    path: {
      required: true
    }
  },
  methods: {
    deleteFile(item) {
      request("DELETE", "/api/files", null, {
        name: this.item.name,
        path: this.path
      }).then(res => {
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
    }
  }
};
</script>