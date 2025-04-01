import React, { useState, useEffect } from 'react';
import { Button, Card, CardContent } from '@/components/ui';
import { FaMobileAlt, FaMoneyBillWave, FaHistory } from 'react-icons/fa';
import axios from 'axios';

const MobileMoney = () => {
  const services = ['M-Pesa', 'Airtel Money', 'HaloPesa', 'Tigo Pesa'];
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    // Fetch transaction history
    axios.get('http://localhost:5000/api/transactions/get')
      .then(response => setTransactions(response.data))
      .catch(error => console.error('Error fetching transactions:', error));
  }, []);

  const handleTransaction = async (type, service) => {
    const amount = prompt(`Enter amount to ${type.toLowerCase()}:`);
    const phone = prompt(`Enter phone number:`);

    if (!amount || !phone) return alert("Transaction cancelled!");

    try {
      const response = await axios.post(`http://localhost:5000/api/${type.toLowerCase()}`, {
        service,
        amount,
        phone,
      });

      alert(response.data.message);
    } catch (error) {
      alert("Transaction failed!");
    }
  };

  return (
    <div className="bg-[#2E3A59] min-h-screen text-white p-6">
      <h1 className="text-2xl font-bold text-center mb-6">Mobile Money Integration</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {services.map((service) => (
          <Card key={service} className="text-center p-4">
            <CardContent>
              <FaMobileAlt className="text-4xl mx-auto mb-2" />
              <h2 className="text-lg font-semibold">{service}</h2>
              <Button className="bg-[#FF5733] mt-2 w-full" onClick={() => handleTransaction("deposit", service)}>Deposit</Button>
              <Button className="bg-[#2ECC71] mt-2 w-full" onClick={() => handleTransaction("withdraw", service)}>Withdraw</Button>
            </CardContent>
          </Card>
        ))}
      </div>
      
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <FaHistory className="mr-2" /> Transaction History
        </h2>
        <div className="bg-gray-800 p-4 rounded-lg shadow-md">
          {transactions.length === 0 ? (
            <p className="text-center text-gray-400">No recent transactions</p>
          ) : (
            <ul>
              {transactions.map((txn) => (
                <li key={txn.id} className="border-b border-gray-700 py-2">
                  {txn.type} of {txn.amount} via {txn.service} on {txn.date}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default MobileMoney;

