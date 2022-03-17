import { useEffect } from "react";
import {loadStripe} from '@stripe/stripe-js';
import {useSearchParams} from 'react-router-dom';


function Checkout() {

  const [searchParams] = useSearchParams();
  const tokenId = searchParams.get('token')
  const quantity = searchParams.get('quantity')

    useEffect(() => {
        const initialCheckout = async () => {
            const {publishableKey }= await fetch('/config').then((res) => res.json());
            const stripe = await loadStripe(publishableKey);

            const {id} = await fetch('/create-checkout-session', {
                method:'POST', 
                body: {
                    quantify: quantity, 
                    token: tokenId, 
                }
            }).then((res) => res.json());

            const {error} = await stripe.redirectToCheckout({
                sessionId: id
            })

            if (error) {
                console.log(error);
            }

        }

        initialCheckout();
    }, [])


    return ( 
        <div>
            <p>Loadding</p>

        </div>
     );
}

export default Checkout;