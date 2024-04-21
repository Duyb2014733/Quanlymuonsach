import DangKy from "@/views/DangKy.vue";
import DangNhap from "@/views/DangNhap.vue";
import Quanlymuonsach from "@/views/Quanlymuonsach.vue";
import SuaThongTinNhanVien from "@/views/SuaThongTinNhanVien.vue";
import ThongTinNhanVien from "@/views/ThongTinNhanVien.vue";
import { createRouter, createWebHistory } from "vue-router";
const routes = [
  {
    path: "/",
    name: "quanlymuonsach",
    component: Quanlymuonsach,
  },
  {
    path: "/nhanvien",
    name: "nhanvien.dangnhap",
    component: DangNhap,
  },
  {
    path: "/nhanvien",
    name: "nhanvien.dangky",
    component: DangKy,
  },
  {
    path: "/nhanvien",
    name: "nhanvien.thongtinnhanvien",
    component: ThongTinNhanVien,
  },
  {
    path: "/nhanvien/:id",
    name: "nhanvien.suathongtinnhanvien",
    component: SuaThongTinNhanVien,
    props: true,
  },
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
export default router;
