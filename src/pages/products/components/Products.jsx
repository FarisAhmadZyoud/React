import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react';
import axios from 'axios';
import Loader from '../../../components/Loader';
export default function Products() {
  const [loading, setLoading] = useState(true);

    const {id} = useParams('id'); 
    console.log(id); 
    const [products,setProducts]= useState([]); 
    const controller=new AbortController(); 

   const getProducts = async ()=>{
      const {data} = await axios.get('https://ecommerce-node4-five.vercel.app/products?page=1&limit=10');
      console.log(data);
    setProducts(data.products);
    setLoading(false);
   }
    useEffect(()=>{
        getProducts();
        return ()=>{
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
                      <div className="card-footer">
                        <button
                          className="btn btn-primary btn-block"
                          onClick={() => addToCart(product._id)}
                        >
                          Add to cart
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div> 
            )}
          </>
        );
      };
