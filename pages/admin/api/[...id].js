import axios from 'axios';

export default async function handler(req, res) {
  const { id } = req.query;

  try {
    const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
    res.status(200).json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
}
