const errorSaleMock = [{
  productId: 9999,
  quantity: 1,
}];

const successSaleMock = [{
  productId: 1,
  quantity: 1,
}];

const successResponseMock = {
  id: 1,
  name: "Martelo de Thor"
}

const successSaleById = [
  {
    "date": "2022-11-15T20:48:15.000Z",
    "productId": 3,
    "quantity": 15
  }
]

module.exports = {
  errorSaleMock,
  successSaleMock,
  successResponseMock,
  successSaleById,
}