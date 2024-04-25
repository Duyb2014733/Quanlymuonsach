<template>
    <div class="container">
        <h2 class="text-center mb-4">Đăng ký tài khoản</h2>
        <div class="row justify-content-center">
            <div class="col-md-6">
                <Form @submit="submitForm" :validation-schema="formSchema">
                    <div class="form-group">
                        <label for="registerMSNV">Mã số nhân viên</label>
                        <Field name="registerMSNV" type="text" class="form-control"
                            v-model="registerData.MSNV" />
                        <ErrorMessage name="registerMSNV" class="error-feedback" />
                    </div>
                    <div class="form-group">
                        <label for="registerHoTenNV">Họ và tên nhân viên</label>
                        <Field name="registerHoTenNV" type="text" class="form-control" v-model="registerData.HoTenNV" />
                        <ErrorMessage name="registerHoTenNV" class="error-feedback" />
                    </div>
                    <div class="form-group">
                        <label for="registerPassword">Mật khẩu</label>
                        <Field name="registerPassword" type="password" class="form-control" v-model="registerData.Password" />
                        <ErrorMessage name="registerPassword" class="error-feedback" />
                    </div>
                    <div class="form-group">
                        <label for="registerChucvu">Chức vụ</label>
                        <Field name="registerChucvu" type="text" class="form-control"
                            v-model="registerData.Chucvu" />
                        <ErrorMessage name="registerChucvu" class="error-feedback" />
                    </div>
                    <div class="form-group">
                        <label for="registerDiaChi">Địa chỉ</label>
                        <Field name="registerDiaChi" type="text" class="form-control" v-model="registerData.Diachi" />
                        <ErrorMessage name="registerDiaChi" class="error-feedback" />
                    </div>
                    <div class="form-group">
                        <label for="registerSoDienThoai">Số điện thoại</label>
                        <Field name="registerSoDienThoai" type="text" class="form-control"
                            v-model="registerData.SoDienThoai" />
                        <ErrorMessage name="registerSoDienThoai" class="error-feedback" />
                    </div>
                    <div class="form-group">
                        <button type="submit" class="btn btn-primary">Đăng ký</button>
                        <router-link :to="{ name: 'nhanvien.dangnhap_admin' }" class="ml-2 btn btn-secondary">Đăng
                            nhập</router-link>
                    </div>
                </Form>
            </div>
        </div>
    </div>
</template>

<script>
import TaiKhoansService from "@/services/nhanVien.service";
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
            registerData: {
                MSNV: "",
                HoTenNV: "",
                Password: "",
                Chucvu: "",
                Diachi: "",
                SoDienThoai: "",
            },
            formSchema: this.generateFormSchema(),
        };
    },
    methods: {
        generateFormSchema() {
            return yup.object().shape({
                registerMSNV: yup.string().required("Mã số nhân viên là bắt buộc"),
                registerHoTenNV: yup.string().required("Họ và tên là bắt buộc"),
                registerPassword: yup.string().min(6, "Mật khẩu phải chứa ít nhất 6 ký tự").required("Mật khẩu là bắt buộc"),
                registerChucvu: yup.string().required("Chức vụ là bắt buộc"),
                registerDiaChi: yup.string().required("Địa chỉ là bắt buộc"),
                registerSoDienThoai: yup.string().matches(
                    /((09|03|07|08|05)+([0-9]{8})\b)/g,
                    "Số điện thoại không hợp lệ"
                ).required("Số điện thoại là bắt buộc"),
            });
        },
        async submitForm() {
            try {
                const payload = {
                    MSNV: this.registerData.MSNV,
                    HoTenNV: this.registerData.HoTenNV,
                    Password: this.registerData.Password,
                    Chucvu: this.registerData.Chucvu,
                    Diachi: this.registerData.Diachi,
                    SoDienThoai: this.registerData.SoDienThoai,
                };

                await this.registerUser(payload);
                // Chuyển hướng đến trang booking sau khi đăng ký thành công
                // this.$router.push({ name: 'home_admin' });
            } catch (error) {
                console.error("Đã xảy ra lỗi khi đăng ký:", error.message);
            }
        },
        async registerUser(payload) {
            const response = await TaiKhoansService.create(payload);
            console.log("Phản hồi từ server:", response);
        },
    },
};
</script>

<style scoped>
.error-feedback {
    color: red;
}
</style>
