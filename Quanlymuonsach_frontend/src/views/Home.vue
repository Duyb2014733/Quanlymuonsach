<template>
  <div>
    <h2 class="mb-4">Danh sách sách</h2>
    <div class="input-group mb-3">
      <input type="text" class="form-control" placeholder="Tìm kiếm theo tên sách" v-model="searchTerm">
      <div class="input-group-append">
        <button class="btn btn-outline-secondary" type="button" @click="clearSearchTerm">Xóa</button>
      </div>
    </div>
    <table v-if="filteredBooks.length > 0" class="table table-bordered">
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
        <tr v-for="book in filteredBooks" :key="book._id">
          <td>{{ book.MaSach }}</td>
          <td>{{ book.TenSach }}</td>
          <td>{{ book.TacGia }}</td>
          <td>{{ book.MaNXB }}</td>
          <td>{{ book.DonGia }}</td>
          <td>{{ book.SoQuyen }}</td>
          <td>{{ book.NamXuatBan }}</td>
          <td>
            <!-- Truyền mã độc giả và mã sách vào query string của router-link -->
            <router-link :to="{ name: 'muonsach.add', query: { readerId: 'YOUR_READER_ID', bookId: book._id } }"
              class="btn btn-primary">Mượn sách</router-link>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-else>
      <p class="text-center">Không có sách nào phù hợp với tìm kiếm của bạn.</p>
    </div>
  </div>
</template>

<script>
import SachService from "@/services/sach.service";

export default {
  data() {
    return {
      books: [],
      searchTerm: ''
    };
  },
  async mounted() {
    try {
      this.books = await SachService.getAll();
    } catch (error) {
      console.error("Error loading books:", error.message);
    }
  },
  methods: {
    clearSearchTerm() {
      this.searchTerm = '';
    }
  },
  computed: {
    filteredBooks() {
      if (!this.searchTerm) {
        return this.books;
      } else {
        return this.books.filter(book => book.TenSach.toLowerCase().includes(this.searchTerm.toLowerCase()));
      }
    }
  }
};
</script>

<style>
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
</style>
