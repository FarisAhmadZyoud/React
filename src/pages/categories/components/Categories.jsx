import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { Link } from 'react-router-dom';
import Loader from '../../../components/Loader';
function Categories() {
  const [loading, setLoading] = useState(true);

  const [categories, setCategories] = useState([]);

  const getCategories = async () => {
    const { data } = await axios.get('https://ecommerce-node4-five.vercel.app/categories/active?limit=10');
    const response = await data.categories;
    setCategories(response);
    setLoading(false)
  };

  useEffect(() => {
    getCategories();
  }, []);

  // Settings for the slider
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5, // Number of slides to show at a time
    slidesToScroll: 1 // Number of slides to scroll at a time
  };

  return (
    <>
      {loading ? (
              
              <Loader/> // Render Loader component while data is being fetched
            ) :(        
    <div className="container my-4 ">
    <Slider {...sliderSettings}>
      {categories.map(category => (
        <div key={category.id}>
         
          <Link to={`/Categories/${category.id}`}> <img src={category.image.secure_url} alt={category.name}/> </Link>
        </div>
      ))}
    </Slider>
    </div>
            )}
    </>
  );
  
}

export default Categories;
