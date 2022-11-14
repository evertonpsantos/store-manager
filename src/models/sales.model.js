const connection = require('../database/connection');

const createNewSale = async () => {
  const currentDate = new Date();
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.sales (date) VALUES (?)',
    [currentDate],
  );
  return insertId;
};

const registerNewSale = async (newSale) => {
  const id = await createNewSale();
  await Promise.all(newSale.map((sale) => connection.execute(
      'INSERT INTO StoreManager.sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
      [id, sale.productId, sale.quantity],
    )));
  return id;
};

module.exports = {
  registerNewSale,
};