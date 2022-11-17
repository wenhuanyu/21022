<template>
    <div>
        <Table
            :breathId="true"
            :searchTime="false"
            :add="true"
            :edit="true"
            :searchInput ="false"
            :searchBtn="false"
            @edit="edit"
            :deleteUrl="deleteUrl"
            :searchUrl="url"
            :tableTitle="tableTitle"
            :delete-url="deleteUrl"
            :page-footer="true"
            @add="add()"
            ref="table"
            :back="{}"
        >
        </Table>
        <!--弹出-->
        <el-dialog class="new-dialog" title="添加方案级别" :visible.sync="dialogFormVisible" @close="onDialogClose">
            <el-form :model="addForm">
                <el-form-item label="级别名称" label-width="120px"  >
                    <el-input v-model="addForm.name" autocomplete="off" placeholder="请输入级别名称"></el-input>
                </el-form-item>
                <el-form-item label="起始阈值" label-width="120px"  >
                    <el-input v-model="addForm.start_value" autocomplete="off" placeholder="请输入起始阈值"></el-input>
                </el-form-item>
                <el-form-item label="结束阈值" label-width="120px"  >
                    <el-input v-model="addForm.end_value" autocomplete="off" placeholder="请输入结束阈值"></el-input>
                </el-form-item>
                <el-form-item label="呼吸频率" label-width="120px"  >
                    <el-input v-model="addForm.breath_freq" autocomplete="off" placeholder="请输入呼吸频率"></el-input>
                </el-form-item>
                <el-form-item label="小球速度" label-width="120px"  >
                    <el-input v-model="addForm.ball_speed" autocomplete="off" placeholder="请输入小球速度"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false" round>取 消</el-button>
                <el-button type="primary" @click="onAdd" round style="background-color: #FF7D78 ; border-color: #FF7D78;">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>


<script>
import Table from "../components/Table";

export default {
    name: "Emotion",
    components: {
        Table
    },
    props:{
        width: {
            type: String,
            default:'75%'
        }
    },
    data() {
        return {
            Data:[],
            tableTitle: [
                {
                    name: '名称',
                    value: 'name',
                    width: 230
                },
                {
                    name: '起始阈值',
                    value: 'start_value',
                    width: 230
                },
                {
                    name: '结束阈值',
                    value: 'end_value',
                    width: 230
                },
                {
                    name: '呼吸频率',
                    value: 'breath_freq',
                    width: 230
                },
                {
                    name: '小球速度',
                    value: 'ball_speed',
                    width: 230
                }
            ],
            url: 'api/breath_policy/emotion_level_list',
            deleteUrl: 'api/breath_policy/delete_emotion_level',
            tableData: [],
            dialogFormVisible: false,
            form: {
            },
            addForm: {
                name: '',
                start_value:'',
                end_value:'',
                breath_freq:'',
                ball_speed:''
            },
            type:'',
            level_id:'',
        };
    },
    computed: {},
    watch: {},
    mounted() {
    },
    methods: {
        edit(row) {
            console.log('row',row)
            this.dialogFormVisible = true
            this.addForm.name = row.name
            this.addForm.start_value = row.start_value
            this.addForm.end_value = row.end_value
            this.addForm.breath_freq = row.breath_freq
            this.addForm.ball_speed = row.ball_speed
            this.level_id = row.id
        },
        async onAdd() {
            let url = ''
            if(this.level_id !=='') {
                url = 'api/breath_policy/edit_emotion_level'
                this.addForm.level_id = this.level_id
            } else {
                url = 'api/breath_policy/add_emotion_level'
            }
            this.addForm.breath_id   = this.$route.query.id
            await this.$axios.post(url,this.$qs.stringify(this.addForm)).then(res => {
                this.dialogFormVisible = false
                this.$refs.table.onSubmit()
                this.addForm.name = ''
                this.addForm.start_value = ''
                this.addForm.end_value = ''
                this.addForm.breath_freq = ''
                this.addForm.ball_speed = ''
                this.level_id = ''
            })
        },

        onDialogClose() {

        },
        async details(row) {
            await this.$axios.post('api/emotion/detail', {
                id:row.id
            }).then(res => {
                if (res.data.code == 1) {
                    this.Data = res.data.data
                }
            })
        },
        Refresh() {
            this.$refs.table.onRefresh()
        },
        add() {
            this.addForm.name = ''
            this.addForm.start_value = ''
            this.addForm.end_value = ''
            this.addForm.breath_freq = ''
            this.addForm.ball_speed = ''
            this.level_id = ''
            this.dialogFormVisible = true
        },
        // 按钮弹窗
        dialog_btn() {
            let _that = this
            _that.dialogFormVisible = true;     // alert('cap')
        },
    },
}
</script>


<style scoped lang="scss">
::v-deep {
    .el-dialog {
        width: 30%;
    }
}
</style>
