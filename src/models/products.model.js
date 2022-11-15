const camelize = require('camelize');
const connection = require('../database/connection');

const getAll = async () => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products',
  );
  return camelize(result);
};

const findById = async (productId) => {
  const [[result]] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE id = ?',
    [productId],
  );
  return camelize(result);
};

const createNewProduct = async ({ name }) => {
  const [{ insertId }] = await connection.execute(
    'INSERT INTO StoreManager.products (name) VALUES (?)',
    [name],
  );

  const newProductRegistered = await findById(insertId);

  return newProductRegistered;
};

const updateProduct = async (name, productId) => {
  await connection.execute(
    'UPDATE StoreManager.products SET name = ? WHERE id = ?',
    [name, productId],
  );
  const updatedProduct = await findById(productId);
  return camelize(updatedProduct);
};

const deleteProduct = async (productId) => {
  const [{ affectedRows }] = await connection.execute(
    'DELETE FROM StoreManager.products WHERE id = ?',
    [productId],
  );
  return affectedRows;
};

const getByName = async (productName) => {
  const [result] = await connection.execute(
    'SELECT * FROM StoreManager.products WHERE name LIKE ?',
    [productName],
  );
  return result;
};

module.exports = {
  getAll,
  findById,
  createNewProduct,
  updateProduct,
  deleteProduct,
  getByName,
};