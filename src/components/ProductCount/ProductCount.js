import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import _ from 'lodash';
import './ProductCount.css';

const ProductCount = ({pid, min, max, isBlocked, changeProductsValue}) => {
  const [quantity, setQuantity] = useState(min);
  const [rangeCheck, setRangeCheck] = useState({});

  useEffect(() => {
    changeProductsValue(pid, quantity);
    const check = _.debounce(sendCheckRequest, 500);
    setRangeCheck(prevRangeCheck => {
      if (prevRangeCheck.cancel) prevRangeCheck.cancel();
      return check;
    });

    check();
  }, [quantity]);

  const sendCheckRequest = () => {
    axios.post('/api/product/check', {pid, quantity})
      .catch(err => setQuantity(min));
  }

  const increment = () => {
    if (quantity < max || max == undefined) setQuantity(quantity + 1);
  };

  const decrement = () => {
    if (quantity > min || min == undefined) setQuantity(quantity - 1);
  };

  return (
    <div className="product-count-container">
      <button className="btn-quantity" disabled={isBlocked} onClick={increment}>+</button>
      <button className="btn-quantity" disabled={isBlocked} onClick={decrement}>-</button>
      <span>Obecnie masz {quantity} sztuk produktu</span>
    </div>
  );
};

ProductCount.propTypes = {
  pid: PropTypes.string.isRequired,
  min: PropTypes.number,
  max: PropTypes.number,
  isBlocked: PropTypes.bool,
  changeProductsValue: PropTypes.func
};

ProductCount.defaultProps = {
  min: 1
};

export {
  ProductCount
};
