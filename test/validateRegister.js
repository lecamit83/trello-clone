const chai = require('chai');
const expect = chai.expect;
const { validateRegisterUser } = require('../validations/user.validation');

describe('validate User Register', function(){
  it('correct user', function(){
    expect(validateRegisterUser({name : 'Le Cam', email : 'thantoandoc83@gmail.com', password : '1213212'})).to.equal(true);
  });
  it('empty name', function(){
    expect(validateRegisterUser({name : '', email : 'thantoandoc83@gmail.com', password : '1213212'})).to.equal(false);
  });
  it('empty email', function(){
    expect(validateRegisterUser({name : 'Le Cam', email : '', password : '1213212'})).to.equal(false);
  });
  it('invalid email', function(){
    expect(validateRegisterUser({name : 'Le Cam', email : 'thantoand oc83@gmail.com', password : '1213212'})).to.equal(false);
  });
  it('empty password', function(){
    expect(validateRegisterUser({name : 'Le Cam', email : 'thantoandoc83@gmail.com', password : ''})).to.equal(false);
  });
  it('length password not long', function(){
    expect(validateRegisterUser({name : 'Le Cam', email : 'thantoandoc83@gmail.com', password : '1212'})).to.equal(false);
  });
  it('password contain space', function(){
    expect(validateRegisterUser({name : 'Le Cam', email : 'thantoandoc83@gmail.com', password : 'eqw e1232'})).to.equal(false);
  });
});
