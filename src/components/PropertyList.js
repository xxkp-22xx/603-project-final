// src/components/PropertiesList.js
import React from "react";
import { useProperties } from "../context/PropertiesContext";

const PropertiesList = () => {
    const { properties } = useProperties();

    console.log("Properties from context:", properties);

    return (
        <div>
            <h3>All Listed Properties:</h3>
            <ul>
                {properties.length > 0 ? (
                    properties.map((property, index) => (
                        <li key={index}>
                            ID: {property.id}, Owner: {property.owner}, Price: {property.price} ETH
                        </li>
                    ))
                ) : (
                    <p>No properties listed yet.</p>
                )}
            </ul>
        </div>
    );
};

export default PropertiesList;
