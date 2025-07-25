import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiPhone, FiMail, FiMapPin, FiSend, FiCheckCircle, FiAlertCircle, FiLoader } = FiIcons;

const ContactSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    phonePrefix: '+48',
    nip: '',
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
    const { value, name } = e.target;
    if (name === 'phonePrefix') {
      setFormData(prev => ({ ...prev, phonePrefix: value }));
      return;
    }
    // Automatyczne czyszczenie NIP z myślników i spacji
    if (name === 'nip') {
      const cleaned = value.replace(/[-\s]/g, '');
      setFormData(prev => ({ ...prev, nip: cleaned }));
      if (validationErrors.nip) {
        setValidationErrors(prev => ({ ...prev, nip: '' }));
      }
      return;
    }
    setFormData(prev => ({ ...prev, [name]: value }));

    // Clear validation error when user types
    if (validationErrors[name]) {
      setValidationErrors(prev => ({ ...prev, [name]: '' }));
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
    if (!formData.nip.trim()) {
      errors.nip = 'NIP firmy jest wymagany';
    } else {
      const nipClean = formData.nip.replace(/[-\s]/g, '');
      if (!/^\d{10}$/.test(nipClean)) {
        errors.nip = 'NIP powinien składać się z 10 cyfr';
      }
    }
    if (!formData.phone.trim()) {
      errors.phone = 'Telefon jest wymagany';
    } else {
      const phoneDigits = formData.phone.replace(/\D/g, '');
      if (phoneDigits.length !== 9) {
        errors.phone = 'Telefon powinien składać się z 9 cyfr';
      }
    }
    // Usuwam wymagalność pola message
    // if (!formData.message.trim()) {
    //   errors.message = 'Wiadomość jest wymagana';
    // }
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
      // Przygotuj dane dla Netlify Forms
      const formDataToSend = new FormData();
      formDataToSend.append('form-name', 'contact');
      formDataToSend.append('name', formData.name);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('phone', `${formData.phonePrefix} ${formData.phone}`.trim());
      formDataToSend.append('nip', formData.nip.replace(/[-\s]/g, ''));
      formDataToSend.append('message', formData.message);

      // Wyślij do Netlify Forms
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(formDataToSend).toString()
      });

      if (!response.ok) {
        throw new Error('Błąd wysyłania formularza');
      }

      setFormStatus({
        isSubmitting: false,
        isSubmitted: true,
        isError: false,
        message: 'Dziękujemy! Twoja wiadomość została wysłana. Skontaktujemy się wkrótce.'
      });

      setFormData({
        name: '',
        email: '',
        phone: '',
        phonePrefix: '+48',
        nip: '',
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
    <section id="contact" className="py-20 bg-gradient-to-br from-white via-[rgb(252,248,240)] to-[rgb(250,246,238)]">
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

            <form name="contact" netlify onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">
                  Imię i nazwisko *
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border ${validationErrors.name ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring focus:ring-[#002999]/20 focus:border-[#002999] transition-colors mt-1`}
                    placeholder="Jan Kowalski"
                  />
                </label>
                {validationErrors.name && (
                  <p className="text-red-500 text-sm mt-1">{validationErrors.name}</p>
                )}
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">
                  Email *
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`w-full px-4 py-3 border ${validationErrors.email ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring focus:ring-[#002999]/20 focus:border-[#002999] transition-colors mt-1`}
                    placeholder="jan@example.com"
                  />
                </label>
                {validationErrors.email && (
                  <p className="text-red-500 text-sm mt-1">{validationErrors.email}</p>
                )}
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">
                  Telefon *
                  <div className="flex gap-2 mt-1">
                    <input
                      type="text"
                      name="phonePrefix"
                      value={formData.phonePrefix}
                      onChange={handleChange}
                      className="w-24 px-3 py-3 border border-gray-300 rounded-lg focus:ring focus:ring-[#002999]/20 focus:border-[#002999] transition-colors bg-white"
                      placeholder="+48"
                      maxLength={5}
                    />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      onKeyPress={e => {
                        if (!/[0-9]/.test(e.key)) {
                          e.preventDefault();
                        }
                      }}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring focus:ring-[#002999]/20 focus:border-[#002999] transition-colors"
                      placeholder="123 456 789"
                      maxLength={15}
                    />
                  </div>
                </label>
                {validationErrors.phone && (
                  <p className="text-red-500 text-sm mt-1">{validationErrors.phone}</p>
                )}
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">
                  NIP firmy *
                  <input
                    type="text"
                    name="nip"
                    value={formData.nip}
                    onChange={handleChange}
                    onKeyPress={e => {
                      if (!/[0-9]/.test(e.key)) {
                        e.preventDefault();
                      }
                    }}
                    className={`w-full px-4 py-3 border ${validationErrors.nip ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring focus:ring-[#002999]/20 focus:border-[#002999] transition-colors mt-1`}
                    placeholder="1234567890"
                    maxLength={10}
                  />
                </label>
                {validationErrors.nip && (
                  <p className="text-red-500 text-sm mt-1">{validationErrors.nip}</p>
                )}
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 mb-2">
                  Wiadomość
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="5"
                    className={`w-full px-4 py-3 border ${validationErrors.message ? 'border-red-500' : 'border-gray-300'} rounded-lg focus:ring focus:ring-[#002999]/20 focus:border-[#002999] transition-colors mt-1`}
                    placeholder="Jak możemy pomóc?"
                  ></textarea>
                </label>
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