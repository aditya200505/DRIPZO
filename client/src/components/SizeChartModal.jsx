import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Ruler } from 'lucide-react';

const SizeChartModal = ({ isOpen, onClose, category = 'Dress' }) => {
  const charts = {
    Dress: {
      headers: ['Size', 'Bust (in)', 'Waist (in)', 'Hips (in)'],
      rows: [
        ['XS', '32', '24', '34'],
        ['S', '34', '26', '36'],
        ['M', '36', '28', '38'],
        ['L', '38', '30', '40'],
        ['XL', '40', '32', '42'],
        ['XXL', '42', '34', '44'],
      ]
    },
    Shoes: {
      headers: ['UK/India', 'EU', 'US', 'Foot Length (cm)'],
      rows: [
        ['6', '40', '7', '25.4'],
        ['7', '41', '8', '26.2'],
        ['8', '42', '9', '27.1'],
        ['9', '43', '10', '27.9'],
        ['10', '44', '11', '28.8'],
        ['11', '45', '12', '29.6'],
      ]
    },
    'Flip Flops': {
      headers: ['UK/India', 'EU', 'US Men', 'US Women', 'Sole Length (cm)'],
      rows: [
        ['6', '39', '7', '8', '25.2'],
        ['7', '40.5', '8', '9', '26.0'],
        ['8', '42', '9', '10', '26.8'],
        ['9', '43.5', '10', '11', '27.7'],
        ['10', '45', '11', '12', '28.5'],
        ['11', '46.5', '12', '13', '29.3'],
      ]
    },
    'Kids Shoes': {
      headers: ['UK/India', 'US Kids', 'Foot Length (in)', 'Age Group'],
      rows: [
        ['10C', '11C', '6.8', '4-5 Yrs'],
        ['11C', '12C', '7.1', '5-6 Yrs'],
        ['12C', '13C', '7.5', '6-7 Yrs'],
        ['13C', '1Y', '7.8', '7-8 Yrs'],
        ['1', '2Y', '8.1', '8-9 Yrs'],
        ['2', '3Y', '8.5', '9-10 Yrs'],
        ['3', '4Y', '8.8', '10-11 Yrs'],
      ]
    }
  };

  const activeChart = charts[category] || charts.Dress;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            className="relative w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-8 py-6 border-b border-borderLight">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary">
                  <Ruler size={24} />
                </div>
                <div>
                  <h2 className="text-xl font-bold text-secondary font-body">Size Guide</h2>
                  <p className="text-sm text-textMuted font-body">{category} Measurements</p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full border border-borderLight flex items-center justify-center text-textMuted hover:bg-bgLight hover:text-secondary transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Content */}
            <div className="p-8">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-bgLight">
                      {activeChart.headers.map((header, i) => (
                        <th key={i} className="px-6 py-4 text-xs font-bold text-secondary uppercase tracking-wider border-b border-borderLight">
                          {header}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-borderLight">
                    {activeChart.rows.map((row, i) => (
                      <tr key={i} className="hover:bg-bgLight/50 transition-colors">
                        {row.map((cell, j) => (
                          <td key={j} className={`px-6 py-4 text-sm ${j === 0 ? 'font-bold text-secondary' : 'text-textLight'} font-body`}>
                            {cell}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <div className="mt-8 p-4 bg-primary/5 rounded-2xl border border-primary/10">
                <h4 className="text-sm font-bold text-primary mb-2 flex items-center gap-2">
                  <Ruler size={14} /> How to measure?
                </h4>
                <p className="text-xs text-textLight leading-relaxed font-body">
                  Measurements shown are in inches (unless specified). For the best fit, we recommend measuring your body at the widest points. If you are between sizes, we suggest going for the larger size for a more comfortable fit.
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="px-8 py-6 bg-bgLight border-t border-borderLight flex justify-end">
              <button
                onClick={onClose}
                className="px-8 py-3 bg-secondary text-white font-bold rounded-full hover:bg-primary transition-colors shadow-lg"
              >
                GOT IT
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default SizeChartModal;
