<template>
    <div>
        <!-- Phần hiển thị thông tin của đọc giả -->
        <div class="container" v-if="reader">
            <h2>Thông tin đọc giả</h2>
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">Mã đọc giả: {{ reader.MaDocGia }}</h5>
                    <p class="card-text">Họ lót: {{ reader.HoLot }}</p>
                    <p class="card-text">Tên: {{ reader.Ten }}</p>
                    <p class="card-text">Ngày sinh: {{ reader.NgaySinh }}</p>
                    <p class="card-text">Giới tính: {{ reader.Phai }}</p>
                    <p class="card-text">Điện thoại: {{ reader.DienThoai }}</p>
                </div>
            </div>
        </div>

        <!-- Bảng trạng thái mượn sách của đọc giả -->
        <div class="container mt-4" v-if="borrowingRecords.length > 0">
            <h2>Bảng trạng thái mượn sách</h2>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Mã sách</th>
                        <th scope="col">Ngày mượn</th>
                        <th scope="col">Ngày trả</th>
                        <th scope="col">Số lượng</th>
                        <th scope="col">Thao tác</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="record in borrowingRecords" :key="record._id">
                        <td>{{ record.MaSach }}</td>
                        <td>{{ record.NgayMuon }}</td>
                        <td>{{ record.NgayTra }}</td>
                        <td>{{ record.SoLuong }}</td>
                        <td>
                            <button @click="returnBook(record._id)">Trả sách</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Thông báo khi không có dữ liệu mượn sách -->
        <div class="container mt-4" v-else>
            <h2>Bảng trạng thái mượn sách</h2>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Mã sách</th>
                        <th scope="col">Ngày mượn</th>
                        <th scope="col">Ngày trả</th>
                        <th scope="col">Số lượng</th>
                        <th scope="col">Thao tác</th>
                    </tr>
                </thead>
                
            </table>
            <p>Đọc giả chưa mượn sách nào.</p>
        </div>
    </div>
</template>

<script>
import DocGiaService from '@/services/docGia.service';
import TheoDoiMuonSachService from '@/services/theoDoiMuonSach.service';

export default {
    data() {
        return {
            reader: null,
            borrowingRecords: []
        };
    },
    async mounted() {
        try {
            // Lấy mã độc giả từ local storage
            const docgiaId = localStorage.getItem('docgiaId');

            // Lấy thông tin đọc giả từ mã độc giả
            const reader = await DocGiaService.get(docgiaId);
            this.reader = reader;

            // Lấy tất cả thông tin theodoimuonsach
            const allBorrowingRecords = await TheoDoiMuonSachService.getAll();

            // Lọc thông tin theodoimuonsach của độc giả hiện tại
            this.borrowingRecords = allBorrowingRecords.filter(record => record.MaDocGia === reader.MaDocGia);
        } catch (error) {
            console.error("Error loading borrowing records:", error.message);
        }
    },
    methods: {
        async returnBook(recordId) {
            if(confirm("Bạn có muốn trả sách hay không?")){
                try {
                // Gọi API để xóa thông tin theodoimuonsach
                await TheoDoiMuonSachService.delete(recordId);

                // Sau khi xóa thành công, cập nhật lại danh sách mượn sách
                const allBorrowingRecords = await TheoDoiMuonSachService.getAll();
                this.borrowingRecords = allBorrowingRecords.filter(record => record.MaDocGia === this.reader.MaDocGia);
            } catch (error) {
                console.error("Error returning book:", error.message);
            }
            }
           
        }
    }
};
</script>


<style scoped>
.container {
    margin: 20px auto;
    max-width: 800px;
}

.card {
    width: 100%;
    border: 1px solid #ccc;
    border-radius: 5px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card-body {
    padding: 20px;
}

.table {
    width: 100%;
    border-collapse: collapse;
}

.table th,
.table td {
    padding: 10px;
    border: 1px solid #ddd;
}

.table th {
    background-color: #f2f2f2;
    text-align: left;
}

.table tbody tr:nth-child(even) {
    background-color: #f9f9f9;
}

.button {
    background-color: #4CAF50;
    border: none;
    color: white;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    border-radius: 5px;
    cursor: pointer;
}

.button:hover {
    background-color: #45a049;
}
</style>

