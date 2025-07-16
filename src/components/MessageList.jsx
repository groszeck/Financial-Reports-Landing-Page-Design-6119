import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { supabase } from '../lib/supabase';
import { format } from 'date-fns';
import { pl } from 'date-fns/locale';

const { FiInbox, FiLoader, FiAlertCircle, FiMail, FiUser, FiPhone, FiCalendar, FiMessageSquare, FiTrash2, FiRefreshCw } = FiIcons;

const MessageList = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [tableExists, setTableExists] = useState(true);

  useEffect(() => {
    checkTableAndFetchMessages();
  }, []);

  const checkTableAndFetchMessages = async () => {
    try {
      setLoading(true);
      
      // First check if the table exists
      const { error: checkError } = await supabase
        .from('contact_messages_x8f29a7b4')
        .select('count(*)', { count: 'exact', head: true });
      
      if (checkError) {
        console.error('Table check error:', checkError);
        setTableExists(false);
        setError('Tabela z wiadomościami nie istnieje. Skontaktuj się z administratorem.');
        setLoading(false);
        return;
      }
      
      setTableExists(true);
      
      // If table exists, fetch messages
      const { data, error } = await supabase
        .from('contact_messages_x8f29a7b4')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) throw error;
      
      setMessages(data || []);
      setError(null);
    } catch (error) {
      console.error('Error fetching messages:', error);
      setError('Nie udało się pobrać wiadomości. Spróbuj odświeżyć stronę.');
    } finally {
      setLoading(false);
    }
  };

  const deleteMessage = async (id) => {
    if (!confirm('Czy na pewno chcesz usunąć tę wiadomość?')) return;
    
    try {
      const { error } = await supabase
        .from('contact_messages_x8f29a7b4')
        .delete()
        .eq('id', id);
      
      if (error) throw error;
      
      // Update local state
      setMessages(messages.filter(message => message.id !== id));
    } catch (error) {
      console.error('Error deleting message:', error);
      alert('Wystąpił błąd podczas usuwania wiadomości.');
    }
  };

  const createTable = async () => {
    try {
      setLoading(true);
      
      // Try to create the table
      const { error } = await supabase.rpc('create_contact_table', {
        table_name: 'contact_messages_x8f29a7b4'
      });
      
      if (error) {
        console.error('Error creating table:', error);
        setError('Nie udało się utworzyć tabeli. Skontaktuj się z administratorem systemu.');
        return;
      }
      
      // Check if table exists now
      await checkTableAndFetchMessages();
      
    } catch (error) {
      console.error('Error creating table:', error);
      setError('Wystąpił nieoczekiwany błąd. Spróbuj ponownie później.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-[#002999] flex items-center gap-2">
          <SafeIcon icon={FiInbox} />
          Wiadomości kontaktowe
        </h2>
        <div className="flex gap-2">
          {!tableExists && (
            <button 
              onClick={createTable} 
              className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
              disabled={loading}
            >
              Utwórz tabelę
              <SafeIcon icon={loading ? FiLoader : FiRefreshCw} className={loading ? "animate-spin" : ""} />
            </button>
          )}
          <button 
            onClick={checkTableAndFetchMessages} 
            className="bg-[#002999] text-white px-4 py-2 rounded-lg hover:bg-[#001f7a] transition-colors flex items-center gap-2"
            disabled={loading}
          >
            Odśwież
            <SafeIcon icon={loading ? FiLoader : FiMail} className={loading ? "animate-spin" : ""} />
          </button>
        </div>
      </div>
      
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-3 mb-6">
          <SafeIcon icon={FiAlertCircle} className="w-6 h-6" />
          <p>{error}</p>
        </div>
      )}
      
      {loading ? (
        <div className="flex flex-col items-center justify-center py-16">
          <SafeIcon icon={FiLoader} className="w-12 h-12 text-[#002999] animate-spin mb-4" />
          <p className="text-gray-600">Ładowanie wiadomości...</p>
        </div>
      ) : !tableExists ? (
        <div className="flex flex-col items-center justify-center py-16 text-gray-500">
          <SafeIcon icon={FiAlertCircle} className="w-16 h-16 mb-4 text-yellow-500" />
          <p className="text-xl">Tabela z wiadomościami nie istnieje</p>
          <p className="text-sm mt-2 mb-4">Kliknij przycisk "Utwórz tabelę", aby utworzyć tabelę wiadomości.</p>
        </div>
      ) : messages.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-gray-500">
          <SafeIcon icon={FiInbox} className="w-16 h-16 mb-4 opacity-30" />
          <p className="text-xl">Brak wiadomości</p>
          <p className="text-sm mt-2">Gdy klienci wyślą wiadomości, pojawią się tutaj.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {messages.map((message) => (
            <motion.div
              key={message.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                  <div className="bg-[#002999]/10 rounded-full p-2">
                    <SafeIcon icon={FiUser} className="text-[#002999] w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg">{message.name}</h3>
                    <p className="text-[#002999]">{message.email}</p>
                  </div>
                </div>
                <div className="text-sm text-gray-500 flex items-center gap-1">
                  <SafeIcon icon={FiCalendar} className="w-4 h-4" />
                  {message.created_at && format(new Date(message.created_at), 'dd MMM yyyy, HH:mm', { locale: pl })}
                </div>
              </div>
              
              {message.phone && (
                <div className="flex items-center gap-2 text-gray-600 mb-3">
                  <SafeIcon icon={FiPhone} className="w-4 h-4" />
                  <span>{message.phone}</span>
                </div>
              )}
              
              <div className="bg-gray-50 p-4 rounded-lg mb-4">
                <div className="flex items-start gap-2">
                  <SafeIcon icon={FiMessageSquare} className="w-5 h-5 text-gray-500 mt-1" />
                  <p className="text-gray-700 whitespace-pre-wrap">{message.message}</p>
                </div>
              </div>
              
              <div className="flex justify-end">
                <button
                  onClick={() => deleteMessage(message.id)}
                  className="text-red-600 hover:bg-red-50 px-3 py-1 rounded flex items-center gap-1 text-sm"
                >
                  <SafeIcon icon={FiTrash2} className="w-4 h-4" />
                  Usuń
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MessageList;