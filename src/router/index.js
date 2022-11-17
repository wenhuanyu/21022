import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)


// 解决vue-router在3.0版本以上重复点击的报错问题
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}
const routes = [
    {
        path: '/',
        name: 'Index',
        component: () => import( '../views/Index.vue'),
        meta: {
            title: '首页'
        }
    },
    {
        path: '/Layout',
        name: 'Layout',
        component: () => import( '../views/Layout.vue'),
        meta: {},
        children: [
            {
                path: '/PatientManagement',
                name: 'PatientManagement',
                component: () => import( '../views/PatientManagement.vue'),
                meta: {
                    title: '患者管理'
                },
            },
            {
                path: '/Toolkit',
                name: 'Toolkit',
                component: () => import( '../views/Toolkit.vue'),
                meta: {
                    title: '孕周指导',
                    subtitle: '围产记录',
                },
            },
            {
                path: '/AddPatient',
                name: 'AddPatient',
                component: () => import( '../views/AddPatient.vue'),
                meta: {
                    title: '添加患者',
                    parent: '/PatientManagement'
                },
                beforeEnter:(to, from, next) => {
                    if(to.query.id && to.query.id !== ''){
                        to.meta.title = '编辑患者'
                    }else{
                        to.meta.title = '添加患者'
                    }
                    next()
                }
            },
            {
                path: '/Nutrition',
                name: 'Nutrition',
                component: () => import( '../views/Nutrition.vue'),
                meta: {
                    title: '营养指导'
                },
            },
            {
                path: '/NutritionDetail',
                name: 'NutritionDetail',
                component: () => import( '../views/NutritionDetail.vue'),
                meta: {
                    title: '营养指导',
                    subtitle: '膳食营养报告',
                    parent: '/Nutrition'
                },

            },
            {
                path: '/NutritionInfo',
                name: 'NutritionInfo',
                component: () => import( '../views/NutritionInfo.vue'),
                meta: {
                    title: '报告中心',
                    subtitle: '膳食营养报告',
                    parent: '/ReportCenter'
                },

            },
            {
                path: '/Assess',
                name: 'Assess',
                component: () => import( '../views/Assess.vue'),
                meta: {
                    title: '评估测试'
                },
            },
            {
                path: '/SystemAnalysis',
                name: 'SystemAnalysis',
                component: () => import( '../views/SystemAnalysis.vue'),
                meta: {
                    title: '评估测试',
                    subtitle: '系统分析',
                    parent: '/Assess'
                },
            },
            {
                path: '/AddSystemAnalysis',
                name: 'AddSystemAnalysis',
                component: () => import( '../views/AddSystemAnalysis.vue'),
                meta: {
                    title: '评估测试',
                    subtitle: '系统分析',
                    parent: '/Assess'
                },
            },
            {
                path: '/AssessStatistics',
                name: 'AssessStatistics',
                component: () => import( '../views/AssessStatistics.vue'),
                meta: {
                    title: '评估测试',
                    subtitle: '综合评估报告',
                    parent: '/Assess'
                },

            },
            {
                path: '/AddAssess',
                name: 'AddAssess',
                component: () => import( '../views/AddAssess.vue'),
                meta: {
                    title: '评估测试',
                    subtitle: '新建测试',
                    parent: '/Assess'
                },

            },
            {
                path: '/AssessDetail',
                name: 'AssessDetail',
                component: () => import( '../views/AssessDetail.vue'),
                meta: {
                    title: '评估测试',
                    subtitle: '测评量表',
                    parent: '/Assess'
                },

            },
            {
                path: '/AssessDetailContrast',
                name: 'AssessDetailContrast',
                component: () => import( '../views/AssessDetailContrast.vue'),
                meta: {
                    title: '评估测试',
                    subtitle: '测评对比报告',
                    parent: '/TestReport'
                }
            },
            {
                path: '/TermMonitor',
                name: 'TermMonitor',
                component: () => import( '../views/TermMonitor.vue'),
                meta: {
                    title: '终端监控'
                },
            },
            {
                path: '/InfoAssess',
                name: 'InfoAssess',
                component: () => import( '../views/InfoAssess.vue'),
                meta: {
                    title: '评估测试',
                    subtitle: '测评量表',
                    parent: '/Assess'
                }
            },
            {
                path: '/InfoNutrition',
                name: 'InfoNutrition',
                component: () => import( '../views/InfoNutrition.vue'),
                meta: {
                    title: '营养指导',
                    subtitle: '测评量表',
                    parent: '/Nutrition'
                }
            },
            {
                path: '/SystemSetting',
                name: 'SystemSetting',
                component: () => import( '../views/SystemSetting.vue'),
                meta: {
                    title: '系统设置'
                }
            },
            {
                path: '/SettingConfig',
                name: 'SettingConfig',
                component: () => import( '../views/SettingConfig.vue'),
                meta: {
                    title: '系统设置',
                    subtitle: '参数设置',
                    parent: '/SystemSetting'
                }
            },
            {
                path: '/SettingUser',
                name: 'SettingUser',
                component: () => import( '../views/SettingUser.vue'),
                meta: {
                    title: '系统设置',
                    subtitle: '系统用户',
                    parent: '/SystemSetting'
                }
            },
            {
                path: '/SettingUserDetail',
                name: 'SettingUserDetail',
                component: () => import( '../views/SettingUserDetail.vue'),
                meta: {
                    title: '系统设置',
                    subtitle: '用户详情',
                    parent: '/SystemSetting'
                },
                beforeEnter:(to, from, next) => {
                    if(to.query.id && to.query.id !== ''){
                        to.meta.subtitle = '编辑用户'
                    }else{
                        to.meta.subtitle = '用户详情'
                    }
                    next()
                }
            },
            {
                path: '/SettingWard',
                name: 'SettingWard',
                component: () => import( '../views/SettingWard.vue'),
                meta: {
                    title: '系统设置',
                    subtitle: '患者来源设置',
                    parent: '/SystemSetting'
                }
            }, {
                path: '/SettingRole',
                name: 'SettingRole',
                component: () => import( '../views/SettingRole.vue'),
                meta: {
                    title: '系统设置',
                    subtitle: '角色设置',
                    parent: '/SystemSetting'
                }
            },
            {
                path: '/SettingDoctorSay',
                name: 'SettingDoctorSay',
                component: () => import( '../views/SettingDoctorSay.vue'),
                meta: {
                    title: '系统设置',
                    subtitle: '医生建议',
                    parent: '/SystemSetting'
                }
            },
            {
                path: '/SettingTemplate',
                name: 'SettingTemplate',
                component: () => import( '../views/SettingTemplate.vue'),
                meta: {
                    title: '系统设置',
                    subtitle: '模板管理',
                    parent: '/SystemSetting'
                }
            },
            {
                path: '/SettingDoctorSayInfo',
                name: 'SettingDoctorSayInfo',
                component: () => import( '../views/SettingDoctorSayInfo.vue'),
                meta: {
                    title: '医生建议',
                    parent: '/SystemSetting'
                }
            },
            {
                path: '/SettingScale',
                name: 'SettingScale',
                component: () => import( '../views/SettingScale.vue'),
                meta: {
                    title: '系统设置',
                    subtitle: '量表帮助',
                    parent: '/SystemSetting'
                }
            },
            {
                path: '/SettingScaleInfo',
                name: 'SettingScaleInfo',
                component: () => import( '../views/SettingScaleInfo.vue'),
                meta: {
                    title: '量表帮助',
                    parent: '/SystemSetting'
                }
            }, {
                path: '/AmongRecords',
                name: 'AmongRecords',
                component: () => import( '../views/AmongRecords.vue'),
                meta: {
                    title: '孕周指导',
                    subtitle: '围产记录',
                    parent: '/Toolkit'
                }
            }, {
                path: '/GestationalAgeChoose',
                name: 'GestationalAgeChoose',
                component: () => import( '../views/GestationalAgeChoose.vue'),
                meta: {
                    title: '孕周选择',
                    parent: '/Toolkit'
                }
            }, {
                path: '/GestationalAge',
                name: 'GestationalAge',
                component: () => import( '../views/GestationalAge.vue'),
                meta: {
                    title: '孕周指导',
                    parent: '/Toolkit'
                }
            }, {
                path: '/AddAmong',
                name: 'AddAmong',
                component: () => import( '../views/AddAmong.vue'),
                meta: {
                    title: '孕周指导',
                    subtitle: '完善资料',
                    parent: '/Toolkit'
                }
            },
            {
                path: '/SettingPlan',
                name: 'SettingPlan',
                component: () => import( '../views/SettingPlan.vue'),
                meta: {
                    title: '系统设置',
                    subtitle: '方案设置',
                    parent: '/SystemSetting'
                }
            },
            {
                path: '/SettingPlanH',
                name: 'SettingPlanH',
                component: () => import( '../views/SettingPlanH.vue'),
                meta: {
                    title: '系统设置',
                    subtitle: '方案设置',
                    parent: '/SystemSetting'
                }
            },
            {
                path: '/SettingPlanQ',
                name: 'SettingPlanQ',
                component: () => import( '../views/SettingPlanQ.vue'),
                meta: {
                    title: '系统设置',
                    subtitle: '方案设置',
                    parent: '/SystemSetting'
                }
            }, {
                path: '/SettingPlanPad',
                name: 'SettingPlanPad',
                component: () => import( '../views/SettingPlanPad.vue'),
                meta: {
                    title: '系统设置',
                    subtitle: '方案设置',
                    parent: '/SystemSetting'
                }
            },
             {
                path: '/SettingPlanAddPad',
                name: 'SettingPlanAddPad',
                component: () => import( '../views/SettingPlanAddPad.vue'),
                meta: {
                    title: '方案设置',
                    parent: '/SystemSetting'
                }
            },
            {
                path: '/SettingPlanDetailPad',
                name: 'SettingPlanDetailPad',
                component: () => import( '../views/SettingPlanDetailPad.vue'),
                meta: {
                    title: '方案设置',
                    parent: '/SystemSetting'
                }
            },
            {
                path: '/SettingPlanDetail',
                name: 'SettingPlanDetail',
                component: () => import( '../views/SettingPlanDetail.vue'),
                meta: {
                    title: '方案设置',
                    parent: '/SystemSetting'
                }
            }, {
                path: '/SettingPlanAddH',
                name: 'SettingPlanAddH',
                component: () => import( '../views/SettingPlanAddH.vue'),
                meta: {
                    title: '方案设置',
                    parent: '/SystemSetting'
                }
            },{
                path: '/SettingPlanAddQ',
                name: 'SettingPlanAddQ',
                component: () => import( '../views/SettingPlanAddQ.vue'),
                meta: {
                    title: '方案设置',
                    parent: '/SystemSetting'
                }
            },{
                path: '/SettingPlanDetailH',
                name: 'SettingPlanDetailH',
                component: () => import( '../views/SettingPlanDetailH.vue'),
                meta: {
                    title: '方案设置',
                    parent: '/SystemSetting'
                }
            },{
                path: '/SettingPlanDetailQ',
                name: 'SettingPlanDetailQ',
                component: () => import( '../views/SettingPlanDetailQ.vue'),
                meta: {
                    title: '方案设置',
                    parent: '/SystemSetting'
                }
            },{
                path: '/SettingPlanAdd',
                name: 'SettingPlanAdd',
                component: () => import( '../views/SettingPlanAdd.vue'),
                meta: {
                    title: '方案设置',
                    parent: '/SystemSetting'
                }
            }, {
                path: '/Training',
                name: 'Training',
                component: () => import( '../views/Training.vue'),
                meta: {
                    title: '呼吸训练',
                }
            }, {
                path: '/Respiratorymidwifery',
                name: 'Respiratorymidwifery',
                component: () => import( '../views/Respiratorymidwifery.vue'),
                meta: {
                    title: '呼吸助产',
                }
            },{
                path: '/SettingExplain',
                name: 'SettingExplain',
                component: () => import( '../views/SettingExplain.vue'),
                meta: {
                    title: '系统设置',
                    subtitle: '系统说明',
                    parent: '/SystemSetting'
                }
            },{
                path: '/Emotion',
                name: 'Emotion',
                component: () => import( '../views/Emotion.vue'),
                meta: {
                    title: '情绪调节训练'
                }
            },{
                path: '/ReportCenter',
                name: 'ReportCenter',
                component: () => import( '../views/ReportCenter.vue'),
                meta: {
                    title: '报告中心'
                }
            },
            {
                path: '/RiskEarlyWarning',
                name: 'RiskEarlyWarning',
                component: () => import( '../views/RiskEarlyWarning.vue'),
                meta: {
                    title: '报告中心',
                    subtitle: '危险预警报告',
                    parent: '/ReportCenter'
                }
            },
            {
                path: '/TestReport',
                name: 'TestReport',
                component: () => import( '../views/TestReport.vue'),
                meta: {
                    title: '报告中心',
                    subtitle: '测评报告',
                    parent: '/ReportCenter'
                },

            },
            {
                path: '/TestReportInfo',
                name: 'TestReportInfo',
                component: () => import( '../views/TestReportInfo.vue'),
                meta: {
                    title: '报告中心',
                    subtitle: '测评报告',
                    parent: '/ReportCenter'
                },

            },
            {
                path: '/AssessDetailReport',
                name: 'AssessDetailReport',
                component: () => import( '../views/AssessDetailReport.vue'),
                meta: {
                    title: '评估测试',
                    subtitle: '测评报告',
                }
            },
            {
                path: '/EmotionDetailReport',
                name: 'EmotionDetailReport',
                component: () => import( '../views/EmotionDetailReport.vue'),
                meta: {
                    title: '情绪调节训练',
                    subtitle: '情绪调节报告',
                }
            },
            {
                path: '/BreathingDetailReport',
                name: 'BreathingDetailReport',
                component: () => import( '../views/BreathingDetailReport.vue'),
                meta: {
                    title: '呼吸训练',
                    subtitle: '呼吸训练报告',
                }
            },
            {
                path: '/NutritionDetailReport',
                name: 'NutritionDetailReport',
                component: () => import( '../views/NutritionDetailReport.vue'),
                meta: {
                    title: '营养指导',
                    subtitle: '膳食营养报告',
                    parent: '/Nutrition'
                }
            },
            {
                path: '/EmotionDetail',
                name: 'EmotionDetail',
                component: () => import( '../views/EmotionDetail.vue'),
                meta: {
                    title: '情绪调节训练',
                    subtitle: '情绪调节报告',
                    parent: '/ReportCenter'
                }
            },
            {
                path: '/EmotionDetailContrast',
                name: 'EmotionDetailContrast',
                component: () => import( '../views/EmotionDetailContrast.vue'),
                meta: {
                    title: '情绪调节训练',
                    subtitle: '情绪调节对比报告',
                    parent: '/ReportCenter'
                }
            },
            {
                path: '/BreathingDetail',
                name: 'BreathingDetail',
                component: () => import( '../views/BreathingDetail.vue'),
                meta: {
                    title: '呼吸训练',
                    subtitle: '呼吸训练报告',
                    parent: '/ReportCenter'
                }
            },
            {
                path: '/BreathingDetailContrast',
                name: 'BreathingDetailContrast',
                component: () => import( '../views/BreathingDetailContrast.vue'),
                meta: {
                    title: '呼吸训练',
                    subtitle: '呼吸训练对比报告',
                    parent: '/ReportCenter'
                }
            },
             {
                path: '/BreathingTraining',
                name: 'BreathingTraining',
                component: () => import( '../views/BreathingTraining.vue'),
                meta: {
                    title: '报告中心',
                    subtitle: '呼吸训练',
                    parent: '/ReportCenter'
                }
            }, {
                path: '/EmotionRegulation',
                name: 'EmotionRegulation',
                component: () => import( '../views/EmotionRegulation.vue'),
                meta: {
                    title: '报告中心',
                    subtitle: '情绪调节训练',
                    parent: '/ReportCenter'
                }
            },
            {
                path: '/AmongDetail',
                name: 'AmongDetail',
                component: () => import( '../views/AmongDetail.vue'),
                meta: {
                    title: '孕周指导',
                    subtitle: '围产记录',
                    parent: '/AmongRecords'
                }
            },{
                path: '/SelectAmongList',
                name: 'SelectAmongList',
                component: () => import( '../views/SelectAmongList.vue'),
                meta: {
                    title: '孕周指导',
                    subtitle: '围产记录',
                    parent: '/AmongRecords'
                }
            },
            {
                path: '/leverDetail',
                name: 'leverDetail',
                component: () => import( '../views/leverDetail.vue'),
                meta: {
                    title: '情绪调节方案',
                    subtitle: '方案级别',
                    parent: '/SettingPlanQ'
                }
            },
            {
                path: '/leverDetailH',
                name: 'leverDetailH',
                component: () => import( '../views/leverDetailH.vue'),
                meta: {
                    title: '呼吸训练方案',
                    subtitle: '方案级别',
                    parent: '/SettingPlanH'
                }
            },
            {
                path: '/messagePage',
                name: 'messagePage',
                component: () => import( '../views/messagePage.vue'),
                meta: {
                    title: '消息中心',
                }
            },
            {
                path: '/DataAnalysis',
                name: 'DataAnalysis',
                component: () => import( '../views/DataAnalysis.vue'),
                meta: {
                    title: '数据分析'
                }
            },
        ]
    },
    {
        path: '/Test',
        name: 'Test',
        component: () => import( '../views/Test.vue'),
        meta: {
            title: 'test'
        }
    },
    {
        path: '/Login',
        name: 'Login',
        component: () => import( '../views/Login.vue'),
        meta: {
            title: '登录'
        }
    },
    {
        path: '/Terminal',
        name: 'Terminal',
        component: () => import( '../views/terminal/Index.vue'),
        meta: {
            type: 'terminal'
        },
        children: [
            {
                path: '/TerminalLogin',
                name: 'TerminalLogin',
                component: () => import( '../views/terminal/TerminalLogin'),
                meta: {
                    title: '登录',
                    type: 'terminal'
                }
            },
            {
                path: '/TerminalWait',
                name: 'TerminalWait',
                component: () => import( '../views/terminal/TerminalWait'),
                meta: {
                    title: '等待分配',
                    type: 'terminal'
                }
            },
            {
                path: '/TerminalAnswer',
                name: 'TerminalAnswer',
                component: () => import( '../views/terminal/TerminalAnswer'),
                meta: {
                    title: '答题',
                    type: 'terminal'
                }
            },
            {
                path: '/TerminalEnd',
                name: 'TerminalEnd',
                component: () => import( '../views/terminal/TerminalEnd'),
                meta: {
                    title: '结束',
                    type: 'terminal'
                }
            },
            {
                path: '/TerminalLulls',
                name: 'TerminalLulls',
                component: () => import( '../views/terminal/TerminalLulls.vue'),
                meta: {
                    title: '静息期',
                    type: 'terminal'
                }
            },
            {
                path: '/CalmWait',
                name: 'CalmWait',
                component: () => import('../views/terminal/CalmWait'),
                meta: {
                    title: '进入静息期',
                    type: 'terminal'
                }
            },{
                path: '/RespiratoryCoordination',
                name: 'RespiratoryCoordination',
                component: () => import('../views/terminal/RespiratoryCoordination'),
                meta: {
                    title: '呼吸协调训练',
                    type: 'terminal'
                }
            },
            {
                path: '/BreathingGame',
                name: 'BreathingGame',
                component: () => import('../views/terminal/BreathingGame'),
                meta: {
                    title: '呼吸训练',
                    type: 'terminal'
                }
            },
            {
                path: '/TerminalGame',
                name: 'TerminalGame',
                component: () => import('../views/terminal/TerminalGame'),
                meta: {
                    title: '游戏测试',
                    type: 'terminal'
                }
            },
            {
                path     : '/EmotionGame',
                name     : 'EmotionGame',
                component: () => import('../views/emotion/EmotionGame'),
                meta     : {
                    title: '情绪训练',
                    type : 'terminal'
                }
            },
        ]
    },

]



const router = new VueRouter({
    mode: 'hash',
    routes
})

export default router
