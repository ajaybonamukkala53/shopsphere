import { Link } from "react-router-dom";

function ProductCard({ product }) {
  return (
    <div
      style={{
        border: "1px solid gray",
        padding: "20px",
        margin: "20px",
        width: "250px",
        textAlign: "center",
      }}
    >
      <img
        src={product.image}
        alt={product.title}
        style={{
          width: "200px",
          height: "200px",
          objectFit: "cover",
        }}
      />

      <h2>{product.title}</h2>

      <h3>${product.price}</h3>

      <Link to={`/product/${product._id}`}>
        <button>View Details</button>
      </Link>
    </div>
  );
}

export default ProductCard;