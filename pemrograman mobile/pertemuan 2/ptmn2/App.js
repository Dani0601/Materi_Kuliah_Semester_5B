import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  FlatList,
  SectionList,
  TextInput,
  Button,
  TouchableOpacity,
  Pressable,
  Switch,
  Modal,
  ActivityIndicator,
  StatusBar,
  SafeAreaView,
  StyleSheet,
  Alert,
  Platform,
  KeyboardAvoidingView, // <-- Tambahan Poin 4
  Animated,             // <-- Tambahan Poin 6
} from 'react-native';

const PROFILE = {
  name: 'Dani Hidayat',
  title: 'ML Engineer',
  email: 'dhidayat1206@gmail.com',
  phone: '083183786084',
  location: 'Cirebon, Jawa Barat',
  bio: 'i am a ML Engineer, i love to learn new things and explore the world of technology. I am passionate about AI and Machine Learning, and I am always looking for new challenges and opportunities to grow.',
  avatar: require('./assets/profile.jpeg'),
};

const SKILLS = [
  {id: '1', name: 'React Native', level: 90, color: '#61DBFB'},
  {id: '2', name: 'JavaScript', level: 75, color: '#F7DC6F'},
  {id: '3', name: 'Flutter', level: 75, color: '#00C4CC'},
  {id: '4', name: 'Machine Learning', level: 90, color: '#FF6B6B'},
  {id: '5', name: 'Deep Learning', level: 80, color: '#4ECDC4'},
  {id: '6', name: 'Python', level: 85, color: '#FFD700'},
  {id: '7', name: 'Java', level: 70, color: '#FF8C00'},
  {id: '8', name: 'C++', level: 65, color: '#1E90FF'},
  {id: '9', name: 'SQL', level: 75, color: '#32CD32'},
];

const SECTIONS = [
  {
    title : 'Pengalaman Kerja',
    data : [
      {
        id: '1',
        role: 'Staff TU MA Nurul Huda', 
        company: 'MA Nurul Huda',
        period: '2024', 
        desc: 'Membantu TU dalam mengelola administrasi dan pengelolaan sekolah'
      },
    ],
  },
  {
    title : 'Pendidikan',
    data : [
      {
        id: '1',
        role: 'S1 Informatika',
        company: 'UIN Siber Syekh Nurjati Cirebon',
        period: '2024 - Sekarang',
        desc: 'IPK 3.73'
      },
    ],
  },
];

const SOCIAL = [
  {id: '1', name: 'LinkedIn', icon : '🐙', url: 'https://www.linkedin.com/in/dani-hidayat-1206/', label: 'LinkedIn'},
  {id: '2', name: 'GitHub', icon : '💼', url: 'https://github.com/dani0601', label: 'GitHub'},
];



// ========================================================
// SUB-COMPONENT: SkillCard
// ========================================================
const SkillCard = ({ item }) => (
  <View style={styles.skillCard}>
    <View style={styles.skillHeader}>
      <Text style={styles.skillName}>{item.name}</Text>
      <Text style={styles.skillPercent}>{item.level}%</Text>
    </View>
    <View style={styles.progressBg}>
      <View
        style={[
          styles.progressFill,
          { width: `${item.level}%`, backgroundColor: item.color }
        ]}
      />
    </View>
  </View>
);

// ========================================================
// SUB-COMPONENT: TimelineCard
// ========================================================
const TimelineCard = ({ item, onPress }) => (
  <TouchableOpacity
    style={styles.timelineCard}
    onPress={() => onPress(item)}
    activeOpacity={0.75}
  >
    <View style={styles.timelineDot} />
    <View style={styles.timelineContent}>
      <Text style={styles.timelineRole}>{item.role}</Text>
      <Text style={styles.timelineCompany}>{item.company}</Text>
      <Text style={styles.timelinePeriod}>{item.period}</Text>
      <Text style={styles.timelineHint}>Ketuk untuk detail ➔</Text>
    </View>
  </TouchableOpacity>
);

