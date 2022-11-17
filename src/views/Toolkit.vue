<template>
  <div class="content_body">
    <img v-if="check('孕周指导')" src="../assets/images/Toolkit1.png" alt="" @click="$router.push({name:'GestationalAgeChoose'})">
    <img v-if="check('围产记录')" src="../assets/images/Toolkit2.png" alt="" @click="$router.push({name:'AmongRecords'})">
  </div>
</template>

<script>
export default {
  name: "Toolkit",
  data() {
    return {};
  },
  computed: {},
  watch: {},
    mounted() {
        //消息接口
        this.$store.dispatch('GetXiao')
        //获取权限列表
        this.$store.dispatch('GetAuth')
    },
    methods: {
        //检测按钮权限
        check(_name) {
            let show = false
            this.$store.state.auth.map(item => {
                if (item.name === this.$store.state.cmenu) {
                    let child = item.child
                    child.map(item2 => {
                        if (_name === item2.name) {
                            show = true
                        }
                    })
                }
            })
            return show
        },

  },
}
</script>

<style scoped lang="scss">
.content_body {
  padding: 70px;

  > img {
    width: 337px;
    height: 320px;
    margin-right: 25px;
    cursor: pointer;
  }
}
</style>
