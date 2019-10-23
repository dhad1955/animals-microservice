const Http = require('../../src/Util/Http');
const sinon = require('sinon');
const axios = require('axios');
const expect = require('chai').expect;

describe('When I call Http.get', () => {
    describe('With a url that returns 200', () => {
        let stub;
        before(() => {
            stub = sinon.stub(axios, 'get')
                .resolves({
                    status: 200,
                    data: 'test'
                });
        });
        after(() => {
            stub.restore();
        });
        it('should return the correct structure with 200 status code', async() => {
            let result = await Http.get('https://test.url');
            expect(result).to.have.property('status');
            expect(result.status).to.equal(200);
            expect(result).to.have.property('body');
            expect(result.body).to.equal('test');
        });
    });

    describe('With a url that throws a http error', () => {
        let stub;
        before(() => {
            stub = sinon.stub(axios, 'get')
                .rejects({
                    response: {
                        status: 403,
                        data: 'test'
                    }
                });
        });

        after(() => {
            stub.restore();
        });

        it('should return the correct structure with a 403 status code', async() => {
            let result = await Http.get('https://test.url');
            expect(result).to.have.property('status');
            expect(result.status).to.equal(403);
            expect(result).to.have.property('body');
            expect(result.body).to.equal('test');
        });
    });
});
