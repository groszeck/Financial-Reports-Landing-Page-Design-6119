import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiCheckCircle, FiClock, FiShield, FiFileText, FiUsers, FiAward } = FiIcons;

const BenefitsSection = () => {
  const benefits = [
    {
      icon: FiCheckCircle,
      title: 'Kompleksowe sprawozdania',
      description: 'Przygotowujemy pełne sprawozdania finansowe zgodne z wymogami KRS i sądu'
    },
    {
      icon: FiClock,
      title: 'Szybka realizacja',
      description: 'Sprawna realizacja sprawozdań finansowych'
    },
    {
      icon: FiShield,
      title: 'Gwarancja zgodności',
      description: 'Wszystkie dokumenty przygotowywane zgodnie z aktualnymi przepisami prawa'
    },
    {
      icon: FiFileText,
      title: 'Kompletna dokumentacja',
      description: 'Bilans, rachunek zysków i strat, informacja dodatkowa oraz sprawozdanie z działalności'
    },
    {
      icon: FiUsers,
      title: 'Doświadczony zespół',
      description: 'Księgowi z wieloletnim doświadczeniem w przygotowywaniu sprawozdań'
    },
    {
      icon: FiAward,
      title: 'Najwyższa jakość',
      description: 'Gwarantujemy najwyższą jakość usług księgowych'
    }
  ];

  return (
    <section id="benefits" className="py-20 bg-white">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-[#002999] mb-4">Dlaczego warto nam zaufać?</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Specjalizujemy się w przygotowywaniu zaległych sprawozdań finansowych dla spółek z ograniczoną odpowiedzialnością.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border-t-4 border-[#002999]"
            >
              <div className="rounded-full bg-[#002999]/10 w-16 h-16 flex items-center justify-center mb-6">
                <SafeIcon icon={benefit.icon} className="w-8 h-8 text-[#002999]" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-[#002999]">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mt-16 bg-gradient-to-r from-[#002999] to-[#001f7a] rounded-2xl p-8 text-white text-center"
        >
          <h3 className="text-2xl font-bold mb-4">Nie ryzykuj!</h3>
          <p className="text-lg mb-6 opacity-90">
            Brak złożenia sprawozdań finansowych może skutkować dotkliwymi konsekwencjami i karami finansowymi
          </p>
          <button
            onClick={() => document.getElementById('contact').scrollIntoView({behavior: 'smooth'})}
            className="bg-white text-[#002999] px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Zamów sprawozdania teraz
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default BenefitsSection;