const { expect } = require('chai');
const sinon = require('sinon');

const productsModel = require('../../../src/models/products.model');
const connection = require('../../../src/database/connection');
const { allProducts, singleProductResponse } = require('./mocks/products.model.mock');

describe('Tests the products model layer', () => {
  afterEach(sinon.restore);

  it('Tests if it is possible to list all products', async () => {
    sinon.stub(connection, 'execute').resolves([allProducts]);
    const result = await productsModel.getAll();
    expect(result).to.be.deep.equal(allProducts);
  });

  it('Tests if the right product is returned when on /:id route', async () => {
    sinon.stub(connection, 'execute').resolves([[singleProductResponse]]);
    const result = await productsModel.findById(1);
    expect(result).to.be.deep.equal(singleProductResponse);
  });
});