import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react';
import './ProductList.css'; // Import the CSS file
import axios from 'axios';
export default function CategoryProducts() {
    const {id} = useParams('id'); 
    console.log(id); 
    const [products,setProducts]= useState([]); 
    const controller=new AbortController(); 

   const getProducts = async ()=>{
      const {data} = await axios.get(`https://ecommerce-node4-five.vercel.app/products/category/${id}`);
      console.log(data);
    setProducts(data.products);
   }
    useEffect(()=>{
        getProducts();
        return ()=>{
            controller.abort();
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
     { 
      <div className="d-flex flex-wrap">
      {products.map(product => (
        <div className="product" key={product.id}>
           <img
            src={product.mainImage.secure_url}
            alt={product.name}
            className="img-fluid product-image"
          />
          <h3>{product.name}</h3>
          <button onClick={() => addToCart(product._id)}>Add to cart</button>
        </div>
      ))}
    </div>



     }
    </>
  )
}
