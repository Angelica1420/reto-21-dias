import { Tabs, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Pressable } from 'react-native';
import { useAppTheme } from '../../components/ThemedView';

// Dos pestañas inferiores iguales a las observadas en la referencia.
export default function TabsLayout() {
  const { colors } = useAppTheme();
  return (
    <Tabs screenOptions={{
      headerStyle: { backgroundColor: colors.card },
      headerTintColor: colors.text,
      tabBarStyle: { backgroundColor: colors.card, borderTopColor: colors.border },
      tabBarActiveTintColor: colors.accent,
      tabBarInactiveTintColor: colors.secondary,
      headerRight: () => (
        <Pressable onPress={() => router.push('/(drawer)/progreso')}
          accessibilityLabel="Abrir secciones de Progreso y Perfil" style={{ marginRight: 18 }}>
          <Ionicons name="menu-outline" size={27} color={colors.text} />
        </Pressable>
      ),
    }}>
      <Tabs.Screen name="index" options={{ title: 'Hoy',
        tabBarIcon: ({ color, size }) => <Ionicons name="home-outline" color={color} size={size} /> }} />
      <Tabs.Screen name="habits" options={{ title: 'Hábitos',
        tabBarIcon: ({ color, size }) => <Ionicons name="barbell-outline" color={color} size={size} /> }} />
    </Tabs>
  );
}
