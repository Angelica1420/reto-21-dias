import { Drawer } from 'expo-router/drawer';
import { DrawerContentScrollView } from '@react-navigation/drawer';
import { router } from 'expo-router';
import { View, StyleSheet } from 'react-native';
import MenuItem from '../../components/MenuItem';
import ThemedText from '../../components/ThemedText';
import { useAppTheme } from '../../components/ThemedView';

// El Drawer permite ir a Progreso o Perfil, y regresar a las pestañas.
export default function DrawerLayout() {
  const { colors } = useAppTheme();
  return <Drawer
    drawerContent={(props) => (
      <DrawerContentScrollView {...props} style={{ backgroundColor: colors.card }}>
        <View style={styles.menu}>
          <ThemedText heading style={styles.heading}>Reto 21 Días</ThemedText>
          <MenuItem label="Hoy" icon="home-outline" onPress={() => router.replace('/(tabs)')} />
          <MenuItem label="Hábitos" icon="barbell-outline" onPress={() => router.replace('/(tabs)/habits')} />
          <MenuItem label="Progreso" icon="stats-chart-outline" onPress={() => router.navigate('/(drawer)/progreso')} />
          <MenuItem label="Perfil / Ajustes" icon="settings-outline" onPress={() => router.navigate('/(drawer)/perfil')} />
        </View>
      </DrawerContentScrollView>
    )}
    screenOptions={{
      headerStyle:
       { backgroundColor: 
        colors.card 
      },headerTintColor:
       colors.text,
      drawerStyle: 
      { backgroundColor: 
        colors.card },
    }}>
    <Drawer.Screen name="progreso" options={{ title: 'Progreso' }} />
    <Drawer.Screen name="perfil" options={{ title: 'Perfil / Ajustes' }} />
  </Drawer>;
}

// Separación y título del menú lateral.
const styles = StyleSheet.create({ 
  menu: 
  { 
    paddingHorizontal: 20

   }, heading:
   
   { marginVertical: 20 

   } });
