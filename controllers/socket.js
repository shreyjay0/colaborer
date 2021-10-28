"use strict";

var sockServe = require("socket.io");

module.exports = function (s) {
  var io = sockServe(s);
  io.on("connect", function (sck) {
    sck.on("enterColab", function (cval) {
      sck.room = cval.room;
      sck.join(cval.room);
    });
    sck.on("chatMessage", function (cval) {
      io.to(sck.room).emit("chatMessage", cval);
    });

    sck.on("disconnect", function () {
      sck.leave(sck.room);
    });
  });
};
