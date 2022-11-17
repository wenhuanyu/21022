<template>
    <div class="content" v-if="isFinished">
        <div v-if="xianshi1">
            <div class="content_body" ref="contentBody">
                <div class="print-html" ref="print" id="print">
                    <div class="title">
                        <img :src="infoData.hospital_info && infoData.hospital_info.logo">
                        <div>
                            <p>{{ infoData.hospital_info && infoData.hospital_info.hospital_name }}</p>
                            <span>{{ infoData.hospital_info && infoData.hospital_info.second_name }}</span>
                        </div>
                    </div>
                    <div class="table-name">
                        <p style="font-size: 28px;">{{ infoData.test_paper_name }}</p>
                        <span class="edit-btn print-none  print-none_ " style="display: block"></span>
                    </div>
                    <div class="print-body" >
                        <div class="first ">
                            <div class="first-group">
                                <div class="row">
                                    <span>姓名</span>
                                    <p>{{ infoData.patient_info && infoData.patient_info.name }}</p>
                                </div>
                                <div class="row">
                                    <span>病历号</span>
                                    <p>{{ infoData.patient_info && infoData.patient_info.medical_num }}</p>
                                </div>
                                <div class="row">
                                    <span>入院时间</span>
                                    <p>{{ infoData.patient_info && infoData.patient_info.in_time }}</p>
                                </div>
                                <div class="row">
                                    <span>婚姻状态</span>
                                    <p>{{infoData.patient_info && infoData.patient_info.marriage_id}}</p>
                                </div>
                            </div>
                            <div class="first-group">
                                <div class="row">
                                    <span>性别</span>
                                    <p>{{ infoData.patient_info && infoData.patient_info.gender == 1 ? '女' : '男' }}</p>
                                </div>
                                <div class="row">
                                    <span>医保号</span>
                                    <p>{{ infoData.patient_info && infoData.patient_info.medical_insurance_num }}</p>
                                </div>
                                <div class="row">
                                    <span>学历信息</span>
                                    <p>{{infoData.patient_info && infoData.patient_info.education_id}}</p>
                                </div>
                                <div class="row">
                                    <span>测评时间</span>
                                    <p>{{ infoData.patient_info && infoData.patient_info.exam_time }}</p>
                                </div>
                            </div>
                            <div class="first-group">
                                <div class="row">
                                    <span>年龄</span>
                                    <p>{{ infoData.patient_info && infoData.patient_info.age }}</p>
                                </div>
                                <div class="row">
                                    <span>患者来源</span>
                                    <p>{{ infoData.patient_info && infoData.patient_info.source }}</p>
                                </div>
                                <div class="row">
                                    <span>职业信息</span>
                                    <p>{{infoData.patient_info && infoData.patient_info.occupation_id}}</p>
                                </div>
                                <div class="row">
                                    <span>完成时间</span>
                                    <p>{{ infoData.patient_info && infoData.patient_info.complete_time }}</p>
                                </div>
                            </div>
                        </div>
                        <div class="print-row"  :class="printData[0].value ? '' : 'print-none'">
                            <div class="title"></div>
                            <div class="charts-wrap" ref="chart"></div>
                        </div>
                        <!--111-->
                        <template >
                            <div class="print-row" :class="printData[2].value ? '' : 'print-none'">
                                <div class="title">检测结果</div>
                                <div class="check-result " v-for="item in infoData.yinzi_lst" :key="item.name">
                                    <div>
                                        <div style="width: 100%;">{{ item.name }}</div>
                                        <div style="width: 100%;" v-if="item.other">{{item.other}}</div>
                                    </div>
                                    <div >{{ item.title + item.score }}</div>
                                    <div @dblclick="current=item;dialogText=item.desc;dialogIpt = true;">{{
                                            item.desc
                                        }}</div>
                                </div>
                                <div style="margin: 20px 0" class="jiance">
                                    <div v-for="(item,index) in infoData.recipes" :key="index" class="jiance_box">
                                        <div v-for="(item1,index1) in item.content" :key="index1">
                                            <div style="padding-left: 20px;display: flex;border-bottom: 1px solid #E6E6E6;
                                            background: #FEEFEE;" v-if="index1 == 0">
                                                <div style="width: 110px; margin-right: 20px;padding-right:20px;padding-right:20px;padding-top:10px;
                                            border-right: 1px solid #E6E6E6;">{{item1.title}}</div>
                                                <div v-html="item1.con" style="width: 600px;padding-top:10px;padding-bottom:10px;font-size: 20px;"></div>
                                            </div>
                                            <div style="padding-left: 20px;display: flex;border-bottom: 1px solid #E6E6E6;" v-else>
                                                <div style="width: 110px; margin-right: 20px;padding-right:20px;padding-right:20px;padding-top:10px;
                                            border-right: 1px solid #E6E6E6;">{{item1.title}}</div>
                                                <div v-html="item1.con" style="width: 600px;padding-top:10px;padding-bottom:10px;font-size: 20px;"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>

                            <div class="print-row" :class="printData[4].value ? '' : 'print-none'">
                                <div class="table-name">
                                    <p>提示或建议</p>
                                </div>
