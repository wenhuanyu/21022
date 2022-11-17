<template>
    <div class="content-bg">
        <!-- 连接蓝牙 -->
        <bluetooth
            @onReceive="onReceive"
            @onInstability="onInstability"
            @onNoData="onNoData"
            @onError="onError"
            @onConnected="onConnected"
            ref="bluetooth"></bluetooth>

        <!--page1 左图右内容-->
        <div class="page-1" v-if="page1">
            <el-row class="con" :gutter="24">
                <el-col :span="4" style="height: 100%;position: relative">
                    <img alt="" src="../../assets/images/smallPeople.png" class="left-image">
                </el-col>
                <el-col :span="6" class="con-left" style="height: 100%;position: relative">
                    <div class="dialog-bg">
                        <div class="left-title">
                            <h1 class="size-34 title">呼吸的四种训练模式</h1>
                            <p class="size-20 title">深呼吸训练（腹式呼吸法训练）</p>
                            <p class="size-20 title">拉玛泽呼吸法训练（全身放松）</p>
                            <p class="size-20 title">浅呼吸训练（孕产妇助产模拟训练）</p>
                            <p class="size-20 title">短促呼吸训练（孕产妇助产模拟训练）</p>
                        </div>
                    </div>
                </el-col>
                <el-col :span="11" class="con-right" :offset="2">
                    <div class="con-font article1">
                        <div v-html="con" class="font article"></div>
                    </div>
                </el-col>
            </el-row>
        </div>
        <!--page2 右图左内容-->
        <div class="page-2" v-if="page2">
            <el-row class="con" :gutter="24">
                <el-col :span="14" class="con-left">
                    <div class="breathingOne article1">
                        <div class="breathingOne1 article" v-html="con">
                        </div>
                    </div>
                </el-col>
                <el-col :span="5" class="con-right" :offset="2">
                    <img alt="" src="../../assets/images/bigPeople.png">
                </el-col>
            </el-row>
        </div>
        <!--page3 左呼吸频率 右游戏-->
        <div class="page-3" v-if="page3">
            <div class="content_left">
                <div class="content_left_title">呼吸频率</div>
                <div class="breath-column">
                    <div class="breath-columnB">
                        <div class="breath-columnM" v-bind:style="{height:breath_height}"></div>
                    </div>
                    <div class="space-20"></div>
                    <div class="breath-columnS">
                        <p>呼吸频率</p>
                        <p>{{ frequency }}</p>
                    </div>
                </div>
            </div>
            <div class="content_right">
                <div class="game-content">
                    <Component v-bind:is="currentGameComponent" class="game-player" ref="gamePlayer" @onPlay="onPlay"
                               @onInverted="onInverted" @onStop="onStop" @onPause="onPause"
                               @onComplete="onComplete">
                    </Component>
                    <div class="toolbar" v-if="toolbar">
                        <el-button @click="play">正放</el-button>
                        <el-button @click="inverted">倒放</el-button>
                        <el-button @click="pause">暂停</el-button>
                        <el-button @click="stop">结束</el-button>
                    </div>
                </div>
            </div>
        </div>
        <!--page4 纯图片-->
        <div class="page-4" v-if="page4">
            <img :src="path">
        </div>
        <!--page6 纯图片-->
        <div class="page-6" v-if="page6">
            <video
                v-if="videopath.length>0"
                :src="videopath"
                ref="myVideo"
                :poster="poster"
                :controls="controls"
                oncontextmenu="return false"
                @timeupdate="timeupdate"
                controlslist="nodownload"
                class="video-box"
                width="100vw"
                height="100vh"
            > </video>
        </div>
        <!--page5 纯游戏-->
        <!-- <div class="page-4" v-if="page5">
            <Component v-bind:is="currentGameComponent" class="game-player" ref="gamePlayer" @onPlay="onPlay"
                        @onInverted="onInverted" @onStop="onStop" @onPause="onPause"
                        @onComplete="onComplete">
            </Component>
            <div class="toolbar" >
                <el-button @click="play">正放</el-button>
                <el-button @click="inverted">倒放</el-button>
                <el-button @click="pause">暂停</el-button>
                <el-button @click="stop">结束</el-button>
            </div>
        </div> -->
        <!--end 结束页面-->
        <div class="page-end" v-if="end">
            <el-row class="con-wrap">
                <div class="con">
                    <div class="end-bg">
                        <p class="head-end">训练结束</p>
                    </div>
                    <div class="time">{{ times }}s后自动关闭...</div>
                    <div class="space-60"></div>
                    <div class="btn">
                        <el-button class="size-28 text-bold" @click="breath_end">结束</el-button>
                    </div>
                </div>
            </el-row>

        </div>

        <div class="countDown" v-if="showCountDown && !page6">
            {{ duration }}
        </div>
        <audio
            ref="audio"
            :src="cmusic"
            loop="loop"
            preload="auto"
            controls
            autoplay="autoplay"
            style="display: none"></audio>
    </div>
