// src/pages/ServiceCatalog.jsx
import React, { useState } from 'react';
import '../../styles/SharedStyles.css';
import services from '../../data/serviceCatalog.json';

const frequencies = ['Daily', 'Weekly', 'Monthly'];

export default function ServiceCatalog() {
  const [selected, setSelected] = useState({});

  const handleSelect = (category, service, freq) => {
    setSelected(prev => ({
      ...prev,
      [service]: freq
    }));
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Service Catalog</h1>
      {services.map(({ category, services }) => (
        <div key={category} className="mb-8">
          <h2 className="text-xl font-semibold mb-4">{category}</h2>
          <ul className="space-y-4">
            {services.map(service => (
              <li key={service} className="flex flex-col">
                <label className="font-medium mb-2">{service}</label>
                <div className="flex gap-4">
                  {frequencies.map(freq => (
                    <label key={freq} className="flex items-center gap-2">
                      <input
                        type="radio"
                        name={service}
                        value={freq}
                        checked={selected[service] === freq}
                        onChange={() => handleSelect(category, service, freq)}
                      />
                      {freq}
                    </label>
                  ))}
                </div>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}