const rightResponse = {
  id: 5,
  itemsSold: [
    {
      productId: 1,
      quantity: 1
    }
  ]
}

const notFoundSaleMessage = {
  message: "Sale not found"
};

const rightUpdateSaleResponse = {
  saleId: 1,
  itemsUpdated: [
  {
    date: "2022-11-15T20:48:15.000Z",
    productId: 3,
    quantity: 15
  }]
}

module.exports = {
  rightResponse,
  notFoundSaleMessage,
  rightUpdateSaleResponse,
}