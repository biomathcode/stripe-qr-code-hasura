import React, { useState, useEffect } from "react";

import QRCode from "qrcode.react";

import { useMutation, useSubscription, gql } from "@apollo/client";
import { ADD_TOKEN, SUBSCRIPTION } from "../graphql";
import { v4 as uuidv4 } from "uuid";




function QrGenerator({token, quantity}) {

  const { data, loading, error } = useSubscription(SUBSCRIPTION, {
    variables: { id: token },
  });

  if (loading) {
    return <div>loading...</div>;
  }
  if(error) {
   return  console.log(error)
  }


  const checkout = `${window.location.origin}/checkout?token=${token}&quantity=${quantity}`;

  console.log(checkout)
  return (
    <div>
      <h3 style={{color: 'white', zIndex:5, marginBottom:'100px'}}>Status: {data.token_by_pk.status}</h3>

       <QRCode value={checkout} size={250} includeMargin={true} />;


    </div>
  )
  
};



function CoffeeShop() {

  const [product, setProduct] = React.useState();

  const [QR, setQR] = useState(false);

  const [token, setToken] = useState("");

  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      const getProduct = await fetch("/products").then((res) => res.json());
      console.log(getProduct);
      setProduct(getProduct);
    };
    fetchProducts();
  }, []);

  const ProductDisplay = () => {
    const [AddToken, { data, loading, error }] = useMutation(ADD_TOKEN);


    const createToken = uuidv4();

    const handleClick = async () => {
      const token =  await AddToken({
        variables: {
          id: createToken,
          status: "inprogress",
        },
      });


      setToken(token.data.insert_token.returning[0].id);

      setQR(true);
    };

    if (loading) {
      return <div>loading... </div>;
    }

    if (error) {
      return <div>Something went wrong!</div>;
    }

    return (
      <div>
        {product.map((el) => (
          <div className="flex js card" key={el.key}>
            <h2>{el.name}</h2>
            <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} />
          </div>
        ))}
        <button className="btn" onClick={handleClick}>
          Generate Qr code
        </button>
      </div>
    );
  };


  return (
    <>
      <div className="App flex column center ">
        <div>
          <h2 className="card">Welcome to Coffee Shop</h2>
        </div>
        {product && <ProductDisplay />}
        
        { QR && token ? (
          <div className="card flex center">
            <QrGenerator token={token} quantity={quantity} />
          </div>
        ): 
        <div>
          <div> Generate a QR code to pay via mobile app  </div>
        </div> }
      </div>
    </>
  );
}

export default CoffeeShop;
