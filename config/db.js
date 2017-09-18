if (process.env.NODE_ENV == "server") {
    module.exports = {
        MONGO_CONNECT_URL: "mongodb://127.0.0.1:27017/devDBZeepZoop"
    };
} else {
    module.exports = {
        MONGO_CONNECT_URL: "mongodb://127.0.0.1:27017/ZeepZoop"
    };
}