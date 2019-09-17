
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


/**
 * ::Instruction to run this as a job::
 * 
 * Modify .bat file as per requirements.
 * Add this bat as a task in Task Scheduler by clicking "Create Basic Task..."
 * Then selecting appropriate options.
 * 
 * Select Programs/Script and provide path to the .dat file.
 * 
 * Enjoy :-)
 * 
 * Disclamer: I by no means an expert and this program is only for educational purposes.
 * 
 * Note:
 * There is much room for improvement if you feel you can help feel free to generate a PR
 * 
 */


