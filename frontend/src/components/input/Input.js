
   const alcd = {
    padding: "0.4rem",
    borderRadius: "10px",
    fontSize: "1rem",
    backgroundColor: "white",
    marginLeft: "0.8rem", // Abstand zwischen Text und Input
  }
  
  return (
      <div style={{ display: "flex", alignItems: "center" }}>
        
        <span>{props.label}</span>
        <input
          style={alcd}
          type="text"
          placeholder={props.placeholder}
        />
      </div>
    );
  }
  