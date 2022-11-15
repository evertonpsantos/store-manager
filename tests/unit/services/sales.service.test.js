const { expect } = require('chai');
const sinon = require('sinon');

const productsModel = require('../../../src/models/products.model');
const salesService = require('../../../src/services/sales.service');
const salesServiceMock = require('./mocks/sales.service.mock');
const salesModel = require('../../../src/models/sales.model');
const salesModelMock = require('../models/mocks/sales.model.mock');

describe('Tests sales service layer', () => {
  afterEach(sinon.restore);

  it('Tests if returns error object when invalid id is passed', async () => {
    sinon.stub(productsModel, 'findById').resolves(undefined);
    const errorType = 'PRODUCT_NOT_FOUND';
    const errorMessage = 'Product not found';
    const result = await salesService.registerNewSale(salesServiceMock.errorSaleMock);
    expect(result.type).to.be.equal(errorType);
    expect(result.message).to.be.equal(errorMessage);
  })

  it('Tests if returns right object when valid request is passed to registerNewSale', async () => {
    sinon.stub(productsModel, 'findById').resolves([salesServiceMock.successResponseMock]);
    sinon.stub(salesModel, 'registerNewSale').resolves(1);
    const rightSuccessMessage = { id: 1, itemsSold: salesServiceMock.successSaleMock };
    const result = await salesService.registerNewSale(salesServiceMock.successSaleMock);
    expect(result.type).to.equal(null);
    expect(result.message).to.deep.equal(rightSuccessMessage);
  })

  it('Tests if returns all sales', async () => {
    sinon.stub(salesModel, 'getSales').resolves(salesModelMock.allSalesMockFinal);
    const result = await salesService.getSales();
    expect(result.type).to.equal(null);
    expect(result.message).to.deep.equal(salesModelMock.allSalesMockFinal);
  })

  it('Tests if returns sale when id is specified', async () => {
    sinon.stub(salesModel, 'getSaleById').resolves(salesModelMock.saleByIdFinal);
    const saleId = 2;
    const result = await salesService.getSaleById(saleId);
    expect(result.type).to.equal(null);
    expect(result.message).to.deep.equal(salesModelMock.saleByIdFinal);
  })

  it('Tests if returns error when invalid id is given', async () => {
    sinon.stub(salesModel, 'getSaleById').resolves([]);
    const invalidId = 333;
    const errorType = 'SALE_NOT_FOUND';
    const errorMessage = 'Sale not found';
    const result = await salesService.getSaleById(invalidId);
    expect(result.type).to.equal(errorType);
    expect(result.message).to.deep.equal(errorMessage);
  })
  
  it('Tests if returns right object when deleting a sale', async () => {
    sinon.stub(salesModel, 'getSaleById').resolves([salesServiceMock.saleByIdFinal]);
    sinon.stub(salesModel, 'deleteSale').resolves();
    const result = await salesService.deleteSale(2);
    expect(result.type).to.be.equal(null);
    expect(result.message).to.be.equal('');
  });

  it('Tests if returns error when invalid id is passed to deleteSale', async () => {
    sinon.stub(salesModel, 'getSaleById').resolves([]);
    const result = await salesService.deleteSale(333);
    expect(result.type).to.be.equal('SALE_NOT_FOUND');
    expect(result.message).to.be.equal('Sale not found');
  });

  it('Tests if it`s possible to update a sale', async () => {
    sinon.stub(salesModel, 'getSaleById').resolves([salesModelMock.saleByIdFinal]);
    sinon.stub(productsModel, 'findById').resolves([salesServiceMock.successResponseMock]);
    sinon.stub(salesModel, 'updateSale').resolves(salesServiceMock.saleByIdCamelized);
    const newRequestMock = [{ productId: 1, quantity: 20 }];
    const result = await salesService.updateSale(newRequestMock, 1);
    expect(result.type).to.equal(null);
    expect(result.message).to.deep.equal({ saleId: 1, itemsUpdated: salesServiceMock.saleByIdCamelized });
  });

  it('Tests if error is returned when invalid saleId is passed', async () => {
    sinon.stub(salesModel, 'getSaleById').resolves([]);
    const newRequestMock = [{ productId: 1, quantity: 20 }];
    const errorType = 'SALE_NOT_FOUND';
    const errorMessage = 'Sale not found';
    const result = await salesService.updateSale(newRequestMock, 222);
    expect(result.type).to.equal(errorType);
    expect(result.message).to.deep.equal(errorMessage);
  });

  it('Tests if error is returned when invalid productId is passed', async () => {
    sinon.stub(salesModel, 'getSaleById').resolves([salesModelMock.saleByIdFinal]);
    sinon.stub(productsModel, 'findById').resolves(undefined);
    const newRequestMock = [{ productId: 1, quantity: 20 }];
    const result = await salesService.updateSale(newRequestMock, 1);
    expect(result.type).to.be.equal('PRODUCT_NOT_FOUND');
    expect(result.message).to.be.equal('Product not found');
  });
});