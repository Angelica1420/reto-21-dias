import { View, Switch, StyleSheet } from 'react-native';
import ThemedView, { useAppTheme } from '../../components/ThemedView';
import ThemedText from '../../components/ThemedText';

// Pantalla de Perfil y Ajustes.
export default function ProfileScreen() {

  // Obtenemos los colores, el estado del tema y la función para cambiarlo.
  const {
    colors,       // Colores del tema actual.
    dark,         // true = modo oscuro; false = modo claro.
    toggleTheme   // Función que cambia entre los dos temas.
  } = useAppTheme();

  // Devuelve los elementos que se muestran en la pantalla.
  return (

    // Contenedor principal que adapta su fondo al tema.
    <ThemedView style={styles.content}>

      {/* Muestra el título de la pantalla. */}
      <ThemedText heading>
        Perfil / Ajustes
      </ThemedText>

      {/* Contenedor de la opción para cambiar el tema. */}
      <View
        style={[
          styles.option, // Aplica el diseño general de la opción.
          {
            backgroundColor: colors.card, // Fondo según el tema.
            borderColor: colors.border    // Borde según el tema.
          }
        ]}
      >

        {/* Contenedor del título y la descripción. */}
        <View style={styles.textBox}>

          {/* Muestra el nombre de la opción. */}
          <ThemedText style={styles.title}>
            Modo oscuro
          </ThemedText>

          {/* Muestra la descripción con color secundario. */}
          <ThemedText
            secondary
            style={styles.subtitle}
          >
            Cambiar entre tema claro y oscuro
          </ThemedText>

        </View>

        {/* Interruptor que permite activar o desactivar el modo oscuro. */}
        <Switch
          value={dark} // Indica si el interruptor está activado.

          // Ejecuta la función que cambia el tema.
          onValueChange={toggleTheme}

          // Color del interruptor cuando está activado.
          trackColor={{ true: colors.accent }}
        />

      </View>

    </ThemedView>
  );
}

// Estilos de la pantalla Perfil / Ajustes.
const styles = StyleSheet.create({

  // Estilo del contenedor principal.
  content: {
    padding: 18, // Espacio interior de la pantalla.
  },

  // Estilo de la opción para cambiar el tema.
  option: {
    marginTop: 22,        // Separación respecto al título.
    padding: 18,          // Espacio interior.
    borderWidth: 1,       // Grosor del borde.
    borderRadius: 15,     // Esquinas redondeadas.
    flexDirection: 'row', // Coloca textos e interruptor horizontalmente.
    alignItems: 'center', // Centra los elementos verticalmente.
  },

  // Estilo del contenedor de los textos.
  textBox: {
    flex: 1, // Ocupa el espacio disponible antes del interruptor.
  },

  // Estilo del título "Modo oscuro".
  title: {
    fontWeight: '700', // Letra en negrita.
  },

  // Estilo de la descripción.
  subtitle: {
    marginTop: 5, // Separación respecto al título.
    fontSize: 12, // Tamaño de letra.
  },

});