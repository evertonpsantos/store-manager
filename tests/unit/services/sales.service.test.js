const { expect } = require('chai');
const sinon = require('sinon');

const salesService = require('../../../src/services/sales.service');
const productsModel = require('../../../src/models/products.model');
const salesServiceMock = require('./mocks/sales.service.mock');
const salesModel = require('../../../src/models/sales.model');

describe('Tests sales service layer', () => {
  afterEach(sinon.restore);

  it('Tests if returns error object when invalid id is passed', async () => {
    sinon.stub(productsModel, 'findById').resolves([]);
    const errorType = 'PRODUCT_NOT_FOUND';
    const errorMessage = 'Product not found';
    const result = await salesService.registerNewSale(salesServiceMock.errorSaleMock);
    expect(result.type).to.be.equal(errorType);
    expect(result.message).to.be.equal(errorMessage);
  })

  it('Tests if returns right object when valid request is passed', async () => {
    sinon.stub(productsModel, 'findById').resolves([salesServiceMock.successResponseMock]);
    sinon.stub(salesModel, 'registerNewSale').resolves(1);
    const rightSuccessMessage = { id: 1, itemsSold: salesServiceMock.successSaleMock };
    const result = await salesService.registerNewSale(salesServiceMock.successSaleMock);
    expect(result.type).to.equal(null);
    expect(result.message).to.deep.equal(rightSuccessMessage);
  })
});