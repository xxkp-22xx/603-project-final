import React, { useState } from "react";

const Bid = () => {
  const [propertyId, setPropertyId] = useState("");
  const [bidValue, setBidValue] = useState("");

  const handlePlaceBid = () => {
    alert(`Placing bid of ${bidValue} ETH on Property ID: ${propertyId}`);
    // Add logic to interact with the blockchain smart contract here.
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Place a Bid</h2>
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
        <label style={styles.label}>Bid Value (in ETH):</label>
        <input
          type="number"
          placeholder="Enter your bid value"
          value={bidValue}
          onChange={(e) => setBidValue(e.target.value)}
          style={styles.input}
        />
      </div>
      <button onClick={handlePlaceBid} style={styles.button}>
        Place Bid
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

export default Bid;
