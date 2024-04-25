<template>
    <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-md-6">
                <div v-if="book" class="page">
                    <h4>Hiệu chỉnh sách</h4>
                    <BookForm :book="book" @submit:book="updateBook" @clear="clearForm" />
                    <p>{{ message }}</p>
                </div>
            </div>
        </div>
    </div>

</template>

<script>
import BookForm from "@/components/BookForm.vue";
import SachService from "@/services/sach.service";

export default {
    components: {
        BookForm,
    },
    props: {
        id: { type: String, required: true },
    },
    data() {
        return {
            book: null,
            message: "",
        };
    },
    methods: {
        async getBook(id) {
            try {
                this.book = await SachService.get(id);
            } catch (error) {
                console.log(error);
                // Redirect to NotFound page while keeping the URL unchanged
                this.$router.push({
                    name: "notfound",
                    params: {
                        pathMatch: this.$route.path.split("/").slice(1),
                    },
                    query: this.$route.query,
                    hash: this.$route.hash,
                });
            }
        },
        async updateBook(data) {
            try {
                await SachService.update(this.book._id, data);
                alert("Sách được cập nhật thành công.");
            } catch (error) {
                console.log(error);
            }
        },
        clearForm() {
            this.book = null;
        },
    },
    created() {
        this.getBook(this.id);
        this.message = "";
    },
};
</script>

<style scoped>
  .error-feedback {
    color: red;
  }
  </style>