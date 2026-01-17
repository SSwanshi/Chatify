import { Server } from "socket.io";

const io = new Server(9000, {
    cors: {
        origin: [
            'http://localhost:3000',
            'https://chatify-t71m.onrender.com',
            'https://chatify-one-rho.vercel.app'
        ],
        methods: ['GET', 'POST'],
        credentials: true
    }
});

let users = [];

const addUser = (userData, socketId) => {
    if (!users.some(user => user.sub === userData.sub)) {
        users.push({ ...userData, socketId });
    }
};

const getUser = (userId) => {
    return users.find(user => user.sub === userId);
};

const removeUser = (socketId) => {
    users = users.filter(user => user.socketId !== socketId);
};

io.on('connection', (socket) => {
    console.log('user connected');

    socket.on("addUsers", (userData) => {
        addUser(userData, socket.id);
        io.emit("getUsers", users);
    });

    socket.on('sendMessage', (data) => {
        const user = getUser(data.receiverId);
        if (user) {
            io.to(user.socketId).emit('getMessage', data);
        } else {
            console.log("User not found for receiving message:", data.receiverId);
        }
    });

    socket.on('disconnect', () => {
        console.log('user disconnected');
        removeUser(socket.id);
        io.emit("getUsers", users);
    });
});
