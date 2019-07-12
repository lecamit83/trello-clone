const chai = require('chai');
const expect = chai.expect;
const { formatTitle } = require('../validations/board.validation');

describe('Validate Board', function () {
  it('one word', function () {
    expect(formatTitle('cAm')).to.equal('Cam');
  });
  it('multi word', function () {
    expect(formatTitle('   le       cAm     a1   ')).to.equal('Le Cam A1');
  });
});
