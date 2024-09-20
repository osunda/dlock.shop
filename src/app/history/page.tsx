    'use client';
    
    import React, { useState } from 'react';
    import { motion } from 'framer-motion';
    
    // Mock transaction data (replace with actual data fetching in a real application)
    const mockTransactions = Array(50).fill(null).map((_, index) => ({
      id: index + 1,
      amount: (Math.random() * 1000).toFixed(2),
      type: Math.random() > 0.5 ? 'Buy' : 'Sell',
      date: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
      item: `Item ${index + 1}`,
    }));
    
    const History = () => {
      const [currentPage, setCurrentPage] = useState(1);
      const transactionsPerPage = 10;
    
      const indexOfLastTransaction = currentPage * transactionsPerPage;
      const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
      const currentTransactions = mockTransactions.slice(indexOfFirstTransaction, indexOfLastTransaction);
    
      const paginate = (pageNumber: number) => setCurrentPage(pageNumber);
    
      return (
        <div className="bg-[#0F1117] min-h-screen text-white p-12">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="pt-8" // Increased top padding for more space
          >
            <h1 className="text-3xl font-bold mb-12">Transaction History</h1> {/* Increased margin-bottom */}
            <div className="overflow-x-auto p-4"> {/* Added padding */}
              <table className="w-full border-collapse">
                <thead>
                  <tr className="text-gray-400 border-b border-gray-700">
                    <th className="py-3 px-4 text-left">Type</th>
                    <th className="py-3 px-4 text-left">Item</th>
                    <th className="py-3 px-4 text-right">Amount</th>
                    <th className="py-3 px-4 text-right">Date/Time</th>
                  </tr>
                </thead>
                <tbody>
                  {currentTransactions.map((transaction) => (
                    <tr key={transaction.id} className="border-b border-gray-700 hover:bg-[#232732] transition-colors">
                      <td className={`py-3 px-4 ${transaction.type === 'Buy' ? 'text-green-500' : 'text-red-500'}`}>
                        {transaction.type}
                      </td>
                      <td className="py-3 px-4 text-gray-300">{transaction.item}</td>
                      <td className="py-3 px-4 text-white text-right">${transaction.amount}</td>
                      <td className="py-3 px-4 text-gray-400 text-right">
                        {new Date(transaction.date).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="flex justify-center mt-8">
              {Array.from({ length: Math.ceil(mockTransactions.length / transactionsPerPage) }, (_, i) => (
                <button
                  key={i}
                  onClick={() => paginate(i + 1)}
                  className={`mx-1 px-4 py-2 rounded ${
                    currentPage === i + 1 ? 'bg-[--main-gold] text-white' : 'bg-[#232732] text-gray-400 hover:bg-[#2b2f3c]'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      );
    };
    
    export default History;