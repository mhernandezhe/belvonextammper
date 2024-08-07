// utils/belvo.ts
import axios from 'axios';

const BELVO_API_URL = process.env.BELVO_API_URL as string;
const BELVO_SECRET_ID = process.env.BELVO_SECRET_ID as string;
const BELVO_SECRET_PASSWORD = process.env.BELVO_SECRET_PASSWORD as string;

const auth = {
  username: BELVO_SECRET_ID,
  password: BELVO_SECRET_PASSWORD,
};

export async function getAccessToken(): Promise<string> {
  try {
    const response = await axios.post(`${BELVO_API_URL}/api/token/`, {}, { auth });
    return response.data.access;
  } catch (error) {
    console.error('Error fetching access token:', error);
    throw error;
  }
}

export async function getTransactions(linkId: string, dateFrom: string, dateTo: string) {
  try {
    const accessToken = await getAccessToken();
    const response = await axios.get(`${BELVO_API_URL}/api/transactions/`, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      params: {
        link: linkId,
        date_from: dateFrom,
        date_to: dateTo,
      },
    });
    return response.data;
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw error;
  }
}