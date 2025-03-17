import React from 'react';
import { Button, Card, CardContent } from '@/components/ui';
import { FaMobileAlt, FaMoneyBillWave, FaHistory } from 'react-icons/fa';

const MobileMoney = () => {
  const services = ['M-Pesa', 'Airtel Money', 'HaloPesa', 'Tigo Pesa'];
  
  return (
    <div className="bg-[#2E3A59] min-h-screen text-white p-6">
      {/* Page Title */}
      <h1 className="text-2xl font-bold text-center mb-6">Mobile Money Integration</h1>
      
      {/* Mobile Money Services */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {services.map((service) => (
          <Card key={service} className="text-center p-4">
            <CardContent>
              <FaMobileAlt className="text-4xl mx-auto mb-2" />
              <h2 className="text-lg font-semibold">{service}</h2>
              <Button className="bg-[#FF5733] mt-2 w-full">Deposit</Button>
              <Button className="bg-[#2ECC71] mt-2 w-full">Withdraw</Button>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {/* Transaction History */}
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <FaHistory className="mr-2" /> Transaction History
        </h2>
        <div className="bg-gray-800 p-4 rounded-lg shadow-md">
          <p className="text-center text-gray-400">No recent transactions</p>
        </div>
      </div>
    </div>
  );
};

export default MobileMoney;
