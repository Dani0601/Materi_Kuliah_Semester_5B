import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

export default function App() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.card}>
        <Text style={styles.name}>Dani Hidayat</Text>
        <Text style={styles.subtitle}>NIM: 2488010016</Text>

        <View style={styles.divider} />

        <View style={styles.section}>
          <Text style={styles.label}>Asal Sekolah</Text>
          <Text style={styles.value}>MA Nurul Huda</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Cita-cita</Text>
          <Text style={styles.value}>Data Scientist / Machine Learning Engineer</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.label}>Rencana Menggapai Cita-cita</Text>
          <Text style={styles.value}>
            Belajar dengan giat dan tekun, serta terus mengembangkan diri dalam bidang data science dan machine learning.
          </Text>
        </View>
      </View>
      <StatusBar style="auto" />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f4f6f8',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 16,
    padding: 24,
    width: '100%',
    maxWidth: 400,
    elevation: 4, // Shadow untuk Android
    shadowColor: '#000', // Shadow untuk iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1a1a1a',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
    marginTop: 4,
  },
  divider: {
    height: 1,
    backgroundColor: '#e0e0e0',
    marginVertical: 16,
  },
  section: {
    marginBottom: 16,
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: '#0066cc',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
    marginBottom: 4,
  },
  value: {
    fontSize: 15,
    color: '#333333',
    lineHeight: 22,
  },
});