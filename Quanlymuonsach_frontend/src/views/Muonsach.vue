<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <h2 class="text-center mb-4">Mượn Sách</h2>
        <form @submit.prevent="borrowBook">
          <div class="form-group">
            <label for="readerId">Mã độc giả:</label>
            <!-- Hiển thị mã độc giả từ dữ liệu đã lấy được -->
            <input type="text" class="form-control" id="readerId" v-model="readerId" readonly required>
          </div>
          <div class="form-group">
            <label for="MaSach">Mã sách:</label>
            <!-- Hiển thị mã sách từ dữ liệu đã lấy được -->
            <input type="text" class="form-control" id="MaSach" v-model="MaSach" readonly required>
          </div>
          <div class="form-group">
            <label for="borrowDate">Ngày mượn:</label>
            <input type="date" class="form-control" id="borrowDate" v-model="borrowDate" required>
          </div>
          <div class="form-group">
            <label for="returnDate">Ngày trả:</label>
            <input type="date" class="form-control" id="returnDate" v-model="returnDate" required>
          </div>
          <div class="form-group">
            <label for="quantity">Số lượng:</label>
            <input type="number" class="form-control" id="quantity" v-model="quantity" required>
          </div>
          <button type="submit" class="btn btn-primary">Mượn sách</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import DocGiaService from "@/services/docGia.service";
import SachService from "@/services/sach.service";
import TheoDoiMuonSachService from "@/services/theoDoiMuonSach.service";

export default {
  data() {
    return {
      readerId: "", // Trường dữ liệu để hiển thị mã độc giả
      bookId: "",   // Trường dữ liệu để hiển thị mã sách
      borrowDate: "",
      MaSach: "",
      returnDate: "",
      quantity: 1
    };
  },
  methods: {
    async borrowBook() {
      try {
        // Tạo đối tượng mới TheoDoiMuonSach
        const theoDoiMuonSach = {
          MaDocGia: this.readerId,
          MaSach: this.MaSach,
          NgayMuon: this.borrowDate,
          NgayTra: this.returnDate,
          SoLuong: this.quantity
        };

        await TheoDoiMuonSachService.create(theoDoiMuonSach);
        const queryParams = new URLSearchParams(window.location.search);

        const bookId = queryParams.get('bookId');

        const book = await SachService.get(bookId);

        const newQuantity = book.SoQuyen - this.quantity;

        await SachService.update(bookId, { SoQuyen: newQuantity });

        // Hiển thị thông báo mượn sách thành công
        alert('Mượn sách thành công!');
      } catch (error) {
        console.error("Error borrowing book:", error.message);
        // Hiển thị nội dung cụ thể của lỗi
        alert(`Đã xảy ra lỗi khi mượn sách: ${error.message}`);
      }
    },

    async getReaderIdFromLocalStorage() {
      // Lấy mã độc giả từ localStorage
      const docgiaId = localStorage.getItem('docgiaId');
      // Gọi service để lấy thông tin độc giả từ ID
      try {
        const reader = await DocGiaService.get(docgiaId);
        this.readerId = reader.MaDocGia;
      } catch (error) {
        console.error("Error getting reader information:", error.message);
      }
    },
    async getBookIdFromQueryParams() {
      // Lấy các tham số từ query string của URL
      const queryParams = new URLSearchParams(window.location.search);
      // Lấy giá trị của tham số bookId từ query string
      const bookId = queryParams.get('bookId'); // Đổi MaSach thành bookId
      // Gọi service để lấy thông tin sách từ ID
      try {
        const book = await SachService.get(bookId); // Sử dụng bookId để lấy thông tin sách
        this.MaSach = book.MaSach; // Gán mã sách vào trường dữ liệu bookId
      } catch (error) {
        console.error("Error getting book information:", error.message);
      }
    },

  },
  created() {
    // Gọi phương thức để lấy mã độc giả từ localStorage khi component được tạo
    this.getReaderIdFromLocalStorage();
    // Gọi phương thức để lấy mã sách từ query string của URL khi component được tạo
    this.getBookIdFromQueryParams();
  }
};
</script>