</template>

<script>
import Bluetooth from "../../components/Bluetooth";
import $ from 'jquery'

export default {
    name: "BreathingGame",
    components: {
        'Bluetooth': Bluetooth,
    },
    data() {
        return {
            videoState: false, // 视频播放状态
            // 学时
            studyTime: {
                currentTime: 0, // 当前已学时长
                duration: 0 // 总时长
            },
            cmusic: null,
            currentGameComponent: null,
            list: [],
            listIndex: 0,
            page1: false,
            showCountDown: true,
            page2: false,
            page3: false,
            page4: false,
            page6: false,
            isPlaying: false,
            breath_height: '',
            breath_height__: 50,
            toolbar: false,
            end: false,
            from: {
                id: ''
            },
            con: '',
            duration: 0,
            ballSpeed: '',
            frequency: '',
            time: null,
            item: {},
            times: 10,
            music_path: '',
            path: '',
            picPath: '',
            article: '',
            aHeight: '',
            sudu: '',
            attention: '',
            dingshi: null,
            end_value: '',
            start_value: '',
            yinliang:'',
            key_:0,
            type: '',
            daojishi: '',
            dataList: [],
            isStarted: false,
            isPause: false,
            zhu:true,
            videopath:''
        };
    },
    /**
     * @param poster 展示图
     * @param src 视频资源
     * @param controls 是否显示控件
     * @param control 控件控制
     * @param videoData 视频基础数据
     */
    props: {
        poster: {
            type: String,
            required: false,
            default: ""
        },
        src: {
            type: String,
            required: true
        },
        controls: {
            type: Boolean,
            required: false,
            default: true
        },
        control: {
            type: Boolean,
            required: false,
            default: false
        },
    },
    computed: {},
    watch: {
        '$store.state.played': function (newval) {
            if (newval) {
                this.resume()
            } else {
                this.pause()
            }
        },

        '$store.state.stop': function (newval) {
            if (newval) {
                this.$refs.bluetooth.destroy();
            }
        },
        music_path: function (newval, oldval) {
            if (this.type === 4) {
                if (oldval === null && typeof newval === 'string') {
                    this.cmusic = newval
                } else if (newval === 'string' && typeof oldval === 'string') {
                    this.cmusic = newval
                }
            } else {
                this.cmusic = newval
            }
        },
    },
    created:function () {
        var _this = this;
        document.onkeydown = function (e) {
            let key = window.event.keyCode;
            if(key == 38) {
                _this.yin()
            }
            if(key == 40) {
                _this.yin_()
            }
        }
    },
    async mounted() {
        // 初始化蓝牙组件
        this.$refs.bluetooth.init();
        this.from = this.$route.query
        await this.getInfo()
        this.readTopic();
        this.$refs.audio.volume = 0.1
        // 监听视频播放
        // this.$refs.myVideo.addEventListener("play", () => {
        //     console.log("video is playing");
        //     this.openTimer();
        // });
        // // 监听视频暂停
        // this.$refs.myVideo.addEventListener("pause", () => {
        //     console.log("video is stop");
        //     this.closeTimer();
        // });
    },
    methods: {
        // 获取当前播放位置
        timeupdate(e) {
            this.studyTime.currentTime = e.target.currentTime;
            console.log(' this.studyTime.currentTime', this.studyTime.currentTime)
            this.studyTime.duration = e.target.duration ? e.target.duration : 0;
            console.log(' this.studyTime.duration', this.studyTime.duration)
            if(this.studyTime.currentTime>=this.studyTime.duration ) {
                this.end = true;
                this.page6 = false
                this.page4 = false
                this.page3 = false
                this.page2 = false
                this.page1 = false
                this.showCountDown = false;
                this.timer = setInterval(() => {
                    this.times--
                    if (this.times === 0) {
                        this.show = true
                        clearInterval(this.timer)
                        this.breath_end()
                    }
                }, 1000);
                this.$refs.bluetooth.destroy();
                return
            }
        },
        // 操作视频播放、暂停
        operateVideo() {
            if (!this.videopath) {
                this.$message({ message: "暂无视频资源，请查看其他视频！" });
                return false;
            }
            if (this.$refs.myVideo.paused) {
                this.$refs.myVideo.play();
                this.videoState = true;
            } else {
                this.$refs.myVideo.pause();
                this.videoState = false;
            }
        },
        yin() {
            this.key_ = this.key_ + 1
            this.yinliang = this.key_ / 10
            if (this.yinliang > 1) {
                this.key_ = 10
                return;
            }
            this.$refs.audio.volume = this.yinliang
        },
        yin_() {
            this.key_ = this.key_ - 1
            this.yinliang = this.key_ / 10
            if (this.yinliang < 0) {
                this.key_ = 0
                return;
            }
            this.$refs.audio.volume = this.yinliang
        },
        // 文档滚动
        gundun() {
            this.article1 = ''
            this.article = ''
            this.aHeight = ''
            this.sudu = ''
            this.article = document.querySelector('.article')
            this.article1 = document.querySelector('.article1')
            this.aHeight = this.article.scrollHeight - 550
            this.sudu = this.aHeight / this.duration
            this.article1.scrollTop = 0
            clearInterval(this.dingshi)
            this.dingshi = setInterval(() => {
                this.$nextTick(() => {
                    this.article1.scrollTop += this.sudu
                })
                if (this.duration === 0) {
                    clearInterval(this.dingshi)
                    this.article1 = ''
                    this.article = ''
                    this.aHeight = ''
                    this.sudu = ''
                }
            }, 1000);
        },


        //重复语言
        readTopic() {
            var synth = window.speechSynthesis;
            window.speechSynthesis.cancel();
            var utterThis = new SpeechSynthesisUtterance($('<div>' + this.con + '</div>').text());
            utterThis.volume = 1  // 声音的音量
            utterThis.rate = 1 // 语速，数值，默认值是1，范围是0.1到10
            utterThis.pitch = 2 // 表示说话的音高，数值，范围从0（最小）到2（最大）。默认值为1
            synth.speak(utterThis);

        },


        initGame(id) {
            this.buttonShow = true
            this.timeShow = true
            this.currentGameComponent = () => import('../../games/' + id + '.vue');
        },


        /**
         * 开始游戏
         */
        startGame() {
            console.log('startGame');

            this.isPlaying = true;
            let item = this.list[this.listIndex] || false;
            if (!item) {
                this.end = true;
                this.page6 = false
                this.page4 = false
                this.page3 = false
                this.page2 = false
                this.page1 = false
                this.showCountDown = false;
                this.timer = setInterval(() => {
                    this.times--
                    if (this.times === 0) {
                        this.show = true
                        clearInterval(this.timer)
                        this.breath_end()
                    }
                }, 1000);
                this.$refs.bluetooth.destroy();
                return
            }
            this.page1 = false;
            this.page2 = false;
            this.page3 = false;
            this.page4 = false;
            this.page6 = false
            this.item = item;
            this.con = this.item.content.replace(/&nbsp;/ig, '');
            this.readTopic()
            this.music_path = item.music_path
            this.duration = item.game_time
            this.path = item.cover
            this.start();
            this.type = item.type
            switch (item.type) {
                case 1:
                    this.page1 = true;
                    this.$nextTick(() => {
                        this.gundun();
                    });
                    console.log('this.key_',this.key_)
                    // this.$refs.audio.volume = this.yinliang
                    break;
                case 2:
                    this.page2 = true;
                    this.$nextTick(() => {
                        this.gundun();
                    });
                    console.log('this.key_',this.key_)
                    // this.$refs.audio.volume = this.yinliang
                    break;
                case 3:
                    this.page3 = true;
                    this.picPath = item.game_path
                    console.log('this.key_',this.key_)
                    // this.$refs.audio.volume = this.yinliang_
                    this.initGame(item.game_path);
                    setTimeout(() => {
                        if (this.picPath == 25) {
                            this.$refs.gamePlayer.player.play();
                        }
                        this.zhuzi()
                    },100)
                    break;
                case 4:
                    this.page4 = true;
                    console.log('this.key_',this.key_)
                    // this.$refs.audio.volume = this.yinliang
                    break;
                case 6:
                    this.page6 = true;
                    this.videopath = item.cover
                    console.log('this.key_',this.key_)
                    // this.$refs.audio.volume = this.yinliang
                    break;
            }
        },


        // 调取接口
        getInfo() {
            this.$axios.post('term/breath/info', this.$qs.stringify(this.from)).then(res => {
                this.list = res.data.data.list;
                this.ballSpeed = res.data.data.ball_speed;
                this.end_value = res.data.data.end_value
                this.start_value = res.data.data.start_value
            });
        },

        //游戏柱子
        zhuzi() {
            clearInterval(this.zhuzishijian_);
            this.zhuzishijian_ = setInterval(() => {
                if (this.breath_height__ ===  0) {
                    this.zhu =true
                } else if(this.breath_height__ === 100) {
                    this.zhu =false
                }
                if (this.zhu === true) {
                    this.breath_height = (this.breath_height__ + 1)+'%'
                    this.breath_height__++
                } else {
                    this.breath_height = (this.breath_height__ - 1)+'%'
                    this.breath_height__--
                }
            }, this.ballSpeed/5*1000 / 200);
        },
        // 结束按钮点击事件
        breath_end() {
            this.$axios.post('term/index/end', {
                exam_id: this.$route.query.id,
                type: this.$route.query.type
            }).then(res => {
                this.$message.success(res.data.info);
                this.$router.push({name: "TerminalWait"});
            })
        },

        /**
         * 正放
         */
        play() {
            if (this.$refs.gamePlayer) {
                this.$refs.gamePlayer.player.play(this.ballSpeed);
                // if (this.picPath == 25) {
                //     this.$refs.gamePlayer.player.play(this.ballSpeed);
                // } else if (this.picPath == 51){
                //     this.$refs.gamePlayer.player.play(this.duration);
                // } else if (this.picPath == 50) {
                //     this.$refs.gamePlayer.player.play(this.duration);
                // }
            }
        },



        /**
         * 倒放
         */
        inverted() {
            this.$refs.gamePlayer.player.inverted();
        },


        /**
         * 暂停
         */
        pause() {
            if (this.isPause) {
                return;
            }

            console.log('pause');
            this.isPause = true;

            clearInterval(this.dingshi);
            clearInterval(this.time)
            window.speechSynthesis.pause();
            if (this.$refs.audio) {
                if (this.isPlaying) {
                    this.$refs.audio.pause();
                    this.isPlaying = false
                }
            }
            this.operateVideo()
        },


        /**
         * 继续
         */
        resume() {
            if (!this.isPause) {
                return;
            }

            console.log('resume');
            this.isPause = false;
            this.play();
            if (this.type === 1 || this.type === 2) {
                this.gundun()
            }
            window.speechSynthesis.resume();
            this.start();
            if (this.$refs.audio && this.cmusic) {
                if (!this.isPlaying) {
                    this.$refs.audio.play();
                    this.isPlaying = true
                }
            }
            this.operateVideo()
        },

        //倒计时
        start() {
            clearInterval(this.time);
            this.time = setInterval(() => {
                this.duration--;
                if (this.duration <= 0) {
                    clearInterval(this.time);
                    this.listIndex += 1;
                    this.startGame();
                }
            }, 1000);
        },


        /**
         * 停止
         */
        stop() {
            this.$refs.gamePlayer.player.stop();
        },


        /**
         * 开始正放事件
         */
        onPlay() {
            // this.$message.info('开始正放');
        },


        /**
         * 开始倒放事件
         */
        onInverted() {
            // this.$message.info('开始倒放');
        },


        /**
         * 暂停事件
         */
        onPause() {
            // this.$message.info('暂停播放');
        },


        /**
         * 停止事件
         */
        onStop() {
            // this.$message.info('停止播放');
        },


        /**
         * 播放完成事件
         */
        onComplete() {
            // this.$message.info('播放完成');
        },


        /**
         * 收到数据
         * @param {string} data 原始数据
         * @param {[number]} parse 解析后的数据
         */
        onReceive(data, parse) {
            this.frequency = Math.round(parse[46] / 4)
            this.attention = parse[46]
            // this.breath_height = (this.frequency / 40) * 100 + '%'

            if (this.$store.state.played) {
                this.resume()
                if (this.$refs.gamePlayer) {
                    if (this.attention > this.start_value && this.attention <= this.end_value) {
                        this.$refs.gamePlayer.player.play();
                    } else {
                        if (this.picPath == 25) {
                            this.$refs.gamePlayer.player.play();
                        } else {
                            this.$refs.gamePlayer.player.pause();
                            this.$refs.gamePlayer.player.inverted();
                        }
                    }
                }
            }

            if (this.dataList.length >= 5) {
                let profile = this.$store.state.user.terminal.profile || {};
                let params = {
                    exam_id: profile.exam_id || '',
                    patient_id: (profile.patient || {}).id || '',
                    data: JSON.stringify(this.dataList),
                    practice_type: 2
                };
                this.dataList = [];
                this.$axios.post('term/rest_data/upload', this.$qs.stringify(params)).then(res => {
                });
            } else {
                this.dataList.push(data);
            }


            this.$refs.bluetooth.hideLoading();

            if (this.isStarted) {
                return;
            }
            this.isStarted = true;
            this.startGame();
        },

        /**
         * 未戴好设备
         */
        onInstability() {
            this.status = "未戴好设备"
            this.pause();
            this.$message.error('未戴好设备');
        },

        /**
         * 无数据
         */
        onNoData() {
            // console.log('未匹配到数据');
        },

        /**
         * 连接失败
         */
        onError() {
            console.log('连接失败')
            this.pause();
        },

        /**
         * 已连接成功
         */
        onConnected() {
            this.$refs.bluetooth.showLoading('正在初始化...');
        }
    },
}
</script>
<style scoped lang="scss">
.video-box {
    width: 100vw;
    height: 100vh;
}
.countDown {
    background: url("../../assets/images/countDown.png") no-repeat;
    background-size: 100%;
    position: absolute;
    top: 0;
    left: 50%;
    width: 300px;
    height: 120px;
    margin-left: -167px;
    font-size: 68px;
    font-weight: 600;
    color: #f5605a;
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 999;
}

