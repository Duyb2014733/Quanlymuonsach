<template>
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div v-if="publisher" class="page">
                    <h4>Thêm mới NXB</h4>
                    <PublisherForm :publisher="publisher" @submit:publisher="updatePublisher"
                        @delete:publisher="deletePublisher" />
                    <p>{{ message }}</p>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import PublisherForm from "@/components/PublisherForm.vue"; // Update the import path accordingly
import NhaXuatBanService from "@/services/nhaXuatBan.service"; // Update the import path accordingly

export default {
    components: {
        PublisherForm,
    },
    props: {
        id: { type: String, required: true },
    },
    data() {
        return {
            publisher: null,
            editingPublisher: false,
            message: "",
        };
    },
    methods: {
        async getPublisher(id) {
            try {
                this.publisher = await NhaXuatBanService.get(id);
                this.editingPublisher = true;
            } catch (error) {
                console.error(error);
                // Redirect to a not found page while keeping the URL unchanged
                this.$router.push({
                    name: "notfound",
                    params: {
                        pathMatch: this.$route.path.split("/").slice(1)
                    },
                    query: this.$route.query,
                    hash: this.$route.hash,
                });
            }
        },
        async updatePublisher(data) {
            try {
                if (this.editingPublisher) {
                    await NhaXuatBanService.update(this.publisher._id, data);
                    this.message = "NXB được cập nhật thành công.";
                } else {
                    await PublisherService.create(data);
                    this.message = "NXB được thêm mới thành công.";
                }
            } catch (error) {
                console.error(error);
            }
        },
        async deletePublisher() {
            if (confirm("Bạn muốn xóa NXB này?")) {
                try {
                    await NhaXuatBanService.delete(this.publisher._id);
                    this.$router.push({ name: "nhaxuatban.dsNXB" }); // Replace "publisherList" with the actual name of your publisher list route
                } catch (error) {
                    console.error(error);
                }
            }
        },
    },
    created() {
        this.getPublisher(this.id);
        this.message = "";
    },
};
</script>
