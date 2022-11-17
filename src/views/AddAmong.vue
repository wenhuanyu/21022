<template>
    <div class="content_body">
        <div class="top-name">
            {{ form.name }}
        </div>
        <div class="form-wrap">
            <el-form label-width="9em">
                <!--pageIndex === 0-->
                <div class="form-page" v-if="pageIndex === 0">
                    <div class="form-page-item">
                        <el-form-item label="病历号" prop="medical_num">
                            <el-input readonly v-model="form.medical_num"></el-input>
                        </el-form-item>
                        <el-form-item label="高危评定" label-width="8em">
                            <el-radio-group v-model="formData.evaluate">
                                <el-radio :label="3">正常</el-radio>
                                <el-radio :label="6">一般</el-radio>
                                <el-radio :label="9">严重</el-radio>
                                <el-radio :label="10">高龄</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="过敏史" prop="allergy">
                            <el-input v-model="formData.allergy"></el-input>
                        </el-form-item>
                        <el-form-item label="姓名" prop="name">
                            <el-input readonly v-model="form.name"></el-input>
                        </el-form-item>
                        <el-form-item label="年龄" prop="age">
                            <el-input readonly v-model="form.age"></el-input>
                        </el-form-item>
                        <el-form-item label="联系电话" prop="telephone">
                            <el-input readonly v-model="form.phone"></el-input>
                        </el-form-item>
                        <el-form-item label="职业" prop="occupation">
                            <el-input readonly v-model="form.occupation"></el-input>
                        </el-form-item>
                        <el-form-item label="现住址" prop="address">
                            <el-input readonly v-model="form.residence"></el-input>
                        </el-form-item>
                        <el-form-item label="身份证号/护照号" prop="idnumber">
                            <el-input v-model="formData.idnumber"></el-input>
                        </el-form-item>
                    </div>
                    <div class="form-page-item">
                        <el-form-item label="丈夫姓名" prop="husband_name">
                            <el-input v-model="formData.husband_name"></el-input>
                        </el-form-item>
                        <el-form-item label="年龄" prop="husband_age">
                            <el-input v-model="formData.husband_age"></el-input>
                        </el-form-item>
                        <el-form-item label="联系电话" prop="husband_telephone">
                            <el-input v-model="formData.husband_telephone"></el-input>
                        </el-form-item>
                        <div class="form-page-title">
                            <p><span>-</span> 怀孕情况 <span>-</span></p>
                        </div>
                        <el-form-item label="早孕">
                            <el-checkbox-group v-model="formData.early_pregnancy">
                                <el-checkbox :label="1">营养咨询</el-checkbox>
                                <el-checkbox :label="2">健康教育</el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                        <el-form-item label="中孕">
                            <el-checkbox-group v-model="formData.second_trimester">
                                <el-checkbox :label="1">营养咨询</el-checkbox>
                                <el-checkbox :label="2">健康教育</el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                        <el-form-item label="晚孕">
                            <el-checkbox-group v-model="formData.late_pregnancy">
                                <el-checkbox :label="1">营养咨询</el-checkbox>
                                <el-checkbox :label="2">健康教育</el-checkbox>
                            </el-checkbox-group>
                        </el-form-item>
                        <div class="form-page-title">
                            <p><span>-</span> 本次妊娠情况 <span>-</span></p>
                        </div>
                        <el-form-item label="末次月经" prop="last_menstruation">
                            <el-date-picker type="date" placeholder="选择日期" style="width:100%" v-model="formData.last_menstruation"
                                            value-format="yyyy-MM-dd"></el-date-picker>
                        </el-form-item>
                    </div>
                </div>
                <!--pageIndex === 1-->
                <div class="form-page" v-if="pageIndex === 1">
                    <div class="form-page-item">
                        <el-form-item label="预产期" prop="production">
                            <el-date-picker type="date" placeholder="选择日期" style="width:100%" v-model="formData.production"
                                            value-format="yyyy-MM-dd"></el-date-picker>
                        </el-form-item>
                        <el-form-item label="孕前体重" prop="pregnancyWeight">
                            <el-input v-model="formData.pregnancyWeight"></el-input>
                        </el-form-item>
                        <el-form-item label="身高" prop="height">
                            <el-input v-model="formData.height"></el-input>
                        </el-form-item>
                        <el-form-item label="孕前体重指数">
                            <el-radio-group v-model="formData.before_weight">
                                <el-radio :label="3">偏轻</el-radio>
                                <el-radio :label="6">标准</el-radio>
                                <el-radio :label="9">超重</el-radio>
                                <el-radio :label="10">肥胖</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="既往病史">
                            <template v-for="(item,key) in formData.medical_history">
                                <div style="position: relative">
                                    <el-input class="add-input" v-model="formData.medical_history[key]"></el-input>
                                    <div class="add-btn" v-if="key== 0" @click="addItem('medical_history')">+
                                    </div>
                                    <div class="add-btn" v-else @click="reduceItem('medical_history',key)">-</div>
                                </div>
                            </template>
                        </el-form-item>
                        <div class="form-page-sub-title">
                            <p><span>-</span> 月经婚育史 <span>-</span></p>
                        </div>
                        <el-form-item label="月经周期" prop="menstrual_cycle">
                            <el-input v-model="formData.menstrual_cycle"></el-input>
                        </el-form-item>
                        <el-form-item label="婚姻状况" prop="rouge_condition">
                            <el-input v-model="formData.rouge_condition"></el-input>
                        </el-form-item>
                        <el-form-item label="家族史" label-width="8em">
                            <el-radio-group v-model="formData.family_history">
                                <el-radio :label="3">精神病</el-radio>
                                <el-radio :label="6">聋哑</el-radio>
                                <el-radio :label="9">色盲</el-radio>
                                <el-radio :label="10">其他</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </div>
                    <div class="form-page-item">
                        <el-form-item label="个人史" label-width="9em">
                            <el-radio-group v-model="formData.personal_history">
                                <el-radio :label="3">吸烟</el-radio>
                                <el-radio :label="6">吸毒</el-radio>
                                <el-radio :label="9">喝酒</el-radio>
                                <el-radio :label="10">工作条件</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <div class="form-page-sub-title">
                            <p><span>-</span> 以往妊娠分娩史 <span>-</span></p>
                        </div>
                        <el-form-item label="怀孕" label-width="8em">
                            <el-radio-group v-model="formData.pregnant" @change="pregnantChange($event)">
                                <el-radio :label="1">正常怀孕</el-radio>
                                <el-radio :label="2">非正常怀孕</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="分娩" label-width="8em">
                            <el-radio-group v-model="formData.childbirth">
                                <el-radio :label="1" style="margin-top: 15px;">自然分娩（顺产、刨妇产）</el-radio>
                                <el-radio :label="2" style="margin-top: 15px;">非自然分娩（流产、胚胎停止发育、畸形、死胎史、其他等）</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="孕次" label-width="8em">
                            <el-select v-model="formData.pregnancy_times" placeholder="请选择"
                                       style="width: 170px;float: left">
                                <el-option
                                    v-for="item in pregnancy_timesList"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.name">
                                </el-option>
                            </el-select>
                            <el-input v-model="formData.pregnancy_times_" placeholder="请输入"
                                      style="width: 170px;float: right"></el-input>
                        </el-form-item>
                        <el-form-item label="怀孕时间" label-width="8em" v-if="show1">
                            <template v-for="(item,key) in formData.pregnancyTime">
                                <div style="position: relative">
                                    <el-date-picker placeholder="选择日期" v-model="formData.pregnancyTime[key]"
                                                    style="width: 170px;margin-bottom: 10px;"></el-date-picker>
                                    <!--                                <el-input style="width: 170px;margin-bottom: 10px;" v-model="formData.pregnancyTime[key]"></el-input>-->
                                    <el-input style="width: 120px;margin-bottom: 10px; margin-left: 5px;"
                                              placeholder="怀孕时间(月)" v-model="formData.pregnancyTime_[key]"></el-input>
                                    <div class="add-btn" v-if="key== 0" @click="addItem('pregnancyTime')">+
                                    </div>
                                    <div class="add-btn" v-else @click="reduceItem('pregnancyTime',key)">-</div>
                                </div>
                            </template>
                        </el-form-item>
                        <el-form-item label="新生儿情况" label-width="8em" v-if="show1">
                            <el-select v-model="formData.neonatal_conditionList" placeholder="请选择">
                                <el-option
                                    v-for="item in neonatal_conditionList"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.name">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="流产史" label-width="8em" v-if="show2">
                            <el-select v-model="formData.abortion_history" placeholder="请选择">
                                <el-option
                                    v-for="item in abortion_history"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.name">
                                </el-option>
                            </el-select>
                        </el-form-item>
                        <el-form-item label="不良生育史" label-width="8em" v-if="show2">
                            <el-select v-model="formData.reproductive_history" placeholder="请选择"
                                       @change="reproductiveHistoryChange($event)">
                                <el-option
                                    v-for="item in reproductive_history"
                                    :key="item.id"
                                    :label="item.name"
                                    :value="item.name">
                                </el-option>
                            </el-select>
                            <el-input v-model="formData.reproductive_history_" placeholder="请输入"
                                      style="margin-top: 10px;" v-if="show3"></el-input>
                        </el-form-item>
                        <!--                        <el-form-item label="孕次" prop="pregnancy_times">-->
                        <!--                            <el-input v-model="formData.pregnancy_times"></el-input>-->
                        <!--                        </el-form-item>-->
                        <!--                        <el-form-item label="年" prop="year">-->
                        <!--                            <el-input v-model="formData.year"></el-input>-->
                        <!--                        </el-form-item>-->
                        <!--                        <el-form-item label="孕月" prop="pregnant_month">-->
                        <!--                            <el-input v-model="formData.pregnant_month"></el-input>-->
                        <!--                        </el-form-item>-->
                        <!--                        <el-form-item label="流产史" prop="abortion_history">-->
                        <!--                            <el-radio-group v-model="formData.abortion_history">-->
                        <!--                                <el-radio :label="3">自然</el-radio>-->
                        <!--                                <el-radio :label="10">人工</el-radio>-->
                        <!--                            </el-radio-group>-->
                        <!--                        </el-form-item>-->
                        <!--                        <el-form-item label="不良生育史">-->
                        <!--                            <template v-for="(item,key) in formData.reproductive_history">-->
                        <!--                                <el-input class="add-input" v-model="formData.reproductive_history[key]"></el-input>-->
                        <!--                                <div class="add-btn" v-if="key== 0" @click="addItem('reproductive_history')">+-->
                        <!--                                </div>-->
                        <!--                            </template>-->
                        <!--                        </el-form-item>-->
                        <!--                        <el-form-item label="正常分娩史">-->
                        <!--                            <template v-for="(item,key) in formData.delivery_history">-->
                        <!--                                <el-input class="add-input" v-model="formData.delivery_history[key]"></el-input>-->
                        <!--                                <div class="add-btn" v-if="key== 0" @click="addItem('delivery_history')">+-->
                        <!--                                </div>-->
                        <!--                            </template>-->
                        <!--                        </el-form-item>-->
                        <!--                        <el-form-item label="新生儿情况">-->
                        <!--                            <template v-for="(item,key) in formData.neonatal_condition">-->
                        <!--                                <el-input class="add-input" v-model="formData.neonatal_condition[key]"></el-input>-->
                        <!--                                <div class="add-btn" v-if="key== 0" @click="addItem('neonatal_condition')">+-->
                        <!--                                </div>-->
                        <!--                            </template>-->
                        <!--                        </el-form-item>-->
                    </div>
                </div>
                <!--pageIndex === 2-->
                <div class="form-page" v-if="pageIndex === 2">
                    <div class="form-page-item">
                        <el-form-item label="并发症" prop="complication">
                            <el-input v-model="formData.complication"></el-input>
                        </el-form-item>
                        <div class="form-page-title">
                            <p><span>-</span> 以往妊娠分娩史 <span>-</span></p>
                        </div>
                        <el-form-item label="初次检查 (周)" prop="initial_inspection">
                            <el-input v-model="formData.initial_inspection"></el-input>
                        </el-form-item>
                        <el-form-item label="高危评定">
                            <el-radio-group v-model="formData.high_risk_assessment">
                                <el-radio :label="3">正常</el-radio>
                                <el-radio :label="6">一般</el-radio>
                                <el-radio :label="9">严重</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <div class="form-page-sub-title">
                            <p><span>-</span> 体格检查 <span>-</span></p>
                        </div>
                        <el-form-item label="收缩压 (mmHg)" prop="systolic_pressure">
                            <el-input v-model="formData.systolic_pressure"></el-input>
                        </el-form-item>
                        <el-form-item label="舒张压 (mmHg)">
                            <el-input v-model="formData.diastolic_pressure"></el-input>
                        </el-form-item>
                        <el-form-item label="体重(KG)" prop="weight_">
                            <el-input v-model="formData.weight_"></el-input>
                        </el-form-item>
                        <el-form-item label="体重指数(kg/㎡)" prop="body_mass">
                            <el-input v-model="formData.body_mass"></el-input>
                        </el-form-item>
                    </div>
                    <div class="form-page-item">
                        <el-form-item label="发育" prop="development">
                            <el-input v-model="formData.development"></el-input>
                        </el-form-item>
                        <el-form-item label="营养" prop="nutrition">
                            <el-input v-model="formData.nutrition"></el-input>
                        </el-form-item>
                        <el-form-item label="皮肤" prop="skin">
                            <el-input v-model="formData.skin"></el-input>
                        </el-form-item>
                        <el-form-item label="甲状腺" prop="thyroid">
                            <el-input v-model="formData.thyroid"></el-input>
                        </el-form-item>
                        <el-form-item label="肺" prop="lung">
                            <el-input v-model="formData.lung"></el-input>
                        </el-form-item>
                        <el-form-item label="乳房" prop="breast">
                            <el-input v-model="formData.breast"></el-input>
                        </el-form-item>
                        <el-form-item label="心脏" prop="heart">
                            <el-input v-model="formData.heart"></el-input>
                        </el-form-item>
                        <el-form-item label="肝" prop="liver">
                            <el-input v-model="formData.liver"></el-input>
                        </el-form-item>
                        <el-form-item label="脾" prop="spleen">
                            <el-input v-model="formData.spleen"></el-input>
                        </el-form-item>
                    </div>
                </div>
                <!--pageIndex === 3-->
                <div class="form-page" v-if="pageIndex === 3">
                    <div class="form-page-item">
                        <el-form-item label="其他" prop="other">
                            <el-input v-model="formData.other"></el-input>
                        </el-form-item>
                        <div class="form-page-sub-title">
                            <p><span>-</span> 产科检查 <span>-</span></p>
                        </div>
                        <el-form-item label="初次检查 (周)" prop="initial_inspection_">
                            <el-input v-model="formData.initial_inspection_"></el-input>
                        </el-form-item>
                        <el-form-item label="宫高 (cm)" prop="gonggao">
                            <el-input v-model="formData.gonggao"></el-input>
                        </el-form-item>
                        <el-form-item label="腹围 (mmHg)">
                            <el-input v-model="formData.circumference"></el-input>
                        </el-form-item>
                        <el-form-item label="胎心" prop="heart_rate">
                            <el-input v-model="formData.heart_rate"></el-input>
                        </el-form-item>
                        <el-form-item label="其他" prop="heart_rate_other">
                            <el-input v-model="formData.heart_rate_other" type="textarea" resize="none"
                                      :autosize="{ minRows: 2, maxRows: 5 }"></el-input>
                        </el-form-item>
                    </div>
                    <div class="form-page-item">
                        <el-form-item label="初步诊断" prop="preliminary_diagnosis">
                            <el-input v-model="formData.preliminary_diagnosis" type="textarea" resize="none"
                                      :autosize="{ minRows: 2, maxRows: 5 }"></el-input>
                        </el-form-item>
                        <el-form-item label="处理" prop="card">
                            <el-input v-model="formData.handle" type="textarea" resize="none"
                                      :autosize="{ minRows: 2, maxRows: 5 }"></el-input>
                        </el-form-item>
                    </div>
                </div>
                <!--pageIndex === 4-->
                <div class="form-page" v-if="pageIndex === 4" style="width: 100%;">
                    <div style="width: 100%;">
                        <div class="form-page-title" style="text-align: center;">
                            <p style="margin-left: 0;"><span>-</span> 产前检查 <span>-</span></p>
                        </div>
                        <div style="width: 50px; height: 50px; background: #F2F2F2;
                        border-radius: 2px;border: 1px solid #D2D2D2;cursor:pointer; text-align: center;
                        font-size:25px;line-height: 50px; float: right;margin-bottom:10px ;"
                             @click="chanqian = true">+
                        </div>
                        <el-table
                            :data="formData.tableData"
                            border
                            :header-cell-style="()=>{return 'background:#F2F2F2;border-color:#D2D2D2;'}"
                            :cell-style="()=>{return 'border-color:#D2D2D2;'}"
                            style="width: 100%;margin-left: auto;margin-right: auto;border-color:#D2D2D2;">
                            <el-table-column
                                v-for="item in column"
                                :key="item.label"
                                :prop="item.prop"
                                align="center"
                                :label="item.label">
                                <template slot="header" slot-scope="scope">
                                    <p>{{ item.label }}</p>
                                    <p style="min-height: 1.5em">{{ item.note }}</p>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
                <!--pageIndex === 5-->
                <div class="form-page" v-if="pageIndex === 5" style="width: 100%;">
                    <div style="width: 100%;">
                        <div class="form-page-title" style="text-align: center">
                            <p style="margin-left: 0;"><span>-</span> 复诊记录表 <span>-</span></p>
                            <div style="width: 50px; height: 50px; background: #F2F2F2;
                        border-radius: 2px;border: 1px solid #D2D2D2;cursor:pointer; text-align: center;
                        font-size:25px;line-height: 50px; float: right;margin-bottom:10px ;"
                                 @click="fuzhen = true">+
                            </div>
                        </div>
                        <el-table
                            :data="formData.tableData_"
                            border
                            :header-cell-style="()=>{return 'background:#F2F2F2;border-color:#D2D2D2;height:60px;'}"
                            :cell-style="()=>{return 'border-color:#D2D2D2;'}"
                            style="width: 100%;margin-left: auto;margin-right: auto;border-color:#D2D2D2;">
                            <el-table-column
                                v-for="item in column_"
                                :key="item.label"
                                :prop="item.prop"
                                align="center"
                                :label="item.label">
                                <template slot="header" slot-scope="scope">
                                    <p>{{ item.label }}</p>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
                <!--pageIndex === 6-->
                <div class="form-page" v-if="pageIndex === 6" style="width: 100%; padding-top: 0">
                    <div style="width: 100%;">
                        <div class="form-page-title" style="text-align: center">
                            <p style="margin-left: 0;"><span>-</span> 产前检查结果概要 <span>-</span></p>
                        </div>
                        <div class="form-page-title_content">
                            <div class="form-page-title_content_left">
                                <el-form-item label="传染病">
                                    <el-checkbox-group v-model="formData.infectious">
                                        <el-checkbox :label="1">乙肝两对半</el-checkbox>
                                        <el-checkbox :label="2">抗-HIV</el-checkbox>
                                        <el-checkbox :label="3">抗-HCV RPR</el-checkbox>
                                    </el-checkbox-group>
                                </el-form-item>
                                <el-form-item label="地贫检测">
                                    <el-checkbox-group v-model="formData.poor">
                                        <el-checkbox :label="1">Hb<input v-model="formData.dipin_one"
                                                                         style="width: 50px;border: none;border-bottom: 1px solid #ccc;text-align: center"/>g/L
                                        </el-checkbox>
                                        <el-checkbox :label="2">MCV<input v-model="formData.dipin_two"
                                                                          style="width: 50px;border: none;border-bottom: 1px solid #ccc;text-align: center"/>fl
                                        </el-checkbox>
                                        <br>
                                        <el-checkbox :label="3">Hb<input v-model="formData.dipin_three"
                                                                         style="width: 50px;border: none;border-bottom: 1px solid #ccc;text-align: center"/>A%
                                        </el-checkbox>
                                        <el-checkbox :label="4">Hb<input v-model="formData.dipin_four"
                                                                         style="width: 50px;border: none;border-bottom: 1px solid #ccc;text-align: center"/>A2
                                            %
                                        </el-checkbox>
                                    </el-checkbox-group>
                                </el-form-item>
                                <el-form-item label="血型">
                                    <el-radio-group v-model="formData.bloodType">
                                        <el-radio :label="1">A</el-radio>
                                        <el-radio :label="2">B</el-radio>
                                        <el-radio :label="3">O</el-radio>
                                        <el-radio :label="4">RH</el-radio>
                                        <el-radio :label="5">G6PD</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                                <el-form-item label="血糖">
                                    <span style="margin-right: 20px;">初检空腹血糖<input v-model="formData.sugar_one"
                                                                                   style="width: 50px;border: none;border-bottom: 1px solid #ccc;text-align: center"/>mmol/L</span>
                                    <span>糖化血红蛋白<input v-model="formData.sugar_four"
                                                       style="width: 50px;border: none;border-bottom: 1px solid #ccc;text-align: center"/>%</span>
                                    <br>
                                    <span style="margin-right: 20px;">OGTT0h<input v-model="formData.sugar_two"
                                                                                   style="width: 50px;border: none;border-bottom: 1px solid #ccc;text-align: center"/> mmol/L</span>
                                    <span>OGTT1h<input v-model="formData.sugar_three"
                                                       style="width: 50px;border: none;border-bottom: 1px solid #ccc;text-align: center"/>mmol/L</span>
                                    <br>
                                    <span>OGTT2h<input v-model="formData.sugar_five"
                                                       style="width: 50px;border: none;border-bottom: 1px solid #ccc;text-align: center"/>mmol/L</span>
                                </el-form-item>
                                <el-form-item label="血脂">
                                    <span style="margin-right: 20px;">TG<input v-model="formData.bloodFat_one"
                                                                               style="width: 50px;border: none;border-bottom: 1px solid #ccc;text-align: center"/> mmol/L</span>
                                    <span style="margin-right: 20px;">TCG<input v-model="formData.bloodFat_two"
                                                                                style="width: 50px;border: none;border-bottom: 1px solid #ccc;text-align: center"/> mmol/L</span>
                                    <span>HDL<input v-model="formData.bloodFat_three"
                                                    style="width: 50px;border: none;border-bottom: 1px solid #ccc;text-align: center"/> mmol/L</span>
                                    <br>
                                    <span style="margin-right: 20px;">LDL<input v-model="formData.bloodFat_four"
                                                                                style="width: 50px;border: none;border-bottom: 1px solid #ccc;text-align: center"/> mmol/L</span>
                                    <span style="margin-right: 20px;">FFAS<input v-model="formData.bloodFat_five"
                                                                                 style="width: 50px;border: none;border-bottom: 1px solid #ccc;text-align: center"/> umol/L </span>
                                    <span>TCG<input v-model="formData.bloodFat_six"
                                                    style="width: 50px;border: none;border-bottom: 1px solid #ccc;text-align: center"/> umol/LL</span>
                                </el-form-item>
                                <el-form-item label="超声检查">
                                    <span style="margin-right: 20px;">NT <input v-model="formData.ultrasound"
                                                                                style="width: 50px;border: none;border-bottom: 1px solid #ccc;text-align: center"/></span>
                                    <span style="margin-right: 20px;">III级超声 <input v-model="formData.ultrasonic"
                                                                                    style="width: 50px;border: none;border-bottom: 1px solid #ccc;text-align: center"/></span>
                                    <span>胎儿心脏超声 <input v-model="formData.fetal_cardiac_ultrasound"
                                                        style="width: 50px;border: none;border-bottom: 1px solid #ccc;text-align: center"/></span>
                                </el-form-item>
                                <el-form-item label="甲状腺功能">
                                    <span style="margin-right: 20px;">HTSH<input v-model="formData.thyroid_gland_one"
                                                                                 style="width: 50px;border: none;border-bottom: 1px solid #ccc;text-align: center"/> m1U/L </span>
                                    <span style="margin-right: 20px;">FT3<input v-model="formData.thyroid_gland_two"
                                                                                style="width: 50px;border: none;border-bottom: 1px solid #ccc;text-align: center"/> Pmol/L</span>
                                    <span>FT4<input v-model="formData.thyroid_gland_three"
                                                    style="width: 50px;border: none;border-bottom: 1px solid #ccc;text-align: center"/> pmol/L</span>
                                </el-form-item>
                            </div>
                            <div class="form-page-title_content_right">
                                <div class="flex">
                                    <div>心电图</div>
                                </div>
                                <p>
                                    <img :src="formData.titleImage" style="width: 100%;height: 100%" v-if="imgShow">
                                    <el-upload
                                        class=""
                                        :show-file-list="false"
                                        :action="`${$axios.defaults.baseURL}/api/common/upload_file`"
                                        :headers={token}
                                        :on-success="handleAvatarSuccess">
                                        <span class="form-page-title_content_right_span1" v-if="buttonShow"></span>
                                        <span class="form-page-title_content_right_span2" v-if="buttonShow"></span>
                                        <el-button class="form-page-title_content_right_span3" v-if="buttonShow1">
                                            上传心电图
                                        </el-button>
                                    </el-upload>
                                </p>
                                <el-form-item label="肝功能" style="margin-top: 20px;">
                                    <span style="margin-right: 20px;">ALT<input v-model="formData.liver_function_one"
                                                                                style="width: 50px;border: none;border-bottom: 1px solid #ccc;text-align: center"/> U/L</span>
                                    <span style="margin-right: 20px;">AST<input v-model="formData.liver_function_two"
                                                                                style="width: 50px;border: none;border-bottom: 1px solid #ccc;text-align: center"/>  U/L</span>
                                    <span>TBA<input v-model="formData.liver_function_three"
                                                    style="width: 50px;border: none;border-bottom: 1px solid #ccc;text-align: center"/>  Umol/L</span>
                                </el-form-item>
                                <el-form-item label="肾功能">
                                    <span style="margin-right: 20px;">BUN<input v-model="formData.renal_function_one"
                                                                                style="width: 50px;border: none;border-bottom: 1px solid #ccc;text-align: center"/> mmol/L </span>
                                    <span style="margin-right: 20px;">CRE<input v-model="formData.renal_function_two"
                                                                                style="width: 50px;border: none;border-bottom: 1px solid #ccc;text-align: center"/> mmol/L</span>
                                    <span>ALB<input v-model="formData.renal_function_three"
                                                    style="width: 50px;border: none;border-bottom: 1px solid #ccc;text-align: center"/> g/L</span>
                                </el-form-item>
                                <el-form-item label="血常规">
                                    <span style="margin-right: 20px;">WBC<input v-model="formData.routine_blood_one"
                                                                                style="width: 50px;border: none;border-bottom: 1px solid #ccc;text-align: center"/> X109/L </span>
                                    <span style="margin-right: 20px;">BBC<input v-model="formData.routine_blood_two"
                                                                                style="width: 50px;border: none;border-bottom: 1px solid #ccc;text-align: center"/> X109/L </span>
                                    <span style="margin-right: 20px;position: relative"><i class="right_location">12</i> PLT<input
                                        v-model="formData.routine_blood_three"
                                        style="width: 50px;border: none;border-bottom: 1px solid #ccc;text-align: center"/> X10 /L</span>
                                    <span> HGT  <input v-model="formData.routine_blood_four"
                                                       style="width: 50px;border: none;border-bottom: 1px solid #ccc;text-align: center"/>%</span>
                                </el-form-item>
                                <el-form-item label="尿常规">
                                    <span style="margin-right: 20px;">Pro<input v-model="formData.routine_urine_one"
                                                                                style="width: 50px;border: none;border-bottom: 1px solid #ccc;text-align: center"/> g/L </span>
                                    <span style="margin-right: 20px;">Glu<input v-model="formData.routine_urine_two"
                                                                                style="width: 50px;border: none;border-bottom: 1px solid #ccc;text-align: center"/> mmol/L</span>
                                    <span style="margin-right: 20px;">KET<input v-model="formData.routine_urine_three"
                                                                                style="width: 50px;border: none;border-bottom: 1px solid #ccc;text-align: center"/> mmol/L</span>
                                    <span> WBC<input v-model="formData.routine_urine_four"
                                                     style="width: 50px;border: none;border-bottom: 1px solid #ccc;text-align: center"/>个/ul </span>
                                </el-form-item>
                                <el-form-item label="凝血功能">
                                    <span style="margin-right: 20px;">APTT <input
                                        v-model="formData.blood_coagulation_one"
                                        style="width: 50px;border: none;border-bottom: 1px solid #ccc;text-align: center"/>秒 </span>
                                    <span style="margin-right: 20px;">Ｆbg<input v-model="formData.blood_coagulation_two"
                                                                                style="width: 50px;border: none;border-bottom: 1px solid #ccc;text-align: center"/> g/L </span>
                                    <span style="margin-right: 20px;">AT-III<input
                                        v-model="formData.blood_coagulation_three"
                                        style="width: 50px;border: none;border-bottom: 1px solid #ccc;text-align: center"/> % </span>
                                    <span> D-D<input v-model="formData.blood_coagulation_four"
                                                     style="width: 50px;border: none;border-bottom: 1px solid #ccc;text-align: center"/> ug/L</span>
                                </el-form-item>
                            </div>
                        </div>
                    </div>
                </div>
            </el-form>
        </div>
        <div class="button-wrap">
            <el-button type="warning" round @click="backPage">取消</el-button>
            <el-button type="primary" round @click="pageChange('prev')" v-if="pagePrev">上一页</el-button>
            <el-button type="primary" round @click="pageChange('next')" v-if="pageNext">下一页</el-button>
            <el-button type="primary" round @click="preservation" v-if="pagePreservation">保存</el-button>
        </div>
        <el-dialog class="new-dialog text-dialog" title="添加孕前检查" :visible.sync="chanqian" width="50%"
                   :close-on-click-modal="false"
                   :show-close="false">
            <div style="width: 75%;">
                <el-form label-width="120px" style="max-height: unset;">
                    <el-form-item label="日期" prop="date">
                        <el-date-picker type="date" placeholder="选择日期" style="width:100%" v-model="aaa.date"
                                        value-format="yyyy-MM-dd"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="孕周" prop="week">
                        <el-input v-model="aaa.week"></el-input>
                    </el-form-item>
                    <el-form-item label="主诉" prop="zhusu">
                        <el-input v-model="aaa.zhusu"></el-input>
                    </el-form-item>
                    <el-form-item label="收缩压" prop="shousuo">
                        <el-input v-model="aaa.shousuo"></el-input>
                    </el-form-item>
                    <el-form-item label="舒张压" prop="shuzhang">
                        <el-input v-model="aaa.shuzhang"></el-input>
                    </el-form-item>
                    <el-form-item label="体重" prop="tizhong">
                        <el-input v-model="aaa.tizhong"></el-input>
                    </el-form-item>
                    <el-form-item label="体重指数" prop="zhishu">
                        <el-input v-model="aaa.zhishu"></el-input>
                    </el-form-item>
                    <el-form-item label="宫高" prop="gonggao">
                        <el-input v-model="aaa.gonggao"></el-input>
                    </el-form-item>
                    <el-form-item label="腹围" prop="yaowei">
                        <el-input v-model="aaa.yaowei"></el-input>
                    </el-form-item>
                    <el-form-item label="胎心率" prop="xinlv">
                        <el-input v-model="aaa.xinlv"></el-input>
                    </el-form-item>
                </el-form>
                <div class="button-wrap">
                    <el-button type="primary" @click="yunqian">确 定</el-button>
                    <el-button @click="chanqian = false" style="border: 1px solid #CDCDCD !important;margin-left: 20px;">取 消</el-button>
                </div>
            </div>
        </el-dialog>
        <el-dialog class="new-dialog text-dialog" title="复诊记录表" :visible.sync="fuzhen" width="50%"
                   :close-on-click-modal="false"
                   :show-close="false">
            <div style="width: 75%;">
                <el-form label-width="160px" style="max-height: unset;">
                    <el-form-item label="日期" prop="date">
                        <el-date-picker type="date" placeholder="选择日期" style="width:100%" v-model="bbb.date"
                                        value-format="yyyy-MM-dd"></el-date-picker>
                    </el-form-item>
                    <el-form-item label="胎方位" prop="week">
                        <el-input v-model="bbb.week"></el-input>
                    </el-form-item>
                    <el-form-item label="体验、化验、检查结果" prop="experience">
                        <el-input v-model="bbb.experience"></el-input>
                    </el-form-item>
                    <el-form-item label="处理" prop="handle_">
                        <el-input v-model="bbb.handle_"></el-input>
                    </el-form-item>
                    <el-form-item label="签名" prop="autograph">
                        <el-input v-model="bbb.autograph"></el-input>
                    </el-form-item>
                </el-form>
                <div class="button-wrap">
                    <el-button type="primary" @click="fuzhenjilu">确 定</el-button>
                    <el-button @click="fuzhen = false" style="border: 1px solid #CDCDCD !important;margin-left: 20px;">取 消</el-button>
                </div>
            </div>
        </el-dialog>
    </div>
