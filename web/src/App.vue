<template>
  <div id="app">
    <router-view />
  </div>
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
    getJSON("/resources/config.json").then(config => {
      this.share.config = config;
      document.title = this.share.config.title;
    });
  }
};
</script>
