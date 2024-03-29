//  /src/app/pages/Add.js
import styles from './add.module.css'

import React, { useState } from 'react'




export default function Add() {

  const [rezeptName, setRezeptName] = useState("");
  const [anzahl, setAnzahl] = useState("");
  const [kategorie, setKategorie] = useState("");
  const [alternativeingabe, setAlternativEingabe] = useState("");
  const [zutatenListe, setZutatenListe] = useState([{ zutat: "", menge: "", mengeneinheit: "" }]);
  const [zubereitung, setZubereitung] = useState("");
  const [tips, setTips] = useState("");
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
  const handleEingabeAendern = (index, newValue, field) => {
    const neueZutatenListe = [...zutatenListe];
    neueZutatenListe[index][field] = newValue;
    setZutatenListe(neueZutatenListe);
  };
  //async await für routing endpoint und api
  const handlespeichersendenenClick = async () => {
    const isRezeptNameValid = validateRezeptname();
    const areAllMengenValid = zutatenListe.every(zutat => validateMenge(zutat.menge));

    if (!isRezeptNameValid || !areAllMengenValid) {
      return;
     } 

      try{
        // half beim debuggen ich hatte keine werte von rezeptName, 
        //alternativeingabe, zutatenListe.menge u. .zutaten bekommen
        console.log("Sendende Daten:", {
          Rezeptname: rezeptName,
          Anzahl: anzahl, 
          Kategorie: kategorie, 
          Eigenangabe: alternativeingabe,
          Zutaten: zutatenListe,
          Zubereitung: zubereitung,
          Tips: tips
        });
      const response = await fetch('https://z4gi3tt9f8.execute-api.us-east-1.amazonaws.com/prod/save', {
        method: "POST",
        headers:{ 
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({Rezeptname: rezeptName,
                              Anzahl: anzahl || null, 
                              Kategorie: kategorie|| null, 
                              Eigenangabe: alternativeingabe || null,
                              Zutaten: zutatenListe,
                              Zubereitung: zubereitung || null,
                              Tips: tips|| null

      
        }),
       
      });
      if(response.ok){
        console.log("Eingabe gespeichert");
        window.location.href = "/";
      }else {
        console.error("Fehler beim Speichern");
      }
    }
    catch (error) {
      console.error('DAtei konnte nicht verschickt werden async function', error);
    }
  };

  return (
    
    <div className={styles.main}>
      
      <div className={styles.listItem}>
        <label>Rezeptname:</label>
        <input className={styles.inputStyle}
          type='text'
          placeholder="Rezeptname"
          value={rezeptName}
          onChange={(e) => setRezeptName(e.target.value)}
          // ? ist ein ternären Operator verkürzung if-else
          //Bedingung ? Ausdruck1 [bei true ausf.]: Ausdruck2 [bei false ausf.]
          style={rezeptNameError ? {borderColor: "red"} :null}
         //</div> && operator short-circuit evaluation de=kurzschlüssiges Bedingen  
         //wenn bedingung vor && true ist wird nach && ausgeführt sonst ignor
        />
        {rezeptNameError && <div style={{ color: 'red' }}>{rezeptNameError}</div>}
      </div>
      <div className={styles.flexContainer}>
        <span>Zutaten für:</span>
        <select
          className={styles.inputStyle}
          value={anzahl}
          onChange={(e) => setAnzahl(e.target.value)}
        >
          {Array.from({ length: 31 }, (_, index) => (
            <option key={index} value={index }>
              {index}
            </option>
          ))}
        </select>

        <select
          className={styles.inputStyle}
          value={kategorie}
          onChange={(e) => setKategorie(e.target.value)}
          >
          <option >Kategorie wählen</option>  
          <option >Personen</option>
          <option >Portionen</option>
          <option >Stück</option>
          </select>

          <input className={styles.inputStyle}
          type='text'
          placeholder="Eigene Angabe"
          value={alternativeingabe}
          onChange={(e) => setAlternativEingabe(e.target.value)}
        />
      </div>
      <div>
        {zutatenListe.map((item, index) => (
        <div key={index} className={styles.flexContainer}>
          <div className={styles.inputFlex}>
            <label>Menge</label>
            <input className={styles.inputStyle}
              type='text'
              placeholder="Zutaten"
              value={item.zutat}
              onChange={(e) => handleEingabeAendern(index, e.target.value, "zutat")}
              
            />
          </div>
          <div className={styles.inputFlex}>
            <label>Menge</label>
            <input className={styles.inputStyle}
              type='text'
              placeholder="Menge"
              value={item.menge}
              onChange={(e) => handleEingabeAendern(index, e.target.value, "menge")}  
            />{mengeError && <div style={{ color: 'red' }}>{mengeError}</div>}
          </div>
          <div className={styles.inputFlex}>
            <select
            className={styles.inputStyle}
            value={item.mengeneinheit}
            onChange={(e) => handleEingabeAendern(index, e.target.value, "mengeneinheit")}
            >
            <option value="">Einheit wählen</option>
            <option value="L">L</option>
            <option value="ml">ml</option>
            <option value="g">g</option>
            <option value="kg">kg</option>
            <option value="TL">TL</option>
            <option value="EL">EL</option>
            <option value="ST">St</option>
            </select>
          </div>
          {index === zutatenListe.length - 1 && (
          <button className={styles.button} onClick={handleWeiteresHinzufuegen}>ADD more</button>
          )}
        </div>
       ))}
      </div>
      <div className={styles.flexContainer}>
        <label>Zubereitung:</label>
        <textarea
          className={styles.textarea}
          placeholder='- 1 Esslöffel Olivenöl'
          type="text"
          value={zubereitung}
          onChange={(e) => setZubereitung(e.target.value)}
        />
      </div>
      <div className={styles.flexContainer}>
        <label>Tipps Tricks: </label>
        <textarea className={styles.textarea} placeholder='tips und tricks' type="text"
        value={tips}
        onChange={(e) => setTips(e.target.value)}></textarea>
      </div>
      <br />
      <br />
      <button className={styles.button} onClick={handlespeichersendenenClick}>SAVE ALL</button>
    </div>
  );
};
