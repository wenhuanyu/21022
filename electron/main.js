const {app, BrowserWindow, ipcMain, Menu} = require('electron')
const path                          = require('path')
const SerialPort                    = require('serialport')
const url = require('url');

// 保持一个对于 window 对象的全局引用，不然，当 JavaScript 被 GC，
// window 会被自动地关闭
var mainWindow = null;

// 当所有窗口被关闭了，退出。
app.on('window-all-closed', function () {
    // 在 OS X 上，通常用户在明确地按下 Cmd + Q 之前
    // 应用会保持活动状态
    if (process.platform != 'darwin') {
        app.quit();
    }
});

// 当 Electron 完成了初始化并且准备创建浏览器窗口的时候
// 这个方法就被调用
app.on('ready', function () {
    // 创建浏览器窗口。
    mainWindow = new BrowserWindow({
        width: 1920, height: 1080,
        webPreferences: {
            show: false,
            autoHideMenuBar: true,
            nodeIntegration : true,
            contextIsolation:  false,
            partition: String(+new Date()),
            preload         : path.join(__dirname, 'preload.js'),
        }
    })
    Menu.setApplicationMenu(null)

    // 加载应用的 index
    // mainWindow.loadURL("http://ycfqd.shoupinkangda.com/#/TerminalLogin")
    // mainWindow.loadURL("http://etqd.shoupinkangda.com/#/TerminalLogin")
    // mainWindow.loadURL("http://ycfqd.shoupinkangda.com/#/Login")
    // mainWindow.loadURL("http://192.168.2.198/h5/#/Login")
    // mainWindow.loadURL("http://192.168.8.189:82/#/Login")
    // mainWindow.loadURL("http://yunchanfu.shoupinkangda.com/h5/#/TerminalLogin")

    //mainWindow.maximize()
    // mainWindow.show();
    //设置全屏(延迟2.5秒进入全屏，防止黑框)
    setTimeout(() => {
        mainWindow.setFullScreen(true);
        mainWindow.setSimpleFullScreen(true);
    }, 2500);
    //设置全屏
    // mainWindow.setFullScreen(true);
    // mainWindow.setSimpleFullScreen(true);



    // 打开开发工具
    mainWindow.openDevTools();

    // 当 window 被关闭，这个事件会被发出
    mainWindow.on('closed', function () {
        // 取消引用 window 对象，如果你的应用支持多窗口的话，
        // 通常会把多个 window 对象存放在一个数组里面，
        // 但这次不是。
        mainWindow = null;
    });
});

// 获取串口列表
ipcMain.on('getComList', (event) => {
    SerialPort.list().then(ports => {
        event.reply('getComList.callback', {status: true, list: ports});
    }).catch(error => {
        event.reply('getComList.callback', {status: false, error: error});
    });
});

// 关闭串口
ipcMain.on('closeCom', (event, options) => {
    let obj = [event,options]
    obj.toString()
    if (app.serialPort) {
        app.serialPort.close((error) => {
            if (error) {
                console.log('关闭失败', error.message)
            }
        });
    }
});

// 连接串口
ipcMain.on('connectCom', (event, options) => {
    options.autoOpen = false;
    app.serialPort   = new SerialPort(options.name, options);

    app.serialPort.on('open', () => {
        event.reply('connectCom.callback', {status: true, action: 'open', data: null});
    });

    app.serialPort.on('error', (error) => {
        if (error) {
            console.log('error', error.message);
            event.reply('connectCom.callback', {status: false, action: 'error', error: error.message});
        }
    });

    app.serialPort.on('disconnect', () => {
        console.log('disconnect');
        event.reply('connectCom.callback', {status: true, action: 'disconnect', data: null});
    });

    app.serialPort.on('close', () => {
        console.log('close');
        event.reply('connectCom.callback', {status: true, action: 'close', data: null});
    });

    app.serialPort.on('data', (data) => {
        event.reply('connectCom.callback', {status: true, action: 'data', data: data});
    });


    if (app.serialPort.isOpen) {
        app.serialPort.close((error) => {
            if (error) {
                console.log('关闭失败', error.message)
            }
        });
    }

    app.serialPort.open((error) => {
        if (error) {
            console.log('连接失败', error.message);
            event.reply('connectCom.callback', {status: false, action: 'error', error: error.message});
        }
    });
});
//
// const spawn = require('child_process').spawn;
// var childProcess = spawn('D:\\文环宇\\why\\WeChat Files\\wxid_7jng7z3hdecv21\\FileStorage\\File\\2022-11\\pc\\bin\\G2G_GS5001_serial_standard.exe', ['COM3',9600]); // 启动serialPortDemo.exe程序（C#开发），并传入两个参数：串口号与波特率；
// childProcess.stdout.on('data', (data) => { console.log(""+data); }); // 监听serialPortDemo.exe的输出，并将输出打印出来

// 让下方程序休眠一段时间后执行，可以看到C#的输出；
// setTimeout(function(){
//     childProcess.stdin.write('quit'); // 给C#程序输入'quit'命令
//     childProcess.stdin.end(); // 完成输入后必须调用end方法，否则C#程序无法监听到用户输入
// }, 30000)
