import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { StripeProvider } from "@stripe/stripe-react-native";
import Checkout from "./components/Checkout";

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
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
