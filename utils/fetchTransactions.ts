import axios from 'axios';
import { BELVO_API_URL, BELVO_CLIENT_ID, BELVO_SECRET } from './belvoConfig';

export const fetchTransactions = async () => {
  try {
    const response = await axios.get(`${BELVO_API_URL}/transactions`, {
      headers: {
        'Authorization': `Basic ${Buffer.from(`${BELVO_CLIENT_ID}:${BELVO_SECRET}`).toString('base64')}`
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw error;
  }
};