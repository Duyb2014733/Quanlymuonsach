<template>
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <h2>Quản lý độc giả</h2>
                <!-- Form for adding/editing readers -->
                <DocGiaForm @submit="submitForm" :reader="selectedReader" />
            </div>
        </div>

        <!-- List of readers -->
        <div class="row justify-content-center mt-5">
            <div class="col-md-8">
                <h2>Danh sách độc giả</h2>
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">Mã độc giả</th>
                            <th scope="col">Họ lót</th>
                            <th scope="col">Tên</th>
                            <th scope="col">Ngày sinh</th>
                            <th scope="col">Giới tính</th>
                            <th scope="col">Địa chỉ</th>
                            <th scope="col">Điện thoại</th>
                            <th scope="col">Thao tác</th>
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
                                <!-- Router link to edit a reader -->
                                <router-link
                                    :to="{ name: 'docgia.edit', params: { id: reader._id } }">Edit</router-link>
                                <!-- Button to delete a reader -->
                                <button @click="deleteReader(reader._id)">Delete</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

    </div>
</template>

<script>
import DocGiaForm from "@/components/DocGiaForm.vue";
import DocGiaService from "@/services/docGia.service";

export default {
    components: {
        DocGiaForm,
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
            selectedReader: null,
            readers: [],
        };
    },
    methods: {
        async submitForm(readerData) {
            try {
                if (this.selectedReader) {
                    // If editing an existing reader
                    await DocGiaService.update(this.selectedReader._id, readerData);
                } else {
                    // If adding a new reader
                    await DocGiaService.create(readerData);
                }
                this.clearForm();
                this.loadReaders();
            } catch (error) {
                console.error("Error:", error.message);
            }
        },
        async deleteReader(id) {
            try {
                await DocGiaService.delete(id);
                this.loadReaders();
            } catch (error) {
                console.error("Error deleting reader:", error.message);
            }
        },
        clearForm() {
            this.selectedReader = null;
        },
        async loadReaders() {
            try {
                this.readers = await DocGiaService.getAll();
            } catch (error) {
                console.error("Error loading readers:", error.message);
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
