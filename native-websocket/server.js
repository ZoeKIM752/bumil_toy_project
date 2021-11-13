const WebSocket = require('ws');

const wss = new WebSocket.Server({ port : 3008}); //서버 생성

wss.on('connection', ws=>{      //요청 이벤트 처리
    console.log("new connect!");
    ws.send("환영합니다.");
    
    ws.on('message', data=>{    //메시지 이벤트 처리
        var text = data.toString();
        var context;
        try {
            context = JSON.parse(text);
        } catch (e) {
            console.log(e);
        }
        // 아이디 정보 입력
        if(context.type == "createId") {
            ws.id = context.content;
            console.log("회원가입 완료");
            var req = {};
            req.id = ws.id;
            req.type = "success";

            req = JSON.stringify(req);
            ws.send(req);
        } else {
            //메세지 들어오면 모든 소켓에 전송
            wss.clients.forEach(e => {
                console.log(e.id);
                e.send("id: " + e.id + " msg: " + text);
            });
        }
    });
    ws.on('error', (err) => { // 에러 발생 시
        console.error(err);
    });
    ws.on('close', (ip) => { // 연결 종료 시
        console.log('클라이언트 접속 해제', ip);
    });
})