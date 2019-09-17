/*
*   Used 3 libraries:
*   - https: For making API Requests.
*   
*   - node-notifie: For Ubiquitus Notifications
*     https://github.com/mikaelbr/node-notifier
*   
*   - node-emoji: For Presontation Purposes
*     https://www.npmjs.com/package/node-emoji
*/

const https = require('https');                 // For API Calls
const emoji = require('node-emoji')             // For Design Purposes
const notifier = require('node-notifier');      // For Ubiquitous Notifications
const fs = require("fs");                       // For Writing in Files

// Global Variables
let FILE_PATH_NAME = "D:\\Projects\\Node\\CurrencyConverter\\JSON_RATES_DATA.txt";

exports.getRates = (currency, callBack) => {

    const apiKey = '9eca380e371e5e9f14b6';

    let currArr = currency.split(',');
    //console.log(currArr[0]);

    let stringForfile = "{";

    currency = encodeURIComponent(currency);


    let url = 'https://free.currconv.com/api/v7/convert?q='
        + currency + '&compact=ultra&apiKey=' + apiKey;

    //console.log(url);
    https.get(url, (res) => {

        //console.log(res.statusCode);
        var body = '';

        res.on('data', (chunk) => {
            //console.log(chunk);
            body += chunk;
        }
        );

        res.on('end', () => {
            try {
                var jsonObj = JSON.parse(body);
                console.log(jsonObj);
                var val = jsonObj[currency];
                if (val) {
                    //  var total = val * 1;
                    callBack(null, val);
                }

                let finalString = "";
                for(var i in currArr ){
                    let emo = 'moneybag';
                    if(currArr[i].substr(0,3) === "USD"){
                        emo = 'heavy_dollar_sign'
                    }
                    if(currArr[i].substr(0,3) === "EUR"){
                        emo = 'euro'
                    }


                    finalString += `${emoji.get(emo)}${currArr[i].substr(0,3)} : ${jsonObj[currArr[i]]}\n` 
                    console.log(`${currArr[i]} : ${jsonObj[currArr[i]]}`)

                    stringForfile += ` "${currArr[i]}" : "${jsonObj[currArr[i]]}",`

                    // writeInFile(`${currArr[i]} : ${jsonObj[currArr[i]]}`);
                }

                stringForfile = stringForfile.slice(0,-1); // Getting value without
                stringForfile += ' }\n';

                notifier.notify({
                    'title' : 'Currency Rates:',
                    'message': finalString,
                    'icon': 'change.png',
                    'sound': false

                });

                writeInFile(stringForfile);


            } catch (e) {
                console.log("Parse error: ", e);
                callBack(e);
            }
        }
        );

        //console.log('\n\n')
        //console.log(body);


    }).on('error', (e) => {
        console.log(`Got Error! [${e}]`)
        callBack(e);
    })

}




function getSplittedValues(str) {
    return str.split(",");
}


function writeInFile(data){
      fs.appendFile(FILE_PATH_NAME, data, (err) => {
        if (err) console.log(err);
        console.log("Successfully Written to File.");
      });
}
