const nodeCron = require('node-cron');

const initializeJob = (cron, job) => {
    nodeCron.schedule(cron, (runDate) => {
        job(runDate);
    })
} 

module.exports = {
    initializeJob
}