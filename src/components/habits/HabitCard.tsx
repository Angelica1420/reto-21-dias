// Importamos las herramientas de React Native.
// Pressable: permite crear un botón que se puede presionar.
// View: sirve para agrupar y organizar elementos.
// StyleSheet: permite crear los estilos de la tarjeta.
import { Pressable, View, StyleSheet } from 'react-native';

// Importamos Ionicons para utilizar iconos en la aplicación.
import { Ionicons } from '@expo/vector-icons';

// Importamos el tipo Habit, que define la estructura de un hábito.
import type { Habit } from '../../hooks/useHabits';

// Importamos nuestro componente de texto.
// Permite adaptar los textos al modo claro y oscuro.
import ThemedText from '../ThemedText';

// Importamos el hook que proporciona los colores del tema actual.
import { useAppTheme } from '../ThemedView';


// ----------------------------------------------------
// 1. PROPIEDADES QUE RECIBE LA TARJETA
// ----------------------------------------------------

// Props define los datos que necesita HabitCard para funcionar.
type Props = {

  // habit contiene la información del hábito:
  // título, descripción, icono y color.
  habit: Habit;

  // completed indica si el hábito está completado.
  // true = completado.
  // false = no completado.
  completed: boolean;

  // onToggle es la función que se ejecuta
  // cuando presionamos el botón de la tarjeta.
  // void significa que no necesita devolver un valor.
  onToggle: () => void;
};


// ----------------------------------------------------
// 2. COMPONENTE PRINCIPAL HABITCARD
// ----------------------------------------------------

// export default permite utilizar este componente
// desde otras pantallas de nuestra aplicación.

// HabitCard recibe las tres propiedades definidas en Props.
export default function HabitCard({
  habit,
  completed,
  onToggle
}: Props) {

  // Obtenemos los colores correspondientes
  // al tema claro u oscuro de la aplicación.
  const { colors } = useAppTheme();


  // --------------------------------------------------
  // 3. ICONOS DE LOS HÁBITOS
  // --------------------------------------------------

  // Creamos un objeto que relaciona cada hábito
  // con el nombre de un icono de Ionicons.

  // Record permite definir los tipos de las claves
  // y los valores del objeto.

  // Habit['icon'] obtiene el tipo de icono del hábito.
  // keyof typeof Ionicons.glyphMap permite utilizar
  // nombres válidos de los iconos de Ionicons.

  const icons: Record<
    Habit['icon'],
    keyof typeof Ionicons.glyphMap
  > = {

    // Icono para estudiar programación.
    code: 'code-slash-outline',

    // Icono para leer.
    book: 'book-outline',

    // Icono para hacer ejercicio.
    fitness: 'barbell-outline',

    // Icono para beber agua.
    water: 'water-outline',
  };


  // --------------------------------------------------
  // 4. INTERFAZ VISUAL DE LA TARJETA
  // --------------------------------------------------

  // return devuelve los elementos que se mostrarán
  // en la pantalla de nuestra aplicación.

  return (

    // Contenedor principal de la tarjeta.
    <View
      style={[
        // Aplica los estilos generales de la tarjeta.
        styles.card,

        // Aplica los colores según el tema seleccionado.
        {
          backgroundColor: colors.card,
          borderColor: colors.border
        }
      ]}
    >

      {/* ------------------------------------------ */}
      {/* 5. CONTENEDOR DEL ICONO                    */}
      {/* ------------------------------------------ */}

      <View
        style={[
          // Establece el tamaño y forma de la caja.
          styles.iconBox,

          // Utiliza el color del hábito con transparencia.
          {
            backgroundColor: habit.color + '22'
          }
        ]}
      >

        {/* Muestra el icono correspondiente al hábito. */}
        <Ionicons

          // Busca el icono según el tipo de hábito.
          name={icons[habit.icon]}

          // Establece el tamaño del icono.
          size={23}

          // Utiliza el color definido para el hábito.
          color={habit.color}
        />

      </View>


      {/* ------------------------------------------ */}
      {/* 6. TÍTULO Y DESCRIPCIÓN DEL HÁBITO          */}
      {/* ------------------------------------------ */}

      {/* Contenedor de los textos. */}
      <View style={styles.textBox}>

        {/* Muestra el nombre del hábito. */}
        <ThemedText style={styles.title}>
          {habit.title}
        </ThemedText>

        {/* Muestra la descripción del hábito. */}
        {/* secondary aplica el color secundario del tema. */}
        <ThemedText
          secondary
          style={styles.subtitle}
        >
          {habit.subtitle}
        </ThemedText>

      </View>


      {/* ------------------------------------------ */}
      {/* 7. BOTÓN PARA MARCAR O DESMARCAR            */}
      {/* ------------------------------------------ */}

      {/* Pressable permite detectar cuando el usuario */}
      {/* presiona el botón de la tarjeta. */}

      <Pressable

        // Ejecuta onToggle cuando presionamos el botón.
        onPress={onToggle}

        // Indica que funciona como una casilla de selección.
        accessibilityRole="checkbox"

        // Informa si el hábito está marcado o desmarcado.
        accessibilityState={{
          checked: completed
        }}

        // Proporciona una descripción accesible del botón.
        accessibilityLabel={'Cumplir ' + habit.title}

        // Aplicamos estilos al botón.
        style={[
          styles.check,

          {
            // Si completed es true, aparece el color principal.
            // Si es false, el fondo es transparente.
            backgroundColor: completed
              ? colors.accent
              : 'transparent',

            // El borde utiliza el color principal del tema.
            borderColor: colors.accent
          }
        ]}
      >

        {/* Icono que cambia según el estado del hábito. */}
        <Ionicons

          // Si está completado, muestra un visto.
          // Si no está completado, muestra un signo más.
          name={completed ? 'checkmark' : 'add'}

          // Tamaño del icono.
          size={22}

          // Si está completado, el icono es blanco.
          // Si no, utiliza el color principal del tema.
          color={
            completed
              ? '#FFFFFF'
              : colors.accent
          }
        />

      </Pressable>

    </View>
  );
}


