import {useLocation} from 'react-router-dom';
import {useState, useEffect} from 'react';
import { useMutation } from '@apollo/client';
import { UPDATE_TOKEN } from '../graphql';


function Success() {

    const [updateToken, { tokenData, loading, error }] = useMutation(UPDATE_TOKEN);


    const [data, setData] = useState();

    const useQuery = () => new URLSearchParams(useLocation().search);

    const sessionId = useQuery().get("session_id");

    const token = useQuery().get('token')

    if(token) {
        const tokenUpdate = updateToken({variables: {
            id: token, 
            status: 'success'
        }})

        console.log(tokenUpdate);
    }

    useEffect(() => {
        const fetchSessionData= async () =>{
            const queryParam = new URLSearchParams({
                id: sessionId
            });

            const sessionData = await fetch("/get-checkout-session?" + queryParam).then(res => res.json())

            setData(sessionData);
        }
        fetchSessionData()
    }, [])


    return ( 
        <div>
            <h2>Your order will be ready soon</h2>
           {data &&  (
                <a href={data.payment_intent.charges.data[0].receipt_url} target="_blank" rel='noreferrer'
                >
                    <button>View Receipt</button> 
                </a>
            )
           }
            
        </div>
     );
}

export default Success;