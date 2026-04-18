import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import LetrasScreen from './screens/LetrasScreen';
import NumerosScreen from './screens/NumerosScreen';
import SumasScreen from './screens/SumasScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Letras" component={LetrasScreen} />
        <Stack.Screen name="Numeros" component={NumerosScreen} />
        <Stack.Screen name="Sumas" component={SumasScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}