<template>
    <div class="breath_content">
        <!-- 连接蓝牙 -->
        <bluetooth
            @onReceive="onReceive"
            @onInstability="onInstability"
            @onNoData="onNoData"
            @onError="onError"
            @onConnected="onConnected"
            ref="bluetooth"></bluetooth>

        <!-- 音乐页面  -->
        <div class="music flex flex-justify-content-center flex-child-center" v-if="music">
            <div>
                <div class="yuan flex flex-justify-content-center flex-child-center">
                    <div class="bj">
                        <img :src="yinyue.cover">
                    </div>

                    <div class="ej">
                        <img src="../../assets/games/gameRelated/ej.png">
                    </div>
                </div>

                <div class="music-name">
                    <div class="mess" v-if="isShow">
<!--                        <p>提示语：</p>-->
                        <p>{{ before_message }}</p>
                    </div>
                    <div class="mingzi"><b>{{ leixing }}</b> {{ yinyue.name }}</div>
                </div>
            </div>
        </div>

        <!-- 游戏介绍 -->
        <div class="container flex flex-justify-content-center" v-if="container">

            <div>
                <div class="name">{{ introduce.game_name }}</div>

                <div class="text" v-html="introduce.game_desc"></div>

                <div class="status">{{ status }}</div>

                <div class="button" @click="beginClick" v-bind:style="{pointerEvents:eve}">
                    {{ vdtText }}s&nbsp;开始训练
                </div>

            </div>

        </div>


        <!-- 游戏页面 -->
        <div class="content_right" v-if="breath_content">

            <div class="game-content">
                <div style="display: flex;justify-content: space-between">
                    <Component v-bind:is="currentGameComponent" class="game-player" ref="gamePlayer" @onPlay="onPlay"
                               @onInverted="onInverted" @onStop="onStop" @onPause="onPause"
                               @onComplete="onComplete"></Component>
                    <Component v-bind:is="currentGameComponent" class="game-player-brain" ref="gamePlayerRight" @onPlay="onPlay"
                               @onInverted="onInverted" @onStop="onStop" @onPause="onPause"
                               @onComplete="onComplete"></Component>
                </div>

                <div class="toolbar" v-if="toobar">
                    <el-button @click="play">正放</el-button>
                    <el-button @click="inverted">倒放</el-button>
                    <el-button @click="pause">暂停</el-button>
                    <el-button @click="stop">结束</el-button>
                </div>

            </div>

        </div>

        <!-- 结束页面 -->
        <div class="end-background" v-if="end_container">
            <div class="box">
                <div class="beijing">
                    训练结束
                </div>
                <div class="time">{{ times }}后自动关闭...</div>
                <div class="button" @click="breath_end">
                    结束
                </div>
            </div>
        </div>


        <!-- 倒计时 -->
        <div class="countDown" v-if="countDown">
            {{ game_time }}s
        </div>

        <!-- 音乐播放  -->
        <audio
            class="audio"
            :src="music_con"
            preload="auto"
            loop="loop"
            controls
            autoplay="autoplay"
            style="display: none"
            ref="audio"></audio>
        <div class="valueRangeBox valueRangeBoxLeft" v-if="breath_content">
            <div class="rectangular">
                左脑{{physiology_param}} {{attention}}
            </div>
            <div class="threshold">
                <div class="thresholdScope">
                    阈值范围
                </div>
                <div class="thresholdValue">
                    <div class="left">{{start_value}}</div>
                    <div class="right">/{{end_value}}</div>
                </div>
            </div>
        </div>
        <div class="valueRangeBox valueRangeBoxRight" v-if="breath_content">
            <div class="threshold">
                <div class="thresholdScope">
                    阈值范围
                </div>
                <div class="thresholdValue">
                    <div class="left">{{start_value}}</div>
                    <div class="right">/{{end_value}}</div>
                </div>
            </div>
            <div class="rectangular">
                右脑{{physiology_param}} {{attentionRight}}
            </div>
        </div>
