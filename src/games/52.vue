// 视频播放
<template>
    <div class="container">
        <video
            :src="videopath"
            ref="myVideo"
            :poster="poster"
            oncontextmenu="return false"
            class="video-box"
        > </video>
    </div>
</template>

<script>
    export default {
        name: 'game_52',
        components: {
        },
        data() {
            let that = this;
            return {
                videoState: false, // 视频播放状态
                // 学时
                studyTime: {
                    currentTime: 0, // 当前已学时长
                    duration: 0 // 总时长
                },
                cmusic: null,
                started: '',
                videopath:'',
                isPause52:false,
                player: {
                    play : function(speed) {
                        if(that.videopath.length< 1) {
                            that.videopath = speed
                        }
                        if (!that.isPause52) {
                            return;
                        }
                        that.isPause52 = false;
                        that.operateVideo();
                        console.log("that.isPause52",that.isPause52)

                    },
                    pause : function() {
                        if (that.isPause52) {
                            return;
                        }
                        that.isPause52 = true;
                        that.operateVideo();
                        console.log("that.isPause52",that.isPause52)
                    },
                },

            }
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
            control: {
                type: Boolean,
                required: false,
                default: false
            },
        },
        created() {
            setTimeout(() =>{
                this.operateVideo();
            },2000)
        },
        watch:{
            'isPause52': function (newval) {
                console.log('isPause52', newval)

            },
        },
        methods: {
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
            // play() {
            //     console.log('playplayplayplayplayplayplayplayplayplay')
            //     this.operateVideo()
            // },
            // pause () {
            //     console.log('pausepausepausepausepausepause')
            //     this.operateVideo()
            // }
        }
    }
</script>

<style lang="scss" scoped>
    .container {
        position: absolute;
        left: 0;
        right: 0;
        bottom: 0;
        top: 0;
        width: 100vw;
        height: 100vh;
        display: flex;
        overflow: hidden;
    }
    video {
        width: 100vw;
        height: 100vh;
    }
</style>
