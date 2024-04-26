<template>
  <div class="container-fluid">
      <div class="row justify-content-center">
          <div class="col-md-6">
              <h2>{{ editingPublisher ? 'Cập nhật NXB' : 'Thêm NXB mới' }}</h2>
              <Form @submit="submitForm" :validation-schema="formSchema">
                  <div class="form-group">
                      <label for="MaNXB">Mã nhà xuất bản</label>
                      <Field name="MaNXB" type="text" class="form-control" v-model="NXBData.MaNXB" />
                      <ErrorMessage name="MaNXB" class="error-feedback" />
                  </div>
                  <div class="form-group">
                      <label for="TenNXB">Tên nhà xuất bản</label>
                      <Field name="TenNXB" type="text" class="form-control" v-model="NXBData.TenNXB" />
                      <ErrorMessage name="TenNXB" class="error-feedback" />
                  </div>
                  <div class="form-group">
                      <label for="DiaChi">Địa chỉ</label>
                      <Field name="DiaChi" type="text" class="form-control" v-model="NXBData.DiaChi" />
                      <ErrorMessage name="DiaChi" class="error-feedback" />
                  </div>
                  <button type="submit" class="btn btn-primary">{{ editingPublisher ? 'Cập nhật' : 'Thêm mới' }}</button>
                  <button type="button" v-if="editingPublisher" class="btn btn-danger" @click="deletePublisher(editingPublisher.id)">Xóa</button>
                  <router-link v-if="editingPublisher" :to="{ name: 'ManagePublishers' }" class="btn btn-secondary">Hủy</router-link>
              </Form>
          </div>
      </div>
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
                
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<script>
import NhaXuatBanService from "@/services/nhaXuatBan.service";
import { ErrorMessage, Field, Form } from "vee-validate";
import * as yup from "yup";

export default {
  components: {
      Form,
      Field,
      ErrorMessage,
  },
  data() {
      return {
          NXBData: {
              MaNXB: "",
              TenNXB: "",
              DiaChi: "",
          },
          formSchema: this.generateFormSchema(),
          editingPublisher: null,
          publishers: [],
      };
  },
  methods: {
      generateFormSchema() {
          return yup.object().shape({
              MaNXB: yup.string().required("Mã số nhà xuất bản là bắt buộc"),
              TenNXB: yup.string().required("Tên NXB là bắt buộc"),
              DiaChi: yup.string().required("Địa chỉ là bắt buộc"),
          });
      },
      async submitForm() {
          try {
              if (this.editingPublisher) {
                  await NhaXuatBanService.update(this.editingPublisher.id, this.NXBData);
              } else {
                  await NhaXuatBanService.create(this.NXBData);
              }
              this.loadPublishers();
          } catch (error) {
              console.error("Đã xảy ra lỗi khi thực hiện hành động:", error.message);
          }
      },
      async deletePublisher(id) {
          try {
              await NhaXuatBanService.delete(id);
              this.$router.push({ name: 'ManagePublishers' });
              this.loadPublishers();
          } catch (error) {
              console.error("Đã xảy ra lỗi khi xóa NXB:", error.message);
          }
      },
      async loadPublishers() {
          try {
              this.publishers = await NhaXuatBanService.getAll();
          } catch (error) {
              console.error("Đã xảy ra lỗi khi tải danh sách NXB:", error.message);
          }
      },
      async loadPublisher(id) {
          // Cần triển khai hàm này để tải một NXB cụ thể
      },
  },
  created() {
      const id = this.$route.params.id;
      if (id) {
          this.loadPublisher(id);
      }
      this.loadPublishers(); // Tải danh sách NXB khi component được tạo
  },
};
</script>

