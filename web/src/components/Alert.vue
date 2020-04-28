<template>
  <div>
    <div
      v-for="item in alerts"
      :key="item.id"
      class="alert"
      v-show="item.show"
      :class="{
        'alert-warning': item.type === 'warning',
        'alert-success': item.type === 'success',
        'alert-info': item.type === 'info',
        'alert-danger': item.type === 'danger',
        'alert-dismissible': item.closeable,
        }"
    >
      <button type="button" class="close" v-if="item.closeable" @click="item.show = false">
        <span>&times;</span>
      </button>
      <div style="display: inline-block" v-if="item.html" v-html="item.html"></div>
      <div style="display: inline-block" v-if="item.content">{{item.content}}</div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      alerts: [
        {
          id: "例子",
          show: false, // 是否显示
          html:
            "<strong>Warning!</strong> Better check yourself, you're not looking too good.", //展示 html 内容
          content: "hello world", // 展示的 消息内容
          type: "success", // info, warning, danger
          closeable: true // 是否可以关闭
        }
      ]
    };
  },
  methods: {
    alert({ html, content, type, closeable, time }) {
      const item = {
        id: Date.now() + Math.random(),
        html: html,
        content: content,
        type: type || "success",
        closeable: typeof closeable === "boolean" ? closeable : false,
        show: true
      };
      this.alerts.push(item);
      if (time) {
        setTimeout(function() {
          item.show = false;
        }, time);
      }
      return item;
    }
  },
  computed: {
    showedAlerts() {
      return this.alerts.filter(a => a.show);
    }
  },
  watch: {
    showedAlerts: {
      handler() {
        this.$emit("showed-alerts", this.showedAlerts);
      },
      immediate: true
    }
  }
};
</script>