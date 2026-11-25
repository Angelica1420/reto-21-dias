import 'react-native-gesture-handler';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { HabitsProvider } from '../hooks/useHabits';
import { ThemeProvider, useAppTheme } from '../components/ThemedView';

// El Stack es el navegador principal y agrupa las otras navegaciones.
function RootNavigation() {
  const { dark } = useAppTheme();
  return <>
    <StatusBar style={dark ? 'light' : 'dark'} />
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="(tabs)" />
      <Stack.Screen name="(drawer)" />
    </Stack>
  </>;
}

// Los proveedores mantienen el tema y los hábitos al cambiar de pantalla.
export default function RootLayout() {
  return (
    <ThemeProvider>
      <HabitsProvider>
        <RootNavigation />
      </HabitsProvider>
    </ThemeProvider>
  );
}
