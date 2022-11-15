const allProducts = [
  {
    id: 1,
    name: "Martelo de Thor"
  },
  {
    id: 2,
    name: "Traje de encolhimento"
  },
  {
    id: 3,
    name: "Escudo do Capitão América"
  }
]

const singleProductResponse = {
  id: 1,
  name: "Martelo de Thor"
};

const newProduct = {
  name: "Rejuvenator"
}

const newRegisteredProductMock = {
  id: 1,
  name: "Rejuvenator"
}

const updatedProductMock = {
  id: 1,
  name: `She-Hulk's Glasses`
}

module.exports = {
  allProducts,
  singleProductResponse,
  newProduct,
  newRegisteredProductMock,
  updatedProductMock,
}