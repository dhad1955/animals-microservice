const AnimalService = require('../../src/AnimalService');
const expect = require('chai').expect;
const sinon = require('sinon');
const axios = require('axios');

const createAnimal = function(forename, dateOfBirth, colour) {
    return  {
        'forename': forename,
        'surname': 'Mason',
        'dateOfBirth': dateOfBirth,
        'colour': colour,
        'image': {
            'url': 'http://25.media.tumblr.com/tumblr_m3qf8sQXfQ1qhwmnpo1_1280.jpg'
        }
    };
};

describe('When I call AnimalService.getCats()', () => {
    it('should return a success true with a 200 with an array of cats', async() => {
        const cats = await AnimalService.getCats();
        expect(cats.status).to.equal(200);
        expect(cats.success).to.equal(true);
        expect(cats.result).to.be.an('array');
    });

    it('results should contain an age field', async() => {
        const cats = await AnimalService.getCats();
        cats.result.forEach(cat => {
            expect(cat).to.have.property('age');
        });
    });

    describe('(Sorting) When black cats and ginger cats are present', () => {
        let stub;

        before(() => {
            let MOCK_RESPONSE = [];

            MOCK_RESPONSE.push(createAnimal('blackCat', '2018-10-1', 'black'));
            MOCK_RESPONSE.push(createAnimal('blackCat2', '2018-11-1', 'black'));
            MOCK_RESPONSE.push(createAnimal('gingerCat', '2018-10-1', 'ginger'));
            stub = sinon.stub(axios, 'get')
                .resolves({
                    status: 200,
                    data: {
                        body: MOCK_RESPONSE
                    }
                });

        });

        after(() => {
            stub.restore();
        });

        // Ginger cats come first
        // blackCat is the oldest
        // blackCat2 is the youngest
        it('Ginger cat should be first followed by blackCat and blackCat2', async() => {
            const result = await AnimalService.getCats();
            const subject = result.result;
            expect(subject[0].forename).to.equal('gingerCat');
            expect(subject[1].forename).to.equal('blackCat');
            expect(subject[2].forename).to.equal('blackCat2');
        });
    });
});

describe('When I call AnimalService.getDogs()', () => {
    it('should return a success true with a 200 with an array of dogs', async() => {
        const dogs = await AnimalService.getDogs();
        expect(dogs.status).to.equal(200);
        expect(dogs.success).to.equal(true);
        expect(dogs.result).to.be.an('array');
    });

    it('results should contain an age field', async() => {
        const dogs = await AnimalService.getDogs();
        dogs.result.forEach(cat => {
            expect(cat).to.have.property('age');
        });
    });

    describe('(Sorting) When dogs are present', () => {
        let stub;

        before(() => {
            let MOCK_RESPONSE = [];

            MOCK_RESPONSE.push(createAnimal('oldDog', '2015-10-1', 'black'));
            MOCK_RESPONSE.push(createAnimal('youngDog', '2018-11-1', 'black'));
            stub = sinon.stub(axios, 'get')
                .resolves({
                    status: 200,
                    data: {
                        body: MOCK_RESPONSE
                    }
                });

        });

        after(() => {
            stub.restore();
        });

        it('oldDog should be first followed by youngDog (Sorted by age)', async() => {
            const result = await AnimalService.getDogs();
            const subject = result.result;
            expect(subject[0].forename).to.equal('oldDog');
            expect(subject[1].forename).to.equal('youngDog');
        });
    });
});

describe('When I call AnimalService.getHamsters()', () => {
    it('should return a success true with a 200 with an array of dogs', async() => {
        const hamsters = await AnimalService.getHamsters();
        expect(hamsters.status).to.equal(200);
        expect(hamsters.success).to.equal(true);
        expect(hamsters.result).to.be.an('array');
    });

    it('results should contain an age field', async() => {
        const hamsters = await AnimalService.getHamsters();
        hamsters.result.forEach(cat => {
            expect(cat).to.have.property('age');
        });
    });

    describe('(Sorting) When dogs are present', () => {
        let stub;

        before(() => {
            let MOCK_RESPONSE = [];
            MOCK_RESPONSE.push(createAnimal('oldHamster', '2011-11-1', 'black'));
            MOCK_RESPONSE.push(createAnimal('babyHamster', '2019-10-1', 'black'));
            stub = sinon.stub(axios, 'get')
                .resolves({
                    status: 200,
                    data: {
                        body: MOCK_RESPONSE
                    }
                });

        });

        after(() => {
            stub.restore();
        });

        it('babyHamster should be first followed by oldHamster (Sorted by age)', async() => {
            const result = await AnimalService.getHamsters();
            const subject = result.result;
            expect(subject[0].forename).to.equal('babyHamster');
            expect(subject[1].forename).to.equal('oldHamster');
        });
    });
});