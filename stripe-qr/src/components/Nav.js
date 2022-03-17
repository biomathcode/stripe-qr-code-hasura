import React from 'react';
import { Link, useNavigate } from 'react-router-dom';


function Navbar() {

    const history = useNavigate()

    return ( 
    <div className='flex center' style={{position:'sticky', top:'5px',right:'10%',  display:'flex', justifyContent:'flex-end'}}>
        <nav className='navbar js' style={{width:'15vw',position:'sticky', right:'10%',   alignSelf:'center', display:'flex'}}>
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

           
                    <li onClick={() => history(-1)}>
                Back 
                        </li>
            
            </div>

              
           
        </nav>

    </div>
        
     );
}

export default Navbar;