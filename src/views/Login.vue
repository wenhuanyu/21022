<template>
    <div>
        <div class="welcome" v-if="welcome" >
            <div class="bj"><img src="../assets/images/t1.png"></div>
            <div class="wz">孕产CCBT行为矫正治疗系统V8.0</div>
            <div class="flex hy" @click="tiaozhuan">
                <div class="hyjt"><img src="../assets/images/t2.gif"></div>
            </div>
        </div>
        <div class="login" v-if="denglu">
            <img class="exit out" src="../assets/images/login_exit.png" alt="" @click="exit">
            <img class="logo" src="../assets/images/logo.png" alt="">
            <div class="login-content">
                <p>用户登录</p>
                <form>
                    <div class="item">
                        <img src="../assets/images/login_user.png" alt="">
                        <el-input v-model="username" type="text" placeholder="请输入用户名"></el-input>
                    </div>
                    <div class="item">
                        <img src="../assets/images/login_pwd.png" alt="">
                        <el-input v-model="password" show-password type="password" placeholder="请输入密码"></el-input>
                    </div>
                    <div class="jizhu">
                        <el-checkbox v-model="remember">记住密码</el-checkbox>
                    </div>
                    <el-button round class="login-btn" @click="login">登录</el-button>
                </form>
            </div>
        </div>
    </div>

</template>

<script>
var userAgent = navigator.userAgent.toLowerCase()
if(userAgent.indexOf('electron/')>-1) {
    console.log('桌面应用')
    var Store = window.require('electron-store')
    var storeName = new Store();
}else {
    console.log('浏览器')
}

export default {
    name    : "Login",
    data() {
        return {
            username: '',
            password: '',
            remember: false,
            welcome:true,
            denglu:false
        };
    },
    computed: {},
    watch   : {},
    methods : {
        tiaozhuan() {
            this.welcome = false
            this.denglu = true
        },
        async login() {
            // console.log('exec',window.window.getPwd())
            if (!this.username) {
                this.$message.error('请输入用户名');
                return;
            }
            if (!this.password) {
                this.$message.error('请输入密码');
                return;
            }

            await this.$axios.post('api/index/login', {username: this.username, password: this.password}).then(res => {
                if (res.data.code === 1) {
                    this.$store.commit('setToken', res.data.data.token)
                    this.$store.commit('setUserInfo', {data: res.data.data, status: true, username: this.username});
                    console.log('跳转首页')
                    this.$router.push('/');
                    sessionStorage.setItem('usertype','center')

                    var userAgent = navigator.userAgent.toLowerCase()
                    if(userAgent.indexOf('electron/')>-1) {
                        if (this.remember) {
                            //记住密码
                            storeName.set("ycfzkname",this.username);
                            storeName.set("ycfzkpassword",this.password);
                        } else {
                            storeName.delete('ycfzkname');
                            storeName.delete('ycfzkpassword');
                        }
                    }else {
                        if (this.remember) {
                            //记住密码
                            this.$store.commit('setAccount', {username: this.username, password: this.password});
                        } else {
                            this.$store.commit('setAccount', '');
                        }
                    }

                }
            })
        },
        exit() {
            this.$confirm('确定退出系统吗', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                window.window.close()
            }).catch(() => {
            });
        }
    },

    mounted() {
        var userAgent = navigator.userAgent.toLowerCase()
        if(userAgent.indexOf('electron/')>-1) {
            if(storeName.has("ycfzkname")){
                this.password = storeName.get('ycfzkpassword')
                this.username = storeName.get('ycfzkname')
                this.remember = true
            } else  {
                this.remember = false
            }
        }else {
            if (this.$store.state.user.account) {
                let data      = this.$store.state.user.account;
                this.password = data.password;
                this.username = data.username;
                this.remember = true;
            }
        }
        this.$store.commit('setClient', false);
        // this.getCookie()
        console.log('this.remember',this.remember)
    }
}
</script>

<style scoped lang="scss">
.welcome {
    width: 100vw;
    height: 100vh;
    background: url('../assets/images/tp.png') no-repeat center;
    background-size: cover;
    overflow: hidden;
    .bj {
        width: 232px;
        height: 232px;
        margin: 0 auto;
        margin-top: 23vh;
        img {
            width: 100%;
            height: 100%;
        }
    }
    .wz {
        width: 1490px;
        height: 148px;
        font-size: 100px;
        font-weight: 800;
        color: #F6635E;
        line-height: 148px;
        margin: 0 auto;
    }
    .hy {
        margin-top: 22vh;
        //margin-left: 1546px;
        cursor: pointer;
        float: right;
    }
    .hyjt {
        background: url('../assets/images/t3.png') no-repeat center;
    }
}
.login {
    width: 100vw;
    height: 100vh;
    background: url('../assets/images/loginBG.png') no-repeat center;
    background-size: cover;
}

.logo {
    display: block;
    height: 162px;
    position: absolute;
    top: 45px;
    left: 160px;
}

.login-content {
    width: 380px;
    position: absolute;
    top: 56%;
    left: 50%;
    transform: translate(-50%, -56%);
}

.login-content p {
    color: #f5605a;
    font-size: 36px;
    margin-bottom: 70px;
    text-align: center;
    font-weight: bold;
}

.login-content .item {
    display: flex;
    align-items: center;
    background: #f2f2f2;
    border-radius: 25px;
    height: 55px;
    margin-bottom: 35px;
    padding: 0 20px;
}

.login-content .item img {
    width: 20px;
    height: 20px;
}

.login-content .item input {
    flex: 1;
    margin-left: 15px;
    font-size: 14px;
}

.login-content .item input::-webkit-input-placeholder {
    color: #999999;
}

.login-btn {
    display: block;
    background: #f5605a;
    border: none!important;
    color: #ffffff;
    font-weight: bold;
    font-size: 14px;
    border-radius: 50px;
    width: 170px;
    height: 50px;
    margin: 0 auto;
}

.jizhu {
    display: flex;
    align-items: center;
    font-size: 12px;
    color: #989898;
    margin-bottom: 30px;
    margin-left: 30px;
}

.jizhu input {
    width: 14px;
    height: 14px;
    margin: 0 10px 0 0;
}

.exit {
    position: fixed;
    top: 100px;
    right: 154px;
    cursor: pointer;
}

::v-deep .el-input__inner {
    border: none;
    background-color: transparent;
}
</style>
