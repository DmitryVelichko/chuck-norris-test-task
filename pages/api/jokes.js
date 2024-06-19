import axios from 'axios';

export default async function handler(req, res) {
  const { query } = req.query;
  if (!query || query.length < 4) {
    return res.status(400).json({ error: 'Query must be at least 4 characters long' });
  }
  try {
    const response = await axios.get(`https://api.chucknorris.io/jokes/search?query=${query}`);
    res.status(200).json(response.data);
  } catch (error) {
    res.status(error.response?.status || 500).json({ error: 'Error fetching jokes' });
  }
}
