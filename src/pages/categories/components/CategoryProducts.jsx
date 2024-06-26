import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import Loader from '../../../components/Loader';
import './ProductList.css'; // Import the CSS file
import axios from 'axios';
export default function CategoryProducts() {
  const [loading, setLoading] = useState(true);
    const {id} = useParams('id'); 
    console.log(id); 
    const [products,setProducts]= useState([]); 
    const controller=new AbortController(); 

   const getProducts = async ()=>{
      const {data} = await axios.get(`https://ecommerce-node4-five.vercel.app/products/category/${id}`);
      console.log(data);
    setProducts(data.products);
    setLoading(false);
   }
    useEffect(()=>{
        getProducts();
        return ()=>{
           // controller.abort();
        }
    },[])
         const addToCart = async (id)=>{
            console.log(id);
            const token= localStorage.getItem('userToken');
           const {data} = await axios.post(`https://ecommerce-node4-five.vercel.app/cart`,{

          productId:id,

           }, {
             headers:{
                Authorization:`Tariq__${token}`
             }

           });
           console.log(data);
         }
         return (
          <>
            {loading ? (
              
              <Loader/> // Render Loader component while data is being fetched
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
                          <p className="card-text"> Price ${product.price}</p>
                        </div>
                        <div className="card-footer d-flex flex-row justify-content-between">
                          <button
                            className="btn btn-primary btn-block"
                            onClick={() => addToCart(product._id)}
                          >
                            Add to cart
                          </button>
                        
                       <Link to={`/ProductsDetails/${product._id}`}>
                                   <button className="btn btn-primary btn-block">   Details
                                   </button>

                                     </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </>
        );
      }