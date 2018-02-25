var request = require('request');

module.exports.sendAndroidNotification = function (obj) {
    var URLStore = 'https://gcm-http.googleapis.com/gcm/send';
    var optionsStore = {
        url: URLStore,
        method: 'POST',
        headers: {
            'Content-Type': ' application/json',
            'Authorization': 'key=AIzaSyB6kIwhuE2hJl6LCbSKw7Kas8qa82BcKjc'
        },
        body: JSON.stringify({
            "to": obj.deviceToken,
            // "to" : "aUniqueKey", 
            "notification": {
                "body": obj.description,
                "title": "ZeepZoop",
                "icon": "http://zeepzoop.com/images/favicon.png",
            },
            "data": obj
        })
    };
    request(optionsStore, function (error, response, body) {
        console.log("response", body)
    });
}

module.exports.sendAppleNotification = function (obj) {
    var apn = require('apn');
    var options = {
        cert: "files/pushcert.pem",
        key: "files/pushcert.pem",
        keyId: "888F6245RR",
        teamId: "N4G9BS5CR2",
    };
    var note = new apn.Notification();
    var apnProvider = new apn.Provider(options);
    note.expiry = Math.floor(Date.now() / 1000) + 3600; // Expires 1 hour from now.
    note.badge = 3;
    note.sound = "Default.aiff";
    note.alert = "obj.description";
    note.payload = { obj };
    console.log(note);
    apnProvider.send(note, obj.deviceToken).then((result) => {
        // see documentation for an explanation of result
    });

}