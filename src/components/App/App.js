import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';
import { ProductCount } from '../ProductCount/ProductCount';
import { formatPrice } from '../../formatters/formatPrice';

const App = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('/api/cart')
      .then(res => {
        const newProducts = res.data.map(x => {
          return {
            ...x,
            quantity: 0
          }
        });
        setProducts(newProducts);
      });
  }, []);

  const changeProductsValue = (pid, quantity) => {
    const newProducts = [...products];
    const product = newProducts.find(x => x.pid === pid);
    if (product) {
      product.quantity = quantity;
      setProducts(newProducts);
    }
  };

  const getProductsSum = () => {
    return products
      .map(x => x.quantity * x.price)
      .reduce((a, b) => a + b, 0);
  };

  return (
    <div className="container">
      <h3>Lista produktów</h3>
      <ul>
        {products.map(product => (
          <li key={product.pid} className="row">
            <div>{product.name}, cena: {formatPrice(product.price)}</div>
            <ProductCount
              pid={product.pid}
              min={product.min}
              max={product.max}
              isBlocked={product.isBlocked}
              changeProductsValue={changeProductsValue}
            />
          </li>
        ))}
        <li className="summary">Suma: {formatPrice(getProductsSum())}</li>
      </ul>
    </div>
  );
};

export {
    App
};
