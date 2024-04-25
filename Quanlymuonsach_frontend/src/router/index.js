import DangKy_admin from "@/views/DangKy_admin.vue";
import DangNhap_admin from "@/views/DangNhap_admin.vue";
import dangky_docgia from "@/views/Dangky_docgia.vue";
import dangnhap_docgia from "@/views/Dangnhap_docgia.vue";
import docgia_detail from "@/views/Docgia.detail.vue";
import DocGiaList from "@/views/Docgia.list.vue";
import Home from "@/views/Home.vue";
import muonsach_add from "@/views/Muonsach.vue";
import NhaXuatBanEdit from "@/views/NXB.edit.vue";
import NhaXuatBanList from "@/views/NXB.list.vue";
import ThongTinNhanVien from "@/views/Nhanvien.detail.vue";
import SuaThongTinNhanVien from "@/views/Nhanvien.edit.vue";
import SachEdit from "@/views/Sach.edit.vue";
import SachList from "@/views/Sach.list.vue";
import { createRouter, createWebHistory } from "vue-router";
const routes = [

  // Phần của admin
  // {
  //   path: "/admin",
  //   name: "home_admin",
  //   component: Home_admin,
  // },
  {
    path: "/admin",
    name: "nhanvien.dangnhap_admin",
    component: DangNhap_admin,
  },
  {
    path: "/nhanvien/register",
    name: "nhanvien.dangky_admin",
    component: DangKy_admin,
  },
  {
    path: "/nhanvien/detail",
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
    path: "/nhaxuatban/list",
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
    path: "/sach/list",
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
    path: "/docgia/list",
    name: "docgia.list",
    component: DocGiaList,
  },

  // Phàn của độc giả
  {
    path: "/",
    name: "home",
    component: Home,
  },
  {
    path: "/docgia/register",
    name: "docgia.dangky_docgia",
    component: dangky_docgia,
  },
  {
    path: "/docgia/login",
    name: "docgia.dangnhap_docgia",
    component: dangnhap_docgia,
  },
  {
    path: "/docgia/detail",
    name: "docgia.detail",
    component: docgia_detail,
  },

  // Phần mượn sách
  {
    path: "/theodoimuonsach",
    name: "muonsach.add",
    component: muonsach_add,
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});
export default router;
