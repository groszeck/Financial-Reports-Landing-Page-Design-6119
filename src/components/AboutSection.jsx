import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';

const { FiTarget, FiTrendingUp, FiUsers, FiShield } = FiIcons;

const AboutSection = () => {
  const stats = [
    { value: '98%', label: 'Zadowolonych klientów' },
    { value: '25+', label: 'Lat doświadczenia' },
    { value: '500+', label: 'Obsłużonych spółek' },
    { value: '100%', label: 'Bezpieczeństwo danych' }
  ];

  const reasons = [
    {
      icon: FiTarget,
      title: 'Specjalizacja',
      description: 'Posiadamy dedykowany dział ksiąg handlowych skoncentrowany na prowadzeniu ksiąg oraz sprawozdaniach finansowych'
    },
    {
      icon: FiTrendingUp,
      title: 'Doświadczenie',
      description: 'Przez 25 lat pomogliśmy ponad 500 spółkom z o.o. w przygotowaniu sprawozdań finansowych'
    },
    {
      icon: FiUsers,
      title: 'Zespół ekspertów',
      description: 'Nasz zespół składa się z doświadczonych księgowych, specjalizujących się w sprawozdawczości finansowej'
    },
    {
      icon: FiShield,
      title: 'Bezpieczeństwo',
      description: 'Gwarantujemy pełną poufność danych i bezpieczeństwo informacji finansowych'
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-white via-[rgb(252,248,240)] to-[rgb(250,246,238)]">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl font-bold text-[#002999] mb-4">Dlaczego my?</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Z nami zaległe sprawozdania finansowe przestaną być problemem. Zajmiemy się wszystkim, abyś mógł skupić się na prowadzeniu biznesu.
          </p>
        </motion.div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white p-6 rounded-xl shadow-md text-center"
            >
              <h3 className="text-3xl font-bold text-[#002999]">{stat.value}</h3>
              <p className="text-gray-600 mt-2">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Reasons */}
        <div className="grid md:grid-cols-2 gap-8">
          {reasons.map((reason, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex gap-6"
            >
              <div className="shrink-0">
                <div className="rounded-full bg-[#002999]/10 w-16 h-16 flex items-center justify-center">
                  <SafeIcon icon={reason.icon} className="w-8 h-8 text-[#002999]" />
                </div>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-2 text-[#002999]">{reason.title}</h3>
                <p className="text-gray-600">{reason.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default AboutSection;