const express = require("express");
const app = express();
const server = require("http").Server(app);
const { v4: uuidv4 } = require("uuid");
const io = require("socket.io")(server);
// Peer


const { ExpressPeerServer } = require("peer");
const peerServer = ExpressPeerServer(server, {
  debug: true,
});
var session = require('express-session');
app.use(session({secret: 'mySecret', resave: false, saveUninitialized: false}));


app.set("view engine", "ejs");
app.use(express.static("public"));
app.use("/peerjs", peerServer);

app.get("/user/:user/:roomId", (req, rsp) => {
  req.session.user=req.params.user
  if(req.params.roomId!="" || req.params.roomId){
    rsp.redirect(`/room/${req.params.roomId}`);

  }
  rsp.redirect(`/room/${uuidv4()}`);
});
app.get("/",(req,res)=>{
  res.render("home");
})
app.get("/room/:room", (req, res) => {
  res.render("room", { roomId: req.params.room, username:req.session.user });
});

io.on("connection", (socket) => {
  socket.on("join-room", (roomId, userId) => {
    socket.join(roomId);
    socket.to(roomId).broadcast.emit("user-connected", userId);

    socket.on("message", (message) => {
      io.to(roomId).emit("createMessage", message);
    });
  });
});

server.listen(process.env.PORT || 3030);
