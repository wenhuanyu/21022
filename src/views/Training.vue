<template>
    <div>
        <Table :add="true"
               :tableTitle="tableTitle"
               :delete-url="deleteUrl"
               :isAssess="true"
               :pageFooter="true"
               :InfoHref="InfoHref"
               :deleteUrl="deleteUrl"
               :searchUrl="url"
               :statis-href="`AssessStatistics`"
               @add="add()"
               @qrcode="qrcode"
               ref="table"
               :startUrl="startUrl" :suspendUrl="suspendUrl" :endUrl="endUrl"
               :state_title="state_title">
        </Table>
        <!--弹出-->
        <el-dialog custom-class="dialog"
                   title="新建呼吸训练"
                   :visible.sync="dialogFormVisible"
                   :destroy-on-close="true"
                   ref="dialog"
                   @close="onDialogClose"
                   width="80vw"
        >
            <div class="dialog_con">
                <el-form ref="form" :model="form">
                    <!--间值设置-->
                    <div class="slider_con padding-30">
                        <el-row>
                            <!-- 内容左侧-->
                            <el-col :span="12">
                                <!-- 左上-->
                                <el-row>
                                    <el-col :span="3">
                                        <el-form-item label="患者" prop="name"></el-form-item>
                                    </el-col>
                                    <el-col :span="16">
                                        <div>
                                            <el-row>
                                                <el-col :span="12">
                                                    <el-select placeholder="请选择患者"
                                                               v-model="patientListName"
                                                               filterable :filter-method="dataFilter"
                                                               @visible-change="visibleHideSelectInput"
                                                               @change="onPatientChange($event)"
                                                               clearable
                                                    >
                                                        <el-option v-for="item in deviceIdList"
                                                                   :key="item.id"
                                                                   :value="item.id"
                                                                   :label="item.name +'  '+ item.age+'岁'+'  '+item.medical_num"></el-option>
                                                    </el-select>
                                                </el-col>
                                                <el-col :span="12">
                                                    <el-select placeholder="请选择终端"
                                                               v-model="terminal_nickname"
                                                               filterable :filter-method="dataFilterTerminal"
                                                               @visible-change="visibleHideSelectInputTerminal"
                                                               @change="hanldClickTerminal($event)"
                                                               style="width: 100%;"
                                                               clearable
                                                    >
                                                        <el-option v-for="item in terminalIdList"
                                                                   :key="item.id"
                                                                   :value="item.id"
                                                                   :label="item.nickname"></el-option>
                                                    </el-select>
                                                </el-col>
                                            </el-row>
                                            <div class="space-30"></div>
                                            <el-row style="cursor: pointer">
                                                <template>
                                                    <el-table :data="add_newList"
                                                              :show-header="false"
                                                              border>
                                                        <el-table-column>
                                                            <template slot-scope="scope">
                                                                <div>
                                                                    {{
                                                                        scope.row.patient_ + ' ' + scope.row.patient_num
                                                                    }}
                                                                </div>
                                                            </template>
                                                        </el-table-column>
                                                        <el-table-column prop="terminal_">
                                                            <template slot-scope="scope">
                                                                <img src="../assets/images/delete.png"
                                                                     class="pull-right"
                                                                     @click="deleteRow(scope.$index, tableData)"/>
                                                                <div>{{ scope.row.terminal_ }}</div>
                                                            </template>
                                                        </el-table-column>
                                                    </el-table>
                                                </template>
                                            </el-row>
                                        </div>
                                    </el-col>
                                    <el-col :span="4">
                                        <div class="new-evaluationPatient_add" @click="add_new">添加</div>
                                    </el-col>
                                </el-row>
                            </el-col>
                            <!-- 内容右侧-->
                            <el-col :span="11" :offset="1">
                                <el-row>
                                    <el-col :span="6">
                                        <el-form-item label="训练方案" prop="name"></el-form-item>
                                    </el-col>
                                    <el-col :span="18">
                                        <el-row>
                                            <el-col :span="14">
                                                <el-select v-model="programme_options_name" placeholder="请选择"
                                                           class="select_prev" @change="onProgrammeChange($event)">
                                                    <el-option v-for="item in programme_options"
                                                               :key="item.id"
                                                               :label="item.name"
                                                               :value="item.id">
                                                    </el-option>
                                                </el-select>
                                            </el-col>