export default function App() {
  // -- STATE ----------------------------------------------------
  const [openToWork, setOpenToWork] = useState(true);
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [senderName, setSenderName] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);
  const [pressing, setPressing] = useState(false);

  // 1. State Tab Navigasi Sederhana (Poin 5)
  const [activeTab, setActiveTab] = useState('Info');

  // 2. Animasi Avatar (Poin 6)
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
  // 1. Fade in sekali di awal
  Animated.timing(fadeAnim, {
    toValue: 1,
    duration: 800,
    useNativeDriver: true,
  }).start();

  // 2. Loop animasi denyut/pulsing
  Animated.loop(
    Animated.sequence([
      Animated.timing(scaleAnim, {
        toValue: 1.08,
        duration: 1200,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1.0,
        duration: 1200,
        useNativeDriver: true,
      }),
    ])
  ).start();
}, []);

  // -- HANDLER FUNCTIONS ----------------------------------------
  const handleCardPress = (item) => {
    setSelectedItem(item);
    setModalVisible(true);
  };

  const handleSend = () => {
    if (!senderName.trim() || !message.trim()) {
      showAlert('⚠️ Peringatan', 'Nama dan pesan tidak boleh kosong!');
      return;
    }

    setSending(true);
    setTimeout(() => {
      setSending(false);
      setSenderName('');
      setMessage('');
      showAlert('✅ Berhasil', `Pesan dari ${senderName} telah terkirim`);
    }, 2000);
  };
const [alertVisible, setAlertVisible] = useState(false);
const [alertData, setAlertData] = useState({
  title: "",
  message: "",
});

