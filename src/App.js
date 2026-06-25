import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';
import './App.css';

// --- HOME PAGE COMPONENT ---
function HomePage({ products, setProducts, selectedCategory, setSelectedCategory }) {
  const [formData, setFormData] = useState({ name: '', price: '', quantity: '', category: 'audio' });

  const grandTotal = products.reduce((sum, p) => sum + (p.price * p.quantity), 0);
  const filteredProducts = selectedCategory === 'all' ? products : products.filter(p => p.category === selectedCategory);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.price || !formData.quantity) return alert("Fill all fields!");
    setProducts([...products, { ...formData, id: Date.now(), price: parseFloat(formData.price), quantity: parseInt(formData.quantity) }]);
    setFormData({ name: '', price: '', quantity: '', category: 'audio' });
  };

  return (
    <div className="main-content" style={{ padding: '20px' }}>
      <h1>Inventory Dashboard</h1>
      <div className="total-banner"><h3>Overall Total: ₱{grandTotal.toLocaleString()}</h3></div>
      
      <form onSubmit={handleSubmit} style={{ margin: '20px 0' }}>
        <input placeholder="Name" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
        <input type="number" placeholder="Price" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
        <input type="number" placeholder="Quantity" value={formData.quantity} onChange={e => setFormData({...formData, quantity: e.target.value})} />
        <button type="submit">Add Product</button>
      </form>

      <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead><tr><th>Name</th><th>Price</th><th>Qty</th><th>Subtotal</th><th>Action</th></tr></thead>
        <tbody>
          {filteredProducts.map(p => (
            <tr key={p.id} style={{ backgroundColor: p.quantity < 5 ? '#ffcccc' : 'transparent' }}>
              <td>{p.name} {p.quantity < 5 && <strong>(Low Stock)</strong>}</td>
              <td>₱{p.price.toLocaleString()}</td>
              <td>{p.quantity}</td>
              <td>₱{(p.price * p.quantity).toLocaleString()}</td>
              <td><Link to={`/product/${p.id}`}>View Details</Link></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// --- DETAILS PAGE ---
function DetailsPage({ products }) {
  const { id } = useParams();
  const product = products.find(p => p.id === parseInt(id));
  return (
    <div style={{ padding: '50px' }}>
      {product ? (
        <>
          <h1>{product.name}</h1>
          <p>Price: ₱{product.price}</p>
          <p>Category: {product.category}</p>
          <Link to="/">Back to Home</Link>
        </>
      ) : <h2>Product not found!</h2>}
    </div>
  );
}

// --- MAIN APP COMPONENT ---
export default function App() {
  const [products, setProducts] = useState([
    { id: 1, name: 'Wireless Headphones', price: 8499, quantity: 2, category: 'audio' }
  ]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage products={products} setProducts={setProducts} selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />} />
        <Route path="/product/:id" element={<DetailsPage products={products} />} />
      </Routes>
    </Router>
  );
}