</template>

<script>
import store from "../store";

export default {
    name: "AddAmong",
    data() {
        return {
            readonly: true,
            chanqian: false,
            fuzhen: false,
            form: {},
            show1: true,
            show2: false,
            show3: false,
            formData: {
                early_pregnancy: [],
                second_trimester: [],
                late_pregnancy: [],
                delivery_history: [''],
                medical_history: [''],
                neonatal_condition: [''],
                reproductive_history: [],
                tableData: [],
                tableData_: [],
                infectious: [],
                poor: [],
                pregnancyTime: [''],
                pregnancyTime_: [],
                neonatal_conditionList: [],
                pregnant: 1,
                abortion_history: []
            },
            abortion_history: [
                {
                    id: 1,
                    name: '自然'
                }, {
                    id: 2,
                    name: '人工'
                }, {
                    id: 3,
                    name: '其他'
                }
            ],
            reproductive_history: [
                {
                    id: 1,
                    name: '有过流产'
                }, {
                    id: 2,
                    name: '胚胎停止发育'
                }, {
                    id: 3,
                    name: '畸形'
                }, {
                    id: 4,
                    name: '死胎史'
                }, {
                    id: 5,
                    name: '其他'
                }
            ],
            neonatal_conditionList: [
                {
                    id: 1,
                    name: '健康'
                }, {
                    id: 2,
                    name: '未满月'
                }, {
                    id: 3,
                    name: '不健康'
                }
            ],
            pregnancy_timesList: [
                {
                    id: 1,
                    name: '1次'
                }, {
                    id: 2,
                    name: '2次'
                }, {
                    id: 3,
                    name: '3次'
                }, {
                    id: 4,
                    name: '4次'
                }, {
                    id: 5,
                    name: '5次'
                }, {
                    id: 6,
                    name: '6次'
                }, {
                    id: 7,
                    name: '7次'
                }, {
                    id: 8,
                    name: '8次'
                }, {
                    id: 9,
                    name: '9次'
                }, {
                    id: 10,
                    name: '10次以上'
                },
            ],
            pageIndex: 0,
            aaa: {},
            bbb: {},
            column: [
                {
                    label: '日期',
                    note: '',
                    prop: 'date'
                },
                {
                    label: '孕周',
                    note: '',
                    prop: 'week'
                },
                {
                    label: '主诉',
                    note: '',
                    prop: 'zhusu'
                },
                {
                    label: '收缩压',
                    note: 'mmHg',
                    prop: 'shousuo'
                },
                {
                    label: '舒张压',
                    note: 'mmHg',
                    prop: 'shuzhang'
                },
                {
                    label: '体重',
                    note: 'kg',
                    prop: 'tizhong'
                },
                {
                    label: '体重指数',
                    note: 'kg/m2',
                    prop: 'zhishu'
                },
                {
                    label: '宫高',
                    note: 'cm',
                    prop: 'gonggao'
                },
                {
                    label: '腹围',
                    note: 'cm',
                    prop: 'yaowei'
                },
                {
                    label: '胎心率',
                    note: 'bpm',
                    prop: 'xinlv'
                },
            ],
            column_: [
                {
                    label: '日期',
                    prop: 'date'
                },
                {
                    label: '胎方位',
                    prop: 'week'
                },
                {
                    label: '体验、化验、检查结果',
                    prop: 'experience'
                },
                {
                    label: '处理',
                    prop: 'handle_'
                },
                {
                    label: '签名',
                    prop: 'autograph'
                }
            ],
            pageNext: true,
            pagePreservation: false,
            pagePrev: false,
            token: '',
            buttonShow: true,
            buttonShow1: true,
            imgShow: false,
            patient_id: '',
        };
    },
    computed: {},
    watch: {},
    mounted() {
        this.patient_id = this.$route.query.row.id
        this.form = this.$route.query.row
        console.log('this.form',this.form)
        this.token = store.state.user.token
        this.getInfo()
        sessionStorage.setItem("detail", true);
    },
    methods: {
        //正常怀孕 非正常怀孕点击对应的内容显示隐藏
        pregnantChange(e) {
            if (e == 1) {
                this.show1 = true
            } else {
                this.show1 = false
            }
            if (e == 2) {
                this.show2 = true
            } else {
                this.show2 = false
            }
        },
        //不良生育史选中其他后 输入框显示隐藏
        reproductiveHistoryChange(e) {
            if (e == '其他') {
                this.show3 = true
            } else {
                this.show3 = false
            }
        },
        //添加孕前检查
        yunqian() {
            this.formData.tableData.push(this.aaa)
            this.aaa = {}
            this.chanqian = false
        },
        //复诊记录表
        fuzhenjilu() {
            this.formData.tableData_.push(this.bbb)
            this.bbb = {}
            this.fuzhen = false
        },
        //添加输入框
        addItem(name) {
            this.formData[name].push('')
        },
        //删除输入框
        reduceItem(name, key) {
            this.formData[name].splice(key, 1)
        },
        //心电图
        handleAvatarSuccess(res) {
            this.formData.titleImage = res.data;
            this.buttonShow = true
            this.buttonShow1 = false
            this.imgShow = true
        },
        //接口
        async getInfo() {
            let params = {
                patient_id: this.patient_id,
            }
            await this.$axios.post('api/perinatal/detail', this.$qs.stringify(params)).then(res => {
                let result = res.data
                if (result.code === 1) {
                    if (result.data.data.pregnant == 1) {
                        this.show1 = true
                    } else {
                        this.show1 = false
                    }
                    if (result.data.data.pregnant == 2) {
                        console.log(1)
                        this.show2 = true
                    } else {
                        this.show2 = false
                    }
                    if (result.data.data.length == 0) {
                        this.show1 = true
                    } else {
                        this.formData = result.data.data
                        this.buttonShow = true
                        this.buttonShow1 = false
                        this.imgShow = true
                        this.formData.early_pregnancy = this.formData.early_pregnancy.map(item => Number(item))
                        this.formData.second_trimester = this.formData.second_trimester.map(item => Number(item))
                        this.formData.late_pregnancy = this.formData.late_pregnancy.map(item => Number(item))
                        this.formData.infectious = this.formData.infectious.map(item => Number(item))
                        this.formData.poor = this.formData.poor.map(item => Number(item))
                        if (this.formData.evaluate) {
                            this.formData.evaluate = Number(result.data.data.evaluate)
                        }
                        if (this.formData.before_weight) {
                            this.formData.before_weight = Number(result.data.data.before_weight)
                        }
                        if (this.formData.family_history) {
                            this.formData.family_history = Number(result.data.data.family_history)
                        }
                        if (this.formData.personal_history) {
                            this.formData.personal_history = Number(result.data.data.personal_history)
                        }
                        if (this.formData.high_risk_assessment) {
                            this.formData.high_risk_assessment = Number(result.data.data.high_risk_assessment)
                        }
                        if (this.formData.bloodType) {
                            this.formData.bloodType = Number(result.data.data.bloodType)
                        }
                    }
                }
            })
        },
        //取消按钮
        backPage() {
            this.$router.go(-1);
        },
        //上一页  下一页
        pageChange(type) {
            if (type === 'prev') {
                this.pageIndex--;
                this.pageIndex = this.pageIndex <= 0 ? 0 : this.pageIndex;
            } else {
                this.pageIndex++;
                this.pageIndex = this.pageIndex >= 6 ? 6 : this.pageIndex;

            }
            if (this.pageIndex === 6) {
                this.pagePreservation = true
                this.pageNext = false
                this.pagePrev = true
            } else if (this.pageIndex === 0) {
                this.pagePrev = false
                this.pagePreservation = false
                this.pageNext = true
            } else {
                this.pagePrev = true
                this.pagePreservation = false
                this.pageNext = true
            }
        },
        //保存按钮
        async preservation() {
            let params = {
                patient_id: this.patient_id,
                data: JSON.stringify(this.formData)
            }
            await this.$axios.post('api/perinatal/create', this.$qs.stringify(params)).then(res => {
                this.$router.push('/AmongRecords')
            })
        }
    },
}
</script>

