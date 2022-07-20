const moment = require('moment');

function formatMessage(username, text) {
    return {
        username,
        text,
        time: moment().format('DD/MM HH:mm')
    }
}

module.exports = formatMessage; 
