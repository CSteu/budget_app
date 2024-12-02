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
  margin: 0;
  color: #34495e;
}
</style>
