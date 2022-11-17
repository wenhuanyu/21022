<template>
    <div class="content">
        <div class="content_body">
            <div class="print_html" ref="print" id="print">
                <div class="title">
                    <img :src="form.hospital_info.logo">
                    <div>
                        <p>{{form.hospital_info.hospital_name}}</p>
                        <span>{{form.hospital_info.second_name}}</span>
                    </div>
                </div>
                <div class="table-name">
                    <p></p>
                    <p style="font-size: 28px;">{{form.program_name}}</p>
                    <div>
                        <p class="no-print"></p>
                    </div>
                </div>
                <div class="print-body">
                    <div class="first">
                        <div class="first-group">
                            <div class="row">
                                <span>姓名</span>
                                <p>{{form.patient_info.name}}</p>
                            </div>
                            <div class="row">
                                <span>病历号</span>
                                <p>{{form.patient_info.medical_num}}</p>
                            </div>
                            <div class="row">
                                <span>入院时间</span>
                                <p>{{form.patient_info.in_time}}</p>
                            </div>
                            <div class="row">
                                <span>婚姻状态</span>
                                <p>{{form.patient_info.marriage_id}}</p>
                            </div>
                        </div>
                        <div class="first-group">
                            <div class="row">
                                <span>性别</span>
                                <p>{{form.patient_info.gender == 1 ? '女' : '男'}}</p>
                            </div>
                            <div class="row">
                                <span>医保号</span>
                                <p>{{form.patient_info.medical_insurance_num}}</p>
                            </div>
                            <div class="row">
                                <span>学历信息</span>
                                <p>{{form.patient_info.education_id}}</p>
                            </div>
                            <div class="row">
                                <span>训练时间</span>
                                <p>{{form.patient_info.exam_time}}</p>
                            </div>

                        </div>
                        <div class="first-group">
                            <div class="row">
                                <span>年龄</span>
                                <p>{{form.patient_info.age}}</p>
                            </div>
                            <div class="row">
                                <span>患者来源</span>
                                <p>{{form.patient_info.source}}</p>
                            </div>
                            <div class="row">
                                <span>职业信息</span>
                                <p>{{form.patient_info.occupation_id}}</p>
                            </div>
                            <div class="row">
                                <span>完成时间</span>
                                <p>{{form.patient_info.complete_time}}</p>
                            </div>

                        </div>
                    </div>
                    <div class="print-row" v-if="showBar=printData[0].value"
                         style="display: flex;justify-content: center;flex-direction:column;align-items: center;padding-left: 0;padding-right: 0;">
                        <div class="table_title">心率波形显示图</div>
                        <div class="charts-wrap">
                            <div id="myChart_heart" :style="{width: '1000px', height: '300px',marginTop:'40px'}"></div>
                        </div>
                    </div>
                    <div class="print-row" style="padding: 30px" v-if="showBar=printData[2].value">
                        <div class="table-name">
                            <p></p>
                            <p class="print-row_title">结论评语</p>
                            <div>
                                <p class="no-print"></p>
                            </div>

                        </div>
                        <div style="margin-bottom: 30px;font-size: 22px" v-if="form.conclusion[0].status">
                            <div style=" margin-bottom: 10px" class="flex"><span>{{form.conclusion[0].title}}</span><span style="display: block; color: #F5605A;margin-left: 8px;">{{form.conclusion[0].score}}</span></div>
                        </div>
                        <div style="margin-bottom: 30px;font-size: 22px" v-if="form.conclusion[1].status">
                            <div style=" margin-bottom: 10px" class="flex"><span>{{form.conclusion[1].title}}</span><span style="display: block; color: #F5605A;margin-left: 8px;">{{form.conclusion[1].score}}</span></div>
                            <div style="margin-bottom: 20px; width: 800px;">
                                <div class="flex" style="position: relative">
                                    <div class="f1" style="background-color: #FF0200;"></div>
                                    <div class="f1" style="background-color: #FEFF00;"></div>
                                    <div class="f1" style="background-color: #04B1F0;"></div>
                                    <div class="f1" style="background-color: #00B051;"></div>
                                    <div class="yuan" v-bind:style="{left: weizhi}"></div>
                                </div>
                                <div class="flex flex-justify-content-between">
                                    <div>0</div>
                                    <div style="margin-left: 25px">50</div>
                                    <div style="margin-left: 28px">100</div>
                                    <div style="margin-left: 10px">141</div>
                                    <div>180</div>
                                </div>
                            </div>
                            <div style="font-weight: bold;margin-bottom: 10px;">解释说明</div>
                            <div style="font-weight: 400" v-html="form.conclusion[1].desc"></div>
                        </div>
                        <div style="margin-bottom: 30px; font-size: 22px" v-if="form.conclusion[2].status">
                            <div style="margin-bottom: 10px" class="flex"><span>{{form.conclusion[2].title}}</span><span style="display: block; color: #F5605A;margin-left: 8px;">{{form.conclusion[2].score}}</span></div>
                            <div style="margin-bottom: 20px; width: 800px;">
                                <div class="flex" style="position: relative">
                                    <div class="f1" style="background-color: #FF0200;"></div>
                                    <div class="f1" style="background-color: #FEFF00;"></div>
                                    <div class="f1" style="background-color: #04B1F0;"></div>
                                    <div class="f1" style="background-color: #00B051;"></div>
                                    <div class="yuan" v-bind:style="{left: weizhi1}"></div>
                                </div>
                                <div class="flex flex-justify-content-between">
                                    <div>0</div>
                                    <div style="margin-left: 25px">50</div>
                                    <div style="margin-left: 28px">100</div>
                                    <div style="margin-left: 10px">127</div>
                                    <div>162</div>
                                </div>
                            </div>
                            <div style="font-weight: bold;margin-bottom: 10px;">解释说明</div>
                            <div style="font-weight: 400" v-html="form.conclusion[2].desc"></div>
                        </div>
                        <div style="font-size: 22px" v-if="form.conclusion[3].status">
                            <div style="margin-bottom: 10px" class="flex"><span>{{form.conclusion[3].title}}</span><span style="display: block; color: #F5605A;margin-left: 8px;">{{form.conclusion[3].score}}</span></div>
                            <div style="margin-bottom: 20px; width: 800px;">
                                <div class="flex" style="position: relative">
                                    <div class="f1" style="background-color: #FF0200;"></div>
                                    <div class="f1" style="background-color: #FEFF00;"></div>
                                    <div class="f1" style="background-color: #04B1F0;"></div>
                                    <div class="f1" style="background-color: #00B051;"></div>
                                    <div class="yuan" v-bind:style="{left: weizhi2}"></div>
                                </div>
                                <div class="flex flex-justify-content-between">
                                    <div>0</div>
                                    <div style="margin-left: 15px">10</div>
                                    <div style="margin-left: 15px">20</div>
                                    <div>30</div>
                                    <div>39</div>
                                </div>
                            </div>
                            <div style="font-weight: bold;margin-bottom: 10px;">解释说明</div>
                            <div style="font-weight: 400" v-html="form.conclusion[3].desc"></div>
                        </div>
                    </div>
                    <div class="print-row" style="padding: 30px" v-if="showBar = printData[3].value">
                        <div class="print-row">
                            <div class="table-name">
                                <p></p>
                                <p class="print-row_title">医生建议</p>
                                <div>
                                    <p class="no-print">
                                    </p>
                                </div>
                            </div>
