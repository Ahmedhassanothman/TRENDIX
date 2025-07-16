import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaEdit, FaHistory, FaMapMarkerAlt, FaCog, FaShoppingBag } from 'react-icons/fa';
import { useTheme } from '../../context/ThemeContext';

const Profile = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const { isDarkMode } = useTheme();
  const [activeTab, setActiveTab] = useState('personal');

  // Mock data for orders - replace with actual API call
  const orders = [
    {
      id: '1',
      date: '2024-03-15',
      total: 299.99,
      status: 'Delivered',
      items: ['Shirt', 'Pants']
    },
    {
      id: '2',
      date: '2024-03-10',
      total: 149.99,
      status: 'In Progress',
      items: ['Sneakers']
    }
  ];

  if (!user) {
    navigate('/signin');
    return null;
  }

  const renderContent = () => {
    switch (activeTab) {
      case 'personal':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <p className={`mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Full Name</p>
                <p className="font-medium">{user.name}</p>
              </div>
              <div>
                <p className={`mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Email</p>
                <p className="font-medium">{user.email}</p>
              </div>
              <div>
                <p className={`mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Phone Number</p>
                <p className="font-medium">{user.phone || 'Not Provided'}</p>
              </div>
              <div>
                <p className={`mb-2 ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Joined</p>
                <p className="font-medium">{new Date(user.createdAt).toLocaleDateString('en-GB')}</p>
              </div>
            </div>
            <button className="flex items-center gap-2 text-blue-500 hover:text-blue-600">
              <FaEdit />
              <span>Edit Personal Info</span>
            </button>
          </div>
        );
      case 'orders':
        return (
          <div className="space-y-6">
            {orders.map(order => (
              <div key={order.id} className={`p-4 rounded-lg ${isDarkMode ? 'bg-dark-bg-tertiary' : 'bg-gray-50'}`}> 
                <div className="flex justify-between items-center mb-4">
                  <h4 className="font-semibold">Order #{order.id}</h4>
                  <span className={`px-3 py-1 rounded-full text-sm ${
                    order.status === 'Delivered' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {order.status === 'Delivered' ? 'Delivered' : 'In Progress'}
                  </span>
                </div>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Date: {new Date(order.date).toLocaleDateString('en-GB')}</p>
                <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>Products: {order.items.join(', ')}</p>
                <p className="font-semibold mt-2">Total: ${order.total}</p>
              </div>
            ))}
          </div>
        );
      case 'addresses':
        return (
          <div className="space-y-6">
            <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-dark-bg-tertiary' : 'bg-gray-50'}`}> 
              <h4 className="font-semibold mb-2">Main Address</h4>
              <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>{user.address || 'No address provided'}</p>
              <button className="mt-4 flex items-center gap-2 text-blue-500 hover:text-blue-600">
                <FaEdit />
                <span>Edit Address</span>
              </button>
            </div>
          </div>
        );
      case 'settings':
        return (
          <div className="space-y-6">
            <div className={`p-4 rounded-lg ${isDarkMode ? 'bg-dark-bg-tertiary' : 'bg-gray-50'}`}> 
              <h4 className="font-semibold mb-4">Account Settings</h4>
              <button className="w-full text-left text-blue-500 hover:text-blue-600">Change Password</button>
              <button className="w-full text-left text-red-500 hover:text-red-600 mt-2">Delete Account</button>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-dark-bg-primary text-dark-text-primary' : 'bg-gray-50'}`}>
      <div className="max-w-3xl mx-auto p-6">
        <div className={`rounded-2xl shadow-xl p-8 ${isDarkMode ? 'bg-dark-bg-secondary' : 'bg-white'}`}> 
          <div className="flex flex-col md:flex-row items-center gap-6 mb-8">
            {user.profileImage ? (
              <img src={user.profileImage} alt="Profile" className="w-28 h-28 rounded-full object-cover border-4 border-blue-500 shadow-lg" />
            ) : (
              <div className="w-28 h-28 bg-blue-500 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-lg">
                {user.name ? user.name[0].toUpperCase() : 'U'}
              </div>
            )}
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-1">{user.name}</h2>
              <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'} mb-2`}>{user.email}</p>
              <div className="flex flex-wrap gap-2 mt-2">
                <span className="inline-block bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full">Member since {new Date(user.createdAt).toLocaleDateString('en-GB')}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-4 border-b border-gray-200 mb-8">
            <button
              onClick={() => setActiveTab('personal')}
              className={`pb-3 px-4 rounded-t-lg text-base font-medium transition-colors ${activeTab === 'personal' ? 'border-b-2 border-blue-500 text-blue-600' : 'hover:text-blue-500'}`}
            >
              Personal Info
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`pb-3 px-4 rounded-t-lg text-base font-medium transition-colors ${activeTab === 'orders' ? 'border-b-2 border-blue-500 text-blue-600' : 'hover:text-blue-500'}`}
            >
              <FaShoppingBag className="inline-block mr-2" /> Orders
            </button>
            <button
              onClick={() => setActiveTab('addresses')}
              className={`pb-3 px-4 rounded-t-lg text-base font-medium transition-colors ${activeTab === 'addresses' ? 'border-b-2 border-blue-500 text-blue-600' : 'hover:text-blue-500'}`}
            >
              <FaMapMarkerAlt className="inline-block mr-2" /> Addresses
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`pb-3 px-4 rounded-t-lg text-base font-medium transition-colors ${activeTab === 'settings' ? 'border-b-2 border-blue-500 text-blue-600' : 'hover:text-blue-500'}`}
            >
              <FaCog className="inline-block mr-2" /> Settings
            </button>
          </div>

          {renderContent()}

          <div className="mt-10 flex justify-end">
            <button
              onClick={() => {
                localStorage.removeItem('user');
                navigate('/signin');
              }}
              className="bg-red-500 text-white px-6 py-2 rounded-lg hover:bg-red-600 transition-colors shadow"
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 