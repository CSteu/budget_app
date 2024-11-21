<template>
  <div class="app-container">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App",
};
</script>

<style>
.app-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
  margin: 0;
  background-color: #f5f7fa;
}
</style>
