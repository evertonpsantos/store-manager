const { expect } = require('chai');
const sinon = require('sinon');

const connection = require('../../../src/database/connection');
const salesModel = require('../../../src/models/sales.model');
const salesModelMocks = require('./mocks/sales.model.mock');

describe('Tests sales model layer', () => {
  afterEach(sinon.restore);

  it('Tests if it returns right id when registerNewSale is called', async () => {
    sinon.stub(connection, 'execute')
      .onFirstCall().resolves([{ insertId: 1 }])
      .onSecondCall().resolves()
    
    const result = await salesModel.registerNewSale(salesModelMocks.newSaleMock);
    expect(result).to.be.equal(1);
  });
});