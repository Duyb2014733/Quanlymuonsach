<template>
    <div class="container">
      <h2 class="text-center mb-4">Thông tin nhân viên</h2>
      <div class="row justify-content-center">
        <div class="col-md-6">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">{{ employee.HoTenNV }}</h5>
              <p class="card-text"><strong>Mã số nhân viên:</strong> {{ employee.MSNV }}</p>
              <p class="card-text"><strong>Chức vụ:</strong> {{ employee.Chucvu }}</p>
              <p class="card-text"><strong>Địa chỉ:</strong> {{ employee.Diachi }}</p>
              <p class="card-text"><strong>Số điện thoại:</strong> {{ employee.SoDienThoai }}</p>
              <router-link v-if="employee._id" :to="{ name: 'nhanvien.suathongtinnhanvien', params: { id: employee._id }}" class="btn btn-primary">Sửa thông tin</router-link>


            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import NhanViensService from "@/services/nhanVien.service";
  
  export default {
    data() {
      return {
        employee: {}
      };
    },
    async mounted() {
      try {
        // Lấy thông tin nhân viên từ service hoặc API
        const userId = localStorage.getItem('userId');
        const employee = await NhanViensService.get(userId);
        this.employee = employee;
      } catch (error) {
        console.error("Đã xảy ra lỗi khi lấy thông tin nhân viên:", error.message);
      }
    }
  };
  </script>
  
  <style scoped>
  /* Các quy tắc CSS cho mẫu mã này có thể được thêm vào đây nếu cần */
  </style>
  