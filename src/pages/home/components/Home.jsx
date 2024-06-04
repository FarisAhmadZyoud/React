import React from 'react'
import Categories from '../../categories/components/Categories'
import myImage from '../components/mainImage.jpg';

export default function Home() {

  return (
    <>
      <div className="container my-4  ">

      <img src={myImage} alt='Main Image' />
   <Categories/>
    </div>
   </>
  )
}
