<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <h2 class="text-center mb-4">Đăng nhập độc giả</h2>
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <label for="MaDocGia">Mã độc giả</label>
            <input type="text" class="form-control" id="MaDocGia" v-model="formData.MaDocGia" required>
          </div>
          <div class="form-group">
            <label for="MatKhau">Mật khẩu</label>
            <input type="password" class="form-control" id="MatKhau" v-model="formData.MatKhau" required>
          </div>
          <button type="submit" class="btn btn-primary btn-block">Đăng nhập</button>
          <!-- Phần hiển thị thông báo -->
          <div v-if="showNotification" class="alert alert-success mt-3 fade-in" role="alert">
            {{ notificationMessage }}
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import DocGiaService from '@/services/docGia.service';

export default {
  data() {
    return {
      formData: {
        MaDocGia: "",
        MatKhau: ""
      },
      showNotification: false,
      notificationMessage: ""
    };
  },
  methods: {
    async submitForm() {
      try {
        const docgia = await this.loginReader(this.formData);
        localStorage.setItem('docgiaId', docgia._id);
        this.showNotification = true;
        this.notificationMessage = 'Đăng nhập thành công!';
        // Tắt thông báo sau 2 giây
        setTimeout(() => {
          this.showNotification = false;
          // Chuyển trang sau khi ẩn thông báo
          this.$router.push({ name: 'home' });
        }, 2000);
      } catch (error) {
        console.error("Error logging in:", error.message);
        // Hiển thị thông báo lỗi
        this.showNotification = true;
        this.notificationMessage = 'Đăng nhập không thành công. Mã độc giả hoặc mật khẩu không đúng.';
        // Tắt thông báo sau 2 giây
        setTimeout(() => {
          this.showNotification = false;
        }, 2000);
      }
    },
    async loginReader(formData) {
      const reader = await DocGiaService.getAll();
      const loggedInReader = reader.find(reader => {
        return reader.MaDocGia === formData.MaDocGia && reader.MatKhau === formData.MatKhau;
      });

      if (!loggedInReader) {
        throw new Error("Mã độc giả hoặc mật khẩu không đúng.");
      }

      return loggedInReader;
    },
  }
};
</script>

<style scoped>
/* Hiệu ứng khi hiển thị thông báo */
.fade-in {
  animation: fadeIn ease 1s;
}

@keyframes fadeIn {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
