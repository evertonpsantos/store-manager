const newSaleMock = [{
  productId: 1,
  quantity: 1
}]

const allSalesDbResponse = [
  {
    "saleId": 1,
    "date": "2022-11-14T22:49:14.000Z",
    "productId": 1,
    "quantity": 5
  },
  {
    "saleId": 1,
    "date": "2022-11-14T22:49:14.000Z",
    "productId": 2,
    "quantity": 10
  }]

const allSalesMockFinal = [
  {
    saleId: 1,
    date: "2022-11-14T22:49:14.000Z",
    productId: 1,
    quantity: 5
  },
  {
    saleId: 1,
    date: "2022-11-14T22:49:14.000Z",
    productId: 2,
    quantity: 10
  }]

const saleByIdMockDB = [
  {
    "date": "2022-11-14T22:49:14.000Z",
    "productId": 3,
    "quantity": 15
  }
];

const saleByIdFinal = [
  {
    date: "2022-11-14T22:49:14.000Z",
    productId: 3,
    quantity: 15
  }
];

module.exports = {
  newSaleMock,
  allSalesMockFinal,
  allSalesDbResponse,
  saleByIdMockDB,
  saleByIdFinal,
}