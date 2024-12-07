import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import web3 from "../utils/web3";
import contract from "../utils/contract";

const BuyPage = () => {
  const [properties, setProperties] = useState([]);
  const navigate = useNavigate();

  // Dummy data for demonstration purposes
  useEffect(() => {
    // Fetch properties from your smart contract here and update state
    const loadProperties = async () => {
      const events = await contract.getPastEvents("PropertyListed", { fromBlock: 0 });
      const loadedProperties = events.map((event) => ({
          id: event.returnValues.propertyId.toString(),
          owner: event.returnValues.owner,
          price: web3.utils.fromWei(event.returnValues.price, "ether"),
      }));
      setProperties(loadedProperties);
  };
  loadProperties();
  }, []);

  const handleBuyNow = () => {
    navigate("/buyproperty");
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Available Properties</h2>
      {properties.length === 0 ? (
        <p style={styles.message}>No properties available for purchase.</p>
      ) : (
        <div style={styles.propertyList}>
          {properties.map((property) => (
            <div key={property.id} style={styles.propertyCard}>
              <p><strong>Property ID:</strong> {property.id}</p>
              <p><strong>Owner:</strong> {property.owner}</p>
              <p><strong>Price:</strong> {property.price} ETH</p>
              <p><strong>Listed:</strong> {property.isListed ? "Yes" : "No"}</p>
              <p>
                <strong>Auction Started:</strong>{" "}
                {property.isAuctionStarted ? "Yes" : "No"}
              </p>
              <button
                onClick={handleBuyNow}
                style={styles.buyButton}
                // disabled={!property.isListed || property.isAuctionStarted}
              >
                Buy Now
              </button>
            </div>
          ))}
        </div>
      )}
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
    fontSize: "24px",
    fontETHght: "bold",
    marginBottom: "20px",
  },
  message: {
    fontSize: "16px",
    fontETHght: "500",
    color: "#555",
  },
  propertyList: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: "20px",
    marginTop: "20px",
  },
  propertyCard: {
    border: "1px solid #ccc",
    borderRadius: "8px",
    padding: "15px",
    textAlign: "left",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  buyButton: {
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

export default BuyPage;
