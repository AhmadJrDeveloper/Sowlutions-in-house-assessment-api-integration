import React, { useState, useEffect } from "react";
import axios from "axios";
import fetchedData from "./data.json";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Modal from "react-bootstrap/Modal";
import "./Home.css";

const ProductModal = ({ show, handleClose, product }) => {
  if (!product) {
    return null;
  }

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{product.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          <strong>Price:</strong> {product.price}$
        </p>
        <p>
          <strong>Quantity:</strong> {product.quantity}
        </p>
        <p>
          <strong>Category:</strong> {product.categories[0].title}
        </p>
        <div className="image-container">
          {product.images.length > 0 && (
            <img
              src={product.images[0].large}
              alt={`Product Image`}
              // className="product-image"
            />
          )}
        </div>
      </Modal.Body>
    </Modal>
  );
};

const Home = () => {
  const [data, setData] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setData(fetchedData[0].data.items);
        console.log(fetchedData[0].data.items);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = data.slice(indexOfFirstProduct, indexOfLastProduct);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="product-card-container">
      <h1>Products</h1>
      <div className="product-container">
        {currentProducts.map((product, index) => (
          <Card
            key={index}
            className="product-card"
            onClick={() => handleProductClick(product)}
          >
            <Card.Body>
              <Card.Title>{product.title}</Card.Title>
              <Card.Text>
                <p className="product-price">{product.price}$</p>
              </Card.Text>
              <div className="image-container">
                {product.images.length > 0 && (
                  <img
                    src={product.images[0].original}
                    alt={`Product ${index} Image 0`}
                    className="product-image"
                  />
                )}
              </div>
            </Card.Body>
          </Card>
        ))}
      </div>
      <ProductModal
        show={showModal}
        handleClose={handleCloseModal}
        product={selectedProduct}
      />
      <div>
        {data.length > productsPerPage && (
          <ul className="pagination">
            {Array.from({
              length: Math.ceil(data.length / productsPerPage),
            }).map((_, index) => (
              <li key={index} className="page-item">
                <button
                  onClick={() => paginate(index + 1)}
                  className="page-link"
                >
                  {index + 1}
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Home;
