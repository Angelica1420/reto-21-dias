import { createContext, createElement, useContext, useState } from 'react';
import type { ReactNode } from 'react';

// Define la información que debe tener cada hábito.
export type Habit = {
  id: number;       // Número que identifica al hábito.
  title: string;    // Nombre del hábito.
  subtitle: string; // Descripción del hábito.
  icon: 'code' | 'book' | 'fitness' | 'water'; // Iconos permitidos.
  color: string;    // Color que representa al hábito.
};

// Lista de los cuatro hábitos predefinidos de la aplicación.
// Habit[] indica que es una lista de elementos del tipo Habit.
export const HABITS: Habit[] = [
  {
    id: 1,                          // Identificador del hábito.
    title: 'Estudiar programación', // Nombre.
    subtitle: 'Practicar cada día', // Descripción.
    icon: 'code',                   // Icono.
    color: '#7662E8',               // Color.
  },
  {
    id: 2,
    title: 'Leer 20 minutos',
    subtitle: 'Lectura diaria',
    icon: 'book',
    color: '#AB68E8',
  },
  {
    id: 3,
    title: 'Hacer ejercicio',
    subtitle: 'Actividad física',
    icon: 'fitness',
    color: '#557EE5',
  },
  {
    id: 4,
    title: 'Beber agua',
    subtitle: 'Mantenerse hidratado',
    icon: 'water',
    color: '#42B7D6',
  },
];

// Define cómo se guardan los hábitos completados por día.
// El primer number es el día y number[] es la lista de hábitos.
type CompletedByDay = Record<number, number[]>;

// Define los datos y funciones que compartirán las pantallas.
type HabitsContextValue = {
  habits: Habit[]; // Lista de hábitos.

  selectedDay: number; // Día seleccionado.

  // Función que permite cambiar el día.
  setSelectedDay: (day: number) => void;

  // Comprueba si un hábito está completado.
  // day? significa que el día es opcional.
  isCompleted: (habitId: number, day?: number) => boolean;

  // Función para marcar o desmarcar un hábito.
  toggleHabit: (habitId: number) => void;

  completedCount: number; // Cantidad de hábitos completados.

  progressPercent: number; // Porcentaje de progreso diario.

  // Calcula el porcentaje de un día indicado.
  getDayProgress: (day: number) => number;
};

// Crea un contexto para compartir los datos entre pantallas.
// null indica que inicialmente no existe un proveedor asignado.
const HabitsContext = createContext<HabitsContextValue | null>(null);

// Proveedor que guarda los estados y las funciones del reto.
export function HabitsProvider({
  children // Representa las pantallas y componentes que contiene.
}: {
  children: ReactNode // Permite recibir elementos de React.
}) {

  // Guarda el día seleccionado.
  // useState(1) indica que inicialmente comienza en el día 1.
  const [selectedDay, setSelectedDayState] = useState(1);

  // Guarda los hábitos completados de cada día.
  // {} significa que inicialmente no hay hábitos completados.
  const [completedByDay, setCompletedByDay] =
    useState<CompletedByDay>({});

  // Función para cambiar el día seleccionado.
  const setSelectedDay = (day: number) => {

    // Verifica que el día esté entre 1 y 21.
    if (day >= 1 && day <= 21) {
      setSelectedDayState(day); // Actualiza el día seleccionado.
    }
  };

  // Función que comprueba si un hábito está completado.
  const isCompleted = (
    habitId: number,   // Identificador del hábito.
    day = selectedDay  // Usa el día actual si no se indica otro.
  ) =>

    // Busca los hábitos completados del día.
    // ?? [] utiliza una lista vacía si no hay datos.
    // includes comprueba si el identificador está en la lista.
    (completedByDay[day] ?? []).includes(habitId);

  // Función que marca o desmarca un hábito.
  const toggleHabit = (habitId: number) => {

    // Actualiza la información de los hábitos completados.
    setCompletedByDay((previous) => {

      // Obtiene los hábitos completados del día seleccionado.
      // previous contiene el estado anterior.
      const current = previous[selectedDay] ?? [];

      // Comprueba si el hábito ya está completado.
      const updated = current.includes(habitId)

        // Si existe, filter lo elimina de la lista.
        ? current.filter((id) => id !== habitId)

        // Si no existe, lo agrega a la lista.
        // ...current conserva los hábitos anteriores.
        : [...current, habitId];

      // Devuelve el nuevo estado.
      // ...previous conserva los datos de los demás días.
      // [selectedDay] actualiza solamente el día seleccionado.
      return {
        ...previous,
        [selectedDay]: updated
      };
    });
  };

  // Cuenta los hábitos completados del día seleccionado.
  // length obtiene la cantidad de elementos de la lista.
  const completedCount =
    (completedByDay[selectedDay] ?? []).length;

  // Calcula el porcentaje de progreso del día.
  // Divide los hábitos completados entre el total.
  // Multiplica por 100 para obtener el porcentaje.
  // Math.round redondea el resultado.
  const progressPercent = Math.round(
    (completedCount / HABITS.length) * 100
  );

  // Función que calcula el progreso de cualquier día.
  const getDayProgress = (day: number) =>

    // Cuenta los hábitos completados del día indicado.
    // Los divide para el total y obtiene el porcentaje.
    Math.round(
      ((completedByDay[day] ?? []).length / HABITS.length) * 100
    );

  // Comparte los datos y funciones con las pantallas.
  // createElement permite utilizar el proveedor en un archivo .ts.
  return createElement(HabitsContext.Provider, {

    // Información que estará disponible para los componentes.
    value: {
      habits: HABITS,     // Lista de los cuatro hábitos.
      selectedDay,        // Día seleccionado.
      setSelectedDay,     // Función para cambiar de día.
      isCompleted,        // Comprueba si un hábito está completado.
      toggleHabit,        // Marca o desmarca hábitos.
      completedCount,     // Número de hábitos completados.
      progressPercent,    // Porcentaje del día.
      getDayProgress,     // Progreso de un día específico.
    },

    children, // Componentes que recibirán estos datos.
  });
}

// Hook personalizado que permite acceder a los datos del reto.
export function useHabits() {

  // Obtiene los datos compartidos mediante HabitsContext.
  const context = useContext(HabitsContext);

  // Muestra un error si useHabits se utiliza
  // fuera del proveedor HabitsProvider.
  if (!context) {
    throw new Error(
      'useHabits debe usarse dentro de HabitsProvider'
    );
  }

  // Devuelve los estados y funciones para utilizarlos
  // desde las pantallas y otros componentes.
  return context;
}