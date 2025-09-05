import React, { useState, useEffect } from 'react';
import { useProductRegistry } from './hooks/useProductRegistry';
import { ethers } from 'ethers';
import './App.css';

function App() {
  const {
    contract,
    account,
    connectWallet,
    registerProduct,
    getAllProducts,
  } = useProductRegistry();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    dateOfHarvest: '',
    timeOfHarvest: '',
    farmLocation: '',
    qualityRating: '',
    pricePerUnit: '',
    description: ''
  });

  useEffect(() => {
    if (contract) {
      loadProducts();
    }
  }, [contract]);

  const loadProducts = async () => {
    setLoading(true);
    try {
      const allProducts = await getAllProducts();
      setProducts(allProducts);
    } catch (error) {
      console.error('Error loading products:', error);
    }
    setLoading(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      await registerProduct(
        formData.name,
        formData.category,
        formData.dateOfHarvest,
        formData.timeOfHarvest,
        formData.farmLocation,
        formData.qualityRating,
        parseFloat(formData.pricePerUnit),
        formData.description
      );
      
      setFormData({
        name: '',
        category: '',
        dateOfHarvest: '',
        timeOfHarvest: '',
        farmLocation: '',
        qualityRating: '',
        pricePerUnit: '',
        description: ''
      });
      
      await loadProducts();
      alert('Product registered successfully!');
    } catch (error) {
      console.error('Error registering product:', error);
      alert('Error registering product');
    }
    setLoading(false);
  };

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (!account) {
    return (
      <div className="App">
        <header>
          <h1>Product Registry</h1>
          <button onClick={connectWallet}>Connect Wallet</button>
        </header>
      </div>
    );
  }

  return (
    <div className="App">
      <header>
        <h1>Product Registry</h1>
        <p>Connected: {account}</p>
      </header>

      <div className="container">
        <section className="product-form">
          <h2>Register New Product</h2>
          <form onSubmit={handleSubmit}>
            <input
              name="name"
              placeholder="Product Name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
            <input
              name="category"
              placeholder="Category"
              value={formData.category}
              onChange={handleInputChange}
              required
            />
            <input
              name="dateOfHarvest"
              type="date"
              placeholder="Date of Harvest"
              value={formData.dateOfHarvest}
              onChange={handleInputChange}
              required
            />
            <input
              name="timeOfHarvest"
              type="time"
              placeholder="Time of Harvest"
              value={formData.timeOfHarvest}
              onChange={handleInputChange}
              required
            />
            <input
              name="farmLocation"
              placeholder="Farm Location"
              value={formData.farmLocation}
              onChange={handleInputChange}
              required
            />
            <input
              name="qualityRating"
              placeholder="Quality Rating"
              value={formData.qualityRating}
              onChange={handleInputChange}
              required
            />
            <input
              name="pricePerUnit"
              type="number"
              step="0.001"
              placeholder="Price (ETH)"
              value={formData.pricePerUnit}
              onChange={handleInputChange}
              required
            />
            <textarea
              name="description"
              placeholder="Description"
              value={formData.description}
              onChange={handleInputChange}
              required
            />
            <button type="submit" disabled={loading}>
              {loading ? 'Registering...' : 'Register Product'}
            </button>
          </form>
        </section>

        <section className="products-list">
          <h2>All Products ({products.length})</h2>
          {loading ? (
            <p>Loading products...</p>
          ) : (
            <div className="products-grid">
              {products.map((product, index) => (
                <div key={index} className="product-card">
                  <h3>{product.name}</h3>
                  <p>Category: {product.category}</p>
                  <p>Farm: {product.farmLocation}</p>
                  <p>Quality: {product.qualityRating}</p>
                  <p>Price: {ethers.formatEther(product.pricePerUnit)} ETH</p>
                  <p>Farmer: {product.farmer.slice(0, 8)}...{product.farmer.slice(-6)}</p>
                  <p>Available: {product.isAvailable ? 'Yes' : 'No'}</p>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default App;