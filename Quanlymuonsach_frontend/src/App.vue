<script>
import AppHeader_admin from "@/components/AppHeader_admin.vue";
import AppHeader_docgia from "@/components/AppHeader_docgia.vue";

export default {
  components: {
    AppHeader_admin,
    AppHeader_docgia
  },
  data() {
    return {
      hasUserId: false,
      hasDocgiaId: false
    };
  },
  created() {
    // Kiểm tra xem có userId được lưu trong localStorage hay không
    const userId = window.localStorage.getItem('userId');
    if (userId) {
      this.hasUserId = true;
    }

    // Kiểm tra xem có docgiaId được lưu trong localStorage hay không
    const docgiaId = window.localStorage.getItem('docgiaId');
    if (docgiaId) {
      this.hasDocgiaId = true;
    }
  }
};
</script>

<template>
  <div class="container-fluid" id="app">
    <div class="row">
      <div class="col-sm-2 sidebar">
        <!-- Kiểm tra xem có userId hay docgiaId được lưu không -->
        <template v-if="hasUserId">
          <AppHeader_admin />
        </template>
        <template v-else-if="hasDocgiaId">
          <AppHeader_docgia />
        </template>
        <template v-else>
          <AppHeader_docgia />
        </template>
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
    right: 5px;
    background-color: #fff;
    margin-left: 250px;
    padding: 20px;
}

.main .padding {
    border-radius: 5px;
}
</style>
