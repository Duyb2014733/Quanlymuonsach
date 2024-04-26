<template>
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <h2>Quản lý sách</h2>
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
                            <option v-for="publisher in publishers" :key="publisher._id" :value="publisher.MaNXB">{{
                    publisher.MaNXB }}</option>
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
                <BookForm @submit="submitForm" />
            </div>
        </div>

        <!-- List of books -->
        <div class="row justify-content-center mt-5">
            <div class="col-md-8">
                <h2>Danh sách sách</h2>
                <table class="table">
                    <thead class="thead-dark">
                        <tr>
                            <th scope="col">Mã sách</th>
                            <th scope="col">Tên sách</th>
                            <th scope="col">Tác giả</th>
                            <th scope="col">Mã NXB</th>
                            <th scope="col">Đơn giá</th>
                            <th scope="col">Số quyển</th>
                            <th scope="col">Năm xuất bản</th>
                            <th scope="col">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="book in books" :key="book._id">
                            <td>{{ book.MaSach }}</td>
                            <td>{{ book.TenSach }}</td>
                            <td>{{ book.TacGia }}</td>
                            <td>{{ book.MaNXB }}</td>
                            <td>{{ book.DonGia }}</td>
                            <td>{{ book.SoQuyen }}</td>
                            <td>{{ book.NamXuatBan }}</td>
                            <td>
                                <router-link :to="{ name: 'sach.edit', params: { id: book._id } }"
                                    class="btn btn-primary"><i class="fa-solid fa-pen-to-square"></i></router-link>
                                <button @click="deleteBook(book._id)" class="btn btn-danger"><i
                                        class="fa-solid fa-delete-left"></i></button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

    </div>
</template>

<script>
import NhaXuatBanService from "@/services/nhaXuatBan.service";
import SachService from "@/services/sach.service";
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
            editbooking: null,
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
            books: [],
        };
    },
    props: {
        book: {
            type: Object,
            default: null,
        },
    },
    methods: {
        async loadPublishers() {
            try {
                this.publishers = await NhaXuatBanService.getAll();
            } catch (error) {
                console.error("Failed to load publishers:", error.message);
            }
        },
        async submitForm(bookData) {
            try {
                if (this.editbooking) {
                    await SachService.update(this.editbooking._id, bookData);
                } else {
                    await SachService.create(bookData);
                }
                this.clearForm();
                this.loadBooks();
            } catch (error) {
                console.error("Error:", error.message);
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
        async deleteBook(id) {
            if (confirm("Bạn có chắc muốn xóa sách này không?")) {
                try {
                    await SachService.delete(id);
                    this.loadBooks();
                } catch (error) {
                    console.error("Error deleting book:", error.message);
                }
            }

        },
        clearForm() {
            this.editbooking = null;
        },
        async loadBooks() {
            try {
                this.books = await SachService.getAll();
            } catch (error) {
                console.error("Error loading books:", error.message);
            }
        },
    },
    async mounted() {
        this.loadBooks();
        this.loadPublishers();
    },
};
</script>

<style scoped>
.error-feedback {
    color: red;
}

/* CSS cho tiêu đề */
h2 {
    color: #333;
    /* Màu chữ */
    margin-bottom: 20px;
    /* Khoảng cách dưới */
}

/* CSS cho bảng */
.table {
    width: 100%;
    border-collapse: collapse;
}

.table th,
.table td {
    padding: 12px;
    text-align: left;
}


.table tbody tr:nth-child(even) {
    background-color: #f9f9f9;
    /* Màu nền của hàng chẵn */
}

/* CSS cho nút Hiệu chỉnh */
.router-link {
    text-decoration: none;
    /* Loại bỏ gạch chân */
    color: #007bff;
    /* Màu chữ */
}

.router-link:hover {
    text-decoration: underline;
    /* Gạch chân khi di chuột qua */
    color: #0056b3;
    /* Màu khi hover */
}

/* CSS cho button Xóa */
.btn-delete {
    background-color: #dc3545;
    /* Màu nền */
    color: white;
    /* Màu chữ */
    border: none;
    /* Loại bỏ viền */
    padding: 8px 16px;
    /* Kích thước nút */
    border-radius: 4px;
    /* Bo tròn góc */
}

.btn-delete:hover {
    background-color: #c82333;
    /* Màu nền khi hover */
}

/* CSS cho nút Hiệu chỉnh */
.btn-primary {
    background-color: #007bff;
    border-color: #007bff;
}

.btn-primary:hover {
    background-color: #0056b3;
    border-color: #0056b3;
}
</style>
