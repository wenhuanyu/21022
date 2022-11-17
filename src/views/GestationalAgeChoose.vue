<template>
    <div class="content">
        <div class="content_top">
            <div></div>
            <el-form class="search-bar">
                <el-button class="pink" plain @click="backPage" icon="el-icon-arrow-left">返回系统页</el-button>
            </el-form>
        </div>
        <div class="content_body">
            <span>请选择孕周</span>
            <el-select v-model="value" placeholder="请选择" @change="onWeekInfo($event)">
                <el-option
                    v-for="item in options"
                    :key="item.id"
                    :label="item.title"
                    :value="item.id"
                >
                </el-option>
            </el-select>
            <el-button type="primary" round size="small" class="confirm" @click="weekInfo">确认
            </el-button>
        </div>
    </div>
</template>

<script>
export default {
    name: "GestationalAgeChoose",
    data() {
        return {
            value: '',
            options: [],
            week_id:''
        };
    },
    computed: {},
    watch: {},
    mounted() {
        //消息接口
        this.$store.dispatch('GetXiao')
        this.onWeek()
    },
    methods: {
        backPage() {
            this.$router.go(-1);
        },
        onWeek() {
            this.$axios.post('api/common/week_lst').then(res => {
                if (res.data.code === 1) {
                    this.options = res.data.data
                }
            })
        },
        onWeekInfo(e){
            this.week_id = e
        },
        weekInfo(){
            if(this.value === ''){
                this.$message({
                    message: '请选择孕周'
                })
            }else {
                this.$router.push({name:'GestationalAge', query:{id:this.week_id}})
            }
        }
    },
}
</script>

<style scoped lang="scss">
.content_body {
    padding: 100px;

    > span {
        color: #333333;
        font-size: 22px;
        font-weight: 600;
        margin-right: 20px;
    }

}

.confirm {
    margin-left: 20px;
    height: 35px;
    width: 100px;
    line-height: 16px;
}

</style>
