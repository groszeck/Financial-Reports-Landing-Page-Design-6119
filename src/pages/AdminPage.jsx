import React from 'react';
import MessageList from '../components/MessageList';

const AdminPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-[#002999] mb-8 text-center">Panel administracyjny</h1>
        <MessageList />
      </div>
    </div>
  );
};

export default AdminPage;