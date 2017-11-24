// config/auth.js

// expose our config directly to our application using module.exports
module.exports = {
    
        'facebookAuth' : {
            'clientID'      : '1556040197817273', // your App ID
            'clientSecret'  : 'e1908138382ea828b81a515e71408f63', // your App Secret
            'callbackURL'   : 'http://localhost:3000/auth/facebook/callback',
            'profileURL'    : 'https://graph.facebook.com/v2.5/me?fields=first_name,last_name,email',
            'profileFields' : ['id', 'email', 'name'], // For requesting permissions from Facebook API,
        },
    
        'twitterAuth' : {
            'consumerKey'       : 'your-consumer-key-here',
            'consumerSecret'    : 'your-client-secret-here',
            'callbackURL'       : 'http://localhost:3000/auth/twitter/callback'
        },
    
        'googleAuth' : {
            'clientID'      : 'your-secret-clientID-here',
            'clientSecret'  : 'your-client-secret-here',
            'callbackURL'   : 'http://localhost:3000/auth/google/callback'
        }
    
    };
    