<!--                                <textarea ref="test_four"  style="height: 0;" class="report-text-content"  v-html="suggestion"></textarea>-->
                                <!--                        <div v-html="infoData.suggestion" class="report-text-content"></div>-->
                                <div v-html="suggestion" class="report-text-content" style="font-weight: normal;white-space:pre-wrap;" contenteditable="true"></div>
                            </div>
                            <div class="print-row" :class="printData[3].value ? '' : 'print-none'">
                                <div class="table-name">
                                    <p>量表说明</p>
                                </div>
                                <!--                                <textarea ref="test_five" style="height: 0;" class="report-text-content"  v-html="test_paper_explain"></textarea>-->
                                <div v-html="test_paper_explain" class="report-text-content" style="font-weight: normal;white-space:pre-wrap;" contenteditable="true"></div>
                            </div>
                            <div class="print-row" :class="printData[5].value ? '' : 'print-none'">
                                <div class="table-name">
                                    <p>怀孕周期</p>
                                </div>
                                <!--                        <textarea ref="test_three" class="report-text-content"  v-html="yunzhouzhidao" style="height: 0"></textarea>-->
                                <div v-html="yunzhouzhidao" class="report-text-content"></div>
                            </div>
                            <div class="print-row" :class="printData[6].value ? '' : 'print-none'">
                                <div class="table-name">
                                    <p>禁忌食物</p>
                                </div>
<!--                                <textarea ref="test_two" class="report-text-content"  v-html="huxizhuchan" style="height: 0"></textarea>-->
                                <!--                        <div v-html="infoData.huxizhuchan" class="report-text-content"></div>-->
                                    <div v-html="huxizhuchan" class="report-text-content" contenteditable="true"></div>
                            </div>
                            <div class="print-row" :class="printData[7].value ? '' : 'print-none'">
                                <div class="table-name">
                                    <p>医生建议</p>
                                </div>
<!--                                <textarea ref="test_one"  class="report-text-content"  v-html="doctor_proposal" style="height: 0"></textarea>-->
                                <!--                        <div v-html="infoData.doctor_proposal" class="report-text-content"></div>-->
                                <div v-html="doctor_proposal" class="report-text-content" style="font-weight: normal;white-space:pre-wrap;" contenteditable="true"></div>
                            </div>
                            <div class="print-last-row">
                                <div class="group">
                                    <span>操作员：</span>
                                    <p>{{ infoData.user_img === "" ? infoData.user : '' }}</p>
                                    <p><img style="height: 55px" :src="infoData.user_img"></p>
                                </div>
                                <div class="group">
                                    <span>检测时间：</span>
                                    <p></p>
                                </div>
                            </div>
                        </template>
                    </div>
                    <div class="tip">***本报告不对任何决定负责！应为被试的报告内容保密！***</div>
                </div>
            </div>
        </div>

        <div v-if="xianshi2">
            <el-dialog class="new-dialog text-dialog" :visible.sync="dialogChuan" modal-append-to-body=true  :before-close="handleClose" width="20%">
                <div>
                    <div><img style="margin:0 auto; display: block; " src="../assets/images/kulian.png"></div>
                    <div style="margin-top: 20px; font-size: 24px; color: #333333; line-height: 31px; ">{{zhi}}</div>
                </div>
            </el-dialog>
        </div>
    </div>
