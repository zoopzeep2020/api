var request = require('request');
const admin = require('firebase-admin');

module.exports.sendAndroidNotification = function (obj) {
    if(obj.deviceToken != "topic") {
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
                "notification": {
                    "body": obj.description,
                    "title": "ZeepZoop",
                    "icon": "http://zeepzoop.com/images/favicon.png",
                },
                "data": obj
            })
        };
        request(optionsStore, function (error, response, body) {
            // console.log("response", body)
        });
    } else {
        // var URLStore = 'https://android.googleapis.com/gcm/notification';
        // var optionsStore = {
        //     url: URLStore,
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': ' application/json',
        //         'Authorization': 'key=AIzaSyB6kIwhuE2hJl6LCbSKw7Kas8qa82BcKjc',
        //         'project_id':'236831263233'
        //     },
        //     body: JSON.stringify({
        //         "operation": "add",
        //         "notification_key_name": "appUse-zeepzoop19",
        //         "registration_ids": obj.deviceToken,
        //         "notification_key":"APA91bGjtptUzY5RNjkZiM56xDeRrxhYDDnlza4IDN91FM23IG8Ryuz233ynar5VKuILNDeIpOf4si_S5gNzXZrllE7VY7GOUF0Yy7Es7lVsMXsXdX1tFWQeWSvAIchi3yuMJcMSE91R"
        //     }),
        // };
        // request(optionsStore, function (error, response, body) {
        //     var URLStore = 'https://gcm-http.googleapis.com/gcm/send';
        //     console.log("notification",body)
        //     console.log("notification",JSON.parse(body).notification_key)
            
        //     var optionsStore = {
        //         url: URLStore,
        //         method: 'POST',
        //         headers: {
        //             'Content-Type': ' application/json',
        //             'Authorization': 'key=AIzaSyB6kIwhuE2hJl6LCbSKw7Kas8qa82BcKjc'
        //         },
        //         body: JSON.stringify({
        //             "to": JSON.parse(body).notification_key,
        //             "notification": {
        //                 "body": obj.description,
        //                 "title": "ZeepZoop",
        //                 "icon": "http://zeepzoop.com/images/favicon.png",
        //             },
        //             "data": obj
        //         })
        //     };
        //     request(optionsStore, function (error, response, body) {
        //         console.log(body)
        //     });
        // });
        var URLStore = 'https://fcm.googleapis.com/fcm/send';
        var optionsStore = {
            url: URLStore,
            method: 'POST',
            headers: {
                'Content-Type': ' application/json',
                'Authorization': 'key=AIzaSyB6kIwhuE2hJl6LCbSKw7Kas8qa82BcKjc'
            },
            body: JSON.stringify({
                "to" : "/topics/"+obj.storeId,
                "priority" : "high",
                "notification": {
                    "body": obj.description,
                    "title": "ZeepZoop",
                    "icon": "http://zeepzoop.com/images/favicon.png",
                    },
            })
        };
        
        request(optionsStore, function (error, response, body) {
            console.log(body)
        });
    }
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
    note.expiry = Math.floor(Date.now() / 1000) + 3600; // Expir es 1 hour from now.
    // note.badge = 3;
    note.sound = "Default.aiff";
    note.alert = obj.description;
    note.payload = { obj };
    apnProvider.send(note, obj.deviceToken).then((result) => {
        // see documentation for an explanation of result
    });
}
module.exports.subscribeTopic = function (deviceToken,topicName) {
    var URLStore = 'https://iid.googleapis.com/iid/v1/'+deviceToken+'/rel/topics/'+topicName;
    var optionsStore = {
        url: URLStore,
        method: 'POST',
        headers: {
            'Content-Type': ' application/json',
            'Authorization': 'key=AIzaSyB6kIwhuE2hJl6LCbSKw7Kas8qa82BcKjc'
        },
    };
    request(optionsStore, function (error, response, body) {
        console.log("body",body)
    });
}
module.exports.unSubscribeTopic = function (deviceToken,topicName) {
    var URLStore = 'https://iid.googleapis.com/iid/v1:batchRemove';
    var optionsStore = {
        url: URLStore,
        method: 'POST',
        headers: {
            'Content-Type': ' application/json',
            'Authorization': 'key=AIzaSyB6kIwhuE2hJl6LCbSKw7Kas8qa82BcKjc'
        },
        body: JSON.stringify({
            'to': '/topics/'+topicName,
            'registration_tokens': [deviceToken]
         })
    };
    console.log(optionsStore)
    request(optionsStore, function (error, response, body) {
        console.log("body",body)
    });
}