<template>
    <div class="container-fluid">
        <div class="row justify-content-center mt-5">
            <h2>Danh sách độc giả</h2>
            <table class="table">
                <thead class="thead-dark">
                    <tr>
                        <th scope="col">Mã độc giả</th>
                        <th scope="col">Họ lót</th>
                        <th scope="col">Tên</th>
                        <th scope="col">Ngày sinh</th>
                        <th scope="col">Giới tính</th>
                        <th scope="col">Địa chỉ</th>
                        <th scope="col">Điện thoại</th>
                        <th scope="col">Thao tác</th> <!-- Add a column for delete button -->
                    </tr>
                </thead>
                <tbody>
                    <!-- Iterate over readers -->
                    <tr v-for="reader in readers" :key="reader._id">
                        <td>{{ reader.MaDocGia }}</td>
                        <td>{{ reader.HoLot }}</td>
                        <td>{{ reader.Ten }}</td>
                        <td>{{ reader.NgaySinh }}</td>
                        <td>{{ reader.Phai }}</td>
                        <td>{{ reader.DiaChi }}</td>
                        <td>{{ reader.DienThoai }}</td>
                        <td>
                            <button @click="deleteReader(reader._id)" class="btn btn-danger">Xóa</button> <!-- Delete button -->
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
import DocGiaService from "@/services/docGia.service";

export default {
    data() {
        return {
            readers: [],
        };
    },
    methods: {
        async loadReaders() {
            try {
                this.readers = await DocGiaService.getAll();
            } catch (error) {
                console.error("Error loading readers:", error.message);
            }
        },
        async deleteReader(id) {
            if (confirm("Bạn có chắc muốn xóa độc giả này không?")) {
                try {
                    await DocGiaService.delete(id);
                    // After successful deletion, reload the readers list
                    this.loadReaders();
                } catch (error) {
                    console.error("Error deleting reader:", error.message);
                }
            }
        },
    },
    async mounted() {
        this.loadReaders();
    },
};
</script>

<style scoped>
.error-feedback {
    color: red;
}
</style>
