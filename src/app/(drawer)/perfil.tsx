
import { View, Switch, StyleSheet } from 'react-native';
import ThemedView, { useAppTheme } from '../../components/ThemedView';
import ThemedText from '../../components/ThemedText';

// Pantalla de Perfil y Ajustes.
export default function ProfileScreen() {

  // Obtiene los colores, el estado del tema y la función para cambiarlo.
  const { colors, dark, toggleTheme } = useAppTheme();

  return (
    <ThemedView style={styles.content}>

      <ThemedText heading>
        Perfil / Ajustes
      </ThemedText>

      {/* Contenedor de la opción de modo oscuro. */}
      <View
        style={[
          styles.option,
          {
            backgroundColor: colors.card,
            borderColor: colors.border,
          },
        ]}
      >
        <View style={styles.textBox}>
          <ThemedText style={styles.title}>
            Modo oscuro
          </ThemedText>

          <ThemedText secondary style={styles.subtitle}>
            Cambiar entre tema claro y oscuro
          </ThemedText>
        </View>

        {/* Interruptor que cambia entre modo claro y oscuro. */}
        <Switch
          value={dark}
          onValueChange={toggleTheme}
          trackColor={{ true: colors.accent }}
        />

      </View>

    </ThemedView>
  );
}

// Estilos de la pantalla.
const styles = StyleSheet.create({

  content: {
    padding: 18,
  },

  option: {
    marginTop: 22,
    padding: 18,
    borderWidth: 1,
    borderRadius: 15,
    flexDirection: 'row',
    alignItems: 'center',
  },

  textBox: {
    flex: 1,
  },

  title: {
    fontWeight: '700',
  },

  subtitle: {
    marginTop: 5,
    fontSize: 12,
  },

});
