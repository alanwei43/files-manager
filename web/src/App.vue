<template>
  <router-view />
</template>
<script>
import { getJSON, ShareStore } from "./lib";
export default {
  data() {
    return {
      share: ShareStore
    };
  },
  mounted() {
    getJSON("/api/config").then(config => {
      this.share.config = config;
      document.title = this.share.config.title;
    });
  }
};
</script>
