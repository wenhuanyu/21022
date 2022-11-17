<template>
    <div class="content">
        <div class="content_top">
            <div></div>
            <div>
                <el-button type="primary" v-print="printObj" icon="el-icon-printer">
                    打印
                </el-button>
                <el-button class="pink" plain @click="$router.replace('/AmongRecords')" icon="el-icon-arrow-left">
                    返回主页面
                </el-button>
            </div>
        </div>
        <div class="content_body">
            <div class="print_html" ref="print" id="print">
                <div class="title">
                    <img :src=hospital_info.logo>
                    <div>
                        <p>{{ hospital_info.hospital_name }}</p>
                        <span>{{ hospital_info.second_name }}</span>
                    </div>
                </div>
                <div class="table-name">
                    <p></p>
                    <p>围产记录</p>
                </div>
                <div class="print-body">
                    <el-row>
                        <!--基础信息-->
                        <el-row>
                            <el-col :span="24" class="btm-line">
                                <p class="p-color text-center size-20 text-bold padding-15 no-padding-right no-padding-left">
                                    基础信息</p>
                            </el-col>
                            <el-col :span="24">
                                <el-row class="padding-20 no-padding-top size-16">
                                    <el-row class="margin-10 no-margin-bottom no-margin-left no-margin-right">
                                        <el-col :span="4" class="">病历号</el-col>
                                        <el-col :span="6">{{ form.medical_num }}</el-col>
                                    </el-row>
                                    <el-row class="margin-10 no-margin-bottom no-margin-left no-margin-right">
                                        <el-col :span="4" class="">高危评定</el-col>
                                        <el-col :span="6">{{ evaluate }}</el-col>
                                    </el-row>
                                    <el-row class="margin-10 no-margin-bottom no-margin-left no-margin-right">
                                        <el-col :span="4" class="">过敏史</el-col>
                                        <el-col :span="6">{{ formData.allergy }}</el-col>
                                    </el-row>
                                    <el-row class="margin-10 no-margin-bottom no-margin-left no-margin-right">
                                        <el-col :span="4" class="">姓名</el-col>
                                        <el-col :span="6">{{ form.name }}</el-col>
                                    </el-row>
                                    <el-row class="margin-10 no-margin-bottom no-margin-left no-margin-right">
                                        <el-col :span="4" class="">年龄</el-col>
                                        <el-col :span="6">{{ form.age }}</el-col>
                                    </el-row>
                                    <el-row class="margin-10 no-margin-bottom no-margin-left no-margin-right">
                                        <el-col :span="4" class="">联系电话</el-col>
                                        <el-col :span="6">{{ form.phone }}</el-col>
                                    </el-row>
                                    <el-row class="margin-10 no-margin-bottom no-margin-left no-margin-right">
                                        <el-col :span="4" class="">职业</el-col>
                                        <el-col :span="6">{{ form.occupation }}</el-col>
                                    </el-row>
                                    <el-row class="margin-10 no-margin-bottom no-margin-left no-margin-right">
                                        <el-col :span="4" class="">现住址</el-col>
                                        <el-col :span="6">{{ form.residence }}</el-col>
                                    </el-row>
                                    <el-row class="margin-10 no-margin-bottom no-margin-left no-margin-right">
                                        <el-col :span="4" class="">身份证号/护照号</el-col>
                                        <el-col :span="6">{{ formData.idnumber }}</el-col>
                                    </el-row>
                                    <el-row class="margin-10 no-margin-bottom no-margin-left no-margin-right">
                                        <el-col :span="4" class="">丈夫姓名</el-col>
                                        <el-col :span="6">{{ formData.husband_name }}</el-col>
                                    </el-row>
                                    <el-row class="margin-10 no-margin-bottom no-margin-left no-margin-right">
                                        <el-col :span="4" class="">年龄</el-col>
                                        <el-col :span="6">{{ formData.husband_age }}</el-col>
                                    </el-row>
                                    <el-row class="margin-10 no-margin-bottom no-margin-left no-margin-right">
                                        <el-col :span="4" class="">联系电话</el-col>
                                        <el-col :span="6">{{ formData.husband_telephone }}</el-col>
                                    </el-row>
                                </el-row>
                            </el-col>
                        </el-row>
                        <!--怀孕情况-->
                        <el-row>
                            <el-col :span="24" class="top-line btm-line">
                                <p class="p-color text-center size-20 text-bold padding-15 no-padding-right no-padding-left">
                                    怀孕情况</p>
                            </el-col>
                            <el-col :span="24">
                                <el-row class="padding-20 no-padding-top size-16">
                                    <el-row class="margin-10 no-margin-bottom no-margin-left no-margin-right">
                                        <el-col :span="4" class="">早孕</el-col>
                                        <el-col :span="6">
                                            {{ zaoyunList }}
                                        </el-col>
                                    </el-row>
                                    <el-row class="margin-10 no-margin-bottom no-margin-left no-margin-right">
                                        <el-col :span="4" class="">中孕</el-col>
                                        <el-col :span="6">{{ zhongyunList }}</el-col>
                                    </el-row>
                                    <el-row class="margin-10 no-margin-bottom no-margin-left no-margin-right">
                                        <el-col :span="4" class="">晚孕</el-col>
                                        <el-col :span="6">{{ wanyunList }}</el-col>
                                    </el-row>
                                </el-row>
                            </el-col>
                        </el-row>
                        <!--本次妊娠情况-->
                        <el-row>
                            <el-col :span="24" class="top-line btm-line">
                                <p class="p-color text-center size-20 text-bold padding-15 no-padding-right no-padding-left">
                                    本次妊娠情况</p>
                            </el-col>
                            <el-col :span="24">
                                <el-row class="padding-20 no-padding-top size-16">
                                    <el-row class="margin-10 no-margin-bottom no-margin-left no-margin-right">
                                        <el-col :span="4" class="">末次月经</el-col>
                                        <el-col :span="6">{{ formData.last_menstruation }}</el-col>
                                    </el-row>
                                    <el-row class="margin-10 no-margin-bottom no-margin-left no-margin-right">
                                        <el-col :span="4" class="">预产期</el-col>
                                        <el-col :span="6">{{ formData.production }}</el-col>
                                    </el-row>
                                    <el-row class="margin-10 no-margin-bottom no-margin-left no-margin-right">
                                        <el-col :span="4" class="">孕前体重</el-col>
                                        <el-col :span="6">{{ formData.pregnancyWeight }}</el-col>
                                    </el-row>
                                    <el-row class="margin-10 no-margin-bottom no-margin-left no-margin-right">
                                        <el-col :span="4" class="">身高</el-col>
                                        <el-col :span="6">{{ formData.height }}</el-col>
                                    </el-row>
                                    <el-row class="margin-10 no-margin-bottom no-margin-left no-margin-right">
                                        <el-col :span="4" class="">孕前体重指数</el-col>
                                        <el-col :span="6">{{ before_weight }}</el-col>
                                    </el-row>
                                    <el-row class="margin-10 no-margin-bottom no-margin-left no-margin-right">
                                        <el-col :span="4" class="">既往病史</el-col>
                                        <el-col :span="6">
                                            <div v-for="(item,index) in formData.medical_history" :key="index">
                                                <p style="float: left; margin-right: 10px;">{{ item }}</p>
                                            </div>
                                        </el-col>
                                    </el-row>

                                </el-row>
                            </el-col>
                        </el-row>
                        <!--月经婚育史/以往妊娠分娩史-->
                        <el-row>
                            <el-col :span="24" class="top-line btm-line">
                                <el-row>
                                    <!--月经婚育史-->
                                    <el-col :span="12">
                                        <el-row>
                                            <el-col class="btm-line right-line">
                                                <p class="p-color text-center size-20 text-bold padding-15 no-padding-right no-padding-left">
                                                    月经婚育史</p>
                                            </el-col>
                                            <el-col>
                                                <el-row class="padding-20 no-padding-top size-16">
                                                    <el-row
                                                        class="margin-10 no-margin-bottom no-margin-left no-margin-right">
                                                        <el-col :span="8" class="">月经周期</el-col>
                                                        <el-col :span="8">{{ formData.menstrual_cycle }}</el-col>
                                                    </el-row>
                                                    <el-row
                                                        class="margin-10 no-margin-bottom no-margin-left no-margin-right">
                                                        <el-col :span="8" class="">婚姻状况</el-col>
                                                        <el-col :span="8">{{ formData.rouge_condition }}</el-col>
                                                    </el-row>
                                                    <el-row
                                                        class="margin-10 no-margin-bottom no-margin-left no-margin-right">
                                                        <el-col :span="8" class="">家族史</el-col>
                                                        <el-col :span="8">{{ family_history }}</el-col>
                                                    </el-row>
                                                    <el-row
                                                        class="margin-10 no-margin-bottom no-margin-left no-margin-right">
                                                        <el-col :span="8" class="">个人史</el-col>
                                                        <el-col :span="8">{{ personal_history }}</el-col>
                                                    </el-row>
                                                </el-row>
                                            </el-col>
                                        </el-row>
                                    </el-col>
                                    <!--以往妊娠分娩史-->
                                    <el-col :span="12">
                                        <el-row>
                                            <el-col class="btm-line">
                                                <p class="p-color text-center size-20 text-bold padding-15 no-padding-right no-padding-left">
                                                    以往妊娠分娩史</p>
                                            </el-col>
                                            <el-col class="left-line">
                                                <el-row class="padding-20 no-padding-top size-16">
                                                    <el-row
                                                        class="margin-10 no-margin-bottom no-margin-left no-margin-right">
                                                        <el-col :span="6" class="">怀孕</el-col>
                                                        <el-col :span="10">{{ formData.pregnant }}</el-col>
                                                    </el-row>
                                                    <el-row
                                                        class="margin-10 no-margin-bottom no-margin-left no-margin-right">
                                                        <el-col :span="6" class="">分娩</el-col>
                                                        <el-col :span="10">{{ formData.childbirth }}</el-col>
                                                    </el-row>
                                                    <el-row
                                                        class="margin-10 no-margin-bottom no-margin-left no-margin-right">
                                                        <el-col :span="6" class="">孕次</el-col>
                                                        <el-col :span="5">{{ formData.pregnancy_times }}</el-col>
                                                        <el-col :span="5">{{ formData.pregnancy_times_ }}</el-col>
                                                    </el-row>
                                                    <el-row
                                                        class="margin-10 no-margin-bottom no-margin-left no-margin-right">
                                                        <el-col :span="6" class="">流产史</el-col>
                                                        <el-col :span="10">
                                                            {{ formData.abortion_history }}
                                                        </el-col>
                                                    </el-row>
                                                    <el-row
                                                        class="margin-10 no-margin-bottom no-margin-left no-margin-right">
                                                        <el-col :span="6" class="">不良生育史</el-col>
                                                        <el-col :span="10">
                                                            {{ formData.reproductive_history }}
                                                        </el-col>
                                                    </el-row>
                                                    <el-row
                                                        class="margin-10 no-margin-bottom no-margin-left no-margin-right">
                                                        <el-col :span="6" class="">怀孕时间</el-col>
                                                        <el-col :span="10">
                                                            <div class="flex">
                                                                <div class="flex flex-wrap">
                                                                    <div v-for="(item,index) in formData.pregnancyTime"
                                                                         :key="index">
                                                                        <p style="float: left; margin-right: 15px;">
                                                                            {{ item.substring(0, 10) }}</p>
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <div v-for="(item,index) in formData.pregnancyTime_"
                                                                         :key="index">
                                                                        <p style=" margin-right: 10px;">
                                                                            {{ item }}</p>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </el-col>
                                                    </el-row>
                                                    <el-row
                                                        class="margin-10 no-margin-bottom no-margin-left no-margin-right">
                                                        <el-col :span="6" class="">新生儿情况</el-col>
                                                        <el-col :span="10">
                                                            {{ formData.neonatal_conditionList }}
                                                        </el-col>
                                                    </el-row>
                                                </el-row>
                                            </el-col>
                                        </el-row>
                                    </el-col>
                                </el-row>
                            </el-col>
                        </el-row>
                        <!--初次检查-->
                        <el-row>
                            <el-col :span="24" class="btm-line">
                                <p class="p-color text-center size-20 text-bold padding-15 no-padding-right no-padding-left">
                                    初次检查</p>
                            </el-col>
                            <el-col :span="24">
                                <el-row class="padding-20 no-padding-top size-16">
                                    <el-row class="margin-10 no-margin-bottom no-margin-left no-margin-right">
                                        <el-col :span="4" class="">初诊孕周</el-col>
                                        <el-col :span="6">{{ formData.initial_inspection }}</el-col>
                                    </el-row>
                                    <el-row class="margin-10 no-margin-bottom no-margin-left no-margin-right">
                                        <el-col :span="4" class="">高危评定</el-col>
                                        <el-col :span="6">{{ high_risk_assessment }}</el-col>
                                    </el-row>
                                </el-row>
                            </el-col>
                        </el-row>
                        <!--体格检查/产科检查-->
                        <el-row>
                            <el-col :span="24" class="top-line btm-line">
                                <el-row>
                                    <!--体格检查-->
                                    <el-col :span="12" class="right-line">
                                        <el-row>
                                            <el-col class="btm-line">
                                                <p class="p-color text-center size-20 text-bold padding-15 no-padding-right no-padding-left">
                                                    体格检查</p>
                                            </el-col>
                                            <el-col>
                                                <el-row class="padding-20 no-padding-top size-16">
                                                    <el-row
                                                        class="margin-10 no-margin-bottom no-margin-left no-margin-right">
                                                        <el-col :span="8" class="">收缩压</el-col>
                                                        <el-col :span="8">{{ formData.systolic_pressure }}mmHg</el-col>
                                                    </el-row>
                                                    <el-row
                                                        class="margin-10 no-margin-bottom no-margin-left no-margin-right">
                                                        <el-col :span="8" class="">舒张压</el-col>
                                                        <el-col :span="8">{{ formData.diastolic_pressure }}mmHg</el-col>
                                                    </el-row>
                                                    <el-row
                                                        class="margin-10 no-margin-bottom no-margin-left no-margin-right">
                                                        <el-col :span="8" class="">体重</el-col>
                                                        <el-col :span="8">{{ formData.weight_ }}KG</el-col>
                                                    </el-row>
                                                    <el-row
                                                        class="margin-10 no-margin-bottom no-margin-left no-margin-right">
                                                        <el-col :span="8" class="">体重指数(BMI)</el-col>
                                                        <el-col :span="8">{{ formData.body_mass }}kg/㎡</el-col>
                                                    </el-row>
                                                    <el-row
                                                        class="margin-10 no-margin-bottom no-margin-left no-margin-right">
                                                        <el-col :span="8" class="">发育</el-col>
                                                        <el-col :span="8">{{ formData.development }}</el-col>
                                                    </el-row>
                                                    <el-row
                                                        class="margin-10 no-margin-bottom no-margin-left no-margin-right">
                                                        <el-col :span="8" class="">营养</el-col>
                                                        <el-col :span="8">{{ formData.nutrition }}</el-col>
                                                    </el-row>
                                                    <el-row
                                                        class="margin-10 no-margin-bottom no-margin-left no-margin-right">
                                                        <el-col :span="8" class="">皮肤</el-col>
                                                        <el-col :span="8">{{ formData.skin }}</el-col>
                                                    </el-row>
                                                    <el-row
                                                        class="margin-10 no-margin-bottom no-margin-left no-margin-right">
                                                        <el-col :span="8" class="">甲状腺(BMI)</el-col>
                                                        <el-col :span="8">{{ formData.thyroid }}</el-col>
                                                    </el-row>
                                                    <el-row
                                                        class="margin-10 no-margin-bottom no-margin-left no-margin-right">
                                                        <el-col :span="8" class="">肺</el-col>
                                                        <el-col :span="8">{{ formData.lung }}</el-col>
                                                    </el-row>
                                                    <el-row
                                                        class="margin-10 no-margin-bottom no-margin-left no-margin-right">
                                                        <el-col :span="8" class="">乳房</el-col>
                                                        <el-col :span="8">{{ formData.breast }}</el-col>
                                                    </el-row>
                                                    <el-row
                                                        class="margin-10 no-margin-bottom no-margin-left no-margin-right">
                                                        <el-col :span="8" class="">心脏</el-col>
                                                        <el-col :span="8">{{ formData.heart }}</el-col>
                                                    </el-row>
                                                    <el-row
                                                        class="margin-10 no-margin-bottom no-margin-left no-margin-right">
                                                        <el-col :span="8" class="">肝</el-col>
                                                        <el-col :span="8">{{ formData.liver }}</el-col>
                                                    </el-row>
                                                    <el-row
                                                        class="margin-10 no-margin-bottom no-margin-left no-margin-right">
                                                        <el-col :span="8" class="">脾</el-col>
                                                        <el-col :span="8">{{ formData.spleen }}</el-col>
                                                    </el-row>
                                                    <el-row
                                                        class="margin-10 no-margin-bottom no-margin-left no-margin-right">
                                                        <el-col :span="8" class="">其他</el-col>
                                                        <el-col :span="8">{{ formData.other }}</el-col>
                                                    </el-row>
                                                </el-row>
                                            </el-col>
                                        </el-row>
                                    </el-col>
                                    <!--产科检查-->
                                    <el-col :span="12">
                                        <el-row>
                                            <el-col class="right-line btm-line">
                                                <p class="p-color text-center size-20 text-bold padding-15 no-padding-right no-padding-left">
                                                    产科检查</p>
                                            </el-col>
                                            <el-col>
                                                <el-row class="padding-20 no-padding-top size-16">
                                                    <el-row
                                                        class="margin-10 no-margin-bottom no-margin-left no-margin-right">
                                                        <el-col :span="8" class="">初次检查 (周)</el-col>
                                                        <el-col :span="8">{{ formData.initial_inspection_ }}</el-col>
                                                    </el-row>
                                                    <el-row
                                                        class="margin-10 no-margin-bottom no-margin-left no-margin-right">
                                                        <el-col :span="8" class="">宫高</el-col>
                                                        <el-col :span="8">{{ formData.gonggao }}</el-col>
                                                    </el-row>
                                                    <el-row
                                                        class="margin-10 no-margin-bottom no-margin-left no-margin-right">
                                                        <el-col :span="8" class="">腹围</el-col>
                                                        <el-col :span="8">{{ formData.circumference }}</el-col>
                                                    </el-row>
                                                    <el-row
                                                        class="margin-10 no-margin-bottom no-margin-left no-margin-right">
                                                        <el-col :span="8" class="">胎心</el-col>
                                                        <el-col :span="8">{{ formData.heart_rate }}</el-col>
                                                    </el-row>
                                                    <el-row
                                                        class="margin-10 no-margin-bottom no-margin-left no-margin-right">
                                                        <el-col :span="8" class="">其他</el-col>
                                                        <el-col :span="8">{{ formData.heart_rate_other }}</el-col>
                                                    </el-row>
                                                    <el-row
                                                        class="margin-10 no-margin-bottom no-margin-left no-margin-right">
                                                        <el-col :span="8" class="">初步诊断</el-col>
                                                        <el-col :span="8">{{ formData.preliminary_diagnosis }}</el-col>
                                                    </el-row>
                                                    <el-row
                                                        class="margin-10 no-margin-bottom no-margin-left no-margin-right">
                                                        <el-col :span="8" class="">处理</el-col>
                                                        <el-col :span="8">{{ formData.handle }}</el-col>
                                                    </el-row>
                                                </el-row>
                                            </el-col>
                                        </el-row>
                                    </el-col>
                                </el-row>
                            </el-col>
                        </el-row>
                        <!--产前检查-->
                        <el-row>
                            <el-col :span="24" class="btm-line">
                                <p class="p-color text-center size-20 text-bold padding-15 no-padding-right no-padding-left">
                                    产前检查</p>
                            </el-col>
                            <el-col :span="24">
                                <el-row class="padding-20 no-padding-top size-16">
                                    <el-col :span="3" class="margin-10 no-margin-bottom no-margin-left">日期</el-col>
                                    <el-col :span="2" class="margin-10 no-margin-bottom no-margin-left">孕周</el-col>
                                    <el-col :span="2" class="margin-10 no-margin-bottom no-margin-left">主诉</el-col>
                                    <el-col :span="2" class="margin-10 no-margin-bottom no-margin-left">
                                        <p>收缩压</p>
                                        <p class="size-14" style="color: #999999">mmHg</p>
                                    </el-col>
                                    <el-col :span="2" class="margin-10 no-margin-bottom no-margin-left">
                                        <p>舒张压</p>
                                        <p class="size-14" style="color: #999999">mmHg</p>
                                    </el-col>
                                    <el-col :span="2" class="margin-10 no-margin-bottom no-margin-left">
                                        <p>体重</p>
                                        <p class="size-14" style="color: #999999">Kg</p>
                                    </el-col>
                                    <el-col :span="2" class="margin-10 no-margin-bottom no-margin-lef">
                                        <p>体重指数</p>
                                        <p class="size-14" style="color: #999999">BMI</p>
                                    </el-col>
                                    <el-col :span="2" class="margin-10 no-margin-bottom no-margin-left">
                                        <p>宫高</p>
                                        <p class="size-14" style="color: #999999">cm</p>
                                    </el-col>
                                    <el-col :span="2" class="margin-10 no-margin-bottom no-margin-left">
                                        <p>腹围</p>
                                        <p class="size-14" style="color: #999999">cm</p>
                                    </el-col>
                                    <el-col :span="2" class="margin-10 no-margin-bottom no-margin-left">
                                        <p>胎心率</p>
                                        <p class="size-14" style="color: #999999">bpm</p>
                                    </el-col>
                                </el-row>
                            </el-col>
                            <el-col :span="24" class="baseInfo">
                                <el-row class="padding-15 no-padding-top size-16"
                                        v-for="(item,index) in formData.tableData" :key="index">
                                    <el-col :span="3" class="margin-10 no-margin-bottom no-margin-left">{{
                                            item.date
                                        }}
                                    </el-col>
                                    <el-col :span="2" class="margin-10 no-margin-bottom no-margin-left">{{
                                            item.week
                                        }}
                                    </el-col>
                                    <el-col :span="2" class="margin-10 no-margin-bottom no-margin-left">{{
                                            item.zhusu
                                        }}
                                    </el-col>
                                    <el-col :span="2" class="margin-10 no-margin-bottom no-margin-left">{{
                                            item.shousuo
                                        }}
                                    </el-col>
                                    <el-col :span="2" class="margin-10 no-margin-bottom no-margin-left">{{
                                            item.shuzhang
                                        }}
                                    </el-col>
                                    <el-col :span="2" class="margin-10 no-margin-bottom no-margin-left">{{
                                            item.tizhong
                                        }}
                                    </el-col>
                                    <el-col :span="2" class="margin-10 no-margin-bottom no-margin-lef">{{
                                            item.zhishu
                                        }}
                                    </el-col>
                                    <el-col :span="2" class="margin-10 no-margin-bottom no-margin-left">{{
                                            item.gonggao
                                        }}
                                    </el-col>
                                    <el-col :span="2" class="margin-10 no-margin-bottom no-margin-left">{{
                                            item.yaowei
                                        }}
                                    </el-col>
                                    <el-col :span="2" class="margin-10 no-margin-bottom no-margin-left">{{
                                            item.xinlv
                                        }}
                                    </el-col>
                                </el-row>
                            </el-col>
                        </el-row>
                        <!--复诊记录表-->
                        <el-row>
                            <el-col :span="24" class="btm-line">
                                <p class="p-color text-center size-20 text-bold padding-15 no-padding-right no-padding-left">
                                    复诊记录表</p>
                            </el-col>
                            <el-col :span="24" class="">
                                <el-row class="padding-20 no-padding-top size-16 btm-line">
                                    <el-col :span="3" class="margin-10 no-margin-bottom no-margin-left no-margin-right">
                                        日期
                                    </el-col>
                                    <el-col :span="3" class="margin-10 no-margin-bottom no-margin-left no-margin-right">
                                        胎方位
                                    </el-col>
                                    <el-col :span="12"
                                            class="margin-10 no-margin-bottom no-margin-left no-margin-right text-center">
                                        体检、化验、检查结果
                                    </el-col>
                                    <el-col :span="2"
                                            class="margin-10 no-margin-bottom no-margin-left no-margin-right text-center">
                                        处理
                                    </el-col>
                                    <el-col :span="3"
                                            class="margin-10 no-margin-bottom no-margin-left no-margin-right text-center">
                                        签名
                                    </el-col>
                                </el-row>
                                <el-row class="padding-20 no-padding-top size-16"
                                        v-for="(item,index) in formData.tableData_" :key="index">
                                    <el-col :span="3" class="margin-10 no-margin-bottom no-margin-left no-margin-right">
                                        {{ item.date }}
                                    </el-col>
                                    <el-col :span="3" class="margin-10 no-margin-bottom no-margin-left no-margin-right">
                                        {{ item.week }}
                                    </el-col>
                                    <el-col :span="12"
                                            class="margin-10 no-margin-bottom no-margin-left no-margin-right text-center">
                                        {{ item.experience }}
                                    </el-col>
                                    <el-col :span="2"
                                            class="margin-10 no-margin-bottom no-margin-left no-margin-right text-center">
                                        {{ item.handle_ }}
                                    </el-col>
                                    <el-col :span="3"
                                            class="margin-10 no-margin-bottom no-margin-left no-margin-right text-center">
                                        {{ item.autograph }}
                                    </el-col>
                                </el-row>
                            </el-col>
                        </el-row>
                        <!--产前检查概要-->
                        <el-row>
                            <el-col :span="24" class="baseInfo">
                                <p class="p-color text-center size-20 text-bold padding-15 no-padding-right no-padding-left">
                                    产前检查概要</p>
                            </el-col>
                            <el-col :span="24">
                                <el-row class="padding-20 no-padding-top size-16">
                                    <!--传染病-->
                                    <el-row class="margin-10 no-margin-bottom no-margin-left no-margin-right">
                                        <el-col :span="4" class="">传染病</el-col>
                                        <el-col :span="20">
                                            <el-checkbox-group v-model="formData.infectious">
                                                <el-checkbox disabled :label="1">乙肝两对半</el-checkbox>
                                                <el-checkbox disabled :label="2">抗-HIV</el-checkbox>
                                                <el-checkbox disabled :label="3">抗-HCV RPR</el-checkbox>
                                            </el-checkbox-group>
                                        </el-col>
                                    </el-row>
                                    <!--地贫检测-->
                                    <el-row class="margin-10 no-margin-bottom no-margin-left no-margin-right">
                                        <el-col :span="4" class="">地贫检测</el-col>
                                        <el-col :span="20">
                                            <el-checkbox-group v-model="formData.poor">
                                                <el-checkbox disabled :label="1">Hb<input readonly
                                                                                          v-model="formData.dipin_one"
                                                                                          style="width: 50px;border: none;border-bottom: 1px solid #ccc;text-align: center"/>g/L
                                                </el-checkbox>
                                                <el-checkbox disabled :label="2">MCV<input readonly
                                                                                           v-model="formData.dipin_two"
                                                                                           style="width: 50px;border: none;border-bottom: 1px solid #ccc;text-align: center"/>fl
                                                </el-checkbox>
                                                <el-checkbox disabled :label="3">Hb<input readonly
                                                                                          v-model="formData.dipin_three"
                                                                                          style="width: 50px;border: none;border-bottom: 1px solid #ccc;text-align: center"/>A%
                                                </el-checkbox>
                                                <el-checkbox disabled :label="4">Hb<input readonly
                                                                                          v-model="formData.dipin_four"
                                                                                          style="width: 50px;border: none;border-bottom: 1px solid #ccc;text-align: center"/>A2
                                                    %
                                                </el-checkbox>
                                            </el-checkbox-group>
                                        </el-col>
                                    </el-row>
                                    <!--血型-->
                                    <el-row class="margin-10 no-margin-bottom no-margin-left no-margin-right">
                                        <el-col :span="4" class="">血型</el-col>
                                        <el-col :span="20">
                                            <el-radio-group v-model="formData.bloodType">
                                                <el-radio disabled :label="1">A</el-radio>
                                                <el-radio disabled :label="2">B</el-radio>
                                                <el-radio disabled :label="3">O</el-radio>
                                                <el-radio disabled :label="4">RH</el-radio>
                                                <el-radio disabled :label="5">G6PD</el-radio>
                                            </el-radio-group>
                                        </el-col>
                                    </el-row>
                                    <!--血糖-->
                                    <el-row class="margin-10 no-margin-bottom no-margin-left no-margin-right">
                                        <el-col :span="4" class="">血糖</el-col>
                                        <el-col :span="20">
                                            <p class="elcol-p">初检空腹血糖
                                                <el-input readonly v-model="formData.sugar_one" class="inline-input">
                                                    18
                                                </el-input>
                                                mmol/L
                                            </p>
                                            <p class="elcol-p">糖化血红蛋白
                                                <el-input readonly class="inline-input" v-model="formData.sugar_four">
                                                    18
                                                </el-input>
                                                %
                                            </p>
                                            <p class="elcol-p">OGTT0h
                                                <el-input readonly class="inline-input" v-model="formData.sugar_two">
                                                    18
                                                </el-input>
                                                mmol/L
                                            </p>
                                            <p class="elcol-p">OGTT1h
                                                <el-input readonly class="inline-input" v-model="formData.sugar_three">
                                                    18
                                                </el-input>
                                                mmol/L
                                            </p>
                                            <p class="elcol-p">OGTT2h
                                                <el-input readonly class="inline-input" v-model="formData.sugar_five">
                                                    18
                                                </el-input>
                                                mmol/L
                                            </p>
                                        </el-col>
                                    </el-row>
                                    <!--血脂-->
                                    <el-row class="margin-10 no-margin-bottom no-margin-left no-margin-right">
                                        <el-col :span="4" class="">血脂</el-col>
                                        <el-col :span="20">
                                            <p class="elcol-p">TG
                                                <el-input readonly class="inline-input" v-model="formData.bloodFat_one">
                                                    18
                                                </el-input>
                                                mmol/L
                                            </p>
                                            <p class="elcol-p">TCG
                                                <el-input readonly class="inline-input" v-model="formData.bloodFat_two">
                                                    18
                                                </el-input>
                                                %
                                            </p>
                                            <p class="elcol-p">HDL
                                                <el-input readonly class="inline-input"
                                                          v-model="formData.bloodFat_three">18
                                                </el-input>
                                                mmol/L
                                            </p>
                                            <p class="elcol-p">LDL
                                                <el-input readonly class="inline-input"
                                                          v-model="formData.bloodFat_four">18
                                                </el-input>
                                                mmol/L
                                            </p>
                                            <p class="elcol-p">FFAS
                                                <el-input readonly class="inline-input"
                                                          v-model="formData.bloodFat_five">18
                                                </el-input>
                                                umol/L
                                            </p>
                                            <p class="elcol-p">TCG
                                                <el-input readonly class="inline-input" v-model="formData.bloodFat_six">
                                                    18
                                                </el-input>
                                                umol/L
                                            </p>
                                        </el-col>
                                    </el-row>
                                    <!--超声检查-->
                                    <el-row class="margin-10 no-margin-bottom no-margin-left no-margin-right">
                                        <el-col :span="4" class="">超声检查</el-col>
                                        <el-col :span="20">
                                            <p class="elcol-p">NT
                                                <el-input readonly class="inline-input" v-model="formData.ultrasound">
                                                    18
                                                </el-input>
                                            </p>
                                            <p class="elcol-p">III级超声
                                                <el-input readonly class="inline-input" v-model="formData.ultrasonic">
                                                    18
                                                </el-input>
                                            </p>
                                            <p class="elcol-p">胎儿心脏超声
                                                <el-input readonly class="inline-input"
                                                          v-model="formData.fetal_cardiac_ultrasound">18
                                                </el-input>
                                            </p>
                                        </el-col>
                                    </el-row>
                                    <!--甲状腺功能-->
                                    <el-row class="margin-10 no-margin-bottom no-margin-left no-margin-right">
                                        <el-col :span="4" class="">甲状腺功能</el-col>
                                        <el-col :span="20">
                                            <p class="elcol-p">HTSH
                                                <el-input readonly v-model="formData.thyroid_gland_one"
                                                          class="inline-input">18
                                                </el-input>
                                                m1U/L
                                            </p>
                                            <p class="elcol-p">FT3
                                                <el-input readonly v-model="formData.thyroid_gland_two"
                                                          class="inline-input">18
                                                </el-input>
                                                Pmol/L
                                            </p>
                                            <p class="elcol-p">FT4
                                                <el-input readonly v-model="formData.thyroid_gland_three"
                                                          class="inline-input">18
                                                </el-input>
                                                pmol/L
                                            </p>
                                        </el-col>
                                    </el-row>
                                    <!--心电图-->
                                    <el-row class="margin-10 no-margin-bottom no-margin-left no-margin-right">
                                        <el-col :span="4" class="">心电图</el-col>
                                        <el-col :span="20">
                                            <div v-if="formData.titleImage ? false :true" style="height: 10px"></div>
                                            <div v-if="formData.titleImage ? true :false "
                                                 style="{width: 430px; height: 400px;}">
                                                <img :src=formData.titleImage style="width: auto; height: 100%;">
                                            </div>
                                        </el-col>
                                    </el-row>
                                    <!--肝功能-->
                                    <el-row class="margin-10 no-margin-bottom no-margin-left no-margin-right">
                                        <el-col :span="4" class="">肝功能</el-col>
                                        <el-col :span="20">
                                            <p class="elcol-p">ALT
                                                <el-input readonly class="inline-input"
                                                          v-model="formData.liver_function_one">18
                                                </el-input>
                                                U/L
                                            </p>
                                            <p class="elcol-p">AST
                                                <el-input readonly class="inline-input"
                                                          v-model="formData.liver_function_two">18
                                                </el-input>
                                                U/L
                                            </p>
                                            <p class="elcol-p">TBA
                                                <el-input readonly class="inline-input"
                                                          v-model="formData.liver_function_three">18
                                                </el-input>
                                                Umol/L
                                            </p>
                                        </el-col>
                                    </el-row>
                                    <!--肾功能-->
                                    <el-row class="margin-10 no-margin-bottom no-margin-left no-margin-right">
                                        <el-col :span="4" class="">肾功能</el-col>
                                        <el-col :span="20">
                                            <p class="elcol-p">BUN
                                                <el-input readonly class="inline-input"
                                                          v-model="formData.renal_function_one">18
                                                </el-input>
                                                mmol/L
                                            </p>
                                            <p class="elcol-p">CRE
                                                <el-input readonly class="inline-input"
                                                          v-model="formData.renal_function_two">18
                                                </el-input>
                                                mmol/L
                                            </p>
                                            <p class="elcol-p">ALB
                                                <el-input readonly class="inline-input"
                                                          v-model="formData.renal_function_three">18
                                                </el-input>
                                                g/L
                                            </p>
                                        </el-col>
                                    </el-row>
                                    <!--血常规-->
                                    <el-row class="margin-10 no-margin-bottom no-margin-left no-margin-right">
                                        <el-col :span="4" class="">血常规</el-col>
                                        <el-col :span="20">
                                            <p class="elcol-p">WBC
                                                <el-input readonly class="inline-input"
                                                          v-model="formData.routine_blood_one">18
                                                </el-input>
                                                X109/L
                                            </p>
                                            <p class="elcol-p">BBC
                                                <el-input readonly class="inline-input"
                                                          v-model="formData.routine_blood_two">18
                                                </el-input>
                                                X109/L
                                            </p>
                                            <p class="elcol-p" style="position: relative;">PLT
                                                <el-input readonly class="inline-input"
                                                          v-model="formData.routine_blood_three">18
                                                </el-input>
                                                X10 <i class="iii">12</i> /L
                                            </p>
                                            <p class="elcol-p"> HGT
                                                <el-input readonly class="inline-input"
                                                          v-model="formData.routine_blood_four">18
                                                </el-input>
                                                %
                                            </p>
                                        </el-col>
                                    </el-row>
                                    <!--尿常规-->
                                    <el-row class="margin-10 no-margin-bottom no-margin-left no-margin-right">
                                        <el-col :span="4" class="">尿常规</el-col>
                                        <el-col :span="20">
                                            <p class="elcol-p">Pro
                                                <el-input readonly class="inline-input"
                                                          v-model="formData.routine_urine_one">18
                                                </el-input>
                                                g/L
                                            </p>
                                            <p class="elcol-p">Glu
                                                <el-input readonly class="inline-input"
                                                          v-model="formData.routine_urine_two">18
                                                </el-input>
                                                mmol/L
                                            </p>
                                            <p class="elcol-p">KET
                                                <el-input readonly class="inline-input"
                                                          v-model="formData.routine_urine_three">18
                                                </el-input>
                                                mmol/L
                                            </p>
                                            <p class="elcol-p"> WBC
                                                <el-input readonly class="inline-input"
                                                          v-model="formData.routine_urine_four">18
                                                </el-input>
                                                个/ul
                                            </p>
                                        </el-col>
                                    </el-row>
                                    <!--凝血功能-->
                                    <el-row class="margin-10 no-margin-bottom no-margin-left no-margin-right">
                                        <el-col :span="4" class="">凝血功能</el-col>
                                        <el-col :span="20">
                                            <p class="elcol-p">APTT
                                                <el-input readonly class="inline-input"
                                                          v-model="formData.blood_coagulation_one">18
                                                </el-input>
                                                秒
                                            </p>
                                            <p class="elcol-p">Ｆbg
                                                <el-input readonly class="inline-input"
                                                          v-model="formData.blood_coagulation_two">18
                                                </el-input>
                                                g/L
                                            </p>
                                            <p class="elcol-p">AT-III
                                                <el-input readonly class="inline-input"
                                                          v-model="formData.blood_coagulation_three">18
                                                </el-input>
                                                %
                                            </p>
                                            <p class="elcol-p"> D-D
                                                <el-input readonly class="inline-input"
                                                          v-model="formData.blood_coagulation_four">18
                                                </el-input>
                                                ug/L
                                            </p>
                                        </el-col>
                                    </el-row>
                                </el-row>
                            </el-col>
                        </el-row>
                    </el-row>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "AmongDetail",
    data() {
        return {
            printObj: {
                id: "print",//要打印的id名 无#号
                popTitle:'&nbsp;',//页眉标题 默认浏览器标题 空字符串时显示undefined 使用html语言
                extraHead:'&nbsp;',//头部文字 默认空
            },
            zaoyunList: '',
            zhongyunList: '',
            wanyunList: '',
            zaoyunMap: {
                1: '营养咨询',
                2: '健康教育'
            },
            patient_id: '',
            hospital_info: {},
            formData: {
                infectious: [''],
                poor: [''],
                early_pregnancy: [''],
                second_trimester: [''],
                late_pregnancy: [''],
                delivery_history: [''],
                medical_history: [''],
                neonatal_condition: [''],
                reproductive_history: [''],
            },
            readonly: true,
            evaluate: '',
            before_weight: '',
            family_history: '',
            personal_history: '',
            high_risk_assessment: '',
            early_pregnancy: '',
            abortion_history: '',
            form: {}
        }
    },
    watch: {
        'formData': function () {
            if (this.formData.early_pregnancy) {
                let list = this.formData.early_pregnancy.map(item => {
                    return this.zaoyunMap[Number(item)]
                })
                this.zaoyunList = list.join(' ')
            }

            if (this.formData.second_trimester) {
                let list1 = this.formData.second_trimester.map(item => {
                    return this.zaoyunMap[Number(item)]
                })
                this.zhongyunList = list1.join('')
            }

            if (this.formData.late_pregnancy) {
                let list2 = this.formData.late_pregnancy.map(item => {
                    return this.zaoyunMap[Number(item)]
                })
                this.wanyunList = list2.join('')
            }
        }
    },
    mounted() {
        this.patient_id = this.$route.query.row.id
        this.form = this.$route.query.row
        this.getInfo()
        sessionStorage.setItem("detail", true);
        //消息接口
        this.$store.dispatch('GetXiao')
    }
    ,
    methods: {
        //接口
        async getInfo() {
            let params = {
                patient_id: this.patient_id,
            }
            await this.$axios.post('api/perinatal/detail', this.$qs.stringify(params)).then(res => {
                let result = res.data
                if (result.code === 1) {
                    this.hospital_info = result.data.hospital_info
                    this.formData = result.data.data
                    this.formData.infectious = this.formData.infectious.map(item => Number(item))
                    this.formData.poor = this.formData.poor.map(item => Number(item))
                    if (this.formData.bloodType) {
                        this.formData.bloodType = Number(result.data.data.bloodType)
                    }
                    if (this.formData.pregnant == 1) {
                        this.formData.pregnant = '正常怀孕'
                    }
                    if (this.formData.pregnant == 2) {
                        this.formData.pregnant = '非正常怀孕'
                    }
                    if (this.formData.childbirth == 1) {
                        this.formData.childbirth = '自然分娩（顺产、刨妇产）'
                    }
                    if (this.formData.childbirth == 2) {
                        this.formData.childbirth = '非自然分娩（流产、胚胎停止发育、畸形、死胎史、其他等）'
                    }
                    switch (this.formData.evaluate) {
                        case 3:
                            this.evaluate = "正常"
                            break;
                        case 6:
                            this.evaluate = "一般"
                            break;
                        case 9:
                            this.evaluate = "严重"
                            break;
                        case 10:
                            this.evaluate = "高龄"
                            break;
                    }
                    switch (this.formData.before_weight) {
                        case 3:
                            this.before_weight = "偏轻"
                            break;
                        case 6:
                            this.before_weight = "标准"
                            break;
                        case 9:
                            this.before_weight = "超重"
                            break;
                        case 10:
                            this.before_weight = "肥胖"
                            break;
                    }
                    switch (this.formData.family_history) {
                        case 3:
                            this.family_history = "精神病"
                            break;
                        case 6:
                            this.family_history = "聋哑"
                            break;
                        case 9:
                            this.family_history = "色盲"
                            break;
                        case 10:
                            this.family_history = "其他"
                            break;
                    }
                    switch (this.formData.personal_history) {
                        case 3:
                            this.personal_history = "吸烟"
                            break;
                        case 6:
                            this.personal_history = "吸毒"
                            break;
                        case 9:
                            this.personal_history = "喝酒"
                            break;
                        case 10:
                            this.personal_history = "工作条件"
                            break;
                    }
                    switch (this.formData.high_risk_assessment) {
                        case 3:
                            this.high_risk_assessment = "正常"
                            break;
                        case 6:
                            this.high_risk_assessment = "一般"
                            break;
                        case 9:
                            this.high_risk_assessment = "严重"
                            break;
                    }
                    switch (this.formData.abortion_history) {
                        case 3:
                            this.abortion_history = "自然"
                            break;
                        case 10:
                            this.abortion_history = "人工"
                            break;
                    }
                }
            })
        }
        ,
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
::v-deep .el-checkbox__input.is-disabled + span.el-checkbox__label {
    color: #606266;
}

::v-deep .el-checkbox__input.is-disabled.is-checked .el-checkbox__inner {
    background-color: #F5605A;
    border-color: #F5605A;
}

::v-deep .el-radio__input.is-disabled.is-checked .el-radio__inner {
    background-color: #F5605A;
    border-color: #F5605A;
}

::v-deep .el-radio__input.is-disabled + span.el-radio__label {
    color: #606266;
}

.iii {
    position: absolute;
    top: -1px;
    right: 5px;
    font-size: 12px;
    font-style: normal;
    -webkit-transform-origin-x: 0;
    -webkit-transform: scale(0.55);
}

.left-line {
    border-left: 1px solid #E6E6E6;
}

.right-line {
    border-right: 1px solid #E6E6E6;
}

.top-line {
    border-top: 1px solid #E6E6E6;
}

.btm-line {
    border-bottom: 1px solid #E6E6E6;
}

.baseInfo {
    border-bottom: 1px solid #E6E6E6;
    border-top: 1px solid #E6E6E6;
}

.p-color {
    color: #333333;
}

.elcol-p {
    display: inline-block;
    margin-right: 20px;
    margin-bottom: 10px;
}

::v-deep .el-input {
    width: 52px !important;
}

::v-deep .el-input__inner {
    width: 52px;
    border-top: none;
    border-left: none;
    border-right: none;
    line-height: 20px;
    height: 20px;
    text-align: center;
    border-radius: 0;
}

.print-last-row {

    padding: 10px 55px;
    display: flex;
    align-items: center;
    justify-content: center;
}

.table_title {
    margin: 20px auto;
}

.charts-wrap {
    width: 880px;
    height: 400px;
    display: flex;
}


.print-body {
    border: 1px solid #E6E6E6;
    margin-bottom: 30px;
}

.content_body {
    overflow: scroll;
}


.print_html {
    width: 65%;
    margin: 0 auto;
}

.title {
    color: #333;
    font-size: 20px;
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
    //border-radius: 50%;
    margin-right: 15px;
}

.title p {
    font-size: 36px;
    margin-bottom: 5px;
}

.table-name {
    position: relative;
    display: flex;
    align-items: flex-end;
    margin: 0 auto 20px;
    font-size: 16px;
    color: #333;
}

.table-name p:nth-of-type(1) {
    flex: 1;
    font-size: 16px;
    font-family: PingFangSC-Medium, PingFang SC;
    font-weight: 500;
    color: #333333;
}

.table-name p:nth-of-type(2) {
    flex: 1;
    font-size: 24px;
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
