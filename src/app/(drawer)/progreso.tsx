
import { ScrollView, View, StyleSheet } from 'react-native';
import ThemedView, { useAppTheme } from '../../components/ThemedView';
import ThemedText from '../../components/ThemedText';
import ProgressCard from '../../components/ProgressCard';
import { useHabits } from '../../hooks/useHabits';

// Pantalla que muestra el progreso del reto.
export default function ProgressScreen() {

  // Obtiene los datos y porcentajes de los hábitos.
  const {
    habits,
    selectedDay,
    completedCount,
    progressPercent,
    getDayProgress
  } = useHabits();

  return (
    <ThemedView>
      <ScrollView contentContainerStyle={styles.content}>

        <ThemedText heading>
          Mi progreso
        </ThemedText>

        <ThemedText secondary style={styles.subtitle}>
          Seguimiento de tu reto de 21 días
        </ThemedText>

        {/* Muestra el progreso del día seleccionado. */}
        <ProgressCard
          day={selectedDay}
          completed={completedCount}
          total={habits.length}
          percent={progressPercent}
        />

        <ThemedText heading style={styles.section}>
          Avance por día
        </ThemedText>

        {/* Genera los cuadros de los 21 días. */}
        <View style={styles.grid}>
          {Array.from({ length: 21 }, (_, index) => index + 1)
            .map((day) => (
              <DayProgress
                key={day}
                day={day}
                percent={getDayProgress(day)}
              />
            ))}
        </View>

      </ScrollView>
    </ThemedView>
  );
}

// Componente reutilizable para mostrar el progreso de cada día.
function DayProgress({
  day,
  percent
}: {
  day: number;
  percent: number;
}) {

  const { colors } = useAppTheme();

  return (
    <View
      style={[
        styles.day,
        {
          backgroundColor: colors.card,
          borderColor: colors.border
        }
      ]}
    >
      <ThemedText style={styles.dayTitle}>
        Día {day}
      </ThemedText>

      <ThemedText
        style={[
          styles.dayPercent,
          { color: colors.accent }
        ]}
      >
        {percent}%
      </ThemedText>
    </View>
  );
}

// Estilos de la pantalla y los cuadros.
const styles = StyleSheet.create({

  content: {
    padding: 18,
    paddingBottom: 38,
  },

  subtitle: {
    marginTop: 6,
    marginBottom: 18,
  },

  section: {
    fontSize: 19,
    marginBottom: 14,
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },

  day: {
    width: '31%',
    padding: 12,
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: 12,
  },

  dayTitle: {
    fontSize: 13,
  },

  dayPercent: {
    marginTop: 4,
    fontSize: 21,
    fontWeight: '800',
  },

});
