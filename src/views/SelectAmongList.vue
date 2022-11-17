<template>
    <div>
        <Table :page-footer="true"
               add-href=""
               :search-url="url"
               :tableTitle="tableTitle"
               :add="false"
               :refresh='false'
               :setting="false"
               :rightBtn="true"/>

    </div>
</template>
<script>
import Table from "../components/Table";


export default {
    name: "SelectAmongList",
    components: {Table},
    data() {
        return {
            tableTitle: [
                {
                    name: '编号',
                    value: 'id'
                },
                {
                    name: '姓名',
                    value: 'name'
                },
                {
                    name: '性别',
                    value: 'gender',
                    formatter: (row) => {
                        if (row.gender == 0) {
                            return '男';
                        } else {
                            return '女';
                        }
                    }
                },
                {
                    name: '年龄',
                    value: 'age'
                },
                {
                    name: '病历号',
                    value: 'medical_num',
                },
                {
                    name: '医保号',
                    value: 'medical_insurance_num'
                },
                {
                    name: '患者来源',
                    value: 'source'
                },
                {
                    name: '入院时间',
                    value: 'in_time_text',
                    width: '180',
                }],
            url: 'api/patient/index',
        };
    },
    computed: {},
    watch: {},
    methods: {
        add() {
        }
    },
    mounted() {
    }
}
</script>

<style scoped>

</style>
