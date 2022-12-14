export default {
    state: {
        ws: '',
        wsTimer: ''
    },

    getters: {},
    mutations: {
        wsInit(state, ws) {
            state.ws = ws;
            const isHttps = 'https:' === document.location.protocol;
            if (isHttps) {
                state.ws = new WebSocket('wss://yunchanfu.shoupinkangda.cn/wss/');
            } else {
                state.ws = new WebSocket('ws://122.114.0.46:8293');
                // state.ws = new WebSocket('ws://192.168.8.189:8293');
                // state.ws = new WebSocket('ws://192.168.2.198:8293');
                // state.ws = new WebSocket('ws://192.168.8.189:8293');
            }
        },

        wsHeartbeatStart(state, ip) {
            state.ws.send('1001' + ip);
            state.wsTimer = setInterval(() => {
                state.ws.send('1000' + ip);
            }, 3000);
        },

        wsHeartbeatStop(state) {
            clearInterval(state.wsTimer);
        },

        closeWs(state) {
            state.ws.close();
            state.ws = '';
        }
    },
    actions: {}
}