// ----------------------------------------------------
// 8. ESTILOS DE LA TARJETA
// ----------------------------------------------------

// StyleSheet.create agrupa los estilos visuales.
// Estos estilos se pueden modificar fácilmente.

const styles = StyleSheet.create({

  // Estilos del contenedor principal.
  card: {

    // Coloca los elementos horizontalmente.
    flexDirection: 'row',

    // Centra verticalmente los elementos.
    alignItems: 'center',

    // Espacio interior de la tarjeta.
    padding: 14,

    // Separación inferior entre tarjetas.
    marginBottom: 12,

    // Redondea las esquinas de la tarjeta.
    borderRadius: 14,

    // Grosor del borde.
    borderWidth: 1,
  },


  // Estilos de la caja que contiene el icono.
  iconBox: {

    // Ancho de la caja.
    width: 48,

    // Alto de la caja.
    height: 48,

    // Redondea las esquinas.
    borderRadius: 12,

    // Centra el icono horizontalmente.
    alignItems: 'center',

    // Centra el icono verticalmente.
    justifyContent: 'center',
  },


  // Estilos del contenedor de los textos.
  textBox: {

    // Ocupa el espacio disponible entre el icono
    // y el botón para marcar el hábito.
    flex: 1,

    // Separación izquierda respecto al icono.
    marginLeft: 12,
  },


  // Estilos del título del hábito.
  title: {

    // Coloca el título en negrita.
    fontWeight: '700',

    // Tamaño de la letra.
    fontSize: 15,
  },


  // Estilos de la descripción del hábito.
  subtitle: {

    // Separación superior respecto al título.
    marginTop: 4,

    // Tamaño de letra más pequeño.
    fontSize: 12,
  },


  // Estilos del botón para marcar o desmarcar.
  check: {

    // Ancho del botón.
    width: 36,

    // Alto del botón.
    height: 36,

    // Grosor del borde.
    borderWidth: 1.5,

    // Esquinas redondeadas.
    borderRadius: 11,

    // Centra el icono horizontalmente.
    alignItems: 'center',

    // Centra el icono verticalmente.
    justifyContent: 'center',
  },

});