<style scoped lang="scss">
.right_location {
    position: absolute;
    top: -14px;
    right: 4px;
    font-size: 12px;
    font-style: normal;
    -webkit-transform-origin-x: 0;
    -webkit-transform: scale(0.55);
}

.form-page-title_content {
    width: 100%;
    display: flex;
}

.form-page-title_content_left {
    width: 50%;
}

.form-page-title_content_right {
    width: 50%;
}

.form-page-title_content_right p {
    width: 90%;
    height: 228px;
    background: #F2F2F2;
    border-radius: 4px;
    border: 1px solid #D2D2D2;
    margin-top: 15px;
    position: relative;
}

.form-page-title_content_right_span1 {
    width: 32px;
    height: 3px;
    background: #D2D2D2;
    border-radius: 2px;
    position: absolute;
    top: 45%;
    left: 50%;
    margin-left: -15px;
}

.form-page-title_content_right_span2 {
    width: 3px;
    height: 32px;
    background: #D2D2D2;
    border-radius: 2px;
    position: absolute;
    top: 45%;
    left: 50%;
    margin-top: -15px;
}

.form-page-title_content_right_span3 {
    text-align: center;
    font-size: 16px;
    font-weight: 400;
    color: #CDCDCD;
    position: absolute;
    top: 53%;
    left: 50%;
    margin-left: -60px;
    background: #F2F2F2;
}

