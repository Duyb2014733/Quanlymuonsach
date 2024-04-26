<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <h2>Đăng ký độc giả mới</h2>
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <label for="MaDocGia">Mã độc giả</label>
            <input type="text" class="form-control" id="MaDocGia" v-model="formData.MaDocGia" required>
          </div>
          <div class="form-group">
            <label for="MatKhau">Mật khẩu</label>
            <input type="password" class="form-control" id="MatKhau" v-model="formData.MatKhau" required>
          </div>
          <div class="form-group">
            <label for="HoLot">Họ lót</label>
            <input type="text" class="form-control" id="HoLot" v-model="formData.HoLot" required>
          </div>
          <div class="form-group">
            <label for="Ten">Tên</label>
            <input type="text" class="form-control" id="Ten" v-model="formData.Ten" required>
          </div>
          <div class="form-group">
            <label for="NgaySinh">Ngày sinh</label>
            <input type="date" class="form-control" id="NgaySinh" v-model="formData.NgaySinh" required>
          </div>
          <div class="form-group">
            <label for="Phai">Giới tính</label>
            <select class="form-control" id="Phai" v-model="formData.Phai" required>
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
            </select>
          </div>
          <div class="form-group">
            <label for="DiaChi">Địa chỉ</label>
            <input type="text" class="form-control" id="DiaChi" v-model="formData.DiaChi" required>
          </div>
          <div class="form-group">
            <label for="DienThoai">Điện thoại</label>
            <input type="text" class="form-control" id="DienThoai" v-model="formData.DienThoai" required>
          </div>
          <button type="submit" class="btn btn-primary">Đăng ký</button>
          <div v-if="showNotification" class="alert alert-success mt-3 fade-in" role="alert">
            {{ notificationMessage }}
          </div>
        </form>
      </div>
    </div>

  </div>
</template>

<script>
import DocGiaService from "@/services/docGia.service";

export default {
  data() {
    return {
      formData: {
        MaDocGia: "",
        HoLot: "",
        Ten: "",
        NgaySinh: "",
        Phai: "Nam", // Giới tính mặc định là Nam
        DiaChi: "",
        DienThoai: "",
        showNotification: false,
        notificationMessage: ""
      }
    };
  },
  methods: {
    async submitForm() {
      try {
        const docgia = await DocGiaService.create(this.formData);
        localStorage.setItem('docgiaId', docgia._id);
        this.showNotification = true;
        this.notificationMessage = 'Đăng ký thành công!';
        setTimeout(() => {
          this.showNotification = false;
          // Chuyển trang sau khi ẩn thông báo
          this.$router.push({ name: 'home' });
        }, 2000);
      } catch (error) {
        console.error("Error submitting form:", error.message);
        // Xử lý lỗi khi đăng ký độc giả không thành công
      }
    }
  }

};
</script>

<style scoped>
/* Thêm CSS tùy chỉnh nếu cần */
</style>