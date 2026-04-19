import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { useFonts, Nunito_700Bold, Nunito_400Regular, Nunito_800ExtraBold } from '@expo-google-fonts/nunito';
import { View, ActivityIndicator } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import LetrasScreen from './screens/LetrasScreen';
import LetrasDetalleScreen from './screens/LetrasDetalleScreen';
import NumerosScreen from './screens/NumerosScreen';
import SumasScreen from './screens/SumasScreen';

const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({ Nunito_700Bold, Nunito_400Regular, Nunito_800ExtraBold });

  if (!fontsLoaded) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#FAE8FF' }}>
        <ActivityIndicator size="large" color="#A855F7" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Letras" component={LetrasScreen} />
        <Stack.Screen name="LetrasDetalle" component={LetrasDetalleScreen} />
        <Stack.Screen name="Numeros" component={NumerosScreen} />
        <Stack.Screen name="Sumas" component={SumasScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}