const showAlert = (title, message) => {
  setAlertData({ title, message });
  setAlertVisible(true);
};
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor="#1a1a2e" barStyle="light-content" />

      {/* HEADER BAR */}
      <View style={styles.headerBar}>
        <Text style={styles.headerTitle}>📄 Curriculum Vitae</Text>
        <View style={styles.switchRow}>
          <Text style={styles.switchLabel}>
            {openToWork ? '🟢 Open' : '🔴 Busy'}
          </Text>
          <Switch
            value={openToWork}
            onValueChange={setOpenToWork}
            trackColor={{ false: '#555', true: '#4ade80' }}
            thumbColor={openToWork ? '#fff' : '#aaa'}
          />
        </View>
      </View>

      {/* TAB NAVIGASI SEDERHANA (Poin 5) */}
      <View style={styles.tabContainer}>
        {['Info', 'Skills', 'Kontak'].map((tab) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tabButton, activeTab === tab && styles.tabButtonActive]}
            onPress={() => setActiveTab(tab)}
          >
            <Text style={[styles.tabText, activeTab === tab && styles.tabTextActive]}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {/* KEYBOARD AVOIDING VIEW (Poin 4) */}
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView style={styles.scroll} showsVerticalScrollIndicator={false}>
          
          {/* TAB 1: INFO PROFIL & RIWAYAT */}
          {(activeTab === 'Info' || activeTab === 'All') && (
            <>
              <View style={styles.profileSection}>
                {/* ANIMATED AVATAR (Poin 6) */}
                <Animated.View
                  style={{
                    opacity: fadeAnim,
                    transform: [{ scale: scaleAnim }],
                  }}
                >
                  <Image source={PROFILE.avatar} style={styles.avatar} />
                </Animated.View>

                {openToWork && (
                  <View style={styles.badge}>
                    <Text style={styles.badgeText}>✅ Open to Work</Text>
                  </View>
                )}

                <Text style={styles.profileName}>{PROFILE.name}</Text>
                <Text style={styles.profileTitle}>{PROFILE.title}</Text>
                <Text style={styles.profileBio}>{PROFILE.bio}</Text>

                <View style={styles.contactRow}>
                  <Text style={styles.contactItem}>📧 {PROFILE.email}</Text>
                  <Text style={styles.contactItem}>📍 {PROFILE.location}</Text>
                </View>
                <Text style={styles.contactItem}>📱 {PROFILE.phone}</Text>

                <View style={styles.socialRow}>
                  {SOCIAL.map((s) => (
                    <TouchableOpacity
                      key={s.id}
                      style={styles.socialBtn}
                      onPress={() => showAlert('🔗 Link', s.url)}
                      activeOpacity={0.8}
                    >
                      <Text style={styles.socialIcon}>{s.icon}</Text>
                      <Text style={styles.socialLabel}>{s.label}</Text>
                    </TouchableOpacity>
                  ))}
                </View>

                <Pressable
                  style={({ pressed }) => [
                    styles.downloadBtn,
                    pressed && styles.downloadBtnPressed,
                  ]}
                  onPressIn={() => setPressing(true)}
                  onPressOut={() => setPressing(false)}
                  onPress={() => showAlert('📥 Download', 'CV sedang diunduh...')}
                >
                  <Text style={styles.downloadBtnText}>
                    {pressing ? '⏳ Mengunduh...' : '📥 Download CV (PDF)'}
                  </Text>
                </Pressable>
              </View>

              <View style={styles.sectionBox}>
                <Text style={styles.sectionTitle}>📄 Riwayat</Text>
                <Text style={styles.sectionSubtitle}>
                  ↳ SectionList: data dikelompokkan per kategori. Ketuk kartu untuk Modal detail.
                </Text>
                <SectionList
                  sections={SECTIONS}
                  keyExtractor={(item) => item.id}
                  renderItem={({ item }) => (
                    <TimelineCard item={item} onPress={handleCardPress} />
                  )}
                  renderSectionHeader={({ section: { title } }) => (
                    <View style={styles.sectionHeader}>
                      <Text style={styles.sectionHeaderText}>{title}</Text>
                    </View>
                  )}
                  scrollEnabled={false}
                  ItemSeparatorComponent={() => <View style={{ height: 10 }} />}
                  SectionSeparatorComponent={() => <View style={{ height: 16 }} />}
                />
              </View>
            </>
          )}

          {/* TAB 2: SKILLS */}
          {(activeTab === 'Skills' || activeTab === 'All') && (
            <View style={styles.sectionBox}>
              <Text style={styles.sectionTitle}>🛠️ Keahlian</Text>
              <Text style={styles.sectionSubtitle}>
                ↳ FlatList: menampilkan list data secara efisien
              </Text>
              <FlatList
                data={SKILLS}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <SkillCard item={item} />}
                scrollEnabled={false}
                ItemSeparatorComponent={() => <View style={{ height: 8 }} />}
              />
            </View>
          )}

          {/* TAB 3: KONTAK */}
          {(activeTab === 'Kontak' || activeTab === 'All') && (
            <View style={styles.sectionBox}>
              <Text style={styles.sectionTitle}>📬 Hubungi Saya</Text>
              <Text style={styles.sectionSubtitle}>
                ↳ TextInput, Button, ActivityIndicator
              </Text>

              <TextInput
                style={styles.textInput}
                placeholder="Nama Anda"
                placeholderTextColor="#888"
                value={senderName}
                onChangeText={setSenderName}
                returnKeyType="next"
                editable={!sending}
              />

              <TextInput
                style={[styles.textInput, styles.textArea]}
                placeholder="Tulis pesan Anda di sini..."
                placeholderTextColor="#888"
                value={message}
                onChangeText={setMessage}
                multiline
                numberOfLines={4}
                textAlignVertical="top"
                editable={!sending}
              />

              {sending ? (
                <View style={styles.loadingRow}>
                  <ActivityIndicator size="large" color="#7c3aed" />
                  <Text style={styles.loadingText}>Mengirim pesan...</Text>
                </View>
              ) : (
                <Button
                  title="✉️ Kirim Pesan"
                  color="#7c3aed"
                  onPress={handleSend}
                />
              )}
            </View>
          )}

        </ScrollView>
      </KeyboardAvoidingView>

      {/* MODAL */}
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalBox}>
            {selectedItem && (
              <>
                <Text style={styles.modalTitle}>{selectedItem.role}</Text>
                <Text style={styles.modalCompany}>{selectedItem.company}</Text>
                <Text style={styles.modalPeriod}>📅 {selectedItem.period}</Text>
                <View style={styles.modalDivider} />
                <Text style={styles.modalDesc}>{selectedItem.desc}</Text>
              </>
            )}
            <TouchableOpacity
              style={styles.modalCloseBtn}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.modalCloseBtnText}>✕ Tutup</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* ALERT */}
            
