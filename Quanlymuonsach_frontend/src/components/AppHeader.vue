<template>
    <div class="head">
        <a href="/" class="btn" type="button">
            <span>Quản lý mượn sách</span>
        </a>
    </div>
    <hr style="height:2px;border-width:0;color:gray;background-color:gray">
    <div class="body">
        <ul class="list-unstyled px-2">
            <li>
                <router-link :to="{ name: 'quanlymuonsach' }" class="btn" type="button">
                    <span>Quản lý tài khoản</span>
                </router-link>
            </li>
        </ul>
    </div>

    <div class="footer">
        <hr style="height:2px;border-width:0;color:gray;background-color:gray">
        <ul class="list-unstyled px-2">
            <template v-if="!isLoggedIn">
                <li>
                    <router-link :to="{ name: 'nhanvien.dangky' }" class="btn" type="button">
                        <span>Đăng Kí</span>
                    </router-link>
                </li>
                <li>
                    <router-link :to="{ name: 'nhanvien.dangnhap' }" class="btn" type="button">
                        <span>Đăng Nhập</span>
                    </router-link>
                </li>
            </template>
            <template v-else>
                <li>
                    <router-link :to="{ name: 'nhanvien.thongtinnhanvien' }" class="btn" type="button">
                        <span>Thông tin nhân viên</span>
                    </router-link>
                </li>
                <li>
                    <button @click="logout" class="btn btn-link nav-link">Đăng xuất</button>
                </li>
            </template>
        </ul>
    </div>
</template>

<script>
export default {
    name: 'AppHeader',
    data() {
        return {
            isLoggedIn: false
        };
    },
    mounted() {
        let intervalId;

        intervalId = setInterval(() => {
            const userId = window.localStorage.getItem('userId');

            if (userId) {
                this.isLoggedIn = true;
            }
        }, 5000); // Gọi mỗi 5 giây (5000 milliseconds)

        setTimeout(() => {
            clearInterval(intervalId);
        }, 300000); // Dừng gọi sau 300 giây (300000 milliseconds)
    },

    methods: {
        logout() {
            localStorage.removeItem('userId');
            this.isLoggedIn = false;
            this.$router.push({ name: 'nhanvien.dangnhap' });
        },
    }
};
</script>


<style>
.sidebar {
    position: fixed;
    height: 100%;
    background: #1a1919;
    top: 0;
    left: 0;
    color: #fff;
    border: rgb(97, 93, 93);
    border-style: solid;
}

.sidebar .head {
    align-items: center;
    height: auto;
    color: #fff;
    padding: 10px;
}

.sidebar .head a {
    position: fixed;
    font-size: 25px;
    text-align: left;
    width: 100%;
    height: 100%;
    color: #fff;
}

.sidebar .body {
    position: fixed;
    align-items: center;
    text-align: center;
    color: #fff;
}

.sidebar .body a {
    text-align: left;
    width: 100%;
    height: 100%;
    color: #fff;
}

.sidebar a:hover {
    background-color: #2e3135;
}

.sidebar .footer {
    position: absolute;
    bottom: 0;
    height: auto;
    align-items: center;
    text-align: center;
}

.sidebar .footer a {
    text-align: left;
    width: 100%;
    height: 100%;
    color: #fff;
}
</style>
