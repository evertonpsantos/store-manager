const { expect } = require('chai');
const sinon = require('sinon');

const productService = require('../../../src/services/products.service');
const productsModel = require('../../../src/models/products.model');
const { allProducts, newProduct,
  newRegisteredProductMock, updatedProductMock, singleProductResponse } = require('../models/mocks/products.model.mock');
const { successResponseMock } = require('./mocks/sales.service.mock');

describe('Tests the products service layer', () => {
  afterEach(sinon.restore);

  it('Tests if it returns the right object when getAll is called', async () => {
    sinon.stub(productsModel, 'getAll').resolves(allProducts);
    const result = await productService.getAll();
    expect(result.type).to.equal(null);
    expect(result.message).to.deep.equal(allProducts);
  });

  it('Tests if it returns the right object when findById is called', async () => {
    sinon.stub(productsModel, 'findById').resolves(allProducts[0]);
    const id = 1;
    const result = await productService.findById(id);
    expect(result.type).to.equal(null);
    expect(result.message).to.deep.equal(allProducts[0]);
  });

  it('Tests if it returns an error when invalid id is provided', async () => {
    sinon.stub(productsModel, 'findById').resolves(undefined);
    const rightMessage = 'Product not found';
    const rightStatus = 'PRODUCT_NOT_FOUND';
    const id = 555;
    const result = await productService.findById(id);
    expect(result.type).to.equal(rightStatus);
    expect(result.message).to.deep.equal(rightMessage);
  });

  it('Tests if it returns the right object when createNewProduct is called with new product', async () => {
    sinon.stub(productsModel, 'createNewProduct').resolves(newRegisteredProductMock);
    const result = await productService.createNewProduct(newProduct);
    expect(result.type).to.be.equal(null);
    expect(result.message).to.be.deep.equal(newRegisteredProductMock);
  });

  it('Tests if it returns right object when trying to update a product', async () => {
    sinon.stub(productsModel, 'findById').resolves([[successResponseMock]])
    sinon.stub(productsModel, 'updateProduct').resolves(updatedProductMock);
    const result = await productService.updateProduct({ name: `She-Hulk's Glasses`}, 1);
    expect(result.type).to.be.equal(null)
    expect(result.message).to.be.equal(updatedProductMock)
  });

  it('Tests if retuns error when invalid product id is passed', async () => {
    sinon.stub(productsModel, 'findById').resolves(undefined);
    const result = await productService.updateProduct({ name: `She-Hulk's Glasses`}, 222);
    expect(result.type).to.be.equal('PRODUCT_NOT_FOUND');
    expect(result.message).to.be.equal('Product not found');
  });

  it('Tests if returns right object when deleting a product', async () => {
    sinon.stub(productsModel, 'findById').resolves(singleProductResponse);
    sinon.stub(productsModel, 'deleteProduct').resolves();
    const result = await productService.deleteProduct(1);
    expect(result.type).to.be.equal(null);
    expect(result.message).to.be.equal('');
  });

  it('Tests if returns error when invalid id is passed to deleteProduct', async () => {
    sinon.stub(productsModel, 'findById').resolves(undefined);
    const result = await productService.deleteProduct(333);
    expect(result.type).to.be.equal('PRODUCT_NOT_FOUND');
    expect(result.message).to.be.equal('Product not found');
  });
});