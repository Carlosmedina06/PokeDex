import { NativeBaseProvider } from 'native-base'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

import customTheme from './src/theme'
import Home from './src/views/Home/Home'
import Details from './src/views/Details/Details'
import { type MainStackParamList } from './src/interfaces'

const Stack = createNativeStackNavigator<MainStackParamList>()
const queryClient = new QueryClient()

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <NativeBaseProvider theme={customTheme}>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Home">
            <Stack.Screen
              component={Home}
              name="Home"
              options={{
                headerShown: false,
              }}
            />
            <Stack.Group screenOptions={{ presentation: 'modal' }}>
              <Stack.Screen
                component={Details}
                name="Details"
                options={{
                  headerShown: true,
                  headerTransparent: true,
                  headerTitle: '',
                }}
              />
            </Stack.Group>
          </Stack.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </QueryClientProvider>
  )
}
