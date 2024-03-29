// src/pages/get_answer/page.js
import React, { useState } from 'react';

export default function GenerateRecipe() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Lade-Indikator aktivieren
    try {
      const res = await fetch('http://localhost:3000/api/get', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt }),
      });

      if (!res.ok) throw new Error('Netzwerkantwort war nicht ok.');

      const data = await res.json();
      setResponse(data.choices[0].text);
    } catch (error) {
      console.error('Fehler beim Abrufen der Antwort:', error);
      setResponse("Es gab einen Fehler beim Abrufen der Antwort.");
    } finally {
      setIsLoading(false); // Lade-Indikator deaktivieren
    }
  };

  return (
    <div>
      <h1>Generiere ein Rezept</h1>
      <form onSubmit={handleSubmit}>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Gib hier deine Anfrage ein..."
        ></textarea>
        <button type="submit">Generieren</button>
      </form>
      {isLoading ? <p>Lädt...</p> : <p>Antwort: {response}</p>}
    </div>
  );
}

