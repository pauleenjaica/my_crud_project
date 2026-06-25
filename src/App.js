import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, useParams } from 'react-router-dom';
import './App.css';

// 1. MAIN APP COMPONENT
export default function App() {
  const [products, setProducts] = useState([
    { id: 1, name: 'Wireless Headphones', price: 8499, qty: 6, cat: 'audio', desc: 'Noise cancelling', spec: 'Bluetooth 5.0', rating: 4.8, img: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e' },
  ]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home products={products} setProducts={setProducts} />} />
        <Route path="/product/:id" element={<DetailsPage products={products} />} />
      </Routes>
    </Router>
  );
}

// 2. HOME PAGE (List, Form, Computation, Low Stock)
function Home({ products, setProducts }) {
  const [newProd, setNewProd] = useState({ name: '', price: '', qty: '', cat: 'audio', desc: '', spec: '', rating: '', img: '' });

  const addProduct = (e) => {
    e.preventDefault();
    if (!newProd.name || !newProd.price || !newProd.qty) return alert("Paki-fill lahat ng fields!");
    setProducts([...products, { ...newProd, id: Date.now(), price: Number(newProd.price), qty: Number(newProd.qty) }]);
    setNewProd({ name: '', price: '', qty: '', cat: 'audio', desc: '', spec: '', rating: '', img: '' });
  };

  const total = products.reduce((sum, p) => sum + (p.price * p.qty), 0);

  return (
    <div className="container">
      <h1>Product Management App</h1>
      <h2>Overall Total: ₱{total.toLocaleString()}</h2>

      {/* FORM PARA SA ADD NEW PRODUCT (Req 2) */}
      <form onSubmit={addProduct} className="add-form">
        <input placeholder="Image URL" onChange={e => setNewProd({...newProd, img: e.target.value})} />
        <input placeholder="Product Name" onChange={e => setNewProd({...newProd, name: e.target.value})} />
        <input type="number" placeholder="Price" onChange={e => setNewProd({...newProd, price: e.target.value})} />
        <input type="number" placeholder="Quantity" onChange={e => setNewProd({...newProd, qty: e.target.value})} />
        <button type="submit">Add Product</button>
      </form>

      {/* DISPLAY LIST (Req 1) */}
      <div className="product-list">
        {products.map(p => (
          <div key={p.id} className={`card ${p.qty < 5 ? 'low-stock' : ''}`}>
            {p.qty < 5 && <p className="badge">LOW STOCK</p>}
            <img src={p.img} alt={p.name} width="100" />
            <h3>{p.name}</h3>
            <p>Price: ₱{p.price}</p>
            <p>Qty: {p.qty}</p>
            <p>Subtotal: ₱{p.price * p.qty}</p>
            <Link to={`/product/${p.id}`}>View Details</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

// 3. DETAILS PAGE (Req 1.4)
function DetailsPage({ products }) {
  const { id } = useParams();
  const product = products.find(p => p.id === Number(id));
  return (
    <div className="container">
      {product ? (
        <>
          <h1>{product.name}</h1>
          <img src={product.img} alt={product.name} width="300" />
          <p>Description: {product.desc}</p>
          <p>Specs: {product.spec}</p>
          <p>Rating: {product.rating} ★</p>
          <Link to="/">Back to Home</Link>
        </>
      ) : <p>Not found</p>}
    </div>
  );
}