var howLongLeft = require('../index');
var expect = require('chai').expect;

describe("isValidTime", function () {
    it("Should be valid for a HH:MM time", function() {
        var isValid = howLongLeft.isValidTime("12:00");

        expect(isValid).to.be.true;
    });

    it("Should be invalid for a 24:00", function() {
        var isValid = howLongLeft.isValidTime("24:00");

        expect(isValid).to.be.false;
    });

    it("Should be invalid for text", function() {
        var isValid = howLongLeft.isValidTime("test");

        expect(isValid).to.be.false;
    });
});

describe("howLongLeft", function () {
    it("Should return that we're finished with work", function() {
        var date = new Date();
        date.setHours(20, 0, 0);
        var message = howLongLeft.howLongLeft("18:00", date);

        expect(message).to.be.equal("It's time to go home");
    });

    it("Should return that we have x minutes left", function() {
        var date = new Date();
        date.setHours(17, 30, 0);
        var message = howLongLeft.howLongLeft("18:00", date);

        expect(message).to.be.equal("You have 30 minutes left.");
    });

    it("Should return that we have x hours and x minutes left", function() {
        var date = new Date();
        date.setHours(16, 30, 0);
        var message = howLongLeft.howLongLeft("18:00", date);

        expect(message).to.be.equal("You have 1 hours and 30 minutes left.");
    });
});
