const { expect } = require('chai');
const sinon = require('sinon');

const productService = require('../../../src/services/products.service');
const productsModel = require('../../../src/models/products.model');
const { allProducts } = require('../models/mocks/products.model.mock');

describe('Tests the products service layer', () => {
  afterEach(sinon.restore);

  it('Tests if function returns the right object when getAll is called', async () => {
    sinon.stub(productsModel, 'getAll').resolves(allProducts);
    const result = await productService.getAll();
    expect(result.type).to.equal(null);
    expect(result.message).to.deep.equal(allProducts);
  });

  it('Tests if function returns the right object when findById is called', async () => {
    sinon.stub(productsModel, 'findById').resolves(allProducts[0]);
    const id = 1;
    const result = await productService.findById(id);
    expect(result.type).to.equal(null);
    expect(result.message).to.deep.equal(allProducts[0]);
  });

  it('Tests if function returns an error when invalid id is provided', async () => {
    sinon.stub(productsModel, 'findById').resolves(undefined);
    const rightMessage = 'Product not found';
    const rightStatus = 'PRODUCT_NOT_FOUND';
    const id = 555;
    const result = await productService.findById(id);
    expect(result.type).to.equal(rightStatus);
    expect(result.message).to.deep.equal(rightMessage);
  });
});