<Modal
  transparent={true}
  visible={alertVisible}
  animationType="fade"
  onRequestClose={() => setAlertVisible(false)}
>
  <View style={styles.modalOverlay}>
    <View style={styles.alertBox}>
      <Text style={styles.alertTitle}>
        {alertData.title}
      </Text>

      <Text style={styles.alertMessage}>
        {alertData.message}
      </Text>

      <TouchableOpacity
        style={styles.alertButton}
        onPress={() => setAlertVisible(false)}
      >
        <Text style={styles.alertButtonText}>OK</Text>
      </TouchableOpacity>
    </View>
  </View>
</Modal>

    </SafeAreaView>
  );
}

const COLORS = {
  bg: '#0f0f1a',
  card: '#1a1a2e',
  cardBorder: '#2d2d44',
  accent: '#7c3aed',
  accentLight: '#a78bfa',
  accentGold: '#f59e0b',
  text: '#f0f0f0',
  textMuted: '#9ca3af',
  textDim: '#6b7280',
  success: '#4ade80',
  white: '#ffffff',
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.bg,
  },
  scroll: {
    flex: 1,
  },
  headerBar: {
    backgroundColor: '#1a1a2e',
    paddingHorizontal: 20,
    paddingVertical: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.cardBorder,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  headerTitle: {
    color: COLORS.white,
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  switchLabel: {
    color: COLORS.textMuted,
    fontSize: 12,
    fontWeight: '600',
  },

  // STYLES TAB NAVIGASI SEDERHANA (Poin 5)
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#16213e',
    padding: 6,
    marginHorizontal: 16,
    marginTop: 12,
    borderRadius: 12,
    justifyContent: 'space-around',
  },
  tabButton: {
    flex: 1,
    paddingVertical: 8,
    alignItems: 'center',
    borderRadius: 8,
  },
  tabButtonActive: {
    backgroundColor: COLORS.accent,
  },
  tabText: {
    color: COLORS.textMuted,
    fontWeight: '600',
    fontSize: 13,
  },
  tabTextActive: {
    color: COLORS.white,
    fontWeight: '700',
  },

  profileSection: {
    alignItems: 'center',
    paddingVertical: 24,
    paddingHorizontal: 20,
    backgroundColor: COLORS.card,
    marginHorizontal: 16,
    marginTop: 12,
    marginBottom: 16,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 3,
    borderColor: COLORS.accent,
    marginBottom: 8,
  },
  badge: {
    backgroundColor: '#052e16',
    borderWidth: 1,
    borderColor: COLORS.success,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
    marginBottom: 12,
  },
  badgeText: {
    color: COLORS.success,
    fontSize: 12,
    fontWeight: '700',
  },
  profileName: {
    color: COLORS.white,
    fontSize: 26,
    fontWeight: '800',
    textAlign: 'center',
  },
  profileTitle: {
    color: COLORS.accentLight,
    fontSize: 14,
    fontWeight: '600',
    marginTop: 4,
    marginBottom: 14,
    textAlign: 'center',
  },
  profileBio: {
    color: COLORS.textMuted,
    fontSize: 13,
    lineHeight: 20,
    textAlign: 'center',
    marginBottom: 16,
    paddingHorizontal: 8,
  },
  contactRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 8,
    marginBottom: 6,
  },
  contactItem: {
    color: COLORS.textMuted,
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 4,
  },
  socialRow: {
    flexDirection: 'row',
    gap: 12,
    marginTop: 16,
    marginBottom: 20,
  },
  socialBtn: {
    alignItems: 'center',
    backgroundColor: '#16213e',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  socialIcon: { fontSize: 20, marginBottom: 4 },
  socialLabel: {
    color: COLORS.accentLight,
    fontSize: 11,
    fontWeight: '600',
  },
  downloadBtn: {
    backgroundColor: COLORS.accent,
    paddingVertical: 14,
    paddingHorizontal: 36,
    borderRadius: 50,
    elevation: 4,
    shadowColor: COLORS.accent,
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
  },
  downloadBtnPressed: {
    backgroundColor: '#5b21b6',
  },
  downloadBtnText: {
    color: COLORS.white,
    fontWeight: '700',
    fontSize: 14,
  },
  sectionBox: {
    marginHorizontal: 16,
    marginBottom: 16,
    backgroundColor: COLORS.card,
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  sectionTitle: {
    color: COLORS.white,
    fontSize: 17,
    fontWeight: '700',
    marginBottom: 4,
  },
  sectionSubtitle: {
    color: COLORS.textDim,
    fontSize: 11,
    fontStyle: 'italic',
    marginBottom: 16,
  },
  sectionHeader: {
    backgroundColor: '#0f172a',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginBottom: 8,
    borderLeftWidth: 3,
    borderLeftColor: COLORS.accent,
  },
  sectionHeaderText: {
    color: COLORS.accentLight,
    fontWeight: '700',
    fontSize: 13,
  },
  skillCard: {
    backgroundColor: '#16213e',
    padding: 12,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  skillHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  skillName: { color: COLORS.text, fontWeight: '600', fontSize: 13 },
  skillPercent: { color: COLORS.accentLight, fontWeight: '700', fontSize: 13 },
  progressBg: {
    height: 6,
    backgroundColor: '#0f172a',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: 6,
    borderRadius: 4,
  },
  timelineCard: {
    flexDirection: 'row',
    backgroundColor: '#16213e',
    borderRadius: 12,
    padding: 14,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
  },
  timelineDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.accent,
    marginTop: 4,
    marginRight: 12,
  },
  timelineContent: { flex: 1 },
  timelineRole: { color: COLORS.white, fontWeight: '700', fontSize: 14, marginBottom: 2 },
  timelineCompany: { color: COLORS.accentLight, fontSize: 13, marginBottom: 2 },
  timelinePeriod: { color: COLORS.textMuted, fontSize: 11, marginBottom: 6 },
  timelineHint: { color: COLORS.accentGold, fontSize: 11, fontStyle: 'italic' },
  textInput: {
    backgroundColor: '#0f172a',
    color: COLORS.text,
    borderWidth: 1,
    borderColor: COLORS.cardBorder,
    borderRadius: 10,
    paddingHorizontal: 14,
    paddingVertical: Platform.OS === 'ios' ? 14 : 10,
    fontSize: 14,
    marginBottom: 12,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  loadingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 12,
    paddingVertical: 10,
  },
  loadingText: {
    color: COLORS.accentLight,
    fontSize: 14,
    fontWeight: '600',
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.75)',
    justifyContent: 'flex-end',
  },
  modalBox: {
    backgroundColor: '#1e1b4b',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 28,
    borderTopWidth: 3,
    borderColor: COLORS.accent,
  },
  modalTitle: { color: COLORS.white, fontSize: 20, fontWeight: '800', marginBottom: 4 },
  modalCompany: { color: COLORS.accentLight, fontSize: 15, fontWeight: '600', marginBottom: 4 },
  modalPeriod: { color: COLORS.textMuted, fontSize: 13, marginBottom: 16 },
  modalDivider: { height: 1, backgroundColor: COLORS.cardBorder, marginBottom: 16 },
  modalDesc: { color: COLORS.text, fontSize: 14, lineHeight: 22, marginBottom: 24 },
  modalCloseBtn: {
    backgroundColor: COLORS.accent,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: 'center',
  },
  modalCloseBtnText: { color: COLORS.white, fontWeight: '700', fontSize: 14 },

  
modalOverlay: {
  flex: 1,
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  justifyContent: "center",
  alignItems: "center",
},

alertBox: {
  width: "85%",
  maxWidth: 340,
  backgroundColor: "#fff",
  borderRadius: 16,
  padding: 24,
  elevation: 5,
},

alertTitle: {
  fontSize: 20,
  fontWeight: "bold",
  color: "#222",
  marginBottom: 12,
},

alertMessage: {
  fontSize: 16,
  color: "#555",
  marginBottom: 24,
},

alertButton: {
  alignSelf: "flex-end",
  paddingHorizontal: 16,
  paddingVertical: 10,
},

alertButtonText: {
  color: "#2196F3",
  fontSize: 16,
  fontWeight: "bold",
},

});