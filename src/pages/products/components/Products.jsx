import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Loader from '../../../components/Loader';

export default function Products() {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const { id } = useParams('id');
  console.log(id);

  const getProducts = async (page = 1) => {
    try {
      const { data } = await axios.get(`https://ecommerce-node4-five.vercel.app/products?page=${page}&limit=3`);
      console.log(data);
      setProducts(data.products);
      setTotalPages(Math.ceil(data.total / 3));
      setLoading(false);
      return data;
    } catch (error) {
      console.error('Error fetching products:', error);
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    (async () => {
      await getProducts(currentPage);
    })();
  }, [currentPage]);

  const addToCart = async (id) => {
    console.log(id);
    const token = localStorage.getItem('userToken');
    const { data } = await axios.post(`https://ecommerce-node4-five.vercel.app/cart`, {
      productId: id,
    }, {
      headers: {
        Authorization: `Tariq__${token}`
      }
    });
    console.log(data);
  };

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="container mt-4">
          <div className="row">
            {products.map(product => (
              <div className="col-md-4 mb-4" key={product.id}>
                <div className="card h-100">
                  <img
                    src={product.mainImage.secure_url}
                    alt={product.name}
                    className="card-img-top"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{product.name}</h5>
                    <p className="card-text">Price ${product.price}</p>
                  </div>
                  <div className="card-footer d-flex flex-row justify-content-between">
                    <button
                      className="btn btn-primary btn-block"
                      onClick={() => addToCart(product._id)}
                    >
                      Add to cart
                    </button>
                    <Link to={`/ProductsDetails/${product._id}`}>
                      <button className="btn btn-primary btn-block">Details</button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <nav aria-label="Page navigation example">
            <ul className="pagination justify-content-center">
              <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>Previous</button>
              </li>
              {[...Array(totalPages)].map((_, index) => (
                <li key={index} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
                  <button className="page-link" onClick={() => handlePageChange(index + 1)}>
                    {index + 1}
                  </button>
                </li>
              ))}
              <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>Next</button>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </>
  );
}
