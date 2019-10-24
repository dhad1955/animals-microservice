const AnimalService = require('../../src/AnimalService');
const expect = require('chai').expect;

describe('When I call AnimalService.__decorateAnimalWithDescriptiveFields()', () => {
    describe('With a cat', () => {
        const INPUT = {
            'forename': 'Dixie',
            'surname': 'Mason',
            'dateOfBirth': '2009-02-13',
            'colour': 'black',
            'image': {
                'url': 'http://25.media.tumblr.com/tumblr_m3qf8sQXfQ1qhwmnpo1_1280.jpg'
            }
        };

        it('should return an age as a string', () => {
            let result = AnimalService._decorateAnimalWithDescriptiveFields('cat', INPUT);
            expect(result).to.have.property('age');
            expect(result.age).to.be.a('string');
        });

        it('should have a the field fullName present and the fullName should equal "Dixie Mason"', () => {
            let result = AnimalService._decorateAnimalWithDescriptiveFields('cat', INPUT);
            expect(result).to.have.property('fullName');
            expect(result.fullName).to.equal('Dixie Mason');
        });

        it('should have the field animalType present and animalType should equal "cat', () => {
            let result = AnimalService._decorateAnimalWithDescriptiveFields('cat', INPUT);
            expect(result).to.have.property('animalType');
            expect(result.animalType).to.equal('cat');
        });

        it('should morph the field "image" to a string', () => {
            let result = AnimalService._decorateAnimalWithDescriptiveFields('cat', INPUT);
            expect(result.image).to.be.a('string');
        });
    });
});