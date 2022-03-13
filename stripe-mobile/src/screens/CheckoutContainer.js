import { View, Text, StyleSheet } from 'react-native';
import { StripeProvider } from "@stripe/stripe-react-native";
import Checkout from "../components/Checkout"
import React, { useState, useEffect } from 'react';
import * as Linking from 'expo-linking';
import { StatusBar } from 'expo-status-bar';


function CheckoutContainer({navigation, route}) {
  const { itemId, otherParam } = route.params;

  console.log(itemId);
  const [data, setData] = useState(
    null
  );


  function handleDeepLink(event) {
    let data = Linking.parse(event.uri);
    setData(data);
  }

  useEffect(() => {
    async function getInitialURL() {
      const initialUrl = await Linking.getInitialURL();
      if(initialUrl) setData(Linking.parse(initialUrl));
    }


    Linking.addEventListener('url', handleDeepLink);

    if(!data) {
      getInitialURL();
    }
    return (() => {
      Linking.removeEventListener('url');
    })
  }, [])
  


    return ( 
        <View style={styles.container}>
            <StatusBar style="dark" />
            <Text>{data? JSON.stringify(data) : "App not oppend from deep link"}</Text>
            <Text>itemId: {JSON.stringify(itemId)}</Text>
      <Text>otherParam: {JSON.stringify(otherParam)}</Text>
              <StripeProvider publishableKey="(stripe publishable key here)">
                <Checkout />
              </StripeProvider>
          </View>
     );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default CheckoutContainer;