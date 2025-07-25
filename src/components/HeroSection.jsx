import React from 'react';
import { motion } from 'framer-motion';
import * as FiIcons from 'react-icons/fi';
import SafeIcon from '../common/SafeIcon';
import accountantImg from '../assets/accountant.png';

const { FiAlertTriangle, FiClock, FiShield, FiUsers } = FiIcons;

const HeroSection = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-bl from-[rgb(252,248,240)] via-[rgb(250,246,238)] to-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-20 w-64 h-64 bg-[#002999] rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-[#002999] rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center min-h-screen">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Alert Badge */}
            <motion.div
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ 
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
              }}
              className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-full text-base md:text-lg font-bold shadow-lg border-2 border-red-400"
            >
              <SafeIcon icon={FiAlertTriangle} className="w-6 h-6 animate-pulse" />
              WEZWANIE SĄDOWE OTRZYMANE?
            </motion.div>

            <h1 className="text-5xl lg:text-6xl font-bold text-[#002999] leading-tight">
              Zaległe Sprawozdania Finansowe
              <span className="block text-black mt-2">2020-2023</span>
            </h1>

            <p className="text-xl text-gray-700 leading-relaxed">
              Sąd wzywał Cię do złożenia zaległych sprawozdań finansowych?
              <strong className="text-[#002999]"> Nie czekaj dłużej!</strong> Pomożemy Ci szybko i profesjonalnie uporządkować wszystkie dokumenty.
            </p>

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <SafeIcon icon={FiClock} className="w-5 h-5 text-[#002999]" />
                <span className="text-gray-700">Szybka realizacja sprawozdań finansowych</span>
              </div>
              <div className="flex items-center gap-3">
                <SafeIcon icon={FiShield} className="w-5 h-5 text-[#002999]" />
                <span className="text-gray-700">Zgodność z wymogami sądowymi</span>
              </div>
              <div className="flex items-center gap-3">
                <SafeIcon icon={FiUsers} className="w-5 h-5 text-[#002999]" />
                <span className="text-gray-700">Możliwość współpracy z zewnętrznym doradcą podatkowym, radcą prawnym i biegłym rewidentem</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-[#002999] text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#001f7a] transition-colors"
                onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
              >
                Skontaktuj się teraz
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="border-2 border-[#002999] text-[#002999] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-[#002999] hover:text-white transition-colors"
                onClick={() => document.getElementById('benefits').scrollIntoView({ behavior: 'smooth' })}
              >
                Dowiedz się więcej
              </motion.button>
            </div>
          </motion.div>

          {/* Right Content - Image */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-2xl">
              <img
                src={accountantImg}
                alt="Profesjonalna księgowa"
                className="w-full h-[600px] object-cover filter brightness-115 contrast-120 saturate-130"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#002999]/20 to-transparent"></div>
            </div>

            {/* Floating Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
              className="absolute -bottom-6 -left-6 bg-white p-6 rounded-xl shadow-xl border-l-4 border-[#002999]"
            >
              <h3 className="font-semibold text-[#002999] mb-2">Doświadczenie</h3>
              <p className="text-gray-600 text-sm">Prowadzimy spółki od 25 lat</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;