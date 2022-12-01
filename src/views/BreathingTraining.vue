// 呼吸训练报告
<template>
    <div>
        <Table :tableTitle="tableTitle"
               :pageFooter="true"
               :InfoHref="InfoHref"
               :deleteUrl="'api/breath/delete'"
               :searchUrl="url"
               :statis-href="`AssessStatistics`"
               :add="false"
               :report="true"
               :reportHref="reportUrl"
               :form="form"
               :back="{}"
               :tableType = "2"/>

    </div>
</template>

<script>
import Table from "../components/Table";

export default {
    name: "BreathingTraining",
    components: {Table},
    data() {
        return {
            tableTitle: [
                {
                    name: '编号',
                    value: 'num'
                },
                {
                    name: '测试时间',
                    value: 'create_time',

                },
                {
                    name: '训练名称',
                    value: 'program_name'
                }],
            url: 'api/breath/lst',
            InfoHref: 'BreathingDetail',
            reportUrl:'BreathingDetail',
            form:{
                type:''
            }
        };
    },
    computed: {},
    watch: {},
    methods: {
        add() {
        },
        removeBtn(ids) {
            console.log(ids)
        }
    },
    mounted() {
        //消息接口
        this.$store.dispatch('GetXiao')
        if(this.$route.query.type) {
            this.form.type = this.$route.query.type
        }
        sessionStorage.setItem("detail_", true);
    }
}
</script>

<style scoped>

</style>
