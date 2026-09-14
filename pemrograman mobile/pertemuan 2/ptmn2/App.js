import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Nama : Dani Hidayat <br></br>
            NIM : 2488010016 <br></br>
            Asal Sekolah : MA Nurul Huda <br></br>
            Cita-cita : Menjadi Data Scientist atau Machine Learning Engineer <br></br>
            Renana Menggapai cita-cita : Belajar dengan giat dan tekun, serta terus mengembangkan diri dalam bidang data science dan machine learning
      </Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
