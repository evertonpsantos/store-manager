const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { expect } = chai;

const salesService = require('../../../src/services/sales.service');
const salesController = require('../../../src/controllers/sales.controller');
const { rightResponse } = require('./mocks/sales.controller.mock');

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
});