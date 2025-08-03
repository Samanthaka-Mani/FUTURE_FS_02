import React from "react";

const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div style={styles.card}>
      <img src={product.image} alt={product.name} style={styles.image} />
      <div style={styles.info}>
        <h3>{product.name}</h3>
        <p>₹{product.price}</p>
        <button style={styles.button} onClick={() => onAddToCart(product)}>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

const styles = {
  card: {
    border: "1px solid #ddd",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
    backgroundColor: "#fff",
    transition: "transform 0.2s",
  },
  image: {
    width: "100%",
    height: "auto",
  },
  info: {
    padding: "1rem",
    textAlign: "center",
  },
  button: {
    marginTop: "1rem",
    padding: "0.6rem 1.5rem",
    backgroundColor: "#2962ff",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    width: "100%",
    fontWeight: "bold",
  },
};

export default ProductCard;
