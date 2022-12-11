const io = require("socket.io")(8800, {
    cors: {
      origin: "http://localhost:3000",
    },
  });
  
  let activeUsers = [];
  
  io.on("connection", (socket) => {
    // add new User
    socket.on("new-user-add", (newUserId) => {
      // if user is not added previously
      if (!activeUsers.some((user) => user.userId === newUserId)) {
        activeUsers.push({ userId: newUserId, socketId: socket.id });
        console.log("New User Connected", activeUsers);
      }
      // send all active users to new user
      io.emit("get-users", activeUsers);
    });
  
    socket.on("disconnect", () => {
      // remove user from active users
      activeUsers = activeUsers.filter((user) => user.socketId !== socket.id);
      console.log("User Disconnected", activeUsers);
      // send all active users to all users
      io.emit("get-users", activeUsers);
    });
    
    // notifications

    socket.on("send-notifications",({senderId,recieverId,desc})=>{
     const user = activeUsers.find((user) => user.userId === recieverId);
     console.log(user,"jyuuuu");
     console.log(senderId,recieverId,desc,"hey");
      io.to(user?.socketId).emit('getNotification',{
        senderId,
        desc,
      })
    })
  
    // send message to a specific user
    socket.on("send-message", (data) => {
        console.log(data,'reciever data');
      const { receiverId } = data;
      const user = activeUsers.find((user) => user.userId === receiverId);
      console.log("Sending from socket to :", receiverId)
      console.log("Data: ", data)
      if (user) {
        io.to(user.socketId).emit("recieve-message", data);
      }
    });
  });