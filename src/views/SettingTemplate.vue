<template>
    <div class="content">
        <div class="content_top">
            <div></div>
            <el-form class="search-bar">
                <el-button class="pink" plain @click="backPage" icon="el-icon-arrow-left">
                    返回系统页
                </el-button>
            </el-form>
        </div>
        <div class="content_body">
            <router-link :to="{name:'SettingDoctorSayInfo',query:{type:4}}"><img src="../assets/images/template-icon4.png" alt="">
                呼吸助产
            </router-link>
            <!--    <router-link :to="{name:'SettingDoctorSayInfo',query:{type:3}}"><img src="../assets/images/template-icon3.png" alt="">孕周指导-->
            <!--    </router-link>-->
            <router-link :to="{name:'SettingDoctorSayInfo',query:{type:2}}"><img src="../assets/images/template-icon2.png" alt="">提示或建议
            </router-link>
            <router-link :to="{name:'SettingDoctorSayInfo',query:{type:8}}"><img src="../assets/images/template-icon5.png" alt="">呼吸医生建议
            </router-link>
            <router-link :to="{name:'SettingDoctorSayInfo',query:{type:9}}"><img src="../assets/images/template-icon5.png" alt="">情绪调节医生建议
            </router-link>
            <router-link :to="{name:'SettingDoctorSayInfo',query:{type:6}}"><img src="../assets/images/template-icon6.png" alt=""><div style="color:#FFBA03 ">
                总结与印象
            </div>
            </router-link>
            <router-link :to="{name:'SettingDoctorSayInfo',query:{type:7}}"><img src="../assets/images/template-icon7.png" alt=""><div style="color:#FFBA03 ">
                建议
            </div>
            </router-link>
            <router-link :to="{name:'SettingDoctorSayInfo',query:{type:5}}"><img src="../assets/images/template-icon5.png" alt="">测评医生建议
            </router-link>
            <router-link :to="{name:'SettingDoctorSayInfo',query:{type:10}}"><img src="../assets/images/template-icon1.png" alt="">呼吸对比结论
            </router-link>
            <router-link :to="{name:'SettingDoctorSayInfo',query:{type:11}}"><img src="../assets/images/template-icon1.png" alt="">情绪调节对比结论
            </router-link>
        </div>
    </div>

</template>

<script>
export default {
  name: "SettingTemplate",
  data() {
    return {};
  },
  computed: {},
  watch: {},
  methods: {
      backPage() {
          this.$router.go(-1);
      },
  },
}
</script>

<style scoped lang="scss">
.content_body {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  overflow-y: auto;
}

.content_body a {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  width: 20%;
  height: 390px;
  font-size: 24px;
  color: #F5635E;
}

.content_body img {
  min-width: 206px;
  height: 206px;
  margin-bottom: 22px;
  cursor: pointer;
}
</style>
