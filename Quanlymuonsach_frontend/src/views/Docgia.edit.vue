<template>
    <div>
        <h2>{{ editing ? 'Chỉnh sửa độc giả' : 'Thêm độc giả mới' }}</h2>
        <DocGiaForm :reader="reader" @submit="handleSubmit" @clear="handleClear" />
    </div>
</template>

<script>
import DocGiaForm from "@/components/DocGiaForm.vue";
import DocGiaService from "@/services/DocGia.service";

export default {
    components: {
        DocGiaForm,
    },
    data() {
        return {
            reader: null,
            editing: false,
        };
    },
    methods: {
        async fetchReader(id) {
            try {
                this.reader = await DocGiaService.get(id);
                this.editing = true;
            } catch (error) {
                console.error("Error fetching reader:", error.message);
            }
        },
        async handleSubmit(readerData) {
            try {
                if (this.editing) {
                    await DocGiaService.update(this.reader._id, readerData);
                } else {
                    await DocGiaService.create(readerData);
                }
                // Redirect or show success message
            } catch (error) {
                console.error("Error submitting form:", error.message);
            }
        },
        handleClear() {
            this.reader = null;
            this.editing = false;
        },
    },
    created() {
        const readerId = this.$route.params.id;
        if (readerId) {
            this.fetchReader(readerId);
        }
    },
};
</script>