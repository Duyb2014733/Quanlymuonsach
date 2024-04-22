<template>
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <h2>Quản lý sách</h2>
                <!-- Form for adding/editing books -->
                <BookForm @submit="submitForm"/>
            </div>
        </div>

        <!-- List of books -->
        <div class="row justify-content-center mt-5">
            <div class="col-md-8">
                <h2>Danh sách sách</h2>
                <table class="table">
                    <thead>
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
                                <router-link :to="{ name: 'sach.edit', params: { id: book._id } }">Hiệu chỉnh</router-link>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

    </div>
</template>

<script>
import BookForm from "@/components/BookForm.vue";
import NhaXuatBanService from "@/services/nhaXuatBan.service";
import SachService from "@/services/sach.service";

export default {
    components: {
        BookForm,
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
        async deleteBook(id) {
            try {
                await SachService.delete(id);
                this.loadBooks();
            } catch (error) {
                console.error("Error deleting book:", error.message);
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
</style>
