
const GetRates = require('./GetRatesHelper');

let amo;

// 'AED_PKR,USD_PKR,EUR_PKR'
//notifier.notify('Message');

GetRates.getRates('AED_PKR,USD_PKR,EUR_PKR', (err, amount) => {
    console.log(amount);

    amo = amount;
    if (err) {
        console.log(`ERROR: ${err}`)
    }
});




