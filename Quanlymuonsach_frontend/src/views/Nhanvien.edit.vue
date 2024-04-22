<template>
    <div class="container">
      <h2 class="text-center mb-4">Sửa thông tin nhân viên</h2>
      <div class="row justify-content-center">
        <div class="col-md-6">
          <Form @submit="updateEmployee" :validation-schema="formSchema">
            <div class="form-group">
              <label for="MSNV">Mã số nhân viên</label>
              <Field name="MSNV" type="text" class="form-control" v-model="employee.MSNV" />
              <ErrorMessage name="MSNV" class="error-feedback" />
            </div>
            <div class="form-group">
              <label for="HoTenNV">Họ và tên nhân viên</label>
              <Field name="HoTenNV" type="text" class="form-control" v-model="employee.HoTenNV" />
              <ErrorMessage name="HoTenNV" class="error-feedback" />
            </div>
            <div class="form-group">
              <label for="Chucvu">Chức vụ</label>
              <Field name="Chucvu" type="text" class="form-control" v-model="employee.Chucvu" />
              <ErrorMessage name="Chucvu" class="error-feedback" />
            </div>
            <div class="form-group">
              <label for="DiaChi">Địa chỉ</label>
              <Field name="DiaChi" type="text" class="form-control" v-model="employee.Diachi" />
              <ErrorMessage name="DiaChi" class="error-feedback" />
            </div>
            <div class="form-group">
              <label for="SoDienThoai">Số điện thoại</label>
              <Field name="SoDienThoai" type="text" class="form-control" v-model="employee.SoDienThoai" />
              <ErrorMessage name="SoDienThoai" class="error-feedback" />
            </div>
            <div class="form-group">
              <button type="submit" class="btn btn-primary">Cập nhật</button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import NhanViensService from "@/services/nhanVien.service";
import { ErrorMessage, Field, Form } from "vee-validate";
import * as yup from "yup";
  
  export default {
    components: {
      Form,
      Field,
      ErrorMessage,
    },
    data() {
      return {
        employee: {
          MSNV: "",
          HoTenNV: "",
          Chucvu: "",
          Diachi: "",
          SoDienThoai: "",
        },
        formSchema: this.generateFormSchema(),
      };
    },
    async mounted() {
      try {
        // Load thông tin nhân viên từ service hoặc API
        const userId = localStorage.getItem('userId');
        const employee = await NhanViensService.get(userId);
        // Gán giá trị của employee vào data để hiển thị trong form
        this.employee = employee;
      } catch (error) {
        console.error("Đã xảy ra lỗi khi lấy thông tin nhân viên:", error.message);
      }
    },
    methods: {
      generateFormSchema() {
        return yup.object().shape({
          MSNV: yup.string().required("Mã số nhân viên là bắt buộc"),
          HoTenNV: yup.string().required("Họ và tên là bắt buộc"),
          Chucvu: yup.string().required("Chức vụ là bắt buộc"),
          Diachi: yup.string().required("Địa chỉ là bắt buộc"),
          SoDienThoai: yup.string().required("Số điện thoại là bắt buộc"),
        });
      },
      async updateEmployee() {
        try {
          // Gửi thông tin nhân viên cập nhật đến API
          await NhanViensService.update(this.employee);
          alert("Thông tin nhân viên đã được cập nhật thành công.");
          // Chuyển hướng hoặc thực hiện các thao tác khác sau khi cập nhật thành công
        } catch (error) {
          console.error("Lỗi khi cập nhật thông tin nhân viên:", error);
          alert("Đã xảy ra lỗi khi cập nhật thông tin nhân viên.");
        }
      }
    }
  };
  </script>
  
  <style scoped>
  .error-feedback {
    color: red;
  }
  </style>
  