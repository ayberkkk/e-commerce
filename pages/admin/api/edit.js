import axios from 'axios';

export default async function handler(req, res) {
  const { id } = req.query;
  const updatedProductData = req.body;

  try {
    const response = await axios.put(`https://fakestoreapi.com/products/${id}`, updatedProductData);
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}
