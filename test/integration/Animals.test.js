const TEST_DATA = {
    dogs: require('../data/ResponseDogs'),
    cats: require('../data/ResponseCats'),
    hamsters: require('../data/ResponseHamsters')
};

const chai = require('chai');
const expect = chai.expect;
const chaiHttp = require('chai-http');
const app = require('../../src/app');
const sinon = require('sinon');
const axios = require('axios');
const AnimalService = require('../../src/AnimalService');
chai.use(chaiHttp);

const makeGET = function() {
    return new Promise((resolve, reject) => {
        chai.request(app)
            .get('/animals')
            .send({})
            .end((err, res) => {
                if (err) {
                    return reject(err);
                } else {
                    return resolve(res);
                }

            });
    });
};

const setupFakes = function(dogs, cats, hamsters) {
    const stub = sinon.stub(axios, 'get');

    stub.        withArgs(`${AnimalService.BASE_URL}/cats`)
        .resolves(cats ? {
            status: 200,
            data: cats
        } : {
            status: 400,
            data: {}
        });

    stub
        .withArgs(`${AnimalService.BASE_URL}/dogs`)
        .resolves(dogs ? {
            status: 200,
            data: dogs
        } : {
            status: 400,
            data: {}
        });

    stub
        .withArgs(`${AnimalService.BASE_URL}/hamsters`)
        .resolves(hamsters ? {
            status: 200,
            data: hamsters
        } : {
            status: 400,
            data: {}
        });

    return stub;
};

describe('When I call /animals', () => {

    describe('When there are no errors on the underlying downstream service', () => {
        let stub;

        before(() => {
            stub = setupFakes(TEST_DATA.dogs, TEST_DATA.cats, TEST_DATA.hamsters);
        });

        after(() => {
            stub.restore();
        });

        it('should return 200 with all data', async() => {
            let result = await makeGET();
            const body = result.body;

            const TOTAL_LENGTH = TEST_DATA.hamsters.body.length + TEST_DATA.cats.body.length + TEST_DATA.dogs.body.length;
            expect(result.status).to.equal(200);
            expect(body.length).to.equal(TOTAL_LENGTH);
        });
    });

    describe('When there is an error on the cats downstream service', () => {
        let stub;

        before(() => {
            stub = setupFakes(TEST_DATA.dogs, null, TEST_DATA.hamsters);
        });

        after(() => {
            stub.restore();
        });

        it('should return 200 with no cats', async() => {
            let result = await makeGET();
            const body = result.body;

            const TOTAL_LENGTH = TEST_DATA.hamsters.body.length + TEST_DATA.cats.body.length + TEST_DATA.dogs.body.length;
            expect(result.status).to.equal(200);
            expect(body.length).to.equal(TOTAL_LENGTH - TEST_DATA.cats.body.length);
        });
    });

    describe('When there is an error on all downstream services', () => {
        let stub;

        before(() => {
            stub = setupFakes(null, null, null);
        });

        after(() => {
            stub.restore();
        });

        it('should return a 500 with no cats', async() => {
            let result = await makeGET();
            expect(result.status).to.equal(500);
        });
    });
});

after(() => {
    app.close();
});