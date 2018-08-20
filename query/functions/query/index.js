console.log('starting function')

const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({region: 'eu-west-1'});

exports.handle = function (event, context, callback) {
    console.log('processing event: %j', event)


    let currentDate = new Date();
    let currentYearMonthAttribute = currentDate.getFullYear() + "-" + currentDate.getMonth().toString();

    console.log("Querying the guestbook-3 for posts of the current month and more recent than " + currentDate);

    let params = {
        TableName : "guestbook-3",
        IndexName: "YearMonthAttribute-Date-index",
        KeyConditionExpression: "YearMonthAttribute = :YMAttribute and #Dt > :date",
        ExpressionAttributeNames:{
            "#Dt": "Date"
        },
        ExpressionAttributeValues: {
            ":YMAttribute":  currentYearMonthAttribute,
            ":date": 1534534224614
        },
        ProjectionExpression: "Author, Message, #Dt",
        ScanIndexForward: false
    };

    docClient.query(params, function(err, data) {
        if (err) {
            callback("Unable to query. Error: " + JSON.stringify(err, null, 2), null);
        } else {
            let numberOfResultsReturned = data.Count;
            console.log(`Query succeeded. Returned ${numberOfResultsReturned} results.`);
            callback(null, data);
        }
    });

}