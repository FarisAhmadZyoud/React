import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Loader from '../../../components/Loader';

export default function ProductsDetails() {
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const getDetails = async () => {
      try {
        const { data } = await axios.get(`https://ecommerce-node4-five.vercel.app/products/${id}`);
        setProduct(data.product);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product details:', error);
      }
    };
    getDetails();
  }, [id]);

  const addToCart = async (productId) => {
    try {
      const token = localStorage.getItem('userToken');
      const { data } = await axios.post(
        'https://ecommerce-node4-five.vercel.app/cart',
        { productId },
        {
          headers: {
            Authorization: `Tariq__${token}`
          }
        }
      );
      console.log(data);
    } catch (error) {
      console.error('Error adding product to cart:', error);
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="container mt-4">
          <div className="row">
            <div className="col-md-4 mb-4">
              <div className="card h-100">
                <img src={product.mainImage.secure_url} alt={product.name} className="card-img-top" />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  <p className="card-text">Price ${product.price}</p>
                </div>
                <div className="card-footer d-flex flex-row justify-content-between">
                  <button className="btn btn-primary btn-block" onClick={() => addToCart(product._id)}>
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
