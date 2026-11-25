import { Tabs, router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Pressable } from 'react-native';
import { useAppTheme } from '../../components/ThemedView';

// Configura las dos pestañas inferiores de la aplicación.
export default function TabsLayout() {

  // Obtiene los colores del tema claro u oscuro.
  const { colors } = useAppTheme();

  // Devuelve la navegación por pestañas.
  return (
    <Tabs
      screenOptions={{

        // Color de fondo de la barra superior.
        headerStyle: {
          backgroundColor: colors.card
        },

        // Color del título de la barra superior.
        headerTintColor: colors.text,

        // Colores de la barra inferior.
        tabBarStyle: {
          backgroundColor: colors.card,
          borderTopColor: colors.border
        },

        // Color de la pestaña seleccionada.
        tabBarActiveTintColor: colors.accent,

        // Color de las pestañas no seleccionadas.
        tabBarInactiveTintColor: colors.secondary,

        // Botón del menú en la parte superior derecha.
        headerRight: () => (
          <Pressable
            onPress={() => router.push('/(drawer)/progreso')}
            accessibilityLabel="Abrir secciones de Progreso y Perfil"
            style={{ marginRight: 18 }}
          >
            <Ionicons
              name="menu-outline"
              size={27}
              color={colors.text}
            />
          </Pressable>
        ),
      }}
    >

      {/* Primera pestaña: pantalla Hoy. */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Hoy',

          // Icono de inicio.
       tabBarIcon: ({ size }) => (
  <Ionicons
    name="home-outline"
    color={colors.accent}
    size={size}
  />
),
        }}
      />

      {/* Segunda pestaña: pantalla Hábitos. */}
      <Tabs.Screen
        name="habits"
        options={{
          title: 'Hábitos',

          // Icono de ejercicio.
tabBarIcon: ({ size }) => (
  <Ionicons
    name="barbell-outline"
    color={colors.accent}
    size={size}
  />
),
        }}
      />

    </Tabs>
  );
}