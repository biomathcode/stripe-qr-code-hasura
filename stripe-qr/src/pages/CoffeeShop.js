import React, {useState, useEffect} from 'react';

import {useMutation, useSubscription, gql } from '@apollo/client';



function CoffeeShop() {

    const [input,setInput] = React.useState(1);



    return ( 
        <>
         <div className='App flex column center '>
            <div>
            <h2 className='card'>Welcome to Coffee Shop</h2>
            </div>

            <div className='flex js card'>

                 <h2 >Black Coffee</h2>

                 <img src='/asserts/espresso.webp' alt='black coffee' height={300} width={300} />


            </div>
            <input value={input} className="input" onChange={(e) => setInput(e.target.value)} min="1" type="number" />

            
            <button className='card'> 
                Create Qr Code 
            </button>
        </div>
        
        
        </>
       
     );
}

export default CoffeeShop;