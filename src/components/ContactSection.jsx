import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import { supabase } from '../lib/supabase';

const { FiPhone, FiMail, FiMapPin, FiSend, FiCheckCircle, FiAlertCircle, FiLoader } = FiIcons;

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  });

  const [formStatus, setFormStatus] = useState({
    isSubmitting: false,
    isSubmitted: false,
    isError: false,
    message: ''
  });

  const [validationErrors, setValidationErrors] = useState({});

  const contactInfo = [
    {
      icon: FiPhone,
      title: 'Telefon',
      value: '605 786 099',
      description: 'Pon-Pt: 8:00-15:00'
    },
    {
      icon: FiMail,
      title: 'Email',
      value: 'kontakt@kpj.waw.pl',
      description: 'Odpowiadamy w 24h'
    },
    {
      icon: FiMapPin,
      title: 'Adres',
      value: 'ul. Rostworowskiego 16B lok. 2',
      description: '01-496 Warszawa'
    }
  ];

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));

    // Clear validation error when user types
    if (validationErrors[id]) {
      setValidationErrors(prev => ({ ...prev, [id]: '' }));
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.name.trim()) {
      errors.name = 'Imię i nazwisko jest wymagane';
    }
    if (!formData.email.trim()) {
      errors.email = 'Email jest wymagany';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Podaj prawidłowy adres email';
    }
    if (!formData.message.trim()) {
      errors.message = 'Wiadomość jest wymagana';
    }
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setFormStatus({
      isSubmitting: true,
      isSubmitted: false,
      isError: false,
      message: ''
    });

    try {
      const { data, error } = await supabase
        .from('contact_messages_x8f29a7b4')
        .insert([
          {
            name: formData.name,
            email: formData.email,
            phone: formData.phone || null,
            message: formData.message
          }
        ]);

      if (error) throw error;

      setFormStatus({
        isSubmitting: false,
        isSubmitted: true,
        isError: false,
        message: 'Dziękujemy! Twoja wiadomość została zapisana. Skontaktujemy się wkrótce.'
      });

      setFormData({
        name: '',
        email: '',
        phone: '',
        message: ''
      });
    } catch (error) {
      console.error('Error submitting form:', error);
      setFormStatus({
        isSubmitting: false,
        isSubmitted: false,
        isError: true,
        message: 'Wystąpił błąd podczas wysyłania wiadomości. Prosimy spróbować później.'
      });
    }
  };

  return (
    <section id="contact" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-[#002999] mb-4">Skontaktuj się z nami</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Potrzebujesz pomocy z zaległymi sprawozdaniami finansowymi? Skontaktuj się z nami już dziś.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {contactInfo.map((info, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-xl shadow-md text-center"
            >
              <div className="rounded-full bg-[#002999]/10 w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <SafeIcon icon={info.icon} className="w-8 h-8 text-[#002999]" />
              </div>
              <h3 className="font-semibold text-lg text-[#002999] mb-1">{info.title}</h3>
              <p className="text-gray-800 font-medium mb-1">{info.value}</p>
              <p className="text-gray-600 text-sm">{info.description}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-white p-8 rounded-xl shadow-lg"
          >
            <h3 className="text-2xl font-bold text-[#002999] mb-6">Wyślij wiadomość</h3>
            
            {formStatus.isSubmitted && !formStatus.isError && (
              <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg flex items-center gap-3 mb-6">
                <SafeIcon icon={FiCheckCircle} className="w-6 h-6" />
                <p>{formStatus.message}</p>
              </div>
            )}
            
            {formStatus.isError && (
              <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg flex items-center gap-3 mb-6">
                <SafeIcon icon={FiAlertCircle} className="w-6 h-6" />
                <p>{formStatus.message}</p>
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label htmlFor="name" className="block text-gray-700 mb-2">Imię i nazwisko *</label>
                <input
                  type="text"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border ${validationErrors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring focus:ring-[#002999]/20 focus:border-[#002999] transition-colors`}
                  placeholder="Jan Kowalski"
                />
                {validationErrors.name && (
                  <p className="text-red-500 text-sm mt-1">{validationErrors.name}</p>
                )}
              </div>
              
              <div className="mb-4">
                <label htmlFor="email" className="block text-gray-700 mb-2">Email *</label>
                <input
                  type="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`w-full px-4 py-3 border ${validationErrors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring focus:ring-[#002999]/20 focus:border-[#002999] transition-colors`}
                  placeholder="jan@example.com"
                />
                {validationErrors.email && (
                  <p className="text-red-500 text-sm mt-1">{validationErrors.email}</p>
                )}
              </div>
              
              <div className="mb-4">
                <label htmlFor="phone" className="block text-gray-700 mb-2">Telefon (opcjonalnie)</label>
                <input
                  type="tel"
                  id="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring focus:ring-[#002999]/20 focus:border-[#002999] transition-colors"
                  placeholder="123 456 789"
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="message" className="block text-gray-700 mb-2">Wiadomość *</label>
                <textarea
                  id="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="5"
                  className={`w-full px-4 py-3 border ${validationErrors.message ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring focus:ring-[#002999]/20 focus:border-[#002999] transition-colors`}
                  placeholder="Jak możemy pomóc?"
                ></textarea>
                {validationErrors.message && (
                  <p className="text-red-500 text-sm mt-1">{validationErrors.message}</p>
                )}
              </div>
              
              <button
                type="submit"
                disabled={formStatus.isSubmitting}
                className="bg-[#002999] text-white px-6 py-3 rounded-lg font-semibold flex items-center justify-center gap-2 w-full hover:bg-[#001f7a] transition-colors disabled:bg-gray-400"
              >
                {formStatus.isSubmitting ? (
                  <>
                    <SafeIcon icon={FiLoader} className="w-5 h-5 animate-spin" />
                    Wysyłanie...
                  </>
                ) : (
                  <>
                    <SafeIcon icon={FiSend} className="w-5 h-5" />
                    Wyślij wiadomość
                  </>
                )}
              </button>
            </form>
          </motion.div>
          
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="bg-white p-8 rounded-xl shadow-lg mb-8">
              <h3 className="text-2xl font-bold text-[#002999] mb-6">Gdzie nas znaleźć</h3>
              <div className="rounded-lg overflow-hidden h-[300px]">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2444.5524441078625!2d20.927316315947044!3d52.21723007975859!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x471ecb2d1f536857%3A0x3bed67f3b9f57d82!2sRostworowskiego%2016B%2C%2001-496%20Warszawa!5e0!3m2!1spl!2spl!4v1624278295446!5m2!1spl!2spl" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }} 
                  allowFullScreen="" 
                  loading="lazy"
                  title="Mapa dojazdu"
                ></iframe>
              </div>
            </div>
            
            <div className="bg-[#002999] p-8 rounded-xl shadow-lg text-white">
              <h3 className="text-xl font-bold mb-4">Godziny pracy</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Poniedziałek - Piątek:</span>
                  <span>8:00 - 15:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Sobota:</span>
                  <span>Zamknięte</span>
                </div>
                <div className="flex justify-between">
                  <span>Niedziela:</span>
                  <span>Zamknięte</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;