import React from 'react';
import { Link } from 'react-router-dom';



function Home() {
    return ( 
        <div className=" ">
        <main className='App flex center'>
        <div className='box flex column  center'>
        <h1 >
        <span >
          🥷
          </span> <br/>
          Introducing 
        
            <br/>
          <span>
          Stripe QR
          </span>
       
        </h1>
        <Link className='btn' to={"/shop"}>Visit Shop</Link>

        </div>

        </main>
        <div className=' flex center' style={{textAlign:'center'}}>
            <h2 className=' para'> This is a prototype feature build on top of Stripe API to connect web application with mobile app such that user can continue his transaction on his mobile via scanning a QR code.  </h2>
        </div>

        <section className='features flex center column'>
        <div className='card'>
          <h2>
          Examples - Web browser
          </h2>
         </div>
         <div className='card flex js'>
           <h3>Static Example</h3>
           <Link className='btn' to={"/static"} > Go here </Link>
         </div>
         <div className='card flex js'>
           <h3>Dynamic Example</h3>
           <Link className='btn' to={"/dynamic"} > Go here </Link>

         </div>
         <div className='card flex js'>
           <h3>Time Bound</h3>
           <Link  className='btn' to={"/time"} > Go here </Link>
           
         </div>
       
  
        </section>


        <section className='features flex center column'>
            <div className='card'>
            <h2>
            Examples - Deep Linking
            </h2>
            </div>
            <div className='card flex js'>
            <h3> </h3>
            <Link className='btn' to={"/static"} > Go here </Link>
            </div>
            <div className='card flex js'>
            <h3>Dynamic Example</h3>
            <Link className='btn' to={"/dynamic"} > Go here </Link>

            </div>
            <div className='card flex js'>
            <h3>Time Bound</h3>
            <Link className='btn' to={"/time"} > Go here </Link>
            
            </div>
       
  
        </section>
  
      </div>
     );
}

export default Home;