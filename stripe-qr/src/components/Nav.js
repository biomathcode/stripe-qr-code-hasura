import React from 'react';
import { Link } from 'react-router-dom';


function Navbar() {
    return ( 
    <div className='flex center' style={{position:'sticky', top:'5px', display:'flex', justifyContent:'flex-end'}}>
        <nav className='navbar js' style={{width:'20vw',alignSelf:'center', display:'flex'}}>
            <div className='flex ' style={{justifyContent: 'space-evenly'}} >
                <Link to="/" style={{marginRight:'10px'}} >
                <li style={{listStyle:'none'}}>
                    Home
                </li>

                </Link>
                <Link to={"/shop"} style={{marginRight:'10px'}}>
                    <li>
                        Shop
                    </li>
                </Link>

                <li>
                            Go Back 
                        </li>
        
            </div>

              
           
        </nav>

    </div>
        
     );
}

export default Navbar;