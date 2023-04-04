import React from 'react'
import { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';

function Detail() {
   const{handle}= useParams()
   const location= useLocation()
   const data= location.state
   console.log(data)
//    console.log(handle.id)

  return (
    <div className='text-left bg-gray-700 rounded-lg max-w-sm'>
        <h1 className='text-center text-4xl text-green-700 font-bold m-3'>{data.name}</h1>
        <ul>
            <li className='text-xl p-1'><span className='text-green-600'>Address 1</span>: {data.address_1}</li>
            <li className='text-xl p-1'><span className='text-green-600'>Address 2</span>: {data.address_2}</li>
            <li className='text-xl p-1'><span className='text-green-600'>Address 3</span>: {data.address_2}</li>
            <li className='text-xl p-1'><span className='text-green-600'>Brewery_type: </span>{data.brewery_type}</li>
            <li className='text-xl p-1'><span className='text-green-600'>City: </span>{data.city}</li>
            <li className='text-xl p-1'><span className='text-green-600'>Country: </span>{data.country}</li>
            <li className='text-xl p-1'><span className='text-green-600'>Phone: </span>{data.phone}</li>
            <li className='text-xl p-1'><span className='text-green-600'>Website Url: </span>{data.website_url}</li>
        </ul>
    </div>
  )
}

export default Detail