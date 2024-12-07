import React, { useState } from "react";

const Auction = () => {
  const [propertyId, setPropertyId] = useState("");
  const [startingPrice, setStartingPrice] = useState("");
  const [duration, setDuration] = useState("");

  const handleStartAuction = () => {
    alert(
      `Starting auction for Property ID: ${propertyId}, Starting Price: ${startingPrice} ETH, Duration: ${duration} seconds`
    );
    // Add logic to interact with the blockchain smart contract here.
  };

  const handleStopAuction = () => {
    alert(`Stopping auction for Property ID: ${propertyId}`);
    // Add logic to interact with the blockchain smart contract here.
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Auction Management</h2>
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
        <label style={styles.label}>Starting Price (in ETH):</label>
        <input
          type="number"
          placeholder="Enter starting price"
          value={startingPrice}
          onChange={(e) => setStartingPrice(e.target.value)}
          style={styles.input}
        />
      </div>
      <div style={styles.inputContainer}>
        <label style={styles.label}>Duration (in seconds):</label>
        <input
          type="number"
          placeholder="Enter duration in seconds"
          value={duration}
          onChange={(e) => setDuration(e.target.value)}
          style={styles.input}
        />
      </div>
      <div style={styles.buttonContainer}>
        <button onClick={handleStartAuction} style={styles.button}>
          Start Auction
        </button>
        <button onClick={handleStopAuction} style={{ ...styles.button, backgroundColor: "#FF5733" }}>
          Stop Auction
        </button>
      </div>
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
    marginBottom: "15px",
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
  buttonContainer: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    marginTop: "15px",
  },
  button: {
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    padding: "10px 20px",
    fontSize: "16px",
    borderRadius: "4px",
    cursor: "pointer",
  },
};

export default Auction;
