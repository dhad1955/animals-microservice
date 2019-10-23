const _ = require('lodash');
const Util = require('./Util/Util');
const http = require('./Util/Http');

const BASE_URL = 'https://apigateway.test.lifeworks.com/rescue-shelter-api';

const mapWithAge = function(animals) {
    return _.map(animals, o => {
        return Object.assign(o,
            {
                ageInMonths: Util.getAnimalAgeInMonths(o.dateOfBirth),
                age: Util.getAnimalAgeAsString(o.dateOfBirth)
            });
    });
};

module.exports = {
    BASE_URL,

    /**
     * Get Cats
     * @returns {Promise<*>}
     */
    async getCats() {
        try {
            const cats = await http.get(`${BASE_URL}/cats`);

            if (cats.status !== 200) {
                return {
                    success: false,
                    status: cats.status
                };
            }

            // assign ageInMonths and age
            const mapped = mapWithAge(cats.body.body);

            // sort order for grouping
            const SORT_ORDER = [
                'ginger',
                'black'
            ];

            const grouped = _.groupBy(mapped, 'colour');

            const sorted = _.chain(grouped).keys(grouped)
                .orderBy([key => SORT_ORDER.indexOf(key) < 0 ? Number.MAX_VALUE : SORT_ORDER.indexOf(key)], ['asc']).value();

            // morph into array, then sort by ageInMonths

            let output = [];
            sorted.forEach(s => {
                output = output.concat(_.sortBy(grouped[s], 'ageInMonths').reverse());
            });

            return {
                success: true,
                status: cats.status,
                result: output
            };
        } catch (e) {
            console.log(e);
            
            return {
                success: false,
                error: e
            };
        }
    },

    /**
     * Get Dogs
     * @returns {Promise<*>}
     */
    async getDogs() {
        try {
            const dogs = await http.get(`${BASE_URL}/dogs`);

            if (dogs.status !== 200) {
                return {
                    success: false,
                    status: dogs.status
                };
            }

            // assign ageInMonths and age
            const mapped = mapWithAge(dogs.body.body);
            const output = _.sortBy(mapped, 'ageInMonths').reverse();

            return {
                success: true,
                status: dogs.status,
                result: output
            };
        } catch (e) {
            console.log(e);
            
            return {
                success: false,
                error: e
            };
        }
    },

    /**
     * Get Hamsters
     * @returns {Promise<*>}
     */
    async getHamsters() {
        try {
            const hamsters = await http.get(`${BASE_URL}/hamsters`);

            if (hamsters.status !== 200) {
                return {
                    success: false,
                    status: hamsters.status
                };
            }

            // assign ageInMonths and age
            const mapped = mapWithAge(hamsters.body.body);
            const output = _.sortBy(mapped, 'ageInMonths');
            
            return {
                success: true,
                status: hamsters.status,
                result: output
            };
        } catch (e) {
            console.log(e);
            
            return {
                success: false,
                error: e
            };
        }
    }
};