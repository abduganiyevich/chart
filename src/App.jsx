import React, { useState, useEffect, useRef } from 'react';
import Chart from 'react-apexcharts';
import './App.css'; 

const App = () => {
  const [currencyChanges, setCurrencyChanges] = useState({
    Dollar: [12.5, 13, 12.8, 13.2, 13.5], 
    Euro: [10.5, 11, 11.2, 10.8, 10.5], 
    Yen: [120, 121, 118, 119, 122], 
    Pound: [9.5, 9.7, 9.8, 9.6, 9.4], 
    Ruble: [78, 80, 79, 81, 82], 
    Yuan: [6.5, 6.7, 6.8, 6.6, 6.4], 
    Tenge: [430, 440, 435, 445, 450], 
    Rupee: [70, 72, 71, 73, 75], 
  });
  const [selectedCurrency, setSelectedCurrency] = useState('Dollar');
  const [exchangeRate, setExchangeRate] = useState(1);
  const chartRef = useRef(null);

  useEffect(() => {
    const months = ['Yanvar', 'Fevral', 'Mart', 'Aprel', 'May'];
    const startDate = new Date(2024, 0, 1);

    const data = currencyChanges[selectedCurrency].map((change, index) => {
      const date = new Date(startDate.getFullYear(), startDate.getMonth() + index, 1);
      return { x: date, y: change };
    });

    const options = {
      chart: {
        type: 'line',
        height: 350,
        toolbar: {
          show: false
        }
      },
      series: [{
        name: selectedCurrency,
        data: data
      }],
      xaxis: {
        type: 'datetime',
        categories: months
      }
    };

    if (chartRef.current) {
      chartRef.current.chart.updateOptions(options);
    }
  }, [currencyChanges, selectedCurrency]);

  useEffect(() => {
    const dollarChanges = currencyChanges.Dollar;
    const selectedCurrencyChanges = currencyChanges[selectedCurrency];
    const exchangeRate = selectedCurrencyChanges[selectedCurrencyChanges.length - 1] / dollarChanges[dollarChanges.length - 1];
    setExchangeRate(exchangeRate.toFixed(2));
  }, [currencyChanges, selectedCurrency]);

  const handleCurrencyChange = (currency) => {
    setSelectedCurrency(currency);
  };

  const findEvenNumbers = (arr) => {
    return arr.filter(num => num % 2 === 0);
  };

  return (
    <div className="container">
      <div className="buttons">
        <button onClick={() => handleCurrencyChange('Dollar')}>USD</button>
        <button onClick={() => handleCurrencyChange('Euro')}>EURO</button>
        <button onClick={() => handleCurrencyChange('Yen')}>Yen</button>
        <button onClick={() => handleCurrencyChange('Pound')}>Pound</button>
        <button onClick={() => handleCurrencyChange('Ruble')}>Ruble</button>
        <button onClick={() => handleCurrencyChange('Yuan')}>Yuan</button>
        <button onClick={() => handleCurrencyChange('Tenge')}>Tenge</button>
        <button onClick={() => handleCurrencyChange('Rupee')}>Rupee</button>
       
      </div>
      <p>1 oylik o'zgarish: {exchangeRate}</p>
      <div className="chart-container">
        <Chart
          options={{
            chart: {
              type: 'line',
              height: 350,
              toolbar: {
                show: false
              }
            },
            series: [{
              name: selectedCurrency,
              data: []
            }],
            xaxis: {
              type: 'datetime',
              categories: []
            }
          }}
          series={[{ name: selectedCurrency, data: [] }]}
          type="line"
          height={350}
          ref={chartRef}
        />
      </div>
    </div>
  );
};

export default App;
