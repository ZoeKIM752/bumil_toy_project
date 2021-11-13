const WebSocket = require('ws');

const wss = new WebSocket.Server({ port : 3008}); //서버 생성
var id_num = 0;

wss.on('connection', ws=>{      //요청 이벤트 처리
    console.log("new connect!");
    ws.send("환영합니다.");
    wss.clients.forEach(e => {
        console.log(e.id);
    })
    ws.on('message', data=>{    //메시지 이벤트 처리
        var text = data.toString();
        var context;
        try {
            context = JSON.parse(text);
        } catch (e) {
            console.log(e);
        }
        if(context.type == "createId") {
            ws.id = context.content;
            console.log("회원가입 완료");
        }
    });
    ws.on('error', (err) => { // 에러 발생 시
        console.error(err);
    });
    ws.on('close', (ip) => { // 연결 종료 시
        console.log('클라이언트 접속 해제', ip);
    });
})