<!--                            <textarea ref="test_one" class="report-text-content"  v-html="doctor_proposal" style="height: 0"></textarea>-->
                            <div v-html="doctor_proposal" class="report-text-content" style="font-weight: normal;white-space:pre-wrap;" contenteditable="true"></div>

                        </div>
                    </div>
                    <div class="print-last-row">
                        <div class="group">
                            <span>操作员：</span>
                            <p>{{ form.user_img === "" ? form.user : '' }}</p>
                            <p><img style="height: 55px" :src="form.user_img"></p>
                        </div>
                        <div class="group">
                            <span>检测时间：</span>
                            <p></p>
                        </div>
                    </div>
                </div>
                <div class="tip">***本报告不对任何决定负责！应为被试的报告内容保密！***</div>

            </div>
        </div>
    </div>
</template>

<script>
import html2canvas from 'html2canvas';
import $ from 'jquery'
export default {
    name: "BreathingDetailReport",
    data() {
        return {
            printObj: {
                id: "print",//要打印的id名 无#号
                popTitle:'&nbsp;',//页眉标题 默认浏览器标题 空字符串时显示undefined 使用html语言
                extraHead:'&nbsp;',//头部文字 默认空
            },
            xiugai:[],
            concl_list:[],
            conclusion_:[],
            conclusion: false,
            isFinished: false,
            info: [],
            detailForm: [],
            printForm: [],
            district: [],
            printer: [],
            printData: [
                {id: '1', name: '是否打印图片', value: false},
                {id: '2', name: '患者详细数据打印', value: false},
                {id: '3', name: '结论评语', value: false},
                {id: '4', name: '医生建议', value: false},
            ],
            infoData: [],
            dialogPrint: false,
            dialogIpt: false,
            doctorAdvised: '',
            current: {},
            currentMethod: '',
            dialogProposal: false,
            doctorProposalList: '',
            doctorProposal: '',
            dialogReport: false,
            wardList: [],
            maritalStatusArr:[],
            educationInformationArr:[],
            careerInformationArr:[],
            printPageSize: '',
            displayBlock: '2',
            Block:"1",
            dialogPreview: false,
            previewImg: '',
            print_page: 1,
            modifyTitle: {title: '医生建议', type: 8, field: 'doctor_proposal'},
            templateText: '',
            isShow: false,
            showBar:'',
            form: '',
            showEdit: '',
            zhi:'',
            hrv:true,
            rate:true,
            doctor_proposal:'',
            weizhi:'',
            weizhi1:'',
            weizhi2:'',
            emotion:[],
            imageName:'',
        }
    },
    async mounted() {
        let data = this.$route.query.liangbiao_id
        this.emotion = data.split(',')
        console.log('this.emotion',this.emotion)
        this.imageName = this.emotion[6]
        await this.getInfo()
        await this.getPrinter();
        sessionStorage.setItem("detail", true);
    },
    watch:{
        doctor_proposal(nv,ov) {
            if (nv === ov) {
                return
            }
            this.doctor_proposal = nv
            // this.changeHeight()
        }
    },
    methods: {
        //进入页面  接口调完生成图片  base64
        async shengcheng() {
            // console.log('ReportPage111',11111)
            setTimeout(() => {
                let content = this.$refs.print
                let scrollHeight = content.scrollHeight
                let scrollWidth = content.scrollWidth
                html2canvas(content,{
                    allowTaint: true,
                    useCORS: true
                    // scale: window.devicePixelRatio*2,
                    // useCORS: true , //开启跨域配置，但和allowTaint不能共存
                    // width:scrollWidth,
                    // height:scrollHeight,
                    // windowWidth:scrollWidth,
                    // windowHeight:scrollHeight,
                    // x:0,
                    // y:window.pageYOffset
                }).then(canvas => {
                    let dataURL = canvas.toDataURL("image/png");
                    // console.log('ReportPagedataURL',dataURL)
                    // console.log('this.imageName',this.imageName)
                    let data = {}
                    data.dataURL = dataURL
                    data.name = this.imageName
                    data.pdfname = this.emotion[0]+this.emotion[2]
                    // console.log('data',data)
                    //这个uploadFile 根据自己上传接口的名字写
                    this.$axios.post('api/Zipreport/upload', {
                        ...data
                    }).then(res => {
                        // console.log('ReportPageres',res)
                    });
                });
            },10000)
        },
        changeHeight () {
            let _this = this
            this.$nextTick(() => {
                let textArea = _this.$refs.test_one
                let scrollHeight = textArea.scrollHeight // 控件所有的高度，包含滚动的那部分(不可见也会有高度)
                let height = textArea.offsetHeight // 屏幕上显示的高度
                if (height <= scrollHeight) {
                    textArea.style.height = 'auto' // 恢复默认值，这个作用就是根据内容自适应textarea高度
                    textArea.style.height = textArea.scrollHeight + 'px' // 拿到最新的高度改变textarea的高度
                }else {
                    textArea.style.height = 'auto' // 恢复默认值，这个作用就是根据内容自适应textarea高度
                }
            })
        },
        /**
         * 打印预览
         */
        printPreview() {
            let $printNone = $('.print-none').hide();
            let dialog     = this.$loading('请稍后...');
            html2canvas(this.$refs.print,{
                allowTaint: true,
                useCORS: true
            })
            .then(canvas => {
                let dom           = document.body.appendChild(canvas);
                dom.style.display = 'none';

                let a           = document.createElement('a');
                a.style.display = 'none';
                document.body.removeChild(dom);

                this.previewImg    = URL.createObjectURL(this.dataURLToBlob(dom.toDataURL('image/png')));
                this.dialogPreview = true;
                $printNone.hide();
                dialog.close();
                $('.print-none_').show();
            });
        },
        /**
         * data转URLBlob
         * @param data
         * @returns {Blob}
         */
        dataURLToBlob(data) {
            let arr   = data.split(',');
            let mime  = arr[0].match(/:(.*?);/)[1];
            let bstr  = atob(arr[1]);
            let n     = bstr.length;
            let u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new Blob([u8arr], {type: mime});
        },


        // 调取接口
        async getInfo() {
            let params = {
                breath_id: this.emotion[0],
                patient_id:this.emotion[2],
                hospital_id:this.emotion[3],
                user_id:this.emotion[4],
                app:this.emotion[5]
            }
            await this.$axios.post('api/Zipreport/breath_report', this.$qs.stringify(params)).then(res => {
                let result = res.data
                if (result.code === 1) {
                    this.form = result.data
                    if (this.form.conclusion[1].score <= 50) {
                        this.weizhi = ((((this.form.conclusion[1].score-0)/50)*25)-1) + '%'
                    }
                    if (this.form.conclusion[1].score > 50 && this.form.conclusion[1].score<=100) {
                        this.weizhi = ((((this.form.conclusion[1].score-50)/50)*25)+24) + '%'
                    }
                    if (this.form.conclusion[1].score > 100 && this.form.conclusion[1].score<=141) {
                        this.weizhi = ((((this.form.conclusion[1].score-100)/41)*25)+49) + '%'
                    }
                    if (this.form.conclusion[1].score > 141 && this.form.conclusion[1].score<=180) {
                        this.weizhi = ((((this.form.conclusion[1].score-141)/39)*25)+74) + '%'
                    }


                    if (this.form.conclusion[2].score <= 50) {
                        this.weizhi1 = ((((this.form.conclusion[2].score-0)/50)*25)-1) + '%'
                    }
                    if (this.form.conclusion[2].score > 50 && this.form.conclusion[2].score<=100) {
                        this.weizhi1 = ((((this.form.conclusion[2].score-50)/50)*25)+24) + '%'
                    }
                    if (this.form.conclusion[2].score > 100 && this.form.conclusion[2].score<=127) {
                        this.weizhi1 = ((((this.form.conclusion[2].score-100)/27)*25)+49) + '%'
                    }
                    if (this.form.conclusion[2].score > 127 && this.form.conclusion[2].score<=162) {
                        this.weizhi1 = ((((this.form.conclusion[2].score-127)/35)*25)+74) + '%'
                    }


                    if (this.form.conclusion[3].score <= 10) {
                        this.weizhi2 = ((((this.form.conclusion[3].score-0)/10)*25)-1) + '%'
                    }
                    if (this.form.conclusion[3].score > 10 && this.form.conclusion[3].score<=20) {
                        this.weizhi2 = ((((this.form.conclusion[3].score-10)/10)*25)+24) + '%'
                    }
                    if (this.form.conclusion[3].score > 20 && this.form.conclusion[3].score<=30) {
                        this.weizhi2 = ((((this.form.conclusion[3].score-20)/10)*25)+49) + '%'
                    }
                    if (this.form.conclusion[3].score > 30 && this.form.conclusion[3].score<=39) {
                        this.weizhi2 = ((((this.form.conclusion[3].score-30)/9)*25)+74) + '%'
                    }
                    this.shengcheng()
                }
            })
        },

        // 打印设置里面的显示设置
        changeRadio(e) {

        },

        /**
         * 获取打印设置
         */
        async getPrinter() {
            await this.$axios.post('api/Zipreport/printer_set_info',{
                hospital_id:this.emotion[3],
                type: 2
            }).then(res => {
                if (res.data.code === 1) {
                    this.printForm     = res.data.data.item.map(item => item);
                    this.printPageSize = res.data.data.paper;
                    this.displayBlock = res.data.data.edit
                }
                this.printData.map(item => {
                    item.value = this.printForm.indexOf(item.id) !== -1;
                })
                this.$forceUpdate();
                 this.$nextTick(() => {
                    this.drawLine();
                });
            });
            if(this.displayBlock == 1){
                this.isShow = true
            }else if(this.displayBlock == 2){
                this.isShow = false
            }
        },


        // echarts图
        drawLine() {
            // 基于准备好的dom，初始化echarts实例
            let myChart_heart = this.$echarts.init(document.getElementById('myChart_heart'))
            var xAxis = []
            if (this.form.x_data.length > 1200) {
                xAxis.push({
                    type: 'category',
                    axisTick: {
                        interval :function (index,value) {
                            console.log(index)
                            if (index%90 ==0 ) {
                                return true;
                            }
                            return false;
                        },
                    },
                    axisLabel: {
                        interval :function (index,value) {
                            if (index%90 ==0 ) {
                                return true;
                            }
                            return false;
                        },
                    },
                    data: this.form.x_data
                })
            } else if (this.form.x_data.length <= 1200 && this.form.x_data.length > 600) {
                xAxis.push({
                    type: 'category',
                    axisTick: {
                        interval :function (index,value) {
                            console.log(index)
                            if (index%60 ==0 ) {
                                return true;
                            }
                            return false;
                        },
                    },
                    axisLabel: {
                        interval :function (index,value) {
                            if (index%60 ==0 ) {
                                return true;
                            }
                            return false;
                        },
                    },
                    data: this.form.x_data
                })
            } else if (this.form.x_data.length <= 600) {
                xAxis.push({
                    type: 'category',
                    axisTick: {
                        interval :function (index,value) {
                            console.log(index)
                            if (index%30 ==0 ) {
                                return true;
                            }
                            return false;
                        },
                    },
                    axisLabel: {
                        interval :function (index,value) {
                            if (index%30 ==0 ) {
                                return true;
                            }
                            return false;
                        },
                    },
                    data: this.form.x_data
                })
            }
            // 绘制图表
            myChart_heart.setOption({
                title: {
                    // text: 'bpm',
                    textStyle: {
                        fontWeight: 'normal',
                        fontSize: 16,
                        textAlign: 'center'
                    }
                },
                tooltip: {},
                xAxis,
                yAxis: {
                    type: 'value'
                },
                series: [{
                    name: '频率',
                    type: 'line',
                    itemStyle: {
                        normal: {
                            lineStyle: {
                                color: '#9291FE'
                            }
                        }
                    },
                    data: this.form.heart_rate
                }]
            })
        }
    }
}
</script>
<style media="print">
@page{
    size :auto;
    margin: 25px;
}
</style>
<style scoped lang="scss">
@media print {
    .no-print {
        display: none;
    }
}
::v-deep{
    .el-radio-group {
        margin-left: 20px;
    }
}
::v-deep .new-dialog span,
::v-deep .new-dialog label {
    font-size: 16px;
}

