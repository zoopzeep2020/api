var User = require('../model/user');
var mongoose = require('mongoose');
console.log(User)
mongoose.connect('localhost:27017/ZeepZoop')
var users = [
    new User({
        name:'darshan',
        email:'dms132@gmail.com',
        password:'darshan3395',
        phone:9426026477,
    }),
    new User({
        name:'darshan',
        email:'dms132@gmail.com',
        password:'darshan3395',
        phone:9426026477,
    })
];
var done = 0;
for(var i = 0 ; i < users.length ; i++)
{
    users[i].save(function(err,results){
        done++;
        if(done === users.length)
        {
            exit();
        }
    });
}
function exit(){
    mongoose.disconnect();
}