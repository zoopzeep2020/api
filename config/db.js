if (process.env.NODE_ENV == "server") {
    module.exports = {
        MONGO_CONNECT_URL: "mongodb://127.0.0.1:27017/devDBZeepZoop"
    };
} else if (process.env.NODE_ENV == "new_server") {
    module.exports = {
        MONGO_CONNECT_URL: "mongodb://127.0.0.1:27017/newZeepZoop"
    };
} else if (process.env.NODE_ENV == "dev") {
    module.exports = {
        MONGO_CONNECT_URL: "mongodb://127.0.0.1:27017/devZeepZoop"
    };
}
else {
    module.exports = {
        MONGO_CONNECT_URL: "mongodb://127.0.0.1:27017/ZeepZoop"
    };
}