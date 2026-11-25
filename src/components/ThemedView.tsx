import { createContext, createElement, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';
import type { ViewProps } from 'react-native';

// Define los colores para los dos temas de la aplicación.
export const COLORS = {

  // Colores para el modo claro.
  light: {
    background: '#F7F8FC', // Fondo de las pantallas.
    card: '#FFFFFF',       // Fondo de las tarjetas.
    text: '#202333',       // Color principal de los textos.
    secondary: '#70798C',  // Color de los textos secundarios.
    border: '#E5E8F0',     // Color de los bordes.
    accent: '#596DDC',     // Color principal de botones e iconos.
  },

  // Colores para el modo oscuro.
  dark: {
    background: '#171925', // Fondo oscuro de las pantallas.
    card: '#252838',       // Fondo oscuro de las tarjetas.
    text: '#F6F7FB',       // Color principal de los textos.
    secondary: '#B7BCD0',  // Color de los textos secundarios.
    border: '#414557',     // Color de los bordes.
    accent: '#A1AFFA',     // Color principal de botones e iconos.
  },
};

// Define los datos que compartirá el contexto del tema.
type ThemeContextValue = {
  dark: boolean;          // Indica si el modo oscuro está activado.
  toggleTheme: () => void; // Función para cambiar de tema.
};

// Crea el contexto que compartirá el tema entre componentes.
// null indica que inicialmente no tiene un proveedor asignado.
const ThemeContext = createContext<ThemeContextValue | null>(null);

// Proveedor que comparte el tema con las pantallas.
export function ThemeProvider({
  children // Representa los componentes que estarán dentro del proveedor.
}: {
  children: ReactNode // Permite recibir elementos de React.
}) {

  // Guarda el estado del tema; false significa modo claro.
  const [dark, setDark] = useState(false);

  // Cambia el tema al contrario del actual.
  // Si es false, pasa a true; si es true, pasa a false.
  const toggleTheme = () => setDark((current) => !current);

  // Comparte el estado y la función con los componentes hijos.
  return createElement(
    ThemeContext.Provider, // Proveedor del contexto.
    {
      value: { dark, toggleTheme }, // Datos compartidos.
      children // Componentes que recibirán el contexto.
    }
  );
}

// Hook personalizado que permite consultar el tema actual.
export function useAppTheme() {

  // Obtiene los datos guardados en ThemeContext.
  const theme = useContext(ThemeContext);

  // Muestra un error si el componente no está dentro de ThemeProvider.
  if (!theme) {
    throw new Error('useAppTheme necesita ThemeProvider');
  }

  // Devuelve el estado, la función y los colores correspondientes.
  return {
    ...theme, // Incluye dark y toggleTheme.

    // Si dark es true, usa colores oscuros; si no, claros.
    colors: theme.dark ? COLORS.dark : COLORS.light
  };
}

// Define las propiedades que puede recibir ThemedView.
type Props = ViewProps & {

  children: ReactNode; // Contenido que aparecerá dentro de la vista.

  card?: boolean; // Indica si se utiliza el fondo de una tarjeta.
};

// Componente reutilizable que cambia de color según el tema.
export default function ThemedView({
  children,      // Contenido que se mostrará dentro.
  card = false,  // Por defecto utiliza el fondo de pantalla.
  style,         // Permite recibir estilos adicionales.
  ...props       // Recoge las demás propiedades de View.
}: Props) {

  // Obtiene los colores del tema seleccionado.
  const { colors } = useAppTheme();

  // Devuelve la vista con el fondo correspondiente.
  return (
    <View
      {...props} // Aplica las demás propiedades recibidas.
      style={[
        styles.base, // Aplica el estilo básico.

        {
          // Si card es true, utiliza el fondo de tarjeta.
          // Si card es false, utiliza el fondo de pantalla.
          backgroundColor: card
            ? colors.card
            : colors.background
        },

        style // Aplica los estilos adicionales recibidos.
      ]}
    >
      {children} {/* Muestra el contenido dentro de la vista. */}
    </View>
  );
}

// Define los estilos nativos del componente.
const styles = StyleSheet.create({

  base: {
    flex: 1, // Permite que la vista ocupe el espacio disponible.
  },

});
