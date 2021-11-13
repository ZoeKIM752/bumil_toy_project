const webSocket = new WebSocket("ws://localhost:3008");

webSocket.onopen = function () {
    console.log('서버와 웹 소켓 연결됨');
    webSocket.send("hi");
};
webSocket.onmessage = function (event) {
    console.log(event.data);
    // webSocket.send('클라이언트에서 서버로 답장을 보냅니다.');
}

sendM = () => {
  webSocket.send("hihi");
}

function addPlayer() {
  webSocket.send("add Player");
  var sheet = $('#scoreSheet').clone();
  console.log(sheet);
  $('#cloneScoreSheet').append(sheet);
}