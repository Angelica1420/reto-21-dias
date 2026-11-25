# Reto 21 Días: App de hábitos y progreso personal

Proyecto escolar desarrollado con React Native, Expo Router y TypeScript.
Usa **StyleSheet nativo** en lugar de NativeWind, por indicación expresa del estudiante.

## Funciones incluidas
- Cuatro hábitos locales: programación, lectura, ejercicio y agua.
- Selección de cualquiera de los 21 días y marcado/desmarcado de hábitos.
- Cálculo de progreso diario (0 %, 25 %, 50 %, 75 % o 100 %).
- Cuatro vistas: Hoy, Hábitos, Progreso y Perfil/Ajustes.
- Navegación mediante Stack, Tabs y Drawer.
- Cambio de tema claro/oscuro, compartido por todas las pantallas.
- Custom hook `useHabits` y componentes reutilizables con props tipadas.

**Nota:** No se usa almacenamiento permanente, base de datos ni API. Si se cierra por completo la app, los datos pueden reiniciarse; el enunciado permite trabajar con datos locales.

## Estructura
```
src/
  app/
    _layout.tsx          # Stack principal y proveedores
    (tabs)/
      _layout.tsx        # Pestañas Hoy y Hábitos
      index.tsx          # Inicio/Hoy
      habits.tsx         # Hábitos
    (drawer)/
      _layout.tsx        # Menú lateral
      progreso.tsx       # Progreso
      perfil.tsx         # Perfil/Ajustes
  components/
    habits/HabitCard.tsx
    ProgressCard.tsx
    ThemedView.tsx
    ThemedText.tsx
    MenuItem.tsx
  hooks/
    useHabits.ts
```

## Instalación
1. Instalar Node.js y abrir esta carpeta en Visual Studio Code.
2. Ejecutar `npm install`. Si Expo indica incompatibilidades, ejecutar `npx expo install --fix` y luego `npx expo-doctor`.
3. Ejecutar `npx expo start` y abrir en Expo Go o en el emulador Android.
4. En la pestaña Hoy, seleccionar un día y marcar los hábitos. Cambiar a Hábitos para comprobar que se conservan. Desde el botón de menú superior ir a Progreso y, en el menú lateral, a Perfil/Ajustes para alternar el tema.

## APK de evaluación (perfil preview)
1. Iniciar sesión en Expo: `npx eas-cli login`.
2. Configurar el proyecto: `npx eas-cli build:configure` (si se solicita).
3. Crear APK: `npx eas-cli build --platform android --profile preview`.
4. Copiar aquí el **enlace real** al APK cuando termine la compilación:
   - APK: **PENDIENTE, añadir enlace generado por EAS Build**.
   - QR: **PENDIENTE, adjuntar captura si corresponde**.
5. Abrir el enlace desde Android y comprobar que se pueda instalar.

## Evidencias y repositorio
- Repositorio público: **PENDIENTE, añadir URL real de GitHub**.
- Capturas: **PENDIENTE, agregar capturas de Hoy, Hábitos, Progreso y Perfil en el repositorio**.
- Commits progresivos: realizar varios commits reales durante las pruebas, no inventar historial.
- Screencast (máximo 4 minutos): **PENDIENTE, agregar enlace**.

## Guion sugerido para el screencast
1. Mostrar el Stack raíz, las Tabs y el Drawer.
2. Abrir Hoy y marcar/desmarcar hábitos de distintos días.
3. Mostrar cómo `useHabits` mantiene el estado y calcula el porcentaje.
4. Mostrar `HabitCard`, `ProgressCard`, `MenuItem`, `ThemedView` y `ThemedText`, señalando las props TypeScript.
5. Mostrar Progreso, cambiar modo oscuro desde Perfil y regresar a Hoy.
6. Mostrar el resultado APK, el QR o el enlace de EAS Build.

## Observación importante sobre la calificación
La rúbrica menciona expresamente NativeWind (1,0 punto). Esta versión **no lo incluye** porque se solicitó usar exclusivamente `StyleSheet`; por tanto, ese criterio podría marcarse como no cumplido. Los demás requisitos se han implementado en código, pero la construcción de APK, publicación de repositorio y grabación deben realizarse con tus cuentas y dispositivo.
