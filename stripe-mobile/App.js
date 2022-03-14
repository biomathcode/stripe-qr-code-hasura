import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import client from './src/apollo';
import { ApolloProvider } from '@apollo/client';
import * as Linking from 'expo-linking';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import CheckoutContainer from './src/screens/CheckoutContainer';
import Home from './src/screens/Home';

import DetailsScreen from './src/screens/Details';


const Stack = createNativeStackNavigator();

const prefix = Linking.makeUrl('/');


export default function App() {
  const linking = {
    prefixes: [prefix],
    config: {
      screens: {
        Home: "Home", 
        Details: "Details",
        Checkout: "Checkout/:id"
      }
    }
  };
  return (
    <>
      <ApolloProvider client={client}>

<NavigationContainer linking={linking} fallback={<Text>Loading...</Text>}>

  <Stack.Navigator initialRouteName='Home'>
    <Stack.Screen name='Home' component={Home}/>
    <Stack.Screen name='Details' component={DetailsScreen}/>
    <Stack.Screen name='Checkout'  component={CheckoutContainer}/>
  </Stack.Navigator>

</NavigationContainer>
</ApolloProvider>
    
    
    </>
  
  );
}

