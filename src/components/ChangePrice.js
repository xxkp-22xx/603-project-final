import React, { useState } from "react";

const ChangePrice = () => {
  const [propertyId, setPropertyId] = useState("");
  const [newPrice, setNewPrice] = useState("");

  const handleChangePrice = () => {
    alert(
      `Changing price for Property ID: ${propertyId} to ${newPrice} ETH`
    );
    // Add logic to interact with the blockchain contract here.
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Change Property Price</h2>
      <div style={styles.inputContainer}>
        <label style={styles.label}>Property ID:</label>
        <input
          type="number"
          placeholder="Enter property ID"
          value={propertyId}
          onChange={(e) => setPropertyId(e.target.value)}
          style={styles.input}
        />
      </div>
      <div style={styles.inputContainer}>
        <label style={styles.label}>New Price (in ETH):</label>
        <input
          type="number"
          placeholder="Enter new price"
          value={newPrice}
          onChange={(e) => setNewPrice(e.target.value)}
          style={styles.input}
        />
      </div>
      <button onClick={handleChangePrice} style={styles.button}>
        Change Price
      </button>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    maxWidth: "400px",
    margin: "20px auto",
  },
  heading: {
    fontSize: "24px",
    fontETHght: "bold",
    marginBottom: "20px",
  },
  inputContainer: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    marginBottom: "20px",
  },
  label: {
    marginBottom: "8px",
    fontSize: "16px",
    fontETHght: "500",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    borderRadius: "4px",
    border: "1px solid #ccc",
  },
  button: {
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    padding: "10px 20px",
    fontSize: "16px",
    borderRadius: "4px",
    cursor: "pointer",
    marginTop: "10px",
  },
};

export default ChangePrice;