::v-deep .el-dialog {
    width: 35%;
}

.dialog-footer {
    .el-button {
        border-radius: 25px;
        width: 150px;
    }
}
.f1 {
    width: 200px;
    height: 46px;
}
.yuan {
    width: 16px;
    height: 16px;
    background-color: white;
    border-radius: 50%;
    position: absolute;
    top: 15px;
}
.report-text-content {
    width: 100%;
    display: block;
    font-weight: 400;
    flex: 1;
    font-size: 22px;
    font-family: -apple-system-font, "Helvetica Neue", sans-serif, "Microsoft YaHei";
}
.el-form-item {
    margin-bottom: 10px;
}

.el-form-item:last-child {
    margin-bottom: 0;
}

::v-deep .el-checkbox {
    padding-left: 20px;
    width: 98%;
}

.content_body {
    width: 1200px;
    margin: 0 auto;
    padding: 25px;
    overflow-y: auto;
    @media print {
        overflow: visible;
        height: unset;
    }
}

.remark {
    color: #999;
    font-size: 16px;
    margin: 0;
    text-align: center;

}

.print-html {
    width: 1100px;
    margin: 0 auto;
    @media print {
        width: 700px;
        height: 1200px;
    }
}

.table-name {
    position: relative;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    margin: 0 auto 10px;
    font-size: 16px;
    color: #333;
}

