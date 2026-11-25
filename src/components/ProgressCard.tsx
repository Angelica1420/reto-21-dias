import { View, StyleSheet } from 'react-native';
import ThemedText from './ThemedText';
import { useAppTheme } from './ThemedView';

// Definimos las propiedades que recibe ProgressCard.
type Props = {
  completed: number; // Cantidad de hábitos completados.
  total: number;     // Cantidad total de hábitos.
  percent: number;   // Porcentaje de progreso del día.
  day: number;       // Número del día seleccionado.
};

// Creamos el componente reutilizable ProgressCard.
// Recibe los datos del progreso a través de Props.
export default function ProgressCard({
  completed,
  total,
  percent,
  day
}: Props) {

  // Obtenemos los colores del tema claro u oscuro.
  const { colors } = useAppTheme();

  // Devolvemos el diseño visual de la tarjeta.
  return (

    // Contenedor principal de la tarjeta de progreso.
    <View
      style={[
        styles.card, // Aplica los estilos generales.
        {
          backgroundColor: colors.card, // Color de fondo según el tema.
          borderColor: colors.border,   // Color del borde según el tema.
        }
      ]}
    >

      {/* Mostramos el día que estamos consultando. */}
      <ThemedText style={styles.label}>
        Progreso del día {day}
      </ThemedText>

      {/* Mostramos el porcentaje de progreso. */}
      <ThemedText
        style={[
          styles.percent, // Estilo del porcentaje.
          {
            color: colors.accent // Color principal del tema.
          }
        ]}
      >
        {percent}%
      </ThemedText>

      {/* Barra que representa el progreso total posible. */}
      <View
        style={[
          styles.track, // Estilo de la barra de fondo.
          {
            backgroundColor: colors.border // Color de la barra vacía.
          }
        ]}
      >

        {/* Barra interior que se llena según el porcentaje. */}
        <View
          style={[
            styles.fill, // Estilo de la barra interior.
            {
              // Ancho de la barra según el porcentaje recibido.
              width: `${percent}%`,

              // Color de la parte completada.
              backgroundColor: colors.accent
            }
          ]}
        />

      </View>

      {/* Mostramos cuántos hábitos se han completado. */}
      <ThemedText
        secondary // Utiliza el color secundario del tema.
        style={styles.detail} // Estilo del texto informativo.
      >
        {completed} de {total} hábitos completados
      </ThemedText>

    </View>
  );
}


// Definimos los estilos de la tarjeta de progreso.
const styles = StyleSheet.create({

  // Estilos del contenedor principal.
  card: {
    padding: 18,       // Espacio interior de la tarjeta.
    borderWidth: 1,    // Grosor del borde.
    borderRadius: 16,  // Esquinas redondeadas.
    marginBottom: 20,  // Separación debajo de la tarjeta.
  },

  // Estilos del texto "Progreso del día".
  label: {
    fontSize: 15,      // Tamaño de la letra.
    fontWeight: '600', // Letra seminegrita.
  },

  // Estilos del porcentaje.
  percent: {
    fontSize: 36,      // Tamaño grande del porcentaje.
    fontWeight: '800', // Letra muy gruesa.
    marginVertical: 8, // Espacio arriba y abajo.
  },

  // Estilos de la barra de progreso vacía.
  track: {
    height: 11,         // Altura de la barra.
    borderRadius: 10,   // Esquinas redondeadas.
    overflow: 'hidden', // Evita que el relleno sobresalga.
  },

  // Estilos de la parte que se llena.
  fill: {
    height: '100%',    // Ocupa toda la altura de la barra.
    borderRadius: 10, // Esquinas redondeadas.
  },

  // Estilos del texto de hábitos completados.
  detail: {
    marginTop: 10, // Separación respecto a la barra.
    fontSize: 13,  // Tamaño de la letra.
  },

});