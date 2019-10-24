const Util = require('../../src/Util/Util');
const moment = require('moment');
const expect = require('chai').expect;

describe('When I call Util.getAnimalAgeInYears', () => {
    describe('When I give a date that is 3 years ago', () => {
        it('should return 36 months', done => {
            const now = moment();
            const date = now.subtract('3', 'years');
            const input = date.format('YYYY-MM-DD');
            const result = Util.getAnimalAgeInMonths(input);
            expect(result).to.equal(36);
            done();
        });
    });

    describe('When I give a date that is 3 weeks ago', () => {
        it('should return 0 months', done => {
            const now = moment();
            const date = now.subtract('3', 'weeks');
            const input = date.format('YYYY-MM-DD');
            console.log(input);
            const result = Util.getAnimalAgeInMonths(input);
            expect(result).to.equal(0);
            done();
        });
    });

});

describe('When I call Util.getAnimalAgeAsString()', () => {
    describe('When I pass a date that is 3 years and 4 months and one day ago', () => {
        it('should return "3 years 4 mo"', done => {
            const now = moment();
            const date = now.subtract(3, 'years')
                .subtract(4, 'months')
                .subtract(1, 'days');

            const input = date.format('YYYY-MM-DD');
            const result = Util.getAnimalAgeAsString(input);
            expect(result).to.equal('3 years 4 mo');
            done();
        });
    });

    describe('When I pass a date that is one day ago', () => {
        it('should return "0 years o mo"', done => {
            const now = moment();
            const date = now
                .subtract(1, 'days');

            const input = date.format('YYYY-MM-DD');
            const result = Util.getAnimalAgeAsString(input);
            expect(result).to.equal('0 years 0 mo');
            done();
        });
    });
});
