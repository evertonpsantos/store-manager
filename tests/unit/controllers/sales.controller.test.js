const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { expect } = chai;

const salesService = require('../../../src/services/sales.service');
const salesController = require('../../../src/controllers/sales.controller');
const { rightResponse, notFoundSaleMessage } = require('./mocks/sales.controller.mock');
const salesModelMock = require('../models/mocks/sales.model.mock');

chai.use(sinonChai);

describe('Tests sales controller layer', () => {
  afterEach(sinon.restore);

  it('Tests if right response is sent when request is correct', async () => {
    const res = {};
    const req = {
      body: [{
        productId: 1,
        quantity: 1
      }]
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(salesService, 'registerNewSale')
        .resolves({ type: null, message: rightResponse });

    const rightStatus = 201;
    await salesController.registerNewSale(req, res);
    expect(res.status).to.have.been.calledWith(rightStatus);
    expect(res.json).to.have.been.calledWith(rightResponse);
  });

  it('Tests if right object is returned when an error occurs', async () => {
    const res = {};
    const req = {
      body: [{
        productId: 333,
        quantity: 1
      }]
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(salesService, 'registerNewSale')
        .resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });

    const errorStatus = 404;
    await salesController.registerNewSale(req, res);
    expect(res.status).to.have.been.calledWith(errorStatus);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found'});
  });
  
  it('Tests if returns all sales, ', async () => {
    const res = {};
    const req = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(salesService, 'getSales')
        .resolves({ type: null, message: salesModelMock.allSalesMockFinal });

    const rightStatus = 200;
    await salesController.getSales(req, res);
    expect(res.status).to.have.been.calledWith(rightStatus);
    expect(res.json).to.have.been.calledWith(salesModelMock.allSalesMockFinal);
  });

  it('Tests if returns one sale when id is given', async () => {
    const res = {};
      const req = {
        params: {
        id: 2
      }
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(salesService, 'getSaleById')
        .resolves({ type: null, message: salesModelMock.saleByIdFinal });

    const rightStatus = 200;
    await salesController.getSaleById(req, res);
    expect(res.status).to.have.been.calledWith(rightStatus);
    expect(res.json).to.have.been.calledWith(salesModelMock.saleByIdFinal);
  });

  it('Tests if returns error when invalid id is given', async () => {
    const res = {};
      const req = {
        params: {
        id: 555
      }
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    const productNotFoundMock = { type: 'PRODUCT_NOT_FOUND', message: 'Product not found' };

    sinon.stub(salesService, 'getSaleById')
        .resolves(productNotFoundMock);

    const rightStatus = 404;
    await salesController.getSaleById(req, res);
    expect(res.status).to.have.been.calledWith(rightStatus);
    expect(res.json).to.have.been.calledWith({ message: productNotFoundMock.message });
  });

  it('Tests if it returns right response when deleteSale is called', async () => {
    const res = {};
    const req = {
      params: {
        id: 2
      }
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(salesService, 'deleteSale')
        .resolves({ type: null, message: '' });

    const rightStatus = 204;
    await salesController.deleteSale(req, res);
    expect(res.status).to.have.been.calledWith(rightStatus);
    expect(res.json).to.have.been.calledWith();
  });

  it('Tests if it retuns error is returned when wrong id is passed to deleteProduct', async () => {
    const res = {};
    const req = {
      params: {
        id: 555
      }
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(salesService, 'deleteSale')
      .resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });

    const errorStatus = 404;
    await salesController.deleteSale(req, res);
    expect(res.status).to.have.been.calledWith(errorStatus);
    expect(res.json).to.have.been.calledWith(notFoundSaleMessage);
  });
});