const camelize = require('camelize');
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

const getSales = async () => {
  const [result] = await connection.execute(
    `SELECT sp.sale_id, sa.date, sp.product_id, sp.quantity
    FROM StoreManager.sales_products as sp
    INNER JOIN StoreManager.sales as sa ON sp.sale_id = sa.id
    ORDER BY sale_id ASC, product_id ASC;`,
  );
  return camelize(result);
};

const getSaleById = async (saleId) => {
  const [result] = await connection.execute(
    `SELECT sa.date, sp.product_id, sp.quantity
  FROM StoreManager.sales_products as sp
  INNER JOIN StoreManager.sales as sa ON sp.sale_id = sa.id
  WHERE sp.sale_id = ?
  ORDER BY sale_id ASC, product_id ASC;`,
    [saleId],
  );
  return camelize(result);
};

const deleteSale = async (saleId) => {
  const [{ affectedRows }] = await connection.execute(
    'DELETE FROM StoreManager.sales WHERE id = ?',
    [saleId],
  );
  return affectedRows;
};

const updateSale = async (newSaleInfo, saleId) => {
  await Promise.all(newSaleInfo.map((sale) => connection.execute(
  'UPDATE StoreManager.sales_products SET quantity = ? WHERE sale_id = ? AND product_id = ?',
  [sale.quantity, saleId, sale.productId],
  )));
  const updatedSale = await getSaleById(saleId);
  return camelize(updatedSale);
};

module.exports = {
  registerNewSale,
  getSales,
  getSaleById,
  deleteSale,
  updateSale,
};