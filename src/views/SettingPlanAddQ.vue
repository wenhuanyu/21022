<template>
    <div class="content">
        <div class="content_top">
            <div></div>
            <el-form class="search-bar">
                <el-button class="pink" plain @click="backPage" icon="el-icon-arrow-left">返回系统页</el-button>
            </el-form>
        </div>
        <div class="content_body">
            <div class="top_edit">
                <p class="edit">添加情绪调节方案</p>
            </div>
            <div class="row">
                <el-form ref="form" :rules="rules" :model="form" label-width="90px" class="form_con">
                    <!--方案名称-->
                    <el-form-item label="方案名称" prop="name">
                        <el-input v-model="form.name" placeholder="请输入方案名称" class="item1" style="width: 498px"></el-input>
                    </el-form-item>
                    <el-form-item label="性别" prop="sta">
                        <el-radio-group v-model="form.sta" @change="staChange">
                            <el-radio :label="0" name="0">单脑</el-radio>
                            <el-radio :label="1" name="1">双脑</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <!--方案内容-->
                    <el-form-item label="方案内容">
                        <el-transfer v-model="value" :data="data" @change="handleChange" left-check-change="sd"
                                     filterable="filterable" filter-placeholder="关键词搜索" class="box-nowrap item2"
                                     style="text-align: left;" :titles="['全部内容', '已选择内容']">
                            <span slot-scope="{ option }" style="line-height: 45px;">
                                <span class="con_lift" @click="log(option)">{{ option.label }}</span>
                                <div class="item_" v-if="value_ids.includes(option.key)">
                                    <template>
                                        <el-select v-model="listMap[option.key]" placeholder="请选择"
                                                   @change="onMusicChange($event,option.key)">
                                            <el-option
                                                v-for="item in musicList"
                                                :key="item.id"
                                                :label="item.name"
                                                :value="item.id"
                                                style="width:150px"
                                            >
                                            </el-option>
                                        </el-select>
                                        <el-input v-model.sync="timeMap[option.key]" placeholder="时间"
                                                  style="width: 60px !important; margin-left: 5px;"
                                                  @change="onTime($event,option.key)"></el-input>
                                    </template>
                                </div>
                            </span>
                        </el-transfer>
                    </el-form-item>
                    <div class="slider_con">
                        <el-form-item label="前静息期" prop="music_" style="margin-right: 50px;">
                            <el-select v-model="form.before_music" placeholder="请选择" class="select_prev">
                                <el-option
                                    v-for="item in musicList"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id"
                                    style="width:150px"
                                >
                                </el-option>
                            </el-select>
                            <span class="line">—</span>
                            <el-input v-model.sync="form.before_music_time" placeholder="时间" class="select_min"
                                      style="width: 60px !important; margin-left: 5px;"
                                      ></el-input>
                        </el-form-item>
                        <el-form-item label="后静息期" prop="music__" class="slider_left">
                            <el-select v-model="form.after_music" placeholder="请选择" class="select_prev">
                                <el-option
                                    v-for="item in musicList"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.id"
                                    style="width:150px"
                                >
                                </el-option>
                            </el-select>
                            <span class="line">—</span>
                            <el-input v-model.sync="form.after_music_time" placeholder="时间" class="select_min"
                                      style="width: 60px !important; margin-left: 5px;"
                                      ></el-input>
                        </el-form-item>
                    </div>
                </el-form>
            </div>
            <!--按钮-->
            <div class="margin-top-80 box-nowrap bottom_btn">
                <span style="position: absolute;right: 10%">
                    <el-button type="warning" round @click="$router.go(-1)">取消</el-button>
                    <el-button type="primary" round @click="onSubmit('form')">保存</el-button>
                </span>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "SettingPlanAddH",
    data() {
        return {
            music: '',
            musicList: [],
            onMusicChange_id: '',
            gameTime: '',
            game_time: '',
            num: 1,
            data: [],
            value: [],
            heart_rate: '',
            head_temp:'',
            attention:'',
            form: {
                sta:0,
                name: '',
                game_info: '',
                before_music:'',
                before_music_time:'',
                after_music:'',
                after_music_time:''
            },
            test_paper_ids: '',
            rules: {
                name: [
                    {required: true, message: '请填写方案名称', trigger: 'blur'}
                ],
                sta:[
                    {required: true, message: '请选择方案类型', trigger: 'blur'}
                ]

            },
            rightChecked: [49, 66],
            submitUrl: 'api/emotion_policy/add2',
            id: 0,
            idData: [],
            options: [{
                value: '选项1',
                label: '黄金糕'
            }, {
                value: '选项2',
                label: '双皮奶'
            }, {
                value: '选项3',
                label: '蚵仔煎'
            }, {
                value: '选项4',
                label: '龙须面'
            }, {
                value: '选项5',
                label: '北京烤鸭'
            }],
            // 难易级别
            value1: '',
            //滑块设置数值
            valueNum: 0,
            //前静息期
            valuePrev: '',
            //后静息期
            valueNext: '',
            type: '',
            value_ids: [],
            optionList: [],
            listMap: {},
            timeMap: {}
        }
    },
    mounted() {
        //消息接口
        this.$store.dispatch('GetXiao')
        this.onPaper()
        this.getMusic()
        this.id = this.$route.query.id;
        this.type = this.$route.query.type;
        if (this.$route.query.id) {
            this.submitUrl = 'api/emotion_policy/edit2'
            this.onDetail();
        }
    },
    methods: {
        log(option) {
            console.log('log', option.key)
        },
        onTime(e,i) {
            this.game_time = e
            var flag = this.functiontofindIndexByKeyValue(i)
            if(flag!==-1) {
                this.idData[flag].game_time = e
            } else {
                let idData = {};
                idData = {
                    'game_id': i,
                    'music_id': this.onMusicChange_id,
                    'game_time': this.game_time,
                }
                this.idData.push(idData);
            }
        },
        functiontofindIndexByKeyValue(valuetosearch) {
            for (var i = 0; i < this.idData.length; i++) {
                if (this.idData[i].game_id == valuetosearch) {
                    return i;
                }
            }
            return -1;
        },
        onMusicChange(e,i) {
            this.onMusicChange_id = e
            var flag = this.functiontofindIndexByKeyValue(i)
            if(flag!==-1) {
                this.idData[flag].music_id = e
            } else {
                let idData = {};
                idData = {
                    'game_id': i,
                    'music_id': e,
                    'game_time': this.game_time,
                }
                this.idData.push(idData);
            }
        },
        handleChange(value, direction, movedKeys) {
            movedKeys.map((item) => {
                if(direction === 'left'){
                    this.timeMap[item] = '';
                    this.listMap[item] = '';
                    delete this.timeMap.item
                    delete this.listMap.item
                    var flag = this.functiontofindIndexByKeyValue(item)
                    if(flag!==-1) {
                        this.idData.splice(flag, 1)
                    }

                }
            })

            value.map((item, index) => {
                this.optionList.push('')
            })
            this.value_ids = value
        },
        backPage() {
            this.$router.go(-1);
        },
        staChange(e) {
            this.form.sta = e
            this.onPaper()
        },
        async onPaper() {
            await this.$axios.post('api/emotion_policy/game_lst',this.$qs.stringify(
                {
                    sta:this.form.sta
                }
            )).then(res => {
                if (res.data.code === 1) {
                    let list = res.data.data.all
                    const data = [];
                    for (let i = 0; i < list.length; i++) {
                        data.push({
                            key: list[i].id,
                            label: list[i].name,
                        });

                    }
                    this.data = data;
                }
            })
        },
        async getMusic() {
            await this.$axios.post('api/common/music_lst',).then(res => {
                if (res.data.code === 1) {
                    this.musicList = res.data.data;
                }
            })
        },
        async onDetail() {
            await this.$axios.post('api/emotion_policy/info', this.$qs.stringify({id: this.id})).then(res => {
                if (res.data.code === 1) {
                    this.form.id = this.id
                    let data = res.data.data;
                    this.value = data.game_ids.split(',').map(id => {
                        return +id;
                    })
                    for (const key in this.form) {
                        this.form[key] = data[key];
                    }
                }
            })
        },
        onSubmit(formName) {
            this.$refs[formName].validate((valid) => {
                if (valid) {
                    this.form.game_info = this.idData
                    this.$axios.post(this.submitUrl, this.$qs.stringify(this.form)).then(res => {
                        if (res.data.code === 1) {
                            this.backPage()
                        }
                    })
                } else {
                    return false;
                }
            });

        },
    },
}
</script>