<!--        <valueRange :start_value='start_value' :physiology_param='physiology_param' :end_value='end_value'-->
<!--                    :attention="attention" v-if="valueRange"></valueRange>-->
    </div>
</template>

<script>
import valueRange from "@/components/valueRange";
import Bluetooth from "../../components/Bluetooth";

export default {
    name: "EmotionGameBrain",
    components: {
        'valueRange': valueRange,
        'Bluetooth': Bluetooth,
    },
    data() {
        return {
            eve: '',
            leixing: '',
            introduce: {},
            status: '',
            attention: '',
            attentionRight:'',
            currentGameComponent: null,
            frequency: '',
            start_value: '',
            physiology_param: '',
            end_value: '',
            item: '',
            yinyue: '',
            music_con: '',
            game_time: '',
            dataList: [],
            times: '10',
            list: [],
            listIndex: 0,
            vdtText: '10',
            music: false,
            container: false,
            breath_content: false,
            countDown: false,
            end_container: false,
            valueRange: false,
            isPlaying: false,
            toobar: false,
            num: '',
            isPause: false,
            before_message: '',
            isShow: true,
            yinliang:'',
            key_:5,
            videopathGame:'',
            gamepath:'',
            websock: null,
        };
    },
    computed: {},
    watch: {
        'isPause': function (newval) {
            console.log('isPause改变', newval)
        },
        '$store.state.played': function (newval) {
            console.log('监听played', newval)
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
        'videopathGame': function (newval) {
            if (newval) {
                this.resume()
            }
        }
    },

    async mounted() {
        // 初始化蓝牙组
        this.$refs.bluetooth.init();
        await this.getInfo()
        this.$refs.audio.volume = 0.5
    },
    destroyed() {
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
    methods: {
        //音量
        yin() {
            this.key_ = this.key_ + 1
            this.yinliang = this.key_ / 10
            if (this.yinliang > 1) {
                this.key_ = 10
                return;
            }
            this.$refs.audio.volume = this.yinliang
        },
        //音量
        yin_() {
            this.key_ = this.key_ - 1
            this.yinliang = this.key_ / 10
            if (this.yinliang < 0) {
                this.key_ = 0
                return;
            }
            this.$refs.audio.volume = this.yinliang
        },
        /**
         * 开始游戏
         */
        startGame() {
            this.isPlaying = true
            this.music = true
            this.container = false
            this.breath_content = false
            this.countDown = true
            this.end_container = false
            this.num = 1
            this.yinyue = this.item.before_music
            this.game_time = this.item.before_music.time
            this.music_con = this.item.before_music.path
            this.before_message = this.item.before_prompt_message
            if (this.before_message ==="") {
                this.isShow = false
            } else {
                this.isShow = true
            }
            this.leixing = "前静息期"
            this.startGameTime()
        },


        //startGame倒计时
        startGameTime() {
            clearInterval(this.time2);
            this.time2 = setInterval(() => {
                this.game_time--
                if (this.game_time <= 0) {
                    clearInterval(this.time2);
                    this.youxi()
                }
            }, 1000);
        },


        //游戏介绍页面
        youxi() {
            this.container = true
            this.music = false
            this.breath_content = false
            this.end_container = false
            this.countDown = false
            this.num = 2
            this.introduce = this.item.list[this.listIndex]
            if (!this.introduce) {
                this.num = 4
                this.music = true
                this.container = false
                this.breath_content = false
                this.valueRange = false
                this.countDown = true
                this.end_container = false
                this.yinyue = this.item.after_music
                this.game_time = this.item.after_music.time
                this.music_con = this.item.after_music.path
                this.leixing = "后静息期"
                this.before_message = this.item.after_prompt_message
                if (this.before_message === "") {
                    this.isShow = false
                } else {
                    this.isShow = true
                }
                clearInterval(this.time2);
                this.musicTime()
            } else {
                this.jieshao()
            }
        },


        //游戏介绍倒计时
        jieshao() {
            clearInterval(this.vdt);
            this.vdt = setInterval(() => {
                this.vdtText--
                if (this.vdtText <= 0) {
                    clearInterval(this.vdt);
                    this.vdtText = 10
                    this.youxi1()
                }
            }, 1000)
        },


        //音乐倒计时
        musicTime() {
            clearInterval(this.time1);
            this.time1 = setInterval(() => {
                this.game_time--
                if (this.game_time <= 0) {
                    clearInterval(this.time1);
                    this.end()
                }
            }, 1000);
        },


        // 结束事件
        end() {
            this.end_container = true
            this.music = false
            this.container = false
            this.breath_content = false
            this.countDown = false
            this.$refs.bluetooth.destroy();
            clearInterval(this.shijian);
            this.shijian = setInterval(() => {
                this.times--
                if (this.times === 0) {
                    clearInterval(this.shijian)
                    this.breath_end()
                }
            }, 1000)
        },


        // 游戏页面
        youxi1() {
            this.init()
            this.num = 3
            this.music = false
            this.breath_content = true
            this.end_container = false
            this.container = false
            this.countDown = true
            this.valueRange = true
            this.list = this.item.list
            this.game_time = this.introduce.game_time
            this.music_con = this.introduce.music_path
            this.videopathGame = this.introduce.game_cover
            console.log('videopathGame',this.introduce.game_cover)
            this.gamepath = this.introduce.game_path
            this.initGame(this.introduce.game_path);
            clearInterval(this.vdt);
            this.youxiTime()
        },


        //游戏倒计时
        youxiTime() {
            clearInterval(this.timer);
            this.timer = setInterval(() => {
                this.game_time--
                if (this.game_time <= 0) {
                    clearInterval(this.timer);
                    this.vdtText = 10
                    this.valueRange = false
                    this.listIndex += 1;
                    this.youxi()
                }
            }, 1000)
        },


        // 开始训练按钮点击事件
        beginClick() {
            this.introduce = this.item.list[this.listIndex]
            this.vdtText = 10
            this.youxi1()
        },


        // 结束按钮点击事件
        breath_end() {
            this.$axios.post('term/index/end', {exam_id: this.$route.query.id, type: 3}).then(res => {
                this.$message.success(res.data.info);
                this.$router.push({name: "TerminalWait"})
            })
        },


        /**
         * 获取接口数据
         */
        async getInfo() {
            let params = {
                id: this.$route.query.id,
            }
            await this.$axios.post('term/emotion/info', this.$qs.stringify(params)).then(res => {
                let result = res.data
                if (result.code === 1) {
                    this.item = result.data
                    this.list = result.data.list
                    this.physiology_param = result.data.physiology_param
                    this.end_value = result.data.end_value
                    this.start_value = result.data.start_value
                    this.before_message = result.data.before_prompt_message
                    if(result.data.before_prompt_message == ''){
                        this.isShow = false
                    }else {
                        this.isShow = true
                    }
                }
            })
        },

        initGame(id) {
            this.currentGameComponent = () => import('../../games/' + id + '.vue');
        },


        /**
         * 正放
         */
        play() {
            if (this.$refs.gamePlayer) {
                this.$refs.gamePlayer.player.play();
            }
            if (this.$refs.gamePlayerRight) {
                this.$refs.gamePlayerRight.player.play();
            }
        },


        /**
         * 倒放
         */
        inverted() {
            this.$refs.gamePlayer.player.inverted();
            this.$refs.gamePlayerRight.player.inverted();
        },


        /**
         * 暂停
         */
        pause() {
            if (this.isPause) {
                return;
            }
            console.log('pause', this.isPause)
            this.isPause = true;
            if (this.$refs.audio) {
                if (this.isPlaying) {
                    this.$refs.audio.pause();
                    this.isPlaying = false
                }
            }
            if (this.$refs.gamePlayer) {
                this.$refs.gamePlayer.player.pause();
            }
            if (this.$refs.gamePlayerRight) {
                this.$refs.gamePlayerRight.player.pause();
            }
            if (this.num === 1) {
                clearInterval(this.time2);
            } else if (this.num === 2) {
                this.eve = "none"
                clearInterval(this.vdt);
            } else if (this.num === 3) {
                clearInterval(this.timer);
            } else if (this.num === 4) {
                clearInterval(this.time1);
            }

        },


        /**
         * 继续
         */
        resume() {
            if (!this.isPause) {
                return;
            }
            console.log('resume', this.isPause);
            this.isPause = false;
            this.play();
            if (this.num === 1) {
                this.startGameTime();
            } else if (this.num === 2) {
                this.eve = "auto"
                this.jieshao()
            } else if (this.num === 3) {
                this.youxiTime()
            } else if (this.num === 4) {
                this.musicTime()
            }
            if (this.$refs.audio) {
                if (!this.isPlaying) {
                    this.$refs.audio.play();
                    this.isPlaying = true
                }
            }
        },


        /**
         * 停止
         */
        stop() {
            this.$refs.gamePlayer.player.stop();
            this.$refs.gamePlayerRight.player.stop();
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
            // console.log('parse',parse)
            // if (this.physiology_param === "注意力") {
            //     this.attention = parse[32]
            // }
            // if (this.physiology_param === "放松度") {
            //     this.attention = parse[34]
            // }
            // if (this.physiology_param === "心率") {
            //     this.attention = parse[46]
            // }
            // if (this.physiology_param === "皮温") {
            //     this.attention = Number(parse[44] + '.' + parse[45])
            // }

            if (this.attention) {
                this.status = "头戴正常"
            }
            if (this.$store.state.played) {
                this.resume();
                if (this.$refs.gamePlayer) {
                    if(this.gamepath == 52) {
                        this.$refs.gamePlayer.player.play(this.videopathGame);
                    } else {
                        if (this.attention > this.start_value && this.attention <= this.end_value) {
                            this.$refs.gamePlayer.player.play();
                        } else {
                            this.$refs.gamePlayer.player.pause();
                            this.$refs.gamePlayer.player.inverted();
                        }
                    }

                }
                if (this.$refs.gamePlayerRight) {
                    if(this.gamepath == 52) {
                        this.$refs.gamePlayerRight.player.play(this.videopathGame);
                    } else {
                        if (this.attentionRight > this.start_value && this.attentionRight <= this.end_value) {
                            this.$refs.gamePlayerRight.player.play();
                        } else {
                            this.$refs.gamePlayerRight.player.pause();
                            this.$refs.gamePlayerRight.player.inverted();
                        }
                    }

                }
            }
            if (this.num === 3) {
                if (this.dataList.length >= 2) {
                    let profile = this.$store.state.user.terminal.profile || {};
                    let params = {
                        exam_id: profile.exam_id || '',
                        patient_id: (profile.patient || {}).id || '',
                        data: JSON.stringify(this.dataList),
                        practice_type: 3
                    };
                    this.dataList = [];
                    this.$axios.post('term/rest_data/upload', this.$qs.stringify(params)).then(res => {
                    });
                } else {
                    this.dataList.push(data);
                }
            }


            this.$refs.bluetooth.hideLoading();

            // 静息期数据采集中
            if (this.isStarted) {
                return;
            }
            this.isStarted = true;
            this.startGame();
        },
        init() {
            let url = 'ws://122.114.0.46:8293'
            this.websock = new WebSocket(url)
            // 监听打开
            this.websock.onopen= this.websockOpen;
            // 监听关闭
            this.websock.onclose = this.websockClose;
            //监听异常
            this.websock.onerror = this.websockError;
            //监听服务器发送的消息
            this.websock.onmessage = this.websockMessage;
        },
        //连接建立之后执行send方法发送数据
        websockOpen() {
            console.log('监听打开')
            let a =  '5000' + this.$store.state.webip
            this.aa=setInterval(() =>{
                this.websocketsend(a);
            },1000)
        },
        //关闭
        websockClose() {
            console.log('监听关闭')
        },
        //连接建立失败重连
        websockError() {
            // console.log('监听异常')
        },
        //数据接收
        websockMessage(e) {
            console.log('数据接收',JSON.parse(e.data))
            let att = JSON.parse(e.data)
            this.attention = att[0]
            this.attentionRight = att[1]
        },
        //数据发送
        websocketsend(Data){
            // console.log('Data',Data)
            this.websock.send(Data);
        },

        /**
         * 未戴好设备
         */
        onInstability() {
            this.status = "未戴好设备"
            console.log('未戴好设备');
            this.$message.error('未戴好设备');
            this.websockClose()
            this.pause();
        },

        /**
         * 无数据
         */
        onNoData() {
        },

        /**
         * 连接失败
         */
        onError() {
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
.valueRangeBoxLeft {
    background: url(../../assets/images/juxing.png) no-repeat center center / 100% 100%;
    top: 0;
    left: 0;
    .rectangular {
        margin-left: 30px;
    }
    .threshold {
        margin-left: 14px;
        margin-top: 33px;
    }
}
.valueRangeBoxRight {
    top: 0;
    right: 0;
    background: url(../../assets/images/juxingyou.png) no-repeat center center / 100% 100%;
    .rectangular {
        margin-left: 15px;
    }
    .threshold {
        margin-left: 60px;
        margin-top: 33px;
    }
}
.valueRangeBox {
    z-index: 10;
    position: fixed;
    width: 327px;
    height: 110px;
    overflow: hidden;
    font-size: 16px;
    display: flex;
    .rectangular {
        width: 142px;
        height: 50px;
        background: #E64741;
        border: 1px solid #E11912;
        margin-top: 30px;
        padding-left: 15px;
        font-weight: 500;
        color: #FFFFFF;
        line-height: 50px;
    }

    .thresholdScope {
        height: 22px;
        font-size: 16px;
        font-weight: 600;
        color: #FFFFFF;
        line-height: 22px;
    }
    .thresholdValue {
        margin-top: 4px;
        font-weight: 400;
        display: flex;
        .left {
            color: #E64741;
        }
        .right {
            color: #FFFFFF;
        }
    }
}
.breath_content {
    width: 100%;
    height: 100%;
    display: flex;
}

@-webkit-keyframes changeright {
    0% {
        -webkit-transform: rotate(0deg);
    }
    25% {
        -webkit-transform: rotate(90deg);
    }
    50% {
        -webkit-transform: rotate(180deg);
    }
    75% {
        -webkit-transform: rotate(270deg);
    }
    100% {
        -webkit-transform: rotate(360deg);
    }
}


//音乐页面样式
.music {
    width: 100vw;
    height: 100vh;
    background: url("../../assets/games/gameRelated/bj.png") no-repeat center center / cover;

    .yuan {
        width: 392px;
        height: 392px;
        background-color: #000000;
        border-radius: 50%;
        box-shadow: 0 2px 10px 0 #f66b69;
        position: relative;

        .bj {
            margin: 89px auto;
            width: 214px;
            height: 214px;
            border-radius: 50%;
            overflow: hidden;

            img {
                width: 100%;
                height: 100%;
                -webkit-animation: changeright 30s linear infinite;
            }
        }

        .ej {
            width: 99px;
            height: 150px;
            position: absolute;
            top: -70px;
            left: 200px;

            img {
                width: 100%;
                height: 100%;
            }
        }
    }

    .mess {
        display: flex;
        margin: 0 auto 20px;
        width: 800px;
        padding: 10px 0;
        border-top: 1px solid red;
        border-bottom: 1px solid red;
        color: red;
        font-size: 25px;
        justify-content: center;
        align-items: center;
        text-align: initial;

        //p:nth-of-type(1) {
        //    margin-bottom: 29px;
        //}

        p{
            font-size: 21px;
            line-height: 31px;
            overflow: scroll;
        }
    }

    .music-name {
        position: absolute;
        left: 0;
        right: 0;
        text-align: center;
        bottom: 11%;
        font-size: 28px;
        line-height: 40px;

        .leixing {
            font-weight: 600;
            color: #333333;
            margin-right: 35px;
        }

        .mingzi {
            font-weight: 400;
            color: #666666;
        }
    }
}

//游戏介绍样式
.container {
    width: 100vw;
    height: 100vh;
    background: url("../../assets/games/gameRelated/bj.png") no-repeat center center / cover;

    .name {
        margin-top: 100px;
        text-align: center;
        font-size: 77px;
        line-height: 114px;
        font-weight: bold;
        color: #f66b69;
    }

    .text {
        margin: 60px auto;
        width: 1335px;
    }

    .status {
        text-align: center;
        margin-top: 230px;
        font-size: 36px;
        font-weight: bold;
        color: #999999;
        line-height: 54px;
    }

    .button {
        text-align: center;
        margin: 25px auto;
        width: 223px;
        height: 71px;
        background: linear-gradient(0deg, #f5605a 0%, #ffadc7 99%);
        box-shadow: 0px 6px 0px 0px #e64741;
        border-radius: 34px 35px 35px 34px;
        text-align: center;
        line-height: 70px;
        font-size: 27px;
        font-weight: bold;
        color: #ffffff;
        cursor: pointer;
    }
}

//游戏页面样式
.content_right {
    width: 100vw;
    height: 100vh;
    background: #ffffff;
    background: url("../../assets/images/shuangnaobj.png") no-repeat center center / cover;

    .content_right img {
        width: 100%;
        height: 100%;
    }

    .game-content {
        width: 100%;
        height: 100%;
        position: relative;
    }

    .game-player {
        position: absolute;
        left: 0;
        top: 22%;
        bottom: 0;
        right: 0;
        width: 49%;
        height: 65%;
    }
    .game-player-brain {
        position: absolute;
        left: 52%;
        top: 22%;
        bottom: 0;
        right: 0;
        width: 49%;
        height: 65%;
    }

    .toolbar {
        z-index: 10;
        padding: 20px;
        position: absolute;
        top: 0;
        right: 10px;
    }
}


// 倒计时
.countDown {
    background: url("../../assets/images/countDown.png") no-repeat;
    background-size: 100%;
    position: absolute;
    top: 0;
    left: 51%;
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

//游戏结束页面
.end-background {
    width: 100vw;
    height: 100vh;
    background: url(../../assets/games/gameRelated/bj.png) no-repeat center center / 100% 100%;
    overflow: hidden;

    .box {
        width: 90vw;
        height: 90vh;
        background: #ffffff;
        margin: 60px auto;
        overflow: hidden;

        .beijing {
            width: 629px;
            height: 302px;
            margin: 162px auto;
            background: url(../../assets/games/gameRelated/taiyang.png) no-repeat center center / 100% 100%;
            font-size: 77px;
            font-weight: bold;
            color: #f66b69;
            line-height: 114px;
            padding-top: 133px;
            padding-left: 152px;
        }

        .time {
            font-size: 36px;
            font-weight: bold;
            color: #f66b69;
            line-height: 54px;
            margin-top: 190px;
            text-align: center;
        }

        .button {
            width: 223px;
            height: 71px;
            background: linear-gradient(0deg, #f5605a 0%, #ffadc7 99%);
            box-shadow: 0px 6px 0px 0px #e64741;
            border-radius: 34px 35px 35px 34px;
            text-align: center;
            line-height: 71px;
            font-size: 27px;
            font-weight: bold;
            color: #ffffff;
            margin: 30px auto;
            cursor: pointer;
        }
    }
}
</style>


<style>
.text * {
    font-size: 30px;
    font-weight: 400;
    color: #333333;
    line-height: 42px;
}
</style>
