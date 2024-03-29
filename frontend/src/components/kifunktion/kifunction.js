import React, { useState } from 'react';

function App() {
  const [inputs, setInputs] = useState(['']);

  const handleAdd = () => {
    setInputs([...inputs, '']);
  };

  const handleChange = (index, event) => {
    const newInputs = [...inputs];
    newInputs[index] = event.target.value;
    setInputs(newInputs);
  };

  return (
    <div>
      <div>
        <h1>Kochen Sie nach bestandt, und so funktioniert es</h1>
        <p>1. Wählen Sie die Zutaten aus, die Sie zu Hause haben</p>
        <p>2. Wählen Sie die Kategorie aus, die Sie kochen möchten</p>
        <p>3. Wählen Sie die Anzahl der Personen aus, für die Sie kochen möchten</p>
        <p>4. Wählen Sie das Land aus, dessen Küche Sie bevorzugen</p>
        <p>5. Klicken Sie auf "Rezepte anzeigen"</p>
      </div>
      <div>
        {inputs.map((input, index) => (
          <input key={index} value={input} onChange={event => handleChange(index, event)} />
        ))}
        <button onClick={handleAdd}>Weiteres Feld hinzufügen</button>
      </div>
    </div>
  );
}

export default App;