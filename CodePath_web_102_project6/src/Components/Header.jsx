import React from 'react'
import MainBody from './MainBody'
import {Routes, Route} from 'react-router-dom'
import Detail from './Detail'

function Header() {
  return (
   <>
     <div className='flex mt-3 flex-1'>
     <div className=''>
        <h1 className='text-green-700 font-bold text-4xl'>Brewery</h1>
        <ul className='text-2xl font-semibold mt-10'>
            <li><button className='text-teal-600 mb-2 hover:text-green-600 cursor-pointer'>Dashboard</button></li>
            <li><button className='text-teal-600 mb-2 hover:text-green-600 cursor-pointer'>Search</button></li>
            <li><button className='text-teal-600 mb-2 hover:text-green-600 cursor-pointer'>About</button></li>
        </ul>
    </div>

    <div className='w-auto text-center'>
        
        <Routes>
          <Route path='/' element={<MainBody/>}>
           <Route path='/:id' index={true} element={<Detail/>}/>
          </Route>
        </Routes>
    </div>
     </div>
   </>
  )
}

export default Header