<template>
    <div class="container">
        <h2 class="text-center mb-4">Đăng nhập</h2>
        <div class="row justify-content-center">
            <div class="col-md-6">
                <Form @submit="submitForm" :validation-schema="formSchema">
                    <div class="form-group">
                        <label for="MSNV">Mã số nhân viên</label>
                        <Field name="MSNV" type="text" class="form-control"
                            v-model="loginData.MSNV" />
                        <ErrorMessage name="MSNV" class="error-feedback" />
                    </div>
                    <div class="form-group">
                        <label for="Password">Mật khẩu</label>
                        <Field name="Password" type="password" class="form-control" v-model="loginData.Password" />
                        <ErrorMessage name="Password" class="error-feedback" />
                    </div>
                    <div class="form-group">
                        <button type="submit" class="btn btn-primary">Đăng nhập</button>
                        <router-link :to="{ name: 'nhanvien.dangky_admin' }" class="ml-2 btn btn-secondary">Đăng ký</router-link>
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
            loginData: {
                MSNV: "",
                Password: "",
            },
            formSchema: this.generateFormSchema(),
        };
    },
    methods: {
        generateFormSchema() {
            return yup.object().shape({
                MSNV: yup.string().required("Mã số nhân viên là bắt buộc"),
                Password: yup.string().required("Mật khẩu là bắt buộc"),
            });
        },
        async submitForm() {
            try {
                const user = await this.loginUser(this.loginData);
                localStorage.setItem('userId', user._id);
                // Chuyển hướng đến trang sau khi đăng nhập thành công
                // this.$router.push({ name: 'home_admin' });
                alert('Đăng nhập thành công!')
            } catch (error) {
                console.error("Đã xảy ra lỗi khi đăng nhập:", error.message);
            }
        },
        async loginUser(loginData) {
            const users = await NhanViensService.getAll();
            const loggedInUser = users.find(user => {
                return user.MSNV === loginData.MSNV && user.Password === loginData.Password;
            });

            if (!loggedInUser) {
                throw new Error("Tên đăng nhập hoặc mật khẩu không đúng.");
            }

            return loggedInUser;
        },
    },
};
</script>

<style scoped>
.error-feedback {
    color: red;
}
</style>
