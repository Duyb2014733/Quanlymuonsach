<template>
    <Form @submit="submitForm">
        <div class="form-group">
            <label for="MaSach">Mã sách</label>
            <Field name="MaSach" type="text" class="form-control" v-model="bookData.MaSach" />
            <ErrorMessage name="MaSach" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="TenSach">Tên sách</label>
            <Field name="TenSach" type="text" class="form-control" v-model="bookData.TenSach" />
            <ErrorMessage name="TenSach" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="TacGia">Tác giả</label>
            <Field name="TacGia" type="text" class="form-control" v-model="bookData.TacGia" />
            <ErrorMessage name="TacGia" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="MaNXB">Mã xuất bản</label>
            <select name="MaNXB" class="form-control" v-model="bookData.MaNXB">
                <option v-for="publisher in publishers" :key="publisher._id" :value="publisher.MaNXB">{{ publisher.MaNXB }}</option>
            </select>
            <ErrorMessage name="MaNXB" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="DonGia">Đơn giá</label>
            <Field name="DonGia" type="text" class="form-control" v-model="bookData.DonGia" />
            <ErrorMessage name="DonGia" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="SoQuyen">Số quyển</label>
            <Field name="SoQuyen" type="text" class="form-control" v-model="bookData.SoQuyen" />
            <ErrorMessage name="SoQuyen" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="NamXuatBan">Năm xuất bản</label>
            <Field name="NamXuatBan" type="text" class="form-control" v-model="bookData.NamXuatBan" />
            <ErrorMessage name="NamXuatBan" class="error-feedback" />
        </div>
        <button type="submit" class="btn btn-primary">{{ editing ? 'Cập nhật' : 'Thêm mới' }}</button>
        <button type="button" class="btn btn-secondary" @click="clearForm">Xóa</button>
    </Form>
</template>

<script>
import NhaXuatBanService from "@/services/nhaXuatBan.service";
import { ErrorMessage, Field, Form } from "vee-validate"; // Import VeeValidate components
import * as yup from "yup"; // Import Yup for validation

export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    props: {
        book: {
            type: Object,
            default: null,
        },
    },
    data() {
        return {
            bookData: {
                MaSach: "",
                TenSach: "",
                TacGia: "",
                MaNXB: "", // Update this line
                DonGia: "",
                SoQuyen: "",
                NamXuatBan: "",
            },
            formSchema: this.generateFormSchema(),
            publishers: [],
        };
    },
    mounted() {
        if (this.book) {
            this.bookData = { ...this.book };
        }
        this.loadPublishers();
    },
    computed: {
        editing() {
            return this.book !== null;
        },
    },
    methods: {
        submitForm() {
            this.$emit('submit:book', this.bookData);
        },
        async loadPublishers() {
            try {
                this.publishers = await NhaXuatBanService.getAll();
            } catch (error) {
                console.error("Failed to load publishers:", error.message);
            }
        },
        generateFormSchema() {
            return yup.object().shape({
                MaSach: yup.string().required("Mã sách là bắt buộc"),
                TenSach: yup.string().required("Tên sách là bắt buộc"),
                TacGia: yup.string().required("Tác giả là bắt buộc"),
                MaNXB: yup.string().required("Nhà xuất bản là bắt buộc"), // Update this line
                DonGia: yup.number().required("Đơn giá là bắt buộc"),
                SoQuyen: yup.number().required("Số quyển là bắt buộc"),
                NamXuatBan: yup.number().required("Năm xuất bản là bắt buộc"),
            });
        },
        clearForm() {
            this.bookData = {
                MaSach: "",
                TenSach: "",
                TacGia: "",
                MaNXB: "", // Update this line
                DonGia: "",
                SoQuyen: "",
                NamXuatBan: "",
            };
            this.$emit("clear");
        },
    },
    
};
</script>
<style scoped>
  .error-feedback {
    color: red;
  }
</style>
