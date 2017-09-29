
var expect = require('chai').expect;

describe('Mocha', function(){

	it('should run tests', function(){
		expect(true).to.be.ok;
	});

});

// leads

describe('AuditInteraction - constructor', function(){

	var AuditInteraction = require('../src/helpers/leads.js');

	it('should create a new AuditInteraction obj with two keys, view and company', function(){

		var auditInteraction = new AuditInteraction('view', 'Yeahh');
		expect(auditInteraction).to.have.keys(['type', 'company']);

	});

});

// describe('isNewCompany', function(){

// 	var AuditInteraction = require('../src/helpers/leads.js');

// 	beforeEach(function(){

		
		
// 	});

// 	it('should return boolean', function(){

// 		var auditInteraction = new AuditInteraction('view', 'company_one');
// 		expect(auditInteraction.isNewCompany()).to.be.a('boolean');

// 	});

// 	it('should return true', function(){

// 		var auditInteraction = new AuditInteraction('view', 'company_one');
// 		expect(auditInteraction.isNewCompany()).to.be.true;

// 	});

// 	it('should return true', function(){

// 		var auditInteraction = new AuditInteraction('view', 'company_two');
// 		expect(auditInteraction.isNewCompany()).to.be.false;

// 	});

// });