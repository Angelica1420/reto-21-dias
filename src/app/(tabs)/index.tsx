import { ScrollView, View, Pressable, StyleSheet } from 'react-native';
import ThemedView, { useAppTheme } from '../../components/ThemedView';
import ThemedText from '../../components/ThemedText';
import ProgressCard from '../../components/ProgressCard';
import HabitCard from '../../components/habits/HabitCard';
import { useHabits } from '../../hooks/useHabits';

// Pantalla principal donde se selecciona el día y se registran los hábitos.
export default function HomeScreen() {

  // Obtenemos los datos y funciones del hook useHabits.
  const {
    habits,          // Lista de los cuatro hábitos.
    selectedDay,     // Día seleccionado actualmente.
    setSelectedDay,  // Función para cambiar el día.
    completedCount,  // Cantidad de hábitos completados.
    progressPercent, // Porcentaje de progreso del día.
    isCompleted,     // Comprueba si un hábito está completado.
    toggleHabit      // Marca o desmarca un hábito.
  } = useHabits();

  // Obtenemos los colores del tema claro u oscuro.
  const { colors } = useAppTheme();

  // Devuelve los elementos visuales de la pantalla.
  return (

    // Contenedor que adapta su fondo al tema seleccionado.
    <ThemedView>

      {/* Permite desplazar el contenido verticalmente. */}
      <ScrollView
        contentContainerStyle={styles.content}
      >

        {/* Título principal de la aplicación. */}
        <ThemedText heading>
          Mi reto de 21 días
        </ThemedText>

        {/* Instrucción que aparece debajo del título. */}
        <ThemedText
          secondary
          style={styles.subtitle}
        >
          Elige un día para registrar tus hábitos.
        </ThemedText>

        {/* Permite desplazar horizontalmente los botones de los 21 días. */}
        <ScrollView
          horizontal // Activa el desplazamiento horizontal.
          showsHorizontalScrollIndicator={false} // Oculta la barra de desplazamiento.
          style={styles.days}
        >

          {/* Genera los números del 1 al 21 y crea un botón para cada día. */}
          {Array.from(
            { length: 21 }, // Crea una lista de 21 elementos.

            // index comienza en 0, por eso sumamos 1.
            (_, index) => index + 1
          ).map((day) => (

            // Botón que permite seleccionar un día.
            <Pressable
              key={day} // Identificador único de cada botón.

              // Cambia el día al presionar el botón.
              onPress={() => setSelectedDay(day)}

              // Aplica los estilos del botón.
              style={[
                styles.day,
                {
                  // Si es el día seleccionado, utiliza el color principal.
                  // Si no está seleccionado, utiliza el color de las tarjetas.
                  backgroundColor: day === selectedDay
                    ? colors.accent
                    : colors.card,

                  // Color del borde según el tema.
                  borderColor: colors.border
                }
              ]}
            >

              {/* Muestra el número del día dentro del botón. */}
              <ThemedText
                style={{
                  // El día seleccionado tiene texto blanco.
                  // Los demás utilizan el color normal del tema.
                  color: day === selectedDay
                    ? '#FFFFFF'
                    : colors.text
                }}
              >
                {day}
              </ThemedText>

            </Pressable>

          ))}

        </ScrollView>

        {/* Tarjeta que muestra el progreso del día seleccionado. */}
        <ProgressCard
          day={selectedDay}          // Número del día seleccionado.
          completed={completedCount} // Hábitos completados.
          total={habits.length}      // Total de hábitos.
          percent={progressPercent}  // Porcentaje de progreso.
        />

        {/* Título de la sección de hábitos del día. */}
        <ThemedText
          heading
          style={styles.section}
        >
          Hábitos del día {selectedDay}
        </ThemedText>

        {/* Recorre la lista y muestra una tarjeta por cada hábito. */}
        {habits.map((habit) => (

          // Componente reutilizable que muestra cada hábito.
          <HabitCard
            key={habit.id} // Identificador único de cada tarjeta.

            habit={habit} // Envía los datos del hábito.

            // Comprueba si el hábito está completado.
            completed={isCompleted(habit.id)}

            // Marca o desmarca el hábito al presionar el botón.
            onToggle={() => toggleHabit(habit.id)}
          />

        ))}

      </ScrollView>

    </ThemedView>
  );
}

// Estilos de la pantalla principal.
const styles = StyleSheet.create({

  // Estilos del contenido principal.
  content: {
    padding: 18,       // Espacio interior.
    paddingBottom: 36, // Espacio adicional en la parte inferior.
  },

  // Estilos del texto debajo del título.
  subtitle: {
    marginTop: 5,     // Separación respecto al título.
    marginBottom: 17, // Separación antes de los botones.
  },

  // Estilos de la lista horizontal de días.
  days: {
    marginBottom: 20, // Separación debajo de la lista de días.
  },

  // Estilos de cada botón de día.
  day: {
    width: 43,              // Ancho del botón.
    height: 43,             // Alto del botón.
    marginRight: 7,         // Separación entre botones.
    borderRadius: 11,       // Esquinas redondeadas.
    borderWidth: 1,         // Grosor del borde.
    justifyContent: 'center', // Centra el número verticalmente.
    alignItems: 'center',     // Centra el número horizontalmente.
  },

  // Estilos del título "Hábitos del día".
  section: {
    fontSize: 19,     // Tamaño de letra.
    marginBottom: 13, // Separación antes de las tarjetas.
  },

});