</template>

<script>
import $ from 'jquery'
import html2canvas from 'html2canvas';


export default {
    name: "NutritionDetailReport",
    data() {
        return {
            xianshi1:false,
            xianshi2:false,
            dialogChuan:false,
            score: [],
            isFinished: false,
            info: [],
            detailForm: [],
            printForm: [],
            printer: [],
            printData: [
                {id: '1', name: '是否打印图片', value: false},
                {id: '2', name: '患者详细数据打印', value: false},
                {id: '3', name: '检测结果打印', value: false},
                {id: '4', name: '量表说明打印', value: false},
                {id: '5', name: '提示或建议打印', value: false},
                {id: '6', name: '怀孕周期', value: false},
                {id: '7', name: '禁忌食物', value: false},
                {id: '8', name: '医生建议', value: false},
            ],
            infoData: [],
            dialogPrint: false,
            dialogIpt: false,
            dialogText: '',
            current: {},
            currentMethod: '',
            dialogProposal: false,
            dialogProposal_:false,
            dialogProposal__:false,
            options: [],
            week_id:'',
            doctorProposalList: [],
            doctorProposal: '',
            dialogReport: false,
            wardList: [],
            printPageSize: '',
            displayBlock: '2',
            dialogPreview: false,
            previewImg: '',
            print_page: 1,
            modifyTitle: {title: '医生建议', type: 5, field: 'doctor_proposal'},
            templateText: '',
            showEdit: false,
            physiologyList: [],
            doctor_proposal:'',
            huxizhuchan:'',
            yunzhouzhidao:'',
            suggestion:'',
            test_paper_explain:'',
            textArea:'',
            height:'',
            scrollHeight:'',
            zhi:'',
            food_id:'',
            optionsfood:[],
            imageName:''
        }
    },
    components: {
    },
    computed: {

    },
    watch:{
        // 'huxizhuchan':function (nv,ov) {
        //     if (nv === ov) {
        //         return
        //     }
        //     this.huxizhuchan = nv
        //     // this.changeHeight()
        // },
        'doctor_proposal':function(nv,ov) {
            if (nv === ov) {
                return
            }
            this.doctor_proposal = nv
            // this.changeHeight()
        },
        // 'yunzhouzhidao':function(nv,ov) {
        //     if (nv === ov) {
        //         return
        //     }
        //     this.yunzhouzhidao = nv
        //     this.changeHeight()
        // },
        'suggestion':  function (nv,ov) {
            if (nv === ov) {
                return
            }
            this.suggestion = nv
            // this.changeHeight__()
        },
        'test_paper_explain':function (nv,ov) {
            if (nv === ov) {
                return
            }
            this.test_paper_explain = nv
            // this.changeHeight_()
        }
    },
    async mounted() {
        this.$vLoading.show();
        this.detailForm.uid = this.$store.state.user.userInfo.uid
        // this.detailForm.exam_id = this.$route.query.exam_id
        // this.detailForm.test_paper_id = this.$route.query.test_paper_id
        // this.detailForm.patient_id = this.$route.query.patient_id
        let data = this.$route.query.liangbiao_id
        let str = data.split(',')
        this.detailForm.exam_id = str[0]
        this.detailForm.test_paper_id = str[1]
        this.detailForm.patient_id = str[2]
        this.detailForm.hospital_id = str[3]
        this.detailForm.user_id = str[4]
        this.detailForm.app = str[5]
        this.imageName = str[6]


        await this.getInfo();
        await this.getPrinter();
        this.isFinished = true;
        this.$vLoading.hide();
        this.$nextTick(() => {
            this.setChart(this.infoData.title, this.infoData.result);
        })

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
                    data.pdfname = this.detailForm.exam_id+this.detailForm.test_paper_id+this.detailForm.patient_id
                    // console.log('data',data)
                    //这个uploadFile 根据自己上传接口的名字写
                    this.$axios.post('api/Zipreport/upload', {
                        ...data
                    }).then(res => {
                        // console.log('ReportPageres',res)
                    });
                });
            },5000)
        },

        /**
         * 获取报告数据
         */
        async getInfo() {
            await this.$axios.post('api/Zipreport/report', this.$qs.stringify(this.detailForm)).then(res => {
                if (res.data.code === 1) {
                    this.xianshi1 = true
                    this.xianshi2 = false
                    this.infoData = res.data.data;
                    this.test_paper_explain = this.infoData.test_paper_explain
                    this.suggestion = this.infoData.suggestion
                    this.doctor_proposal = this.infoData.doctor_proposal
                    this.food_id = this.infoData.food
                    this.$axios.post('api/Zipreport/avoid_food_info', {
                        id : this.food_id,
                        test_paper_id:this.detailForm.test_paper_id,
                        hospital_id:this.$route.query.hospital_id
                    }).then(res => {
                        if (res.data.code === 1) {
                            this.huxizhuchan = res.data.data.con
                        }
                    })
                    this.week_id = this.infoData.dietary
                    this.$axios.post('api/Zipreport/week_dietary_info', {
                        id : this.week_id,
                        hospital_id:this.$route.query.hospital_id
                    }).then(res => {
                        if (res.data.code === 1) {
                            this.yunzhouzhidao = res.data.data.content
                        }
                    })
                    this.physiologyList = res.data.data.physiology
                }
                if (res.data.code === 400) {
                    this.xianshi1 = false
                    this.xianshi2 = true
                    this.zhi = res.data.info
                    this.dialogChuan = true;
                }
                this.shengcheng()
            });
        },
        handleClose() {
            this.$router.go(-1)
        },

        /**
         * 获取打印设置
         */
        async getPrinter() {
            await this.$axios.post('api/Zipreport/printer_set_info', {
                type: 10,
                hospital_id:this.$route.query.hospital_id
            }).then(res => {
                if (res.data.code === 1) {
                    this.printForm = res.data.data.item.map(item => item);
                    this.printPageSize = res.data.data.paper;
                    this.displayBlock = res.data.data.edit
                }
                this.printData.map(item => {
                    item.value = this.printForm.indexOf(item.id) !== -1;
                })
                this.$forceUpdate();
            });
            if (this.displayBlock == 1) {
                this.showEdit = true
            } else if (this.displayBlock == 2) {
                this.showEdit = false
            }
        },

        /**
         * 显示编辑
         */
        changeRadio(e) {
            console.log("~ e", e)
            // if(e == 1){
            //     this.showEdit = true
            //     console.log("~ this.showEdit", this.showEdit)
            // }else if(e == 2){
            //     this.showEdit = false
            //     console.log("~ this.showEdit", this.showEdit)
            // }
        },


        /**
         * 图表展示
         */
        setChart(column, data) {
            let chart = this.$echarts.init(this.$refs.chart);
            let options = {
                grid: {
                    left: '10%',
                    bottom: '25%'
                },
                tooltip: {
                    trigger: 'axis',
                    formatter: "{b}：{c}",
                    axisPointer: { // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
                    }
                }
            };
            options = $.extend({}, options, {
                xAxis: {
                    type: 'category',
                    data: this.infoData.title,
                    axisLabel: {
                        textStyle: {
                            fontWeight: 1000,
                            color: '#000000',
                            fontSize: 16
                        },
                        margin:15,
                        interval: 0,//坐标轴刻度标签的显示间隔(在类目轴中有效) 0:显示所有  1：隔一个显示一个 :3：隔三个显示一个...
                        rotate: -45, //标签倾斜的角度，显示不全时可以通过旋转防止标签重叠（-90到90）
                        formatter:function(params) {
                            var newParamsName = ""; // 最终拼接成的字符串
                            var paramsNameNumber = params.length; // 实际标签的个数
                            var provideNumber = 9; // 每行能显示的字的个数
                            var rowNumber = Math.ceil(paramsNameNumber / provideNumber); // 换行的话，需要显示几行，向上取整
                            /**
                             * 判断标签的个数是否大于规定的个数， 如果大于，则进行换行处理 如果不大于，即等于或小于，就返回原标签
                             */
                            // 条件等同于rowNumber>1
                            if (paramsNameNumber > provideNumber) {
                                /** 循环每一行,p表示行 */
                                for (var p = 0; p < rowNumber; p++) {
                                    var tempStr = ""; // 表示每一次截取的字符串
                                    var start = p * provideNumber; // 开始截取的位置
                                    var end = start + provideNumber; // 结束截取的位置
                                    // 此处特殊处理最后一行的索引值
                                    if (p == rowNumber - 1) {
                                        // 最后一次不换行
                                        tempStr = params.substring(start, paramsNameNumber);
                                    } else {
                                        // 每一次拼接字符串并换行
                                        tempStr = params.substring(start, end) + "\n";
                                    }
                                    newParamsName += tempStr; // 最终拼成的字符串
                                }

                            } else {
                                // 将旧标签的值赋给新标签
                                newParamsName = params;
                            }
                            //将最终的字符串返回
                            return newParamsName
                        }
                    },
                },
                yAxis: {
                    axisLabel: {
                        textStyle: {
                            fontWeight: 1000,
                            color: '#000000',
                            fontSize: 18
                        },
                    },
                },
                series: [
                    {
                        name: 'a',
                        tooltip: {
                            show: false
                        },
                        type: 'bar',
                        barWidth: 25,
                        itemStyle: {
                            normal: {
                                color: (params) => {
                                    return this.infoData.color[params.dataIndex];
                                }
                            }
                        },
                        data: this.infoData.result,
                        barGap: 0
                    }, {
                        type: 'bar',
                        barWidth: 9,
                        itemStyle: {
                            normal: {
                                color: (params) => {
                                    return this.infoData.color[params.dataIndex];
                                }
                            }
                        },
                        barGap: 0,
                        data: this.infoData.result
                    },
                    {
                        name: 'b',
                        tooltip: {
                            show: false
                        },
                        type: 'pictorialBar',
                        itemStyle: {
                            borderWidth: 1,
                            normal: {
                                borderColor: (params) => {
                                    return this.infoData.color[params.dataIndex];
                                },
                                color: (params) => {
                                    return this.infoData.color[params.dataIndex];
                                }
                            }
                        },
                        symbol: 'path://M 0,0 l 120,0 l -30,60 l -120,0 z',
                        symbolSize: ['36', '9'],
                        symbolOffset: ['0', '-4'],
                        symbolRotate: 0,
                        symbolPosition: 'end',
                        data: this.infoData.result,
                        z: 3
                    }
                ]
            });
            chart.setOption(options);
            chart.resize({height: 500});

            window.addEventListener('resize', () => {
                chart.resize();
            })
        },

        changeHeight () {
            let _this = this
            this.$nextTick(() => {
                if (_this.modifyTitle.type == 4) {
                    var textArea = _this.$refs.test_two
                }
                if (_this.modifyTitle.type == 5) {
                    var textArea = _this.$refs.test_one
                }
                // if (_this.modifyTitle.type == 3) {
                //     var textArea = _this.$refs.test_three
                // }
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
        changeHeight_ () {
            let _this = this
            this.$nextTick(() => {
                setTimeout(() => {
                    _this.textArea = _this.$refs.test_five
                    let scrollHeight = _this.textArea.scrollHeight // 控件所有的高度，包含滚动的那部分(不可见也会有高度)
                    let height = _this.textArea.offsetHeight // 屏幕上显示的高度
                    if (height <= scrollHeight) {
                        _this.textArea.style.height = 'auto' // 恢复默认值，这个作用就是根据内容自适应textarea高度
                        _this.textArea.style.height = _this.textArea.scrollHeight + 'px' // 拿到最新的高度改变textarea的高度
                    }else {
                        _this.textArea.style.height = 'auto' // 恢复默认值，这个作用就是根据内容自适应textarea高度
                    }
                },1000)

            })
        },
        changeHeight__ () {
            let _this = this
            this.$nextTick(() => {
                setTimeout(() => {
                    _this.textArea = _this.$refs.test_four
                    let scrollHeight = _this.textArea.scrollHeight // 控件所有的高度，包含滚动的那部分(不可见也会有高度)
                    let height = _this.textArea.offsetHeight // 屏幕上显示的高度
                    if (height <= scrollHeight) {
                        _this.textArea.style.height = 'auto' // 恢复默认值，这个作用就是根据内容自适应textarea高度
                        _this.textArea.style.height = _this.textArea.scrollHeight + 'px' // 拿到最新的高度改变textarea的高度
                    }else {
                        _this.textArea.style.height = 'auto' // 恢复默认值，这个作用就是根据内容自适应textarea高度
                    }
                },1000)

            })
        },


        /**
         * 打印预览
         */
        printPreview() {
            let $printNone = $('.print-none').hide();
            let dialog = this.$loading('请稍后...');
            html2canvas(this.$refs.print,{
                allowTaint: true,
                useCORS: true
            })
                .then(canvas => {
                let dom = document.body.appendChild(canvas);
                dom.style.display = 'none';

                let a = document.createElement('a');
                a.style.display = 'none';
                document.body.removeChild(dom);

                this.previewImg = URL.createObjectURL(this.dataURLToBlob(dom.toDataURL('image/png')));

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
            let arr = data.split(',');
            let mime = arr[0].match(/:(.*?);/)[1];
            let bstr = atob(arr[1]);
            let n = bstr.length;
            let u8arr = new Uint8Array(n);
            while (n--) {
                u8arr[n] = bstr.charCodeAt(n);
            }
            return new Blob([u8arr], {type: mime});
        },
    },

}
</script>
<style media="print">
@page{
    size :auto;
    margin: 25px;
}
</style>
<style scoped lang="scss">
.check_jiance {
    font-size: 22px !important;
    margin-bottom:20px;
    ::v-deep .el-checkbox__label {
        font-size: 22px !important;
        color: #333333!important;
        font-weight: 600;
    }
}
::v-deep{
    .el-radio-group {
        margin-left: 20px;
    }
}
.psychology_title{
    font-size: 20px;
    font-weight: bold;
    color: #333333;
}
.psychology_name{
    font-size: 18px;
    color: #333;
    display: flex;
    flex-wrap: wrap;
    padding-left: 20px;
    p{
        width: 45%;
        margin-top: 7px;
    }
}
.pull_left {
    display: inline-block;
    width: 95%;
    overflow: hidden;
}
::v-deep .new-dialog span,
::v-deep .new-dialog label {
    font-size: 20px;
}
::v-deep .el-table {
    font-size: 16px;
}
::v-deep .el-dialog {
    //width: 35%;
}

.dialog-footer {
    .el-button {
        border-radius: 25px;
        width: 150px;
    }
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
    width: 1100px;
    margin: 0 auto;
    padding: 25px;
    overflow-y: auto;
    @media print {
        overflow: visible;
        height: unset;
    }
}

.remark {
    color: #999999;
    font-size: 16px;
    margin: 0;
    text-align: center;
}


.print-html {
    max-width: 1100px;
    margin: 0 auto;

    .print-none {
        display: none;
    }

    .edit-btn.active {
        display: block;
    }

    @media print {
        table td,
        table th {
            border: 1px #000000 solid;
        }
    }
}

.print-html > .title {
    color: #333333;
    font-size: 22px;
    font-weight: bold;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 50px;
}

.print-html > .title img {
    width: auto;
    height: 75px;
    // border-radius: 50%;
    margin-right: 15px;
}

.print-html > .title p {
    font-size: 38px;
    margin-bottom: 5px;
}

.table-name {
    position: relative;
    display: flex;
    align-items: flex-end;
    justify-content: center;
    margin: 0 auto 15px;
    font-size: 16px;
    color: #333333;
}

.table-name p {
    font-size: 26px;
    font-weight: bold;
}

.print-html .edit-btn {
    color: #ff6b6b;
    position: absolute;
    right: 0;
    cursor: pointer;
    @media print {
        display: none !important;
    }
}

.print-body {
    border: 1px solid #e6e6e6;
    border-bottom: none;
}

.print-body .first {
    display: flex;
}

.print-body .first > .first-group {
    flex: 1;
    padding: 10px 25px;
    border-right: 1px solid #e6e6e6;
    @media print {
        padding: 10px 0;
    }
}

.print-body .row {

    display: flex;
    align-items: center;
    font-size: 20px;
    color: #333333;
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
    border-bottom: 1px solid #e6e6e6;
}

.print-row {
    padding: 20px;
    color: #333333;
    font-size: 28px;
    font-weight: bold;
}

.print-row .title {
    text-align: center;
    line-height: 50px;
    margin-bottom: 20px;
}

.tip {
    margin-top: 36px;
    text-align: center;
    height: 22px;
    font-size: 18px;
    font-weight: 400;
    color: #333333;
    line-height: 22px;
    margin-bottom: 90px;
}

.print-row .table-name p {
    height: 30px;
    font-size: 28px;
    margin-bottom: 20px;
}

.print-row .table-name span {
    font-size: 14px;
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
    //line-height: 55px;
    font-size: 20px;
    align-items: center;
    height: 50px;
}

.group > p {
    margin-left: 15px;
    font-weight: bold;
}
.jiance {
    font-size: 20px;
    color: #333333;
    border: 1px solid #E6E6E6;
}
.check-result {
    display: flex;
    align-items: center;
    margin-bottom: 20px;

    > div {
        font-size: 22px;
    }

    div:nth-child(1) {
        width: 40%;
        padding-right: 50px;
    }

    div:nth-child(2) {
        width: 20%;
    }

    div:nth-child(3) {
        width: 40%;
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
        border: 1px solid #cdcdcd;
        box-sizing: border-box;
    }

    ::v-deep .el-select-dropdown {
        max-width: 30em;
        top: unset !important;
        left: unset !important;
    }
}
.physical-signs_item{
    font-size: 22px;
    color: #333;
    margin: 10px 0;
    font-weight: 400;
}

.physical-signs {
    display: flex;
    padding: 15px 0;
    border-bottom: 1px solid #e6e6e6;

    > div {
        font-size: 22px;
        display: flex;
        > span {
            display: block;
            color: #333333;
            margin-right: 4em;
        }
    }

    > div:first-child {
        color: #f5605a;
    }
}

.physical-signs:last-child {
    border: none;
}

.page-A4 {
    img {
        width: 100%;
        height: auto;
    }
}

.scl90-analysis {
    > * {
        font-size: 18px;
        margin-bottom: 1em;
    }
}

.report-text-content {
    width: 100%;
    display: block;
    flex: 1;
    font-size: 22px;
    font-family: -apple-system-font, "Helvetica Neue", sans-serif, "Microsoft YaHei";
}
.charts-16pf {
    position: relative;

    table {
        border-collapse: collapse;
        width: 100%;

        th, td {
            border: 1px #eeeeee solid;
            padding: 8px;
            font-size: 18px;
            font-weight: normal;
        }

        thead {
            background: #e5e5e5;
        }

        .flex {
            height: 40px;
        }

        .flex-grow1 {
            display: flex;
            height: 100%;
            justify-content: center;
            align-items: center;

            i {
                display: block;
                width: 4px;
                height: 4px;
                border-radius: 4px;
                position: relative;
                z-index: 2;
            }

            &.active {
                i {
                    background: #f5625c;
                    box-shadow: 0 0 5px #f5625c;
                }
            }
        }

        .line {
            &:before {
                content: " ";
                display: block;
                width: 0;
                border-right: 1px #e5e5e5 solid;
                height: 100%;
                margin-right: -2px;
                position: relative;
                z-index: 1;
            }
        }

        tfoot {
            td {
                border: 0;

                .flex-grow1 {
                    flex-direction: column;
                    justify-content: flex-start;

                    i {
                        width: 0;
                        height: 10px;
                        border-right: 1px #e5e5e5 solid;
                    }

                    span {
                        color: #999;
                    }
                }
            }
        }
    }
}


</style>
<style>
.report-text-content p,
.report-text-content div {
    margin-bottom: 0.8em;
}

.scl90-table-header th {
    background: #e5e5e5;
    color: #000000;
}


.charts-16pf-line {
    position: absolute;
    background-image: linear-gradient(to right, #f5605a, #b293fb);
    height: 1px;
    z-index: 1;
}

@media print {
    body {
        -webkit-print-color-adjust: exact;
    }
}


</style>

<style lang="scss">
.el-table th > .cell {
    line-height: 30px;
}

.head-row {
    height: 120px;

    .cell {
        height: 100% !important;
        padding-top: 10px
    }

    *[type="ho"] {
        height: 100%;
        display: flex;
        align-items: flex-end;
    }

    *[type="ver"] {
        height: 100%;
        display: flex;
        align-items: center;
        flex-direction: column;
        line-height: 20px;

        .tone {
            color: #333333;
            font-size: 18px;
            height: 4em !important;
            overflow: hidden;

            writing-mode: vertical-lr;
            display: flex;
            align-items: center;
            justify-content: space-between;

            & > div {
                height: fit-content;

                &:nth-child(1) {
                }
            }

        }

        .ttwo {
            margin-top: 5px;
        }
    }
}

.table-left {
    display: flex;
    width: 12em;
    justify-content: space-between;

    div {
        float: left;
    }
}

.overline {
    width: 12em;
    text-align-last: justify;
    text-align: justify;
}

.table-two-cell-one {
    background: #F6F6F6 !important;
    border-right: none !important;

    &:last-child {
        border-right: 1px solid #EBEEF5;
    }
}


.table-two-cell-slot {
    @extend .table-two-cell-one;
    /*padding-top: 24px !important;
    padding-bottom: 0 !important;*/
    display: flex;
    align-items: flex-end;
    overflow: visible !important;


    .cell {
        margin-top: 12px;
        margin-bottom: -12px;
        display: flex !important;
        padding: 0 20px 0 0 !important;
        justify-content: space-between;
        overflow: visible !important;


        .table2-head {
            margin-left: -5px;
            display: flex;
            height: fit-content;
            justify-content: space-between;
        }
    }
}
.table-three-cell-slot{
    @extend .table-two-cell-one;
    /*padding-top: 24px !important;
    padding-bottom: 0 !important;*/
    display: flex;
    align-items: flex-end;
    overflow: visible !important;
    text-align: center !important;


    .cell {


        .table2-head {
            margin-left: -5px;
            display: flex;
            height: fit-content;
            justify-content: space-between;
        }
    }
}

</style>
