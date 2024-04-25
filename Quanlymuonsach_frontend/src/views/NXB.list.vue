<template>
  <div class="container-fluid">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <h2>Quản lý nhà xuất bản</h2>
        <PublisherForm @submit="submitForm" :editingPublisher="editingPublisher" />
      </div>
    </div>

    <!-- List of publishers -->
    <div class="row justify-content-center mt-5">
      <div class="col-md-8">
        <h2>Danh sách nhà xuất bản</h2>
        <table class="table">
          <thead class="thead-dark">
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
                <router-link :to="{ name: 'nhaxuatban.edit', params: { id: publisher._id } }" class="btn btn-primary"><i
                    class="fa-solid fa-pen-to-square"></i></router-link>
                <button @click="deletePublisher(publisher._id)" class="btn btn-danger"><i
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
      if (confirm("Bạn có chắc muốn xóa NXB này không?")) {
        try {
          await NhaXuatBanService.delete(id);
          this.loadPublishers();
        } catch (error) {
          console.error("Đã xảy ra lỗi khi xóa NXB:", error.message);
        }
      }
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
};
</script>

<style scoped>
.error-feedback {
  color: red;
}

/* CSS cho bảng và thanh tìm kiếm */
.table {
  width: 100%;
  border-collapse: collapse;
}

.table th,
.table td {
  padding: 8px;
}

.table th {
  text-align: center;
}

.table td {
  text-align: center;
}

.table tbody tr:nth-child(even) {
  background-color: #f2f2f2;
}

.table th,
.table td {
  border: 1px solid #ddd;
}

.input-group {
  width: 50%;
  margin-bottom: 20px;
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

/* CSS cho các nút trong cột */
.button-container {
  display: flex;
  justify-content: center;
  /* Căn giữa theo chiều ngang */
  align-items: center;
  /* Căn giữa theo chiều dọc */
}

/* CSS cho nút Hiệu chỉnh */
.btn-primary,
.btn-danger {
  margin: 0 5px;
  /* Khoảng cách giữa các nút */
  padding: 8px 16px;
  /* Kích thước nút */
  border-radius: 4px;
  /* Bo tròn góc */
}
</style>