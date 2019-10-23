const moment = require('moment');

const getAnimalAgeInMonths = function(date) {
    const parse = moment(date, 'YYYY-MM-DD');
    
    return moment().diff(parse, 'months');
};

const getAnimalAgeAsString = function(date) {
    const parse = moment(date, 'YYYY-MM-DD');
    const duration =  moment.duration(moment().diff(parse));
    
    return `${duration.years()} years ${duration.months()} mo`;
};

module.exports = { getAnimalAgeInMonths, getAnimalAgeAsString };