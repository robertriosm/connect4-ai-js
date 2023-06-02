const io = require("socket.io-client");
// const socket = io("http://192.168.1.134:4000");
// const socket = io("http://localhost:4000");
const socket = io("http://192.168.1.104:4000");
const { makeMove } = require("./engine");

// define event handlers
socket.on("connect", () => {
  console.log("connected to server");

  // send a message to the server
  socket.emit("signin", {
    user_name: "pickleRob",
    tournament_id: 142857,
    user_role: "player",
  });
});

socket.on("disconnect", () => {
  console.log("disconnected from server");
});

socket.on("ok_signin", () => {
  console.log("signin exitoso!");
});

socket.on("ready", function (data) {
  var gameID = data.game_id;
  var playerTurnID = data.player_turn_id;
  var board = data.board;

  // TODO: Your logic / user input here
  console.log("gameID", gameID);
  console.log("playerTurnID", playerTurnID);
  console.log("board:");
  console.table(board);
  let move = makeMove(board, playerTurnID);

  socket.emit("play", {
    tournament_id: 142857,
    player_turn_id: playerTurnID,
    game_id: gameID,
    movement: move,
  });
});

socket.on("finish", function (data) {
  var gameID = data.game_id;
  var playerTurnID = data.player_turn_id;
  var winnerTurnID = data.winner_turn_id;
  var board = data.board;

  console.log("gameID", gameID);
  console.log("playerTurnID", playerTurnID);
  console.log("winnerTurnID", winnerTurnID);
  console.log("board:");
  console.table(board);

  // TODO: Your cleaning board logic here

  socket.emit("player_ready", {
    tournament_id: 142857,
    player_turn_id: playerTurnID,
    game_id: gameID,
  });
});
