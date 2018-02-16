var request = require('request');

module.exports.sendAndroidNotification = function(obj){
            var URLStore = 'https://gcm-http.googleapis.com/gcm/send';
            var optionsStore = {
                url: URLStore,
                method: 'POST',
                headers: {
                    'Content-Type' :' application/json',
                    'Authorization': 'key=AIzaSyB6kIwhuE2hJl6LCbSKw7Kas8qa82BcKjc'
                },
                body: JSON.stringify(
                    { 
                        "to" : obj.deviceToken, 
                        // "to" : "aUniqueKey", 
                    "notification" :
                        { "body" : obj.description, 
                    "title" : "ZeepZoop",
                    "icon":"http://zeepzoop.com/images/favicon.png"}
                    }
                )
            };
            request(optionsStore, function (error, response, body) {
                // console.log("response",body)
                // let storesData = JSON.parse(body)['data'];
                // for (let i = 0; i < storesData.length; i++) {
                //     stores[i] = storesData[i]._id;
                // }
                // resolve(stores);
            });
}

// class MyModuleHandler {
//     sendAndroidNotification(obj){
//         console.log(obj)
//             var URLStore = 'https://gcm-http.googleapis.com/gcm/send';
//             var optionsStore = {
//                 url: URLStore,
//                 method: 'POST',
//                 headers: {
//                     'Content-Type' :' application/json',
//                     'Authorization': 'key=AIzaSyB6kIwhuE2hJl6LCbSKw7Kas8qa82BcKjc'
//                 },
//                 body: JSON.stringify(
//                     { "to" : "cFbFZZeGWu8:APA91bEhOIstS0w38G-W21kFOJl2jztIGk2aRf7JfRu6LN1RPgC73csj6ZZlOtLhdbrAZ3cKHe1xPHXD-kAw2jaiAjOQH0picWL-i0qXCvsqHJhlr5A4xUPsm80liG7cr721WZM4fztY", 
//                     "notification" :
//                         { "body" : obj.description, 
//                     "title" : "messageTitle"}
//                     }
//                 )
//             };
//             request(optionsStore, function (error, response, body) {
//                 // console.log("response",body)
//                 // let storesData = JSON.parse(body)['data'];
//                 // for (let i = 0; i < storesData.length; i++) {
//                 //     stores[i] = storesData[i]._id;
//                 // }
//                 // resolve(stores);
//             });
//     }
// }
// module.exports = MyModuleHandler;