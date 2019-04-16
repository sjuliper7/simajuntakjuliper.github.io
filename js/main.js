var webPush = require('web-push');
var pushSubscription = {
    "endpoint": "https://android.googleapis.com/gcm/send/dS060fU_kaI:APA91bHpo3xEwXWnpAnjvNfaP86YJTFFlLSBdr9qw2-28JcN1sxIuWB5OJ46P-U9XdGa6olDt8oVRzf0CDYQtVkyirIyzuM46Hy_air5o0XaUnSOeQxmxQvEHw1gJ9QyiSPPhOOFkizU",
    "keys": {
        "p256dh": "BNr4zdbFGqxubwVTxKAnIre2hUL1vZV7H6IoYekeztP8ptz404YMoi147eyqM2S+UKEIKOvsiYDrGO9omolqElA=",
        "auth": "kiPt3hwd6x2D2xPgJUaG1A=="
    }
};
var payload = 'Here is a payload!';
var options = {
    gcmAPIKey: 'AAAAc8_oPvI:APA91bGA-b19060vOJ69H_UwAq5y9ev40W16LFOmjDOZMm7vWqks5D5iWjpLA4xxnmH6t7F__eA1AFuXdxUJ0xo4mCg-krP7gNYecjiJlrYsFRHhTzg-pD7odAhxgZm10yEF1Olozvsm',
    TTL: 60
};
webPush.sendNotification(
    pushSubscription,
    payload,
    options
);
