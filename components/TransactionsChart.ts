// components/TransactionsChart.tsx
import { useEffect, useRef, useState } from 'react';
import Highcharts from 'highcharts';
import { fetchTransactions } from '../lib/fetchTransactions'; // Ajusta la ruta según corresponda

const TransactionsChart: React.FC = () => {
  const chartRef = useRef<HTMLDivElement>(null);
  const [data, setData] = useState<any[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  
  useEffect(() => {
    const loadData = async () => {
      try {
        const transactions = await fetchTransactions();
        const formattedData = transactions.map((transaction: any) => ({
          x: new Date(transaction.date).getTime(),
          y: transaction.amount,
          category: transaction.category // Asegúrate de que 'category' esté en los datos
        }));
        setData(formattedData);
        setCategories([...new Set(transactions.map((t: any) => t.category))]);
      } catch (error) {
        console.error('Error loading data:', error);
      }
    };

    loadData();
  }, []);

  useEffect(() => {
    if (chartRef.current) {
      Highcharts.chart(chartRef.current, {
        chart: {
          type: 'scatter'
        },
        title: {
          text: 'Transactions Overview'
        },
        xAxis: {
          type: 'datetime',
          title: {
            text: 'Date'
          }
        },
        yAxis: {
          title: {
            text: 'Amount'
          }
        },
        series: categories.map(category => ({
          name: category,
          data: data
            .filter(d => d.category === category)
            .map(d => ({
              x: d.x,
              y: d.y,
              marker: {
                symbol: 'circle'
              }
            }))
        }))
      });
    }
  }, [data, categories]);

  return (
    <div ref={chartRef} style={{ width: '100%', height: '400px' }}></div>
  );
};

export default TransactionsChart;