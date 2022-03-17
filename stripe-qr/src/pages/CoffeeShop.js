import React, { useState, useEffect } from "react";

import QRCode from "qrcode.react";

import { useMutation, useSubscription, gql } from "@apollo/client";
import { ADD_TOKEN, SUBSCRIPTION } from "../graphql";
import { v4 as uuidv4 } from "uuid";

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

    const handleClick = async () => {
      const token = await AddToken({
        variables: {
          id: uuidv4(),
          status: "inprogress",
        },
      });

      console.log(token);
      setToken(token);

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
        {product[0].map((el) => (
          <div className="flex js card" key={el.key}>
            <h2>{el.name}</h2>
            <input value={quantity} onChange={(e) => setQuantity(e.target.value)} />
          </div>
        ))}
        <button className="btn" onClick={handleClick}>
          Generate Qr code
        </button>
      </div>
    );
  };

  const QrGenerator = (token, quantity) => {
    const { data, loading } = useSubscription(SUBSCRIPTION, {
      variables: { token },
    });

    if (loading) {
      return <div>loading...</div>;
    }

    if (data) {
      console.log(data);
    }

    const checkout = `${window.location.origin}/checkout?token=${token}&quantity=${quantity}`;
    return <QRCode value={checkout} size={250} includeMargin={true} />;
  };

  return (
    <>
      <div className="App flex column center ">
        <div>
          <h2 className="card">Welcome to Coffee Shop</h2>
        </div>
        {product && <ProductDisplay />}
        {QRCode && QR && (
          <div className="card flex center">
            <QrGenerator token={token} quantity={quantity} />
          </div>
        )}
      </div>
    </>
  );
}

export default CoffeeShop;
