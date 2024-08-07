// pages/api/transactions.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import { getTransactions } from '../../utils/belvo';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { linkId, dateFrom, dateTo } = req.query;

  try {
    const transactions = await getTransactions(linkId as string, dateFrom as string, dateTo as string);
    res.status(200).json(transactions);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching transactions' });
  }
}