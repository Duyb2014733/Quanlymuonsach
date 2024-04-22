import DangKy from "@/views/DangKy.vue";
import DangNhap from "@/views/DangNhap.vue";
import DocGiaEdit from "@/views/Docgia.edit.vue";
import DocGiaList from "@/views/Docgia.list.vue";
import NhaXuatBanEdit from "@/views/NXB.edit.vue";
import NhaXuatBanList from "@/views/NXB.list.vue";
import ThongTinNhanVien from "@/views/Nhanvien.detail.vue";
import SuaThongTinNhanVien from "@/views/Nhanvien.edit.vue";
import Quanlymuonsach from "@/views/Quanlymuonsach.vue";
import SachEdit from "@/views/Sach.edit.vue";
import SachList from "@/views/Sach.list.vue";
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
  {
    path: "/nhaxuatban",
    name: "nhaxuatban.list",
    component: NhaXuatBanList,
  },

  {
    path: "/nhaxuatban/:id",
    name: "nhaxuatban.edit",
    component: NhaXuatBanEdit,
    props: true,
  },

  {
    path: "/sach",
    name: "sach.list",
    component: SachList,
  },

  {
    path: "/sach/:id",
    name: "sach.edit",
    component: SachEdit,
    props: true,
  },

  {
    path: "/docgia",
    name: "docgia.list",
    component: DocGiaList,
  },

  {
    path: "/docgia/:id",
    name: "docgia.edit",
    component: DocGiaEdit,
    props: true,
  },
];
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
export default router;
