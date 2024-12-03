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
  font-family: "TT Norms-bold", "TT Norms", "TT Norms-fallback", proxima-nova, "Helvetica Neue", Verdana, Arial, Helvetica, sans-serif;
}
</style>
