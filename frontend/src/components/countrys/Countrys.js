// src/components/countrys/Countrys.js
import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import CountryList from 'react-select-country-list';
  
export default function CountrySelector({ onChange }) {
  const options = CountryList().getData();

  // Finden Sie das Optionselement für "Deutschland"
  const germanyOption = options.find(option => option.label === 'Germany');

  // setze Anfangswert  `value`-Zustands auf das Optionselement "Deutschland"
  const [value, setValue] = useState(germanyOption);

  useEffect(() => {
    // Senden "Germany" an übergeordnete Komponente KI.js
    onChange(germanyOption.label);
  }, []);

  const changeHandler = value => {
    setValue(value);
    onChange(value.label);
  };

  return (
    <Select  
      options={options}
      value={value} 
      onChange={changeHandler} 
      placeholder="Land auswählen "
      styles={{
        control: (base, state) => ({
          ...base,
          padding: '0.01rem',
          marginBottom: '10px',
          borderRadius: '10px',
          fontSize: '1rem',
          backgroundColor: 'rgb(173, 167, 167)',
          marginLeft: '0.8rem',
          width: '100%', // Setzen Sie die Breite auf 100%, um die volle Breite des Containers zu nutzen
          border: 'none', // Entfernen Sie den Standardrahmen
        }),
        indicatorsContainer: (base) => ({
          ...base,
          height: '100%', // Stellen Sie sicher, dass das Dropdown-Symbol immer vertikal zentriert ist
          color: 'black', // Setzen Sie die Farbe des Dropdown-Symbols auf schwarz
        }),
        menu: (base) => ({
          ...base,
          borderRadius: '10px',
          fontSize: '1rem',
          backgroundColor: 'rgb(173, 167, 167)',
          width: '100%', // Setzen Sie die Breite auf 100%, um die volle Breite des Containers zu nutzen
        }),
      }}
    />
  );
    }