<!--                                            <el-col :span="1"><span class="line">-</span></el-col>-->
<!--                                            <el-col :span="8">-->
<!--                                                <el-select v-model="difficulty_options_name" placeholder="请选择"-->
<!--                                                           class="select_min" @change="onDifficulty($event)">-->
<!--                                                    <el-option v-for="item in difficulty_options"-->
<!--                                                               :key="item.id"-->
<!--                                                               :label="item.name"-->
<!--                                                               :value="item.id">-->
<!--                                                    </el-option>-->
<!--                                                </el-select>-->
<!--                                            </el-col>-->
                                        </el-row>
                                        <el-row>
                                            <div class="slider_btm">
                                                <div class="scrollbar">
                                                    <el-row>
                                                        <el-col class="slider_list">
                                                            <div v-for="item in gameList" style="width: 45%">
                                                                <video v-if="item.type == 6" :src=item.game_cover></video>
                                                                <img v-else :src=item.game_cover alt="">
                                                                <p>{{ item.game_name }}</p>
                                                            </div>
                                                        </el-col>
                                                    </el-row>
                                                </div>
                                            </div>
                                        </el-row>
                                    </el-col>
                                </el-row>
                            </el-col>
                        </el-row>
                    </div>
                </el-form>
            </div>
            <div slot="footer" class="dialog-footer padding-30 no-padding-left no-padding-right no-padding-top">
                <el-button type="warning" round style="margin-right:20px" @click="dialogFormVisible = false">取消
                </el-button>
                <el-button type="primary" round style="margin-right:100px" @click="buttonSubmit">完成</el-button>
            </div>
        </el-dialog>
    </div>
</template>


<script>
import Table from "../components/Table";