.table-name p {
    font-size: 28px;
    font-weight: bold;
}

.print-html .edit-btn {
    color: #FF6B6B;
    position: absolute;
    right: 0;
    cursor: pointer;
    @media print {
        display: none;
    }
}


.print-body .row {
    display: flex;
    align-items: center;
    font-size: 20px;
    color: #333;
    padding-left: 25px;
    margin-bottom: 5px;
}

.print-body .first > .first-group span {
    width: 80px;
    text-align-last: justify;
}

.print-body .first > .first-group p {
    margin-left: 15px;
    font-weight: bold;
}

.print-last-row,
.first,
.print-row {
    border-bottom: 1px solid #E6E6E6;
}
.print-row {
    padding: 10px 25px;
    color: #333;
    font-size: 20px;
    font-weight: bold;
    > p {
        font-size: 18px;
    }
}

.print-row .title {
    text-align: center;
    line-height: 50px;
}

.print-last-row {
    padding: 10px 55px;
    display: flex;
    align-items: center;
    justify-content: center;
}
.print-last-row .group {
    flex: 1;
    display: flex;
    line-height: 55px;
    font-size: 20px;
}
.group > p {
    margin-left: 15px;
    font-weight: bold;
}
.check-result {
    display: flex;
    align-items: center;
    margin-bottom: 20px;

    > span {
        display: block;
        font-size: 16px;
    }

    span:nth-child(1) {
        width: 45%;
    }

    span:nth-child(2) {
        width: 10%;
    }

    span:nth-child(3) {
        width: 45%;
    }
}

