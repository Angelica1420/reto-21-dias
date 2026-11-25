
import { createContext, createElement, useContext, useState } from 'react';
import type { ReactNode } from 'react';
import { View, StyleSheet } from 'react-native';
import type { ViewProps } from 'react-native';

// Colores para el modo claro y oscuro.
export const COLORS = {
  light: {
    background: '#F7F8FC',
    card: '#FFFFFF',
    text: '#202333',
    secondary: '#70798C',
    border: '#E5E8F0',
    accent: '#596DDC',
  },

  dark: {
    background: '#171925',
    card: '#252838',
    text: '#F6F7FB',
    secondary: '#B7BCD0',
    border: '#414557',
    accent: '#A1AFFA',
  },
};

// Define los datos que comparte el tema.
type ThemeContextValue = {
  dark: boolean;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

// Comparte el tema con todas las pantallas.
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [dark, setDark] = useState(false);

  // Cambia entre modo claro y oscuro.
  const toggleTheme = () => setDark((current) => !current);

  return createElement(ThemeContext.Provider, {
    value: { dark, toggleTheme },
    children,
  });
}

// Permite consultar el tema actual.
export function useAppTheme() {
  const theme = useContext(ThemeContext);

  if (!theme) {
    throw new Error('useAppTheme necesita ThemeProvider');
  }

  return {
    ...theme,
    colors: theme.dark ? COLORS.dark : COLORS.light,
  };
}

// Propiedades que recibe el componente.
type Props = ViewProps & {
  children: ReactNode;
  card?: boolean;
};

// Componente reutilizable que cambia el fondo según el tema.
export default function ThemedView({
  children,
  card = false,
  style,
  ...props
}: Props) {
  const { colors } = useAppTheme();

  return (
    <View
      {...props}
      style={[
        styles.base,
        {
          backgroundColor: card ? colors.card : colors.background,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

// Estilo básico de la vista.
const styles = StyleSheet.create({
  base: {
    flex: 1,
  },
});