export default {
    name: "Training",
    components: {
        Table
    },
    data() {
        return {
            state_title: true,
            tableTitle: [
                {
                    name: '编号',
                    value: 'num',
                    width: 130
                },
                {
                    name: '患者',
                    value: 'patient_name',
                    width: 150
                },
                {
                    name: '终端',
                    value: 'term_name',
                    width: 200
                },
                {
                    name: '训练时间',
                    value: 'create_time',
                    width: 300
                }, {
                    name: '训练名称',
                    value: 'program_name',
                    width: 300
                },
                // {
                //     name: '难易级别',
                //     value: 'level_name',
                //     width: 180
                // },
                {
                    name: '状态',
                    value: 'status_text',
                    width: 130
                }
            ],
            url: 'api/breath/lst',
            startUrl: 'api/breath/start',
            suspendUrl: 'api/breath/suspend',
            endUrl: 'api/breath/end',
            deleteUrl: 'api/breath/delete',
            InfoHref: 'BreathingDetail',
            tableData: [],
            qrDialog: false,
            currentRow: '',
            dialogFormVisible: false,
            form: {
                'patient_ids': [],
                'terminal_ids': [],
                "program_id": ''
            },
            addForm: {
                name: ''
            },
            infoForm: [],
            papeForm: [],
            // 训练方案
            programme_options: [],
            programme_options_name: '',
            programme_options_id: '',
            difficulty_options: [],
            difficulty_options_name: '',
            // difficulty_options_id: '',
            terminalList: [],
            terminal_nickname: '',
            patientList: [],
            patientListName: '',
            add_newList: [],
            patient_id: '',
            terminal_id: '',
            patient_id_name: '',
            terminal_id_name: '',
            music: '',
            musicList: [],
            gameList: [],
            patient_num: '',
            terminalIdList:[],
            deviceIdList:[],
        };
    },
    computed: {},
    watch: {},
    mounted() {
        this.getTerminal();
        this.onPatient();
        this.getMusic();
        this.getProgramme();
    },
    methods: {
        // 自定义筛选方法
        dataFilter(val) {
            if (val) {
                let filterResult = [];
                let originalData = JSON.parse(JSON.stringify(this.patientList));
                originalData.filter((item) => {
                    if (item.medical_num.includes(val) || item.name.includes(val)) {
                        filterResult.push(item);
                    }
                })
                this.deviceIdList = filterResult

            } else {
                this.deviceIdList = this.patientList;
            }
        },
        // 当下拉框出现时触发
        visibleHideSelectInput(val) {
            if(val) {
                this.deviceIdList = JSON.parse(JSON.stringify(this.patientList));
            }
        },
        // 自定义筛选方法
        dataFilterTerminal(val) {
            if (val) {
                let filterResult = [];
                let originalData = JSON.parse(JSON.stringify(this.terminalList));
                originalData.filter((item) => {
                    if (item.nickname.includes(val)) {
                        filterResult.push(item);
                    }
                })
                this.terminalIdList = filterResult

            } else {
                this.terminalIdList = this.terminalList;
            }
        },
        // 当下拉框出现时触发
        visibleHideSelectInputTerminal(val) {
            if(val) {
                this.terminalIdList = JSON.parse(JSON.stringify(this.terminalList));
            }
        },
        onDialogClose() {
            this.add_newList = [];
            this.patientListName = '';
            this.terminal_nickname = '';
            this.programme_options_name = '';
            this.difficulty_options_name = ''
            this.gameList = []
        },
        // 删除
        deleteRow(index, rows) {
            this.add_newList.splice(index, 1)
        },

        onPatientChange(e) {
            this.patient_id = e
            this.patient_id_name = e ? this.patientList.find(ele => ele.id === e).name : ''
            this.patient_id_num = e ? this.patientList.find(ele => ele.id === e).medical_num : ''
            console.log(this.patient_id_name)
        },

        add_new() {
            if(this.patientListName == '') {
                this.$message.error('请选择患者');
                return;;
            }
            if(this.terminal_nickname == '') {
                this.$message.error('请选择终端');
                return;;
            }
            if (this.patientListName && this.terminal_nickname) {

                for (let i = 0; i < this.add_newList.length; i++) {
                    let item = this.add_newList[i];
                    if (item.patient_id === this.patient_id) {
                        this.$message.error('该用户已被指定');
                        return;
                    }

                    if (item.terminal_id === this.terminal_id) {
                        this.$message.error('该终端已被使用');
                        return;
                    }
                }

                this.add_newList.push({
                    patient_: this.patient_id_name,
                    patient_id: this.patient_id,
                    terminal_id: this.terminal_id,
                    terminal_: this.terminal_id_name,
                    patient_num: this.patient_id_num
                })
            }

            console.log(this.add_newList)
        },
        async onPatient() {
            await this.$axios.post('api/patient/index', this.$qs.stringify({
                type: 1,
            })).then(res => {
                if (res.data.code == 1) {
                    this.patientList = res.data.data
                }
            })
        },
        getTerminal() {
            this.$axios.post('api/common/termLst').then(res => {
                if (res.data.code === 1) {
                    var terminalListId = {};
                    this.terminalList = res.data.data.map(item => {
                        terminalListId[item.id] = item;
                        return item;
                    })
                    this.terminalListId = terminalListId
                }
            })
        },
        selectTerminal() {
            if (this.curindex === 0) {
                this.$message({
                    type: 'info',
                    message: '请选择终端'
                })
                return;
            }

            this.infoForm.push({'user': this.userInfo, 'terminal': this.curInfo});
            this.closeDialog()
        },
        hanldClickTerminal(e) {
            let isSelect = false;
            this.infoForm.map(infoI => {
                if (infoI.terminal.id == e.id) {
                    isSelect = true
                    return;
                }
            })
            if (isSelect) {
                this.$message({
                    type: 'info',
                    message: '终端已被选'
                })
                return;
            }
            this.curindex = e.id;
            this.curInfo = e

            // console.log(e)
            this.terminal_id = e
            this.terminal_id_name = e ? this.terminalList.find(ele => ele.id === e).nickname : ''
            console.log(111, this.terminal_id_name)
        },
        deleteInfo(key) {
            this.infoForm.splice(key, 1)
        },
        async buttonSubmit() {
            let patient_ids = [];
            let terminal_ids = [];

            this.add_newList.map(item => {
                patient_ids.push(item.patient_id)
            })
            console.log(patient_ids)

            this.add_newList.map(item => {
                terminal_ids.push(item.terminal_id)
            })
            // console.log(terminal_ids)

            console.log(this.programme_options_id)

            console.log(this.form.patient_id)
            await this.$axios.post('api/breath/add', this.$qs.stringify({
                patient_ids: patient_ids.join(','),
                terminal_ids: terminal_ids.join(','),
                program_id: this.programme_options_id,
                // level_id: this.difficulty_options_id
            })).then(res => {
                if (res.data.code === 1) {
                    this.dialogFormVisible = false
                    this.Refresh()
                }
                console.log(res.data.info)
            })
            console.log(patient_ids)

        },
        Refresh() {
            this.$refs.table.onRefresh()
        },
        async getMusic() {
            await this.$axios.post('api/common/music_lst',).then(res => {
                if (res.data.code === 1) {
                    this.musicList = res.data.data;
                }
            })
        },

        async getProgramme() {
            await this.$axios.post('api/common/breath_lst',).then(res => {
                if (res.data.code === 1) {
                    this.programme_options = res.data.data
                }
            })
        },
        onProgrammeChange(e) {
            console.log(e)
            this.programme_options_id = e

            this.$axios.post('api/common/breath_level_lst', this.$qs.stringify({program_id: this.programme_options_id})).then(res => {
                console.log(res.data)
                if (res.data.code === 1) {
                    this.difficulty_options = res.data.data
                }
                console.log(this.difficulty_options)
            })

            this.$axios.post('api/common/breath_detail', this.$qs.stringify({program_id: this.programme_options_id})).then(res => {
                if (res.data.code === 1) {
                    this.gameList = res.data.data
                }
                console.log(this.gameList)
            })

        },
        // onDifficulty(e) {
        //     console.log(e)
        //     this.difficulty_options_id = e
        // },
        qrcode(row) {
            this.currentRow = row;
            this.qrDialog = true;
        },
        add() {
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
/*弹框*/
::v-deep {
    .dialog {
        //width: 80%;
        //height: 75%;
        display: flex;
        flex-direction: column;

        .el-dialog__header {
            padding: 20px 40px 0 40px;
        }

        .el-dialog__title {
            font-size: 28px;
            font-weight: 600;
            color: #333333;
            line-height: 40px;
            width: 100%;
            margin-bottom: 22px;
        }

        .el-dialog__body {
            flex: 1;
            overflow: auto;
            padding: 30px 39px;

            .dialog_con {
                border-radius: 4px;
                border: 1px solid #F5605A;
                height: 100%;

                .dialog_left, .dialog_right {
                    p {
                        font-size: 24px;
                        font-weight: 600;
                        color: #333333;
                        line-height: 33px;
                    }
                }

                .el-select {
                    //width: 100%;
                }


                .el-form-item {
                    font-size: 24px;
                    font-weight: 600;
                    color: #333333;
                }

                .el-form-item__label {
                    text-align: left;
                    font-size: 24px;
                    font-weight: 600;
                    color: #333333;
                }

                .line {
                    height: 1px;
                    color: #CDCDCD;
                    margin: 0 6px;
                    line-height: 35px;
                }


                .slider_btm {
                    width: 100%;
                    height: 300px;
                    margin-top: 25px;
                    overflow: auto;
                    cursor: pointer;

                    .scrollbar {
                        width: 100%;
                        height: 100%;
                        margin: 0 auto;

                        .slider_list {
                            div {
                                width: 100%;
                                height: 100%;
                                float: left;
                                text-align: center;
                                line-height: 60px;
                                margin-bottom: 15px;

                                img {
                                    width: 100%;
                                    height: 105px;
                                    display: block;
                                }
                                video {
                                    width: 100%;
                                    height: 105px;
                                    display: block;
                                }
                                p {
                                    width: 100%;
                                    height: 30px;
                                    text-align: center;
                                    font-size: 16px;
                                    font-weight: 400;
                                    color: #F5605A;
                                    border: 1px solid #FFE6E5;
                                    background: #FFE6E5;
                                    line-height: 30px;
                                    display: -webkit-box;
                                    -webkit-box-orient: vertical;
                                    -webkit-line-clamp: 1;
                                    overflow: hidden;
                                }
                            }

                        }

                        .slider_list div:nth-child(odd) {
                            margin-right: 15px;
                        }

                        .slider_list:nth-child(even) {
                            margin-right: 5px;
                        }

                    }
                }
            }

            .new-evaluationPatient_add {
                width: 90%;
                height: 35px;
                background: #F5605A;
                box-shadow: 0 0 0 0 rgba(0, 0, 0, 0.02);
                border-radius: 2px;
                font-size: 16px;
                font-weight: bold;
                color: #FFFFFF;
                display: flex;
                align-items: center;
                justify-content: center;
                border: none;
                margin-left: 10px;
                margin-top: 2px;
            }

            .el-form-item__content {
                margin-left: 0 !important;
            }

        }

        .el-table__body-wrapper {
            height: 100%;
            overflow: auto;
        }

        .el-table--border {
            width: 100%;
            height: 193px;
            overflow: auto;
        }

        .slider_btm::-webkit-scrollbar, .el-table__body-wrapper::-webkit-scrollbar {
            display: block;
            width: 9px;
            height: 1px;
        }

        .slider_btm::-webkit-scrollbar-thumb, .el-table__body-wrapper::-webkit-scrollbar-thumb {
            /*滚动条里面小方块*/
            border-radius: 10px;
            background: #D8D8D8;;
        }

        .slider_btm::-webkit-scrollbar-track, .el-table__body-wrapper::-webkit-scrollbar-track {
            /*滚动条里面轨道*/
            background: #F7F7F7;
            border-radius: 10px;
        }
    }
}


</style>
