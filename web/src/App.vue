<template>
  <div class="container-fluid">
    <div class="col-sm-12">
      <list-files />
    </div>
  </div>
</template>

<script>
import ListFiles from "./components/ListFiles.vue";

export default {
  name: "App",
  components: {
    "list-files": ListFiles
  }
};
</script>