<style scoped lang="scss">
::v-deep .el-transfer-panel__list.is-filterable {
    height: 230px;
}

.con_lift {
    width: 45%;
    overflow: hidden;
    display: inline-block;
}

.el-button.is-round {
    width: 150px;
    height: 50px;
}

.el-button + .el-button {
    margin-left: 50px;
}

.content_body .el-form {
    min-width: 400px;
}

::v-deep .el-transfer-panel {
    width: 50%;
    padding-bottom: 20px;
}

::v-deep .el-form-item__label {
    text-align: left;
}

::v-deep .row .el-form-item {
    font-weight: 600;
    color: #333333;
    font-size: 16px;

}

::v-deep .el-transfer-panel__body {
    //height:100%;
    height: 30vh;
}

::v-deep .el-checkbox:last-of-type{
    margin-right: 30px !important;
}

::v-deep {
    .el-form-item__label {
        text-align: left;
        vertical-align: middle;
        float: left;
        font-size: 16px;
        line-height: 40px;
        padding: 0 12px 0 0;
        box-sizing: border-box;
        font-weight: 600;
        color: #333;
    }

    .content_body {
        padding: 30px 50px 25px 50px;
        display: flex;
        height: 100vh;
        flex-direction: column;

        .top_edit {
            height: 60px;
            color: #333333;
            font-size: 18px;
            font-weight: 600;
            width: 100%;
            padding-bottom: 22px;
        }

        .row {
            flex: 1;
            border-top: 1px solid #E6E6E6;
            padding-top: 29px;

            .item1, .el-input {

            }

            .item2 .el-transfer-panel {
                width: 498px;
            }

            .item_ {
                float: right;
            }

            .item_ .el-input {
                width: 150px !important;
                float: right;
            }

            .el-transfer-panel__item {
                height: 45px;
            }

            .el-transfer-panel__item .el-checkbox__input {
                top: 16px;
            }

            .el-transfer-panel .el-transfer-panel__header {
                background: #fff;
            }

            .el-transfer-panel__list .is-filterable {
                //height: 275px;
                height: 25vh;
                overflow: auto;
                margin-right: 5px;
            }

            .el-transfer-panel__filter {
                width: 468px;

                .el-input__inner {
                    border-radius: 2px;
                }
            }

            .el-transfer__buttons {
                display: inline-block;
                padding: 0 40px;

                .el-button--primary {
                    display: block;
                    width: 78px;
                    height: 40px;
                    background-image: url("../assets/images/left_arr.png");
                }

                .el-transfer__button:last-child {
                    margin-left: 0;
                    transform: rotate(180deg);
                }


            }

            .el-icon-arrow-left, .el-icon-arrow-right {
                display: none;
            }

            .el-form-item.is-required:not(.is-no-asterisk) > .el-form-item__label:before, .el-form-item.is-required:not(.is-no-asterisk) .el-form-item__label-wrap > .el-form-item__label:before {
                content: '';
            }

            .slider_con {
                width: 100%;
                display: flex;
                flex: 3;

                .slider_left {
                    margin-right: 35px;

                    //.input_num, .el-input {
                    //    width: 155px;
                    //}
                    //
                    //.el-input__inner {
                    //    width: 155px;
                    //}

                    .slider_el {
                        width: 256px;
                        float: left;
                        display: inline-block
                    }

                    .slider_p {
                        display: inline-block;
                        margin-left: 15px;
                    }

                    .el-slider__runway {
                        width: 256px;
                        height: 20px;
                        background: #FFE6E5;
                        border-radius: 25px;
                        border: 1px solid #F5635E;
                    }

                    .el-slider__bar {
                        height: 20px;
                        background: linear-gradient(180deg, #F5635E 0%, #FB918E 100%);
                        border-radius: 25px;
                    }

                    .el-slider__button-wrapper {
                        top: -9px;
                    }

                    .el-slider__button-wrapper .el-slider__button {
                        width: 28px;
                        height: 28px;
                        background: linear-gradient(180deg, #FA8C89 0%, #F5635E 100%);
                        border: 1px solid #F5635E;
                    }

                    .el-slider__runway {
                        margin: 10px 0;
                    }

                    .el-icon-arrow-left, .el-icon-arrow-right {
                        display: none;
                    }
                }

                .slider_left:last-child {
                    margin-right: 0;
                }

                .slider_right {
                    .input_num, .el-input {
                        width: 155px;
                    }

                    .el-input__inner {
                        width: 155px;
                    }
                }

                .slider_left .slider_p, .slider_right .slider_p {
                    display: inline-block;
                    font-size: 16px;
                    font-weight: 500;
                    color: #333333;
                    line-height: 40px;
                    vertical-align: middle;
                }

                .select_prev .el-input--suffix {
                    width: 230px !important;
                }

                .select_min .el-input--suffix {
                    width: 100px !important;
                }

                .line {
                    //width: 14px;
                    height: 1px;
                    color: #CDCDCD;
                    margin: 0 6px;
                }
            }
        }

        .bottom_btn {
            height: 60px;
            position: relative;
            right: 0;

            .el-form-item__content {
                .el-button {
                    float: right;
                }

                .el-button:first-child {
                    margin-left: 25px;
                }
            }
        }
    }

    .el-transfer-panel__list.is-filterable::-webkit-scrollbar {
        display: block;
        width: 4px;
        height: 1px;
    }

    .el-transfer-panel__list.is-filterable::-webkit-scrollbar-thumb {
        /*滚动条里面小方块*/
        border-radius: 10px;
        background: #D8D8D8;;
    }

    //.el-transfer-panel__list.is-filterable::-webkit-scrollbar-track {
    //    /*滚动条里面轨道*/
    //    background: #F7F7F7;
    //    border-radius: 10px;
    //}
}


</style>
