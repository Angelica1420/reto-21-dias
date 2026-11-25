import { ScrollView, StyleSheet } from 'react-native';
import ThemedView from '../../components/ThemedView';
import ThemedText from '../../components/ThemedText';
import HabitCard from '../../components/habits/HabitCard';
import { useHabits } from '../../hooks/useHabits';

// Pantalla que muestra los hábitos del día seleccionado.
export default function HabitsScreen() {

  // Obtenemos los datos y funciones del hook useHabits.
  const {
    habits,       // Lista de los cuatro hábitos.
    selectedDay,  // Día que el usuario seleccionó.
    isCompleted,  // Función que verifica si un hábito está cumplido.
    toggleHabit   // Función para marcar o desmarcar un hábito.
  } = useHabits();

  // Devuelve los elementos que aparecen en la pantalla.
  return (

    // Contenedor que adapta el fondo al modo claro u oscuro.
    <ThemedView>

      {/* Permite desplazarse hacia abajo si el contenido no cabe. */}
      <ScrollView
        contentContainerStyle={styles.content} // Aplica espacio interior.
      >

        {/* Muestra el título principal de la pantalla. */}
        <ThemedText heading>
          Mis Hábitos
        </ThemedText>

        {/* Muestra el día seleccionado y las instrucciones. */}
        <ThemedText
          secondary // Utiliza el color secundario del tema.
          style={styles.subtitle} // Aplica separación al texto.
        >
          Día {selectedDay} de 21 · Toca + para cumplir o desmarcar.
        </ThemedText>

        {/* Recorre la lista de hábitos y crea una tarjeta por cada uno. */}
        {habits.map((habit) => (

          // Componente reutilizable que muestra cada hábito.
          <HabitCard
            key={habit.id} // Identificador único de cada tarjeta.

            habit={habit} // Envía los datos del hábito.

            // Comprueba si el hábito está completado.
            completed={isCompleted(habit.id)}

            // Al presionar, marca o desmarca el hábito seleccionado.
            onToggle={() => toggleHabit(habit.id)}
          />

        ))}

      </ScrollView>

    </ThemedView>
  );
}

// Estilos de la pantalla.
const styles = StyleSheet.create({

  content: {
    padding: 18, // Espacio interior alrededor del contenido.
  },

  subtitle: {
    marginTop: 7,    // Separación debajo del título principal.
    marginBottom: 20, // Separación antes de la lista de hábitos.
  },

});