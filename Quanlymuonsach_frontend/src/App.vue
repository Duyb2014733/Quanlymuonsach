<script>
import AppHeader from "@/components/AppHeader.vue";
export default {
  components: {
    AppHeader,
  },
};
</script>

<template>
  <div class="container-fluid" id="app">
    <div class="row">
      <div class="col-sm-2 sidebar">
        <AppHeader />
      </div>

      <div class="col-sm-10 main">
        <router-view />
      </div>
    </div>
  </div>
</template>

<style>
.main {
    top: 5px;
    height: 100%;
    font-size: 20px;
    padding: 0px 5px;
    right: 5px;
    background-color: #fff;
}

.main .padding {
    border-radius: 5px;
}
</style>