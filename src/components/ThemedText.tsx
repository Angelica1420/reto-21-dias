import { Text, StyleSheet } from 'react-native';
import type { TextProps } from 'react-native';
import { useAppTheme } from './ThemedView';

// Define las propiedades que puede recibir el componente.
type Props = TextProps & {
  secondary?: boolean; // Indica si utiliza el color secundario.
  heading?: boolean;   // Indica si el texto es un título.
};

// Componente reutilizable para mostrar textos.
export default function ThemedText({
  secondary = false, // Por defecto, no utiliza el color secundario.
  heading = false,   // Por defecto, no es un título.
  style,             // Recibe estilos adicionales.
  ...props           // Guarda las demás propiedades del texto.
}: Props) {

  // Obtiene los colores del tema claro u oscuro.
  const { colors } = useAppTheme();

  // Devuelve el componente Text con sus propiedades y estilos.
  return (
    <Text
      {...props} // Pasa las demás propiedades al componente Text.
      style={[
        styles.base, // Aplica el tamaño de letra normal.

        heading && styles.heading, // Si heading es true, aplica estilo de título.

        {
          // Si secondary es true, utiliza el color secundario.
          // Si es false, utiliza el color principal del texto.
          color: secondary ? colors.secondary : colors.text
        },

        style // Aplica los estilos adicionales recibidos.
      ]}
    />
  );
}

// Estilos compartidos para los textos.
const styles = StyleSheet.create({

  base: {
    fontSize: 15, // Tamaño de letra normal.
  },

  heading: {
    fontSize: 23,      // Tamaño de letra para títulos.
    fontWeight: '700', // Letra en negrita.
  },

});