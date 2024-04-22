<template>
    <form @submit.prevent="submitForm">
        <div class="form-group">
            <label for="MaNXB">Mã nhà xuất bản</label>
            <input type="text" class="form-control" v-model="formData.MaNXB" />
            <ErrorMessage name="MaNXB" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="TenNXB">Tên nhà xuất bản</label>
            <input type="text" class="form-control" v-model="formData.TenNXB" />
            <ErrorMessage name="TenNXB" class="error-feedback" />
        </div>
        <div class="form-group">
            <label for="DiaChi">Địa chỉ</label>
            <input type="text" class="form-control" v-model="formData.DiaChi" />
            <ErrorMessage name="DiaChi" class="error-feedback" />
        </div>
        <button type="submit" class="btn btn-primary">{{ publisher ? 'Cập nhật' : 'Thêm mới' }}</button>
        <button type="button" v-if="publisher" class="btn btn-danger" @click="deletePublisher">Xóa</button>
    </form>
</template>

<script>
import { ErrorMessage } from 'vee-validate';
import * as yup from 'yup';

export default {
    props: {
        publisher: {
            type: Object,
            default: null
        }
    },
    data() {
        return {
            formData: {
                MaNXB: '',
                TenNXB: '',
                DiaChi: ''
            },
            formSchema: this.generateFormSchema(),
        };
    },
    mounted() {
        if (this.publisher) {
            this.formData = { ...this.publisher };
        }
    },
    methods: {
        submitForm() {
            this.$emit('submit:publisher', this.formData);
        },
        deletePublisher() {
            this.$emit('delete:publisher');
        },
        generateFormSchema() {
            return yup.object().shape({
                MaNXB: yup.string().required("Mã số nhà xuất bản là bắt buộc"),
                TenNXB: yup.string().required("Tên NXB là bắt buộc"),
                DiaChi: yup.string().required("Địa chỉ là bắt buộc"),
            });
        },
    }
};
</script>