.text-dialog ::v-deep .el-dialog__header {
    padding: 0;
}

.text-content {
    border: 1px solid #e6e6e6;

    > textarea {
        width: 100%;
        height: 100%;
        padding: 8px;
        box-sizing: border-box;
        font-size: 18px;
    }
}

.button-wrap {
    margin-top: 20px;
    display: flex;
    justify-content: center;
}

.proposal-text {
    display: flex;
    align-items: center;
    margin-top: 30px;
    position: relative;

    > span {
        margin-right: 20px;
    }

    > textarea {
        width: 80%;
        font-size: 18px;
        padding: 8px;
        border: 1px solid #CDCDCD;
        box-sizing: border-box;
    }

    ::v-deep .el-select-dropdown {
        max-width: 30em;
        top: unset !important;
        left: unset !important;
    }
}

.print-none {
    @media print {
        display: none !important;
    }
}

.page-A4 {
    img {
        width: 100%;
        height: auto;
    }
}

.physical-signs {
    display: flex;
    padding: 15px 0;
    border-bottom: 1px solid #E6E6E6;

    > div {
        width: 50%;
        font-size: 16px;

        > span {
            color: #333333;
            margin-right: 4em;
        }
    }

    > div:first-child {
        color: #F5605A;
    }
}

.physical-signs:last-child {
    border: none;
}

