// src/pages/index.js
import React, { useState, useEffect } from 'react';
import styles from './add.module.css'
import CountrySelector from '../components/countrys/Countrys'



export default function HOME() {

  const [rezeptName, setRezeptName] = useState("");
  const [zutatenListe, setZutatenListe] = useState([{ zutat: "", menge: "", mengeneinheit: "" }]);
  const [mealType, setMealType] = useState('Any');
  const [courseType, setCourseType] = useState('mainmeal');
  const [peopleCount, setPeopleCount] = useState('paar');
  const [region, setRegion] = useState('Any');
  const [selectedCountry, setSelectedCountry] = useState(null); 
  const [specialty, setSpecialty] = useState('Any');
  const [difficulty, setDifficulty] = useState('Any');
  const [recipeResponse, setRecipeResponse] = useState('');
  const [response, setResponse] = useState('');
  const [recipe, setRecipe] = useState({ title: '', ingredients: [], steps: [] });
  //Zustandsvariable für Fehler definieren 
  const [rezeptNameError, setRezeptNameError ] = useState("");
  const [mengeError, setMengeError] = useState(""); 
 
  // bedingung für die validierung von der eingabe Rezeptname u. Menge
  const validateRezeptname = () => {
    if (!rezeptName.trim()){     //!....trim() prüft ob zeile leer ist
      setRezeptNameError("Bitte Rezeptname eingeben");
      return false
    }else {
      setRezeptNameError("")
      return true
    }
  }
  const validateMenge = (menge) => {
    const regex = /^[0-9]*$/; // Regex für nur Zahlen
    if (!menge.trim() || !regex.test(menge)) {
      setMengeError("Nur Zahlen eingeben")
      return false
    }else {
      setMengeError("")
      return true
    }
  }
  const handleWeiteresHinzufuegen = () => {
    setZutatenListe([...zutatenListe, { zutat: "", menge: "", mengeneinheit: "" }]);
  };
  const handleCountryChange = (name) => {
    setSelectedCountry(name); 
    console.log('Ausgewähltes Land:', name);
  };
  const handleEingabeAendern = (index, newValue, field) => {
    const neueZutatenListe = [...zutatenListe];
    neueZutatenListe[index][field] = newValue;
    setZutatenListe(neueZutatenListe);
  };
  const parseRecipeResponse = (response) => {
    const parts = response.split("\n");
    return {
      title: parts[0].replace("Rezept: ", ""),
      ingredients: parts.slice(1, parts.findIndex(part => part.startsWith("Anleitung:"))).join("\n"),
      steps: parts.slice(parts.findIndex(part => part.startsWith("Anleitung:")) + 1),
    };
  };
  //async await für routing endpoint und api
  const handlespeichersendenenClick = async () => {
    const isRezeptNameValid = validateRezeptname();
    const areAllMengenValid = zutatenListe.every(zutat => validateMenge(zutat.menge));
  
    if (!isRezeptNameValid || !areAllMengenValid) {
      alert("Bitte korrigieren Sie die Eingaben.");
      return;
    }
      const payload = {
        Rezeptname: rezeptName,
        Mealtype: mealType, 
        Coursetype: courseType, 
        Peoplecount: peopleCount,
        Specialty: specialty,
        Region: region,
        Zutaten: zutatenListe.map(zutat => ({ ...zutat, menge: parseFloat(zutat.menge) })), 
        Country: selectedCountry.label || selectedCountry, 
      };
  
      try {
        const response = await fetch('https://t21gaxfky0.execute-api.us-east-1.amazonaws.com/api/save', {
          method: "POST",
          headers: { 'Content-Type': 'application/json' },
          
          body: JSON.stringify(payload),
          
        });
        
        if (!response.ok) throw new Error('Netzwerkantwort war nicht ok.');
        const data = await response.json();
        // Hier setzt du den recipeResponse-Zustand, das ist in Ordnung
        setRecipeResponse(data.recipe); 
        // Hier parst du die Antwort und aktualisierst den recipe-Zustand
        const parsedRecipe = parseRecipeResponse(data.recipe);
        setRecipe(parsedRecipe); // Füge diese Zeile hinzu, um den recipe-Zustand zu aktualisieren
    
      } catch (error) {
        console.error('Fehler beim Senden der Daten:', error);
      }
    };
  return (
    
    <div className={styles.main}>
       <div>
          <h2>Mit wenigen Klicks zum individuellen Rezept. Wähle aus Optionen wie Gerichtzeit, Gang, und Personenanzahl</h2>
            <ul>
                <li><strong>Ernährungsart:</strong> Pass dein Rezept an deine Diät an – ob vegetarisch, vegan, gluten- oder laktosefrei.</li>
                <li><strong>Region:</strong> Lass dich von Küchen aus aller Welt inspirieren.</li>
            </ul>
            <p>Füge Zutaten hinzu, spezifiziere Mengen und Einheiten, und teile dein kulinarisches Werk mit der Welt.</p>
      </div>
      <div className={styles.listItem}>
        <label style={{ fontSize: "20px", textDecoration: "none", color: "black" }}>Wunschgericht:</label>
        <input className={styles.inputStyle}
          type='text'
          placeholder="Wunschgericht"
          value={rezeptName}
          onChange={(e) => setRezeptName(e.target.value)}
          // ? ist ein ternären Operator verkürzung if-else
          //Bedingung ? Ausdruck1 [bei true ausf.]: Ausdruck2 [bei false ausf.]
          style={rezeptNameError ? {borderColor: "red"} :null}
        />
        {rezeptNameError && <div style={{ color: 'red' }}>{rezeptNameError}</div>}
      </div>
      <div className={styles.flexContainer}>
        <select
          className={styles.inputStyle} value={mealType} onChange={(e) => setMealType(e.target.value)}>
          <option value="Any">Gerichtzeit</option>
            <option value="breakfast">Frühstück</option>
            <option value="lunch">Mittagessen</option>
            <option value="dinner">Abendessen</option>
        </select>
        <select className={styles.inputStyle} value={courseType} onChange={(e) => setCourseType(e.target.value)}>
            <option value="mainmeal">Gang wählen</option>
            <option value="appetizer">Vorspeise</option>
            <option value="main">Hauptgericht</option>
            <option value="dessert">Nachspeise</option>
            <option value="snack">Snack</option>
          </select>
          <select className={styles.inputStyle} value={peopleCount} onChange={(e) => setPeopleCount(e.target.value)}>
          <option value="paar">Personenanzahl</option>
            <option value="1">1 </option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
          
          <select className={styles.inputStyle} value={specialty} onChange={(e) => setSpecialty(e.target.value)}>
            <option value="Any">Ernährungsart</option>
            <option value="vegetarian">Vegetarisch</option>
            <option value="vegan">Vegan</option>
            <option value="gluten-free">Glutenfrei</option> 
            <option value="lactose-free">Laktosefrei</option>
          </select> 
          <select className={styles.inputStyle} value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
            <option value="Any">Aufwand</option>
            <option value="easy">Einfach</option>
            <option value="medium">Mittel</option>
            <option value="hard">Schwer</option>
          </select> 
          <select className={styles.inputStyle} value={region} onChange={(e) => setRegion(e.target.value)}>
            <option value="Any">Region wählen</option>
            <option value="europe">Europa</option>
            <option value="asia">Asien</option>
            <option value="africa">Afrika</option>
            <option value="north-america">Nordamerika</option>
            <option value="south-america">Südamerika</option>
            <option value="australia">Australien</option>
          </select>
          <CountrySelector onChange={handleCountryChange}/>
      </div>
      <div>
        {zutatenListe.map((item, index) => (
        <div key={index} className={styles.flexContainer}>
          
          <input className={styles.inputStyle}
            type='text'
            placeholder="Zutat"
            value={item.zutat}
            onChange={(e) => handleEingabeAendern(index, e.target.value, "zutat")}
          />
          <input className={styles.inputStyle}
            type='text'
            placeholder="Zutatenmenge"
            value={item.menge}
            onChange={(e) => handleEingabeAendern(index, e.target.value, "menge")}  
          />{mengeError && <div style={{ color: 'red' }}>{mengeError}</div>}
        
          <select
          className={styles.inputStyle}
          value={item.mengeneinheit}
          onChange={(e) => handleEingabeAendern(index, e.target.value, "mengeneinheit")}
          >
          <option value="ca">Einheit wählen</option>
          <option value="L">L</option>
          <option value="ml">ml</option>
          <option value="g">g</option>
          <option value="kg">kg</option>
          <option value="TL">TL</option>
          <option value="EL">EL</option>
          <option value="ST">St</option>
          </select>
          <button className={styles.button} onClick={() => setZutatenListe(zutatenListe.filter((_, i) => i !== index))}>Entfernen</button>
          
          {index === zutatenListe.length - 1 && (
          <button className={styles.button} onClick={handleWeiteresHinzufuegen}>ADD more</button>
          )}

        </div>
       ))}
      </div>
      <br />
      <br />
      <button className={styles.buttonMain} onClick={handlespeichersendenenClick}>Gerichtvorschlöge erhalten</button>
      {recipe.title && (
        <div className={styles.recipe}>
          <h2>{recipe.title}</h2>
          <h3>Erforderliche Zutaten:</h3>
          <p>{recipe.ingredients}</p>
          <h3>Anleitung:</h3>
          <p>{recipe.steps.join("\n")}</p>
        </div>
      )}
      
    </div>
  );
};


