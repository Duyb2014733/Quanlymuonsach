<template>
    <div class="sidebar">
        <div class="head">
            <router-link :to="{ name: 'home' }" class="navbar-brand">
                <i class="fa-solid fa-book"></i>
                Quản lý mượn sách
            </router-link>
        </div>
        <hr style="height:2px;border-width:0;color:gray;background-color:gray">
        <div class="body">
            <ul class="list-unstyled px-2">

            </ul>
        </div>
        <div class="footer">
            <hr style="height:2px;border-width:0;color:gray;background-color:gray">
            <ul class="list-unstyled px-2">
                <template v-if="!isLoggedIn">
                    <li class="nav-item">
                        <router-link :to="{ name: 'docgia.dangky_docgia' }" class="nav-link">
                            <i class="fa-regular fa-address-card"></i>
                            Đăng Kí
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <router-link :to="{ name: 'docgia.dangnhap_docgia' }" class="nav-link">
                            <i class="fa-solid fa-right-to-bracket"></i>
                            Đăng Nhập
                        </router-link>

                    </li>
                </template>
                <template v-else>
                    <li class="nav-item">
                        <router-link :to="{ name: 'docgia.detail' }" class="nav-link">
                            <i class="fa-solid fa-clipboard-user"></i>
                            <span> Đọc giả</span>
                        </router-link>
                    </li>
                    <li class="nav-item">
                        <a @click="logout" class="btn btn-link nav-link">
                            <i class="fa-solid fa-arrow-right-from-bracket"></i>
                            <span> Đăng xuất</span>
                        </a>
                    </li>

                </template>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: "AppHeader_docgia",
    data() {
        return {
            isLoggedIn: false,
        };
    },
    mounted() {
        let intervalId;

        intervalId = setInterval(() => {
            const docgiaId = window.localStorage.getItem("docgiaId");

            if (docgiaId) {
                this.isLoggedIn = true;
            }
        }, 500); // Gọi mỗi 5 giây (5000 milliseconds)

        setTimeout(() => {
            clearInterval(intervalId);
        }, 300000); // Dừng gọi sau 300 giây (300000 milliseconds)
    },

    methods: {
        logout() {
            localStorage.removeItem("docgiaId");
            this.isLoggedIn = false;
            this.$router.push({ name: "docgia.dangnhap_docgia" });
        },
    },
};
</script>

<style scoped>
.sidebar {
    position: fixed;
    height: 100%;
    background: #1a1919;
    top: 0;
    left: 0;
    color: #fff;
    border: rgb(97, 93, 93);
    border-style: solid;
    width: 240px;
    /* Độ rộng thanh điều hướng */
}

.sidebar .head {
    align-items: center;
    height: auto;
    color: #fff;
    padding: 10px;
}

.sidebar .head a {
    text-align: left;
    width: 100%;
    height: 100%;
    color: #fff;
    /* Kích thước phông chữ cho tiêu đề */
}

.sidebar .body {
    align-items: center;
    text-align: center;
    color: #fff;
}

.sidebar .body a {
    text-align: left;
    width: 100%;
    height: 100%;
    color: #fff;
    /* Kích thước phông chữ cho tiêu đề */
}

.sidebar .footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    /* Đảm bảo rằng phần footer có độ rộng 100% */
    color: #fff;
    text-align: center;
}

.sidebar .footer a {
    text-align: center;
    align-items: center;
    text-align: left;
    width: 100%;
    height: 100%;
    color: #fff;
}

.sidebar a:hover {
    background-color: #2e3135;
}
</style>