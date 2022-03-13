import {View, Text, Button} from 'react-native';



function HomeScreen({navigation}) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button
        title="Details Page"
        onPress={() => navigation.navigate('Details')}
      />
       <Button
        title="Details Page"
        onPress={() => navigation.navigate('Checkout')}
      />
      </View>
    );
  }
  
export default HomeScreen;  