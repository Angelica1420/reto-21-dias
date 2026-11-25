
import { Pressable, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import type { ComponentProps } from 'react';
import ThemedText from './ThemedText';
import { useAppTheme } from './ThemedView';


// Definimos las propiedades que recibe MenuItem.
type Props = {
  label: string; // Texto que aparece en el menú.

  // Define el tipo del icono usando los nombres válidos de Ionicons.
  icon: ComponentProps<typeof Ionicons>['name'];

  // Función que se ejecuta al presionar el elemento.
  // void significa que no necesita devolver un valor.
  onPress: () => void;
};


// Creamos el componente reutilizable MenuItem.
// Recibe el texto, el icono y la función onPress.
export default function MenuItem({
  label,
  icon,
  onPress
}: Props) {

  // Obtenemos los colores del tema claro u oscuro.
  const { colors } = useAppTheme();

  // Devolvemos los elementos visuales del menú.
  return (

    // Pressable permite presionar este elemento del menú.
    <Pressable
      onPress={onPress} // Ejecuta la función al presionar.

      // Aplicamos el estilo general y el color del borde.
      style={[
        styles.item,
        {
          borderBottomColor: colors.border // Color del borde inferior.
        }
      ]}
    >
{/* Mostramos el icono recibido del menú. */}
<Ionicons
  name={icon}
  size={21}
  color={colors.accent}
/>

      {/* Mostramos el texto del menú. */}
      <ThemedText style={styles.label}>
        {label}
      </ThemedText>

    </Pressable>
  );
}
// Definimos los estilos del componente MenuItem.
const styles = StyleSheet.create({

  // Estilos de cada elemento del menú.
  item: {
    flexDirection: 'row', // Coloca icono y texto horizontalmente.
    alignItems: 'center', // Centra los elementos verticalmente.
    paddingVertical: 17,  // Espacio interior arriba y abajo.
    borderBottomWidth: 1, // Grosor del borde inferior.
  },

  // Estilos del texto del menú.
  label: {
    marginLeft: 14,   // Separación entre el icono y el texto.
    fontWeight: '600', // Letra seminegrita.
  },

});