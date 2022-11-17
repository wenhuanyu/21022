<template>
    <div id="index">
        <img class="logo" src="../assets/images/logo.png" alt="">
        <div class="index-content">
            <router-link v-for="(item,index) in line.slice(0,5)"
                         :key="'line1' + index" :to="item.to" :style="{'pointer-events': check(item.name)}">
                <img :class="{disabled:!$store.state.mainMenus.includes(item.name),img:true}" :src="item.img" alt="">
            </router-link>
        </div>
        <div class="index-content content1">
            <router-link v-for="(item,index) in line.slice(5,10)"
                         :key="'line1' + index" :to="item.to" :style="{'pointer-events': check(item.name)}">
                <img :class="{disabled:!$store.state.mainMenus.includes(item.name),img:true}" :src="item.img" alt="">
            </router-link>
        </div>
        <div class="index_bottom">
            <img src="../assets/images/shouyerexian.png">
        </div>
        <div class="all_right">
            <el-popover
                placement="top"
                width="160"
                v-model="logoutShow">
                <p>确定退出登录？</p>
                <div style="text-align: right; margin: 0">
                    <el-button size="mini" type="text" @click="logoutShow = false">取消</el-button>
                    <el-button type="primary" size="mini" @click="logout">确定</el-button>
                </div>
                <button slot="reference" class="all_right_top">
                    <img src="../assets/images/user_red.png" alt="">
                    <p>退出登录</p>
                </button>
            </el-popover>
        </div>
    </div>
</template>

<script>
export default {
    name: "Index",
    data() {
        return {
            logoutShow: false,
            line: [
                {
                    img: require("@/assets/images/index_icon6.png"),
                    name: '终端监控',
                    to: '/TermMonitor'
                },
                {
                    img: require('@/assets/images/index_icon1.png'),
                    name: '患者管理',
                    to: 'PatientManagement'
                },


                {
                    img: require("@/assets/images/index_icon2.png"),
                    name: '评估测试',
                    to: '/Assess'
                },

                {
                    img: require("@/assets/images/index_icon3.png"),
                    name: '呼吸训练',
                    to: '/Training'
                },

                {
                    img: require("@/assets/images/index_icon4.png"),
                    name: '情绪调节',
                    to: '/Emotion'
                },
                //line 2
                {
                    img: require("@/assets/images/index_icon5.png"),
                    name: '孕周指导',
                    to: '/Toolkit'
                },
                {
                    img: require("@/assets/images/index_icon7.png"),
                    name: '营养指导',
                    to: '/Nutrition'
                },
                {
                    img: require("@/assets/images/index_icon8.png"),
                    name: '数据分析',
                    to: '/DataAnalysis'
                },
                {
                    img: require("@/assets/images/index_icon9.png"),
                    name: '报告中心',
                    to: '/ReportCenter'
                },
                {
                    img: require("@/assets/images/index_icon10.png"),
                    name: '系统设置',
                    to: '/SystemSetting'
                },

            ]
        };
    },
    computed: {
        check: function () {
            return (name) => {
                return this.$store.state.mainMenus.includes(name) ? 'all' : 'none'
            }
        }
    },
    watch: {
        /*'$store.state.mainMenus':(newVal)=>{
            console.log('mainMenus change',newVal)
        }*/
    },
    async mounted() {
        console.log('用户类型', sessionStorage.getItem('usertype'))

        if (sessionStorage.getItem('usertype') !== 'center') {
            this.$router.push('/TerminalLogin')
        }
        if (!sessionStorage.getItem('usertype')) {
            this.$router.push('/Login')
        }
        this.getRules().then()
    },
    methods: {
        logout() {
            this.$store.commit('setUserInfo', {data: '', status: false});
            this.$router.push('/Login');
        },
        getRules() {
            let rule = new Promise((resolve, reject) => {
                //获取权限列表
                this.$store.dispatch('GetAuth')
            })
            return rule
        }
    },
}
</script>

<style scoped lang="scss">
.index_bottom{
    position: absolute;
    bottom: 5vh;
    left: 50%;
    margin-left: -187px;
    image{
        width: 374px;
        height: 27px;
    }
}
button {
    border: none;
}

#index {
    width: 100%;
    height: 100vh;
    background: url('../assets/images/indexBG.png') no-repeat;
    background-size: 100% 100%;
}

.logo {
    display: block;
    //height: 16vh;
    position: absolute;
    top: 2vh;
    left: 10%;
}

.index-content {
    display: flex;
    position: fixed;
    top: 24vh;
    left: 12%;
}

.content1 {
    top: 55vh;
    left: 12%;
}


.index-content .img {
    display: block;
    width: 320px;
    height: 320px;
    //width: 100%;
    //height: 100%;
    transition: .3s all ease-in-out;
}

.index-content a {
    width: 22%;
    height: 22%;
}

.disabled {
    filter: grayscale(100%);
}
</style>
