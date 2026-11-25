import { ScrollView, View, StyleSheet } from 'react-native';
import ThemedView, { useAppTheme } from '../../components/ThemedView';
import ThemedText from '../../components/ThemedText';
import ProgressCard from '../../components/ProgressCard';
import { useHabits } from '../../hooks/useHabits';

// Pantalla que muestra el progreso del reto de 21 días.
export default function ProgressScreen() {

  // Obtenemos los datos y funciones del hook useHabits.
  const {
    habits,          // Lista de los cuatro hábitos.
    selectedDay,     // Día seleccionado por el usuario.
    completedCount,  // Cantidad de hábitos completados ese día.
    progressPercent, // Porcentaje de progreso del día seleccionado.
    getDayProgress   // Función que calcula el porcentaje de cualquier día.
  } = useHabits();

  // Devuelve los elementos visuales de la pantalla.
  return (

    // Contenedor que adapta el fondo al modo claro u oscuro.
    <ThemedView>

      {/* Permite desplazarse si el contenido supera la pantalla. */}
      <ScrollView
        contentContainerStyle={styles.content}
      >

        {/* Muestra el título principal. */}
        <ThemedText heading>
          Mi progreso
        </ThemedText>

        {/* Muestra la descripción de la pantalla. */}
        <ThemedText
          secondary
          style={styles.subtitle}
        >
          Seguimiento de tu reto de 21 días
        </ThemedText>

        {/* Tarjeta que muestra el progreso del día seleccionado. */}
        <ProgressCard
          day={selectedDay}          // Día que estamos consultando.
          completed={completedCount} // Hábitos completados.
          total={habits.length}      // Cantidad total de hábitos.
          percent={progressPercent}  // Porcentaje calculado.
        />

        {/* Título de la sección de progreso por día. */}
        <ThemedText
          heading
          style={styles.section}
        >
          Avance por día
        </ThemedText>

        {/* Contenedor de los cuadros de los 21 días. */}
        <View style={styles.grid}>

          {/* Crea una lista de números desde el 1 hasta el 21. */}
          {Array.from(
            { length: 21 }, // Indica que necesitamos 21 elementos.

            // index comienza en 0, por eso sumamos 1.
            (_, index) => index + 1
          ).map((day) => (

            // Crea un cuadro de progreso para cada día.
            <DayProgress
              key={day} // Identificador único de cada cuadro.

              day={day} // Envía el número del día.

              // Obtiene el porcentaje correspondiente a ese día.
              percent={getDayProgress(day)}
            />

          ))}

        </View>

      </ScrollView>

    </ThemedView>
  );
}


// Componente reutilizable que muestra el progreso de un día.
function DayProgress({
  day,     // Número del día.
  percent  // Porcentaje de progreso de ese día.
}: {
  day: number;     // El día debe ser un número.
  percent: number; // El porcentaje debe ser un número.
}) {

  // Obtiene los colores del tema claro u oscuro.
  const { colors } = useAppTheme();

  // Devuelve un cuadro con el día y su porcentaje.
  return (
    <View
      style={[
        styles.day, // Aplica los estilos del cuadro.
        {
          backgroundColor: colors.card, // Fondo según el tema.
          borderColor: colors.border    // Borde según el tema.
        }
      ]}
    >

      {/* Muestra el número del día. */}
      <ThemedText style={styles.dayTitle}>
        Día {day}
      </ThemedText>

      {/* Muestra el porcentaje de progreso del día. */}
      <ThemedText
        style={[
          styles.dayPercent, // Estilo del porcentaje.
          {
            color: colors.accent // Color principal del tema.
          }
        ]}
      >
        {percent}%
      </ThemedText>

    </View>
  );
}


// Estilos de la pantalla de progreso.
const styles = StyleSheet.create({

  // Estilos del contenido principal.
  content: {
    padding: 18,       // Espacio interior.
    paddingBottom: 38, // Espacio adicional en la parte inferior.
  },

  // Estilos de la descripción.
  subtitle: {
    marginTop: 6,     // Separación respecto al título.
    marginBottom: 18, // Separación antes de la tarjeta.
  },

  // Estilos del título "Avance por día".
  section: {
    fontSize: 19,     // Tamaño del título.
    marginBottom: 14, // Separación antes de los cuadros.
  },

  // Organiza los cuadros de progreso.
  grid: {
    flexDirection: 'row',          // Coloca los cuadros horizontalmente.
    flexWrap: 'wrap',              // Permite pasar a la siguiente fila.
    justifyContent: 'space-between', // Distribuye el espacio entre cuadros.
  },

  // Estilos de cada cuadro de progreso.
  day: {
    width: '31%',     // Cada cuadro ocupa el 31% del ancho.
    padding: 12,      // Espacio interior.
    borderWidth: 1,   // Grosor del borde.
    borderRadius: 12, // Esquinas redondeadas.
    marginBottom: 12, // Separación entre filas.
  },

  // Estilos del texto "Día 1", "Día 2", etc.
  dayTitle: {
    fontSize: 13, // Tamaño del texto.
  },

  // Estilos del porcentaje de cada día.
  dayPercent: {
    marginTop: 4,     // Separación respecto al número del día.
    fontSize: 21,     // Tamaño del porcentaje.
    fontWeight: '800' // Letra muy gruesa.
  },

});