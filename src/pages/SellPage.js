import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SellPage = () => {
  const navigate = useNavigate();

  const [listPropertyData, setListPropertyData] = useState({ price: "" });
  const [changePriceData, setChangePriceData] = useState({
    propertyId: "",
    newPrice: "",
  });

  const handleListProperty = () => {
    alert(`Listing property with price: ${listPropertyData.price}`);
    // Add blockchain logic for listing property here
  };

  const handleChangePrice = () => {
    alert(
      `Changing price of Property ID: ${changePriceData.propertyId} to ${changePriceData.newPrice}`
    );
    // Add blockchain logic for changing property price here
  };

  const goToAuctionPage = () => {
    navigate("/auction");
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Sell Your Property</h1>

      {/* List Property Section */}
      <section style={styles.section}>
        <h2 style={styles.subHeading}>List a Property</h2>
        <input
          type="number"
          placeholder="Enter Price (in ETH)"
          value={listPropertyData.price}
          onChange={(e) =>
            setListPropertyData({ ...listPropertyData, price: e.target.value })
          }
          style={styles.input}
        />
        <button onClick={handleListProperty} style={styles.button}>
          List Property
        </button>
      </section>

      {/* Change Price Section */}
      <section style={styles.section}>
        <h2 style={styles.subHeading}>Change Property Price</h2>
        <input
          type="number"
          placeholder="Property ID"
          value={changePriceData.propertyId}
          onChange={(e) =>
            setChangePriceData({
              ...changePriceData,
              propertyId: e.target.value,
            })
          }
          style={styles.input}
        />
        <input
          type="number"
          placeholder="New Price (in ETH)"
          value={changePriceData.newPrice}
          onChange={(e) =>
            setChangePriceData({
              ...changePriceData,
              newPrice: e.target.value,
            })
          }
          style={styles.input}
        />
        <button onClick={handleChangePrice} style={styles.button}>
          Change Price
        </button>
      </section>

      {/* Property Details Section */}
      <section style={styles.section}>
        <h2 style={styles.subHeading}>Property Details</h2>
        <p>
          Go to the **Buy Page** to view detailed information about your listed
          properties or others available for sale.
        </p>
      </section>

      {/* Auction Section */}
      <section style={styles.section}>
        <h2 style={styles.subHeading}>Manage Auctions</h2>
        <button onClick={goToAuctionPage} style={styles.button}>
          Go to Auction Page
        </button>
      </section>
    </div>
  );
};

const styles = {
  container: {
    padding: "20px",
    maxWidth: "800px",
    margin: "0 auto",
    textAlign: "center",
  },
  heading: {
    fontSize: "28px",
    fontETHght: "bold",
    marginBottom: "30px",
  },
  section: {
    marginBottom: "30px",
    padding: "15px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  subHeading: {
    fontSize: "22px",
    fontETHght: "bold",
    marginBottom: "15px",
  },
  input: {
    padding: "10px",
    fontSize: "16px",
    marginBottom: "10px",
    border: "1px solid #ccc",
    borderRadius: "4px",
    width: "80%",
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

export default SellPage;