.result_content {
    width: 90%;
    border-bottom: 2px solid #171616;

}

#result_content_ {
    border-bottom: 0px;
    height: 21px;
    margin: 5px 0;
    width: 100%;
}

.result_title_ {
    width: 90%;
    height: 40px;
    border-bottom: 2px solid #171616;
    display: flex;
    justify-content: space-between;
    align-items: center;
}

.result_title_ p {
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: bold;
    color: #333333;
}

.result_title {
    width: 90%;
    height: 40px;
    border-bottom: 2px solid #171616;
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #F5605A;
    display: flex;
    align-items: center;
}

.result {
    width: 50%;
    height: 100%;
    padding: 20px;
}

.tip {
    margin-top: 36px;
    text-align: center;
    height: 22px;
    font-size: 18px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
    line-height: 22px;
    margin-bottom: 90px;
}



.print-row_con {
    font-size: 16px;
    font-family: PingFangSC-Regular, PingFang SC;
    font-weight: 400;
    color: #333333;
    margin-top: 10px;
    position: relative;
    padding-left: 30px;
}

.print-row_con span {
    position: absolute;
    top: 7px;
    left: 0;
    display: block;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: #F5605A;
}

.print-row_title {
    font-size: 28px;
    font-family: PingFangSC-Semibold, PingFang SC;
    font-weight: 600;
    color: #333333;
    margin: 0 auto;
}



.table_title {
    margin: 20px auto;
}

.charts-wrap {
    width: 900px;
    height: 360px;
    display: flex;
}

.print-row {
    padding: 10px 25px;
    color: #333;
    font-size: 22px;
    font-weight: bold;

    > p {
        font-size: 18px;
    }
}


.print-body {
    border: 1px solid #E6E6E6;
    border-bottom: none;
}
.print-body .first {
    display: flex;
}
.print-body .first > .first-group {
    flex: 1;
    padding: 10px 25px;
    border-right: 1px solid #E6E6E6;
    @media print {
        padding: 10px 0;
    }
}


.content_body {
    overflow: scroll;
}


.print_html {
    width: 1100px;
    margin: 0 auto;
}

.title {
    color: #333;
    font-size: 22px;
    font-weight: bold;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 50px;
    margin-top: 42px;
}

.title img {
    width: auto;
    height: 75px;
    // border-radius: 50%;
    margin-right: 15px;
}

.title p {
    font-size: 38px;
    margin-bottom: 5px;
}

.table-name {
    position: relative;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    margin: 0 auto 20px;
    font-size: 16px;
    color: #333;
}

.table-name p:nth-of-type(1) {
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #333333;
}

.table-name p:nth-of-type(2) {
    font-size: 28px;
    font-weight: bold;
}

.table-name span {
    cursor: pointer;
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #F5605A;
    display: flex;
    align-items: center;
}

</style>



