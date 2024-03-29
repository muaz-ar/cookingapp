// pages/index.js
import React, { useState } from 'react';
import styles from './page.module.css';
import Select from 'react-select';
import CountryList from 'react-select-country-list';


export default function KI() {
  const [ingredients, setIngredients] = useState([{ name: '', amount: '' }]);
  const [mealType, setMealType] = useState('');
  const [courseType, setCourseType] = useState('');
  const [peopleCount, setPeopleCount] = useState(1);
  const [region, setRegion] = useState('');
  const [selectedCountry, setSelectedCountry] = useState(null); 
  const [specialty, setSpecialty] = useState('');
  const [difficulty, setDifficulty] = useState('');
  const [response, setResponse] = useState('');

  function CountrySelector({ onChange }) {
    const [value, setValue] = useState('');
    const options = CountryList().getData();
  
    const changeHandler = value => {
      setValue(value);
      onChange(value);
    };
  
    return <Select options={options} value={value} onChange={changeHandler} placeholder="Land wählen"/>;
  }
  
  const addIngredient = () => {
    setIngredients([...ingredients, { name: '', amount: '' }]);
  };

  const updateIngredient = (index, field, value) => {
    const newIngredients = ingredients.map((ingredient, i) =>
      i === index ? { ...ingredient, [field]: value } : ingredient
    );
    setIngredients(newIngredients);
  };
  const handleCountryChange = (name) => {
    setSelectedCountry(name); // Hier speicherst du den vollständigen Namen
    console.log('Ausgewähltes Land:', name);
  };
  
  const handleSubmit = async () => {
    // Sammle alle Daten, die gesendet werden sollen
    const dataToSend = {
      ingredients,
      mealType,
      courseType,
      peopleCount,
      region,
      selectedCountry,
      specialty,
      difficulty,
    };

    try {
      // Sende die Daten an deinen `/ki` Endpoint
      const response = await fetch('http://localhost:3000/ki', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dataToSend),
      });

      if (!response.ok) {
        throw new Error('Fehler beim Senden der Daten');
      }

      // Nach erfolgreichem Senden, rufe die Antwort von `/kianswer` ab
      const answerResponse = await fetch('http://localhost:3000/kianswer');
      const answerData = await answerResponse.json();

      // Speichere die Antwort, um sie im UI anzuzeigen
      setResponse(answerData.message); // Angenommen, die Antwort enthält ein `message` Feld
    } catch (error) {
      console.error("Fehler:", error);
      setResponse('Es gab einen Fehler bei der Anfrage.');
    }
  };

  return (
    <div className={styles.main}>
        
      <div className={styles.container}>
      
        <h1>Nachhaltiges Kochen mit der KI</h1>
        <div className={styles.selectors}>
          <select value={mealType} onChange={(e) => setMealType(e.target.value)}>
            <option value="">Essenzeit</option>
            <option value="doesn't matter">Egal</option>
            <option value="breakfast">Frühstück</option>
            <option value="lunch">Mittagessen</option>
            <option value="dinner">Abendessen</option>
          </select>

          <select value={courseType} onChange={(e) => setCourseType(e.target.value)}>
            <option value="">Gang wählen</option>
            <option value="">Egal</option>
            <option value="appetizer">Vorspeise</option>
            <option value="main">Hauptgericht</option>
            <option value="dessert">Nachspeise</option>
            <option value="snack">Snack</option>
          </select>

          <input
            type="number"
            min="1"
            max="20"
            placeholder="Personenanzahl"
            value={peopleCount}
            onChange={(e) => setPeopleCount(e.target.value)}
          />

          <select value={region} onChange={(e) => setRegion(e.target.value)}>
            <option value="">Region wählen</option>
            <option value="europe">Europa</option>
            <option value="asia">Asien</option>
            <option value="africa">Afrika</option>
            <option value="north-america">Nordamerika</option>
            <option value="south-america">Südamerika</option>
            <option value="australia">Australien</option>
          </select>

          <CountrySelector onChange={handleCountryChange} />

          <select value={specialty} onChange={(e) => setSpecialty(e.target.value)}>
            <option value="">Spezialität wählen</option>
            <option value="vegetarian">Vegetarisch</option>
            <option value="vegan">Vegan</option>
            <option value="gluten-free">Glutenfrei</option> 
            <option value="lactose-free">Laktosefrei</option>
          </select>  
          
          <select value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
            <option value="">Schwierigkeitsgrad wählen</option>
            <option value="easy">Einfach</option>
            <option value="medium">Mittel</option>
            <option value="hard">Schwer</option>
          </select>
        </div>

        {ingredients.map((ingredient, index) => (
          <div key={index} className={styles.ingredientInput}>
            <input
              type="text"
              placeholder="Zutat"
              value={ingredient.name}
              onChange={(e) => updateIngredient(index, 'name', e.target.value)}
            />
            <input
              type="text"
              placeholder="Menge"
              value={ingredient.amount}
              onChange={(e) => updateIngredient(index, 'amount', e.target.value)}
            />
            <button className={styles.button} onClick={() => setIngredients(ingredients.filter((_, i) => i !== index))}>Entfernen</button>
          </div>
        ))}
        <button className={styles.button} onClick={addIngredient}>Weitere Zutat hinzufügen</button>
      </div>
      <button id='1' className={styles.button} onClick={handleSubmit}>Rezepte erstellen</button>
      
    </div>
  );
}
