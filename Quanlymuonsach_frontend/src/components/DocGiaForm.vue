<template>
    <Form @submit="submitForm">
        <div class="form-group">
            <label for="MaDocGia">Mã độc giả</label>
            <Field name="MaDocGia" type="text" class="form-control" v-model="readerData.MaDocGia" />
            <ErrorMessage name="MaDocGia" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="HoLot">Họ lót</label>
            <Field name="HoLot" type="text" class="form-control" v-model="readerData.HoLot" />
            <ErrorMessage name="HoLot" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="Ten">Tên</label>
            <Field name="Ten" type="text" class="form-control" v-model="readerData.Ten" />
            <ErrorMessage name="Ten" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="NgaySinh">Ngày sinh</label>
            <Field name="NgaySinh" type="date" class="form-control" v-model="readerData.NgaySinh" />
            <ErrorMessage name="NgaySinh" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="DiaChi">Địa chỉ</label>
            <Field name="DiaChi" type="text" class="form-control" v-model="readerData.DiaChi" />
            <ErrorMessage name="DiaChi" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="DienThoai">Điện thoại</label>
            <Field name="DienThoai" type="text" class="form-control" v-model="readerData.DienThoai" />
            <ErrorMessage name="DienThoai" class="error-feedback" />
        </div>
        <div class="form-group">
            <label>Giới tính</label>
            <div class="form-check">
                <input type="radio" id="male" class="form-check-input" value="Nam" v-model="readerData.Phai">
                <label for="male" class="form-check-label">Nam</label>
            </div>
            <div class="form-check">
                <input type="radio" id="female" class="form-check-input" value="Nữ" v-model="readerData.Phai">
                <label for="female" class="form-check-label">Nữ</label>
            </div>
            <ErrorMessage name="Phai" class="error-feedback" />
        </div>
        <button type="submit" class="btn btn-primary">{{ editing ? 'Cập nhật' : 'Thêm mới' }}</button>
        <button type="button" class="btn btn-secondary" @click="clearForm">Xóa</button>
    </Form>
</template>

<script>
import { ErrorMessage, Field, Form } from "vee-validate";
import * as yup from "yup";

export default {
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    props: {
        reader: {
            type: Object,
            default: null,
        },
        onSubmit: {
            type: Function,
            required: true
        }
    },
    data() {
        return {
            readerData: {
                MaDocGia: "",
                HoLot: "",
                Ten: "",
                NgaySinh: "",
                Phai: "",
                DiaChi: "",
                DienThoai: "",
            },
            formSchema: this.generateFormSchema(),
        };
    },
    mounted() {
        if (this.reader) {
            this.readerData = { ...this.reader };
        }
    },
    computed: {
        editing() {
            return this.reader !== null;
        },
    },
    methods: {
        submitForm() {
            this.$emit('submit:reader', this.readerData);
        },
        generateFormSchema() {
            return yup.object().shape({
                MaDocGia: yup.string().required("Mã độc giả là bắt buộc"),
                HoLot: yup.string().required("Họ lót là bắt buộc"),
                Ten: yup.string().required("Tên là bắt buộc"),
                NgaySinh: yup.date().required("Ngày sinh là bắt buộc"),
                Phai: yup.string().required("Giới tính là bắt buộc"),
                DiaChi: yup.string().required("Địa chỉ là bắt buộc"),
                DienThoai: yup.string().required("Điện thoại là bắt buộc"),
            });
        },
        clearForm() {
            this.readerData = {
                MaDocGia: "",
                HoLot: "",
                Ten: "",
                NgaySinh: "",
                Phai: "",
                DiaChi: "",
                DienThoai: "",
            };
            this.$emit('clear');
        },
    },
};
</script>

<style scoped>
.error-feedback {
    color: red;
}
</style>