.content-bg {
    width: 100vw;
    height: 100vh;
    background-image: url(../../assets/images/terminal-bg.png);
    background-size: 100% 100%;
    background-position: center;
    background-repeat: no-repeat;
    position: relative;
    //padding: 60px;
    display: flex;
}

.page-1 {
    width: 100%;
    height: 100%;

    .con {
        width: 100%;
        height: 100%;
        background: linear-gradient(0deg, rgba(255, 255, 255, 0.69) 0%, #ffffff 100%);
        padding-top: 74px;
        z-index: 2;

        .title {
            color: #333333;
            line-height: 40px;
        }

        .number {
            font-size: 30px;
            color: #f66966;
        }

        .con-left {
            .dialog-bg {
                width: 100%;
                height: 500px;
                background-image: url(../../assets/images/dialog.png);
                background-size: 100% 100%;
                background-position: center;
                background-repeat: no-repeat;
                position: absolute;
                top: 40%;
                transform: translateY(-50%)
            }
        }

        .left-title {
            width: 80%;
            height: 100%;
            margin: auto;
            line-height: 40px;
            position: relative;
            top: 68%;
            left: 47%;
            transform: translate(-50%, -50%);
        }

        .left-image {
            width: 100%;
            position: absolute;
            bottom: 0;
        }

        .title-wrap {
            height: 615px;
            overflow: auto;
            font-size: 24px;
            color: #333333;
            line-height: 40px;
        }

        .title-wrap::-webkit-scrollbar {
            display: block;
            width: 9px;
            height: 1px;
        }

        .title-wrap::-webkit-scrollbar-thumb {
            /*滚动条里面小方块*/
            border-radius: 10px;
            background: #d8d8d8;;
        }

        .title-wrap::-webkit-scrollbar-track {
            /*滚动条里面轨道*/
            background: #f7f7f7;
            border-radius: 10px;
        }
    }
}

.page-2 {
    width: 100%;
    height: 100%;

    .con {
        width: 100%;
        height: 100%;
        background: linear-gradient(0deg, rgba(255, 255, 255, 0.69) 0%, #ffffff 100%);
        padding-top: 131px;

        .con-left {
            margin: 30px 0 0 124px;

            .title {
                color: #333333;
                font-size: 24px;
                line-height: 50px;
                overflow: auto;
                height: 500px;
            }
        }

        .con-right {
            position: relative;
            height: 100%;

            img {
                width: 100%;
                height: 100%;
            }
        }
    }

    .title::-webkit-scrollbar {
        display: block;
        width: 9px;
        height: 1px;
    }

    .title::-webkit-scrollbar-thumb {
        /*滚动条里面小方块*/
        border-radius: 10px;
        background: #d8d8d8;;
    }

    .title::-webkit-scrollbar-track {
        /*滚动条里面轨道*/
        background: #f7f7f7;
        border-radius: 10px;
    }
}

.toolbar {
    padding: 20px;
    position: absolute;
    top: 0;
}

.page-3 {
    width: 100%;
    height: 100%;
    display: flex;

    .game-content {
        width: 100%;
        height: 100%;
        position: relative;
    }

    .game-player {
        position: absolute;
        left: 0;
        top: 0;
        bottom: 0;
        right: 0;
        width: 100%;
        height: 100%;
    }

    .toolbar {
        padding: 20px;
        position: absolute;
        top: 0;
    }

    .content_left_content {
        position: relative;
    }

    .content_left_content_ {
        position: absolute;
        top: 90px;
        left: 145px;
        font-size: 14px;
        font-weight: bold;
        color: #333333;
        z-index: 100;
    }

    .breath-column {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }

    .breath-columnB {
        width: 50%;
        height: 450px;
        background: url('../../assets/images/BreathColumnBig.png') no-repeat;
        background-size: 100% 100%;
        //display: inline-block;
        position: relative;
    }

    .breath-columnM {
        width: 100%;
        background: url('../../assets/images/BreathColumnMiddle.png') no-repeat;
        background-size: 100% 100%;
        //display: inline-block;
        transition-timing-function: linear;
        position: absolute;
        bottom: 0;
    }

    .breath-columnS {
        width: 50%;
        height: 136px;
        background: url('../../assets/images/BreathColumnSmall.png') no-repeat;
        background-size: 100% 100%;
        position: relative;

        p {
            font-size: 20px;
            font-weight: 500;
            color: #333333;
            text-align: center;
            position: relative;
        }

        p:first-child {
            top: 8%;
        }

        p:last-child {
            top: 40%;
        }
    }

    .content_left_content_loca {
        position: absolute;
        top: 50px;
        left: 130px;
        font-size: 16px;
        font-weight: bold;
        z-index: 100;
        color: #333333;
    }

    .content_left_title {
        font-size: 24px;
        font-weight: 500;
        color: #333333;
        line-height: 33px;
        margin: 69px 0;
        text-align: center;
    }

    .content_left {
        width: 17.7%;
        height: 87vh;
        background: #ffffff;
    }

    .content_right {
        width: 81.3%;
        height: 87vh;
        background: #ffffff;
        margin-left: 18px;
    }

    .content_right img {
        width: 100%;
        height: 100%;
    }
}

.page-4 {
    width: 100%;
    height: 100%;

    img {
        width: 100%;
        height: 100%;
    }
}

.page-end {
    width: 100%;
    height: 100%;

    .con-wrap {
        width: 100%;
        height: 100%;
        background: linear-gradient(0deg, rgba(255, 255, 255, 0.69) 0%, #ffffff 100%);
        padding-top: 131px;
    }

    .con {
        width: 50%;
        margin: 0 auto;
    }

    .end-bg {
        width: 630px;
        height: 300px;
        background-image: url(../../assets/images/end-bg.png);
        background-size: 100% 100%;
        margin: auto;

        .head-end {
            font-size: 60px;
            font-weight: bold;
            color: #f66b69;
            text-align: center;
            position: relative;
            top: 60%;
            transform: translateY(-50%);
        }
    }

    .time {
        font-size: 36px;
        font-weight: bold;
        color: #f66b69;
        text-align: center;
        margin-top: 130px;
    }

    .btn, .el-button {
        width: 223px;
        height: 71px;
        color: #ffffff;
        background: linear-gradient(180deg, #fea9c0 0%, #f5645f 100%);
        border-radius: 36px;
        margin: 0 auto;
    }
}
</style>

<style>
.breathingOne {
    width: 1039px;
    height: 550px;
    overflow: hidden;
}

.breathingOne .breathingOne1 * {
    font-size: 30px !important;
    font-weight: 600;
    line-height: 40px;
    color: #333333;
}

.breathingOne p {
    margin-bottom: 20px;
}

.breathingOne p:empty {
    display: none;
}

.con-font {
    width: 820px;
    height: 600px;
    overflow: hidden;
}

.article {
    overflow-y: auto;
    -webkit-overflow-scrolling: touch
}

.con-font .font * {
    font-size: 30px !important;
    font-weight: 600;
    line-height: 40px;
    color: #333333;
}

.con-font p {
    margin-bottom: 20px;
}

.con-font p:empty {
    display: none;
}
</style>
