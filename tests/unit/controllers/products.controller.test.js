const chai = require('chai');
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
const { expect } = chai;

const productsController = require('../../../src/controllers/products.controller');
const productService = require('../../../src/services/products.service');
const { allProducts, newRegisteredProductMock, updatedProductMock } = require('../models/mocks/products.model.mock');
const { notFoundMessage } = require('./mocks/products.controller.mock');

chai.use(sinonChai);

describe('Tests the products controller layer', () => {
  afterEach(sinon.restore);

  it('Tests if it returns right response when getAll is called', async () => {
    const res = {};
    const req = {};

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productService, 'getAll').resolves({ type: null, message: allProducts });

    const rightStatus = 200;
    await productsController.getAll(req, res);
    expect(res.status).to.have.been.calledWith(rightStatus);
    expect(res.json).to.have.been.calledWith(allProducts);
  });

  it('Tests if it returns right response when findById is called', async () => {
    const res = {};
    const req = {
      params: {
        id: 1
      }
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productService, 'findById').resolves({ type: null, message: allProducts[0] });

    const rightStatus = 200;
    await productsController.findById(req, res);
    expect(res.status).to.have.been.calledWith(rightStatus);
    expect(res.json).to.have.been.calledWith(allProducts[0]);
  });

  it('Tests if returns error when request with an invalid id is made', async () => {
    const res = {};
    const req = {
      params: {
        id: 555
      }
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productService, 'findById').resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });

    const errorStatus = 404;
    await productsController.findById(req, res);
    expect(res.status).to.have.been.calledWith(errorStatus);
    expect(res.json).to.have.been.calledWith(notFoundMessage);
  });

  it('Tests if it returns right response when createNewProduct is called', async () => {
    const res = {};
    const req = {
      body: {
        name: "Rejuvenator"
      }
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productService, 'createNewProduct')
        .resolves({ type: null, message: newRegisteredProductMock });

    const rightStatus = 201;
    await productsController.createNewProduct(req, res);
    expect(res.status).to.have.been.calledWith(rightStatus);
    expect(res.json).to.have.been.calledWith(newRegisteredProductMock);
  });

  it('Tests if it returns right response when updateProduct is called', async () => {
    const res = {};
    const req = {
      body: {
        name: 'She-Hulk`s Glasses'
      },
      params: {
        id: 1
      }
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productService, 'updateProduct')
        .resolves({ type: null, message: updatedProductMock });

    const rightStatus = 200;
    await productsController.updateProduct(req, res);
    expect(res.status).to.have.been.calledWith(rightStatus);
    expect(res.json).to.have.been.calledWith(updatedProductMock);
  });

  it('Tests if it retuns error is returned when wrong id is passed to updateProduct', async () => {
    const res = {};
    const req = {
      body: {
        name: "She-Hulk`s Glasses"
      },
      params: {
        id: 555
      }
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productService, 'updateProduct').resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });

    const errorStatus = 404;
    await productsController.updateProduct(req, res);
    expect(res.status).to.have.been.calledWith(errorStatus);
    expect(res.json).to.have.been.calledWith(notFoundMessage);
  });

  it('Tests if it returns right response when deleteProduct is called', async () => {
    const res = {};
    const req = {
      params: {
        id: 3
      }
    };

    res.status = sinon.stub().returns(res);
    res.json = sinon.stub().returns();

    sinon.stub(productService, 'deleteProduct')
        .resolves({ type: null, message: '' });

    const rightStatus = 204;
    await productsController.deleteProduct(req, res);
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

    sinon.stub(productService, 'deleteProduct')
      .resolves({ type: 'PRODUCT_NOT_FOUND', message: 'Product not found' });

    const errorStatus = 404;
    await productsController.deleteProduct(req, res);
    expect(res.status).to.have.been.calledWith(errorStatus);
    expect(res.json).to.have.been.calledWith(notFoundMessage);
  });
});