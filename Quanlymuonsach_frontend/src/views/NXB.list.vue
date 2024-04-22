<template>
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <h2>Quản lý nhà xuất bản</h2>
                <PublisherForm @submit="submitForm"/>
            </div>
        </div>

        <!-- List of publishers -->
        <div class="row justify-content-center mt-5">
            <div class="col-md-8">
                <h2>Danh sách nhà xuất bản</h2>
                <table class="table">
                    <thead>
                        <tr>
                            <th scope="col">Mã NXB</th>
                            <th scope="col">Tên NXB</th>
                            <th scope="col">Địa chỉ</th>
                            <th scope="col">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="publisher in publishers" :key="publisher._id">
                            <td>{{ publisher.MaNXB }}</td>
                            <td>{{ publisher.TenNXB }}</td>
                            <td>{{ publisher.DiaChi }}</td>
                            <td>
                                <router-link
                                    :to="{ name: 'nhaxuatban.edit', params: { id: publisher._id } }">Hiệu chỉnh</router-link>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>

    </div>
</template>

<script>
import PublisherForm from "@/components/PublisherForm.vue";
import NhaXuatBanService from "@/services/nhaXuatBan.service";

export default {
    components: {
        PublisherForm,
    },
    data() {
        return {
            NXBData: {
                MaNXB: "",
                TenNXB: "",
                DiaChi: "",
            },
            editingPublisher: null,
            publishers: [],
        };
    },
    methods: {
        async submitForm() {
            try {
                if (this.editingPublisher) {
                    await NhaXuatBanService.update(this.editingPublisher.id, this.NXBData);
                    this.editingPublisher = null;
                } else {
                    await NhaXuatBanService.create(this.NXBData);
                }
                this.clearForm();
                this.loadPublishers();
            } catch (error) {
                console.error("Đã xảy ra lỗi khi thực hiện hành động:", error.message);
            }
        },
        async deletePublisher(id) {
            try {
                await NhaXuatBanService.delete(id);
                this.loadPublishers();
            } catch (error) {
                console.error("Đã xảy ra lỗi khi xóa NXB:", error.message);
            }
        },
        editPublisher(publisher) {
            this.editingPublisher = publisher;
            this.NXBData = { ...publisher };
        },
        clearForm() {
            this.NXBData = {
                MaNXB: "",
                TenNXB: "",
                DiaChi: "",
            };
            this.editingPublisher = null;
        },
        async loadPublishers() {
            try {
                this.publishers = await NhaXuatBanService.getAll();
            } catch (error) {
                console.error("Đã xảy ra lỗi khi tải danh sách NXB:", error.message);
            }
        },
    },
    async mounted() {
        this.loadPublishers();
    },
}
</script>

<style scoped>
  .error-feedback {
    color: red;
  }
  </style>
