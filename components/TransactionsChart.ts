TypeScript
import { useEffect, useRef, useState } from 'react';
import Highcharts from 'highcharts';
import { fetchTransactions } from '../utils/fetchTransactions';

interface Transaction {
    date: Date;
    amount: number;
    category: string;
}

const TransactionsChart: React.FC = () => {
    const chartRef = useRef<HTMLDivElement>(null);
    const [data, setData] = useState<Transaction[]>([]);
    const [categories, setCategories] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const transactions = await fetchTransactions();
                if (!transactions || transactions.length === 0) {
                    setError('No se encontraron transacciones');
                    return;
                }

                const formattedData = transactions.map((transaction: Transaction) => ({
                    x: transaction.date.getTime(),
                    y: transaction.amount,
                    category: transaction.category || 'Sin categoría'
                }));

                setData(formattedData);
                setCategories([...new Set(formattedData.map(d => d.category))]);
            } catch (error) {
                setError('Error al cargar los datos: ' + error.message);
            }
        };

        fetchData();
    }, []);

    useEffect(() => {
        if (chartRef.current && data.length > 0 && categories.length > 0) {
            Highcharts.chart(chartRef.current, {
                // ... configuración del gráfico
            });
        }
    }, [data, categories]);

    return (
        <div>
            {error && <p>{error}</p>}
            <div ref={chartRef} style={{ width: '100%', height: '400px' }} />
        </div>
    );
};

export default TransactionsChart;