.el-select {
    display: block;
}

.content_body {
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

}

.top-name {
    font-size: 20px;
    font-weight: 400;
    color: #333333;
    padding-bottom: 20px;
    border-bottom: 1px solid #E6E6E6;
}

.form-page {
    display: flex;
    flex-wrap: wrap;
    padding-top: 37px;
    min-height: 558px;
    box-sizing: border-box;
}

.form-page-item {
    width: 50%;
    padding-left: 150px;
    box-sizing: border-box;

    ::v-deep .el-form-item {
        width: 75%;
    }
}

.form-page {
    & > .form-page-item:first-child {
        border-right: 1px solid rgba(230, 230, 230, .39);
    }
}

.form-page-title {
    color: #F5605A;
    font-size: 20px;
    font-weight: bold;
    height: 40px;

    > p {
        margin-left: 130px;

        > span {
            font-size: 25px;
        }
    }

    margin-bottom: 22px;
}

::v-deep .el-form-item {
    margin-bottom: 10px;
}

.form-page-sub-title {
    color: #333333;
    font-size: 15px;
    font-weight: bold;
    height: 40px;

    > p {
        margin-left: 130px;

        > span {
            font-size: 20px;
        }
    }

    margin-bottom: 22px;
}

.button-wrap {
    margin-top: 30px;
    display: flex;
    justify-content: flex-end;

    .el-button + .el-button {
        margin-left: 60px;
    }
}

.add-btn {
    width: 40px;
    height: 40px;
    background: #F2F2F2;
    border-radius: 2px;
    border: 1px solid #D2D2D2;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    right: 0;
}

::v-deep .add-input .el-input__inner {
    width: 230px;
    display: inline-block;
}

.add-input {
    margin-bottom: 10px;
}

::v-deep .el-form-item {
    position: relative;
}

::v-deep .el-form--inline {
    display: flex;
    justify-content: space-between;
}

::v-deep .el-radio-group {
    width: 360px;
}

::v-deep .el-form--inline .el-form-item {
    width: 50%;
}

::v-deep .el-form-item__content {
    max-height: 200px;
    overflow: scroll;
}
</style>
