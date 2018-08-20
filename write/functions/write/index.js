console.log('starting function');

const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({region: 'eu-west-1'});

exports.handle = function(event, context, callback){
    console.log('processing event: ' + JSON.stringify(event, null, 2));

    let currentDate = new Date();

    let params =  {
        Item: {
            Date: Date.now(),
            MonthAttribute: currentDate.getMonth().toString(),
            YearAttribute: currentDate.getFullYear().toString(),
            YearMonthAttribute: currentDate.getFullYear() + "-" + currentDate.getMonth(),
            Author: event.author ? event.author : "Anonymous",
            Message: event.message
        },

        TableName: 'guestbook-3'
    };

    docClient.put(params, function(err,data){
        if(err) {
            callback(err, null);
        }else{
            callback(null, data);
        }
    });

}