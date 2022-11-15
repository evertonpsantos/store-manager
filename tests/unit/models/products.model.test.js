const { expect } = require('chai');
const sinon = require('sinon');

const productsModel = require('../../../src/models/products.model');
const connection = require('../../../src/database/connection');
const productModelMocks = require('./mocks/products.model.mock');

const { allProducts, singleProductResponse, newProduct, newRegisteredProductMock } = productModelMocks;

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

  it('Tests if it possible to insert a new product in the DB', async () => {
    sinon.stub(connection, 'execute')
      .onFirstCall().resolves([{ insertId: 1 }])
      .onSecondCall().resolves([[newRegisteredProductMock]]);
    
    const result = await productsModel.createNewProduct(newProduct);
    expect(result).to.be.deep.equal(newRegisteredProductMock);
  });

  it('Tests if it is possible to update a products information', async () => {
    sinon.stub(connection, 'execute').onFirstCall().resolves()
      .onSecondCall().resolves([[productModelMocks.updatedProductMock]]);
    const result = await productsModel.updateProduct(`She-Hulk's Glasses`, 1);
    expect(result).to.be.deep.equal(productModelMocks.updatedProductMock);
  });
});