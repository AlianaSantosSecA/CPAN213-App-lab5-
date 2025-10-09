import React, { useState } from 'react';
import {
  ScrollView,
  View,
  Text,
  Switch,
  StyleSheet,
  SafeAreaView,
  Platform,
  StatusBar,
  Alert,
} from 'react-native';
import PlatformButton from '../components/PlatformButton';
import { getCurrentPlatformColors, isIOS } from '../utils/platform';

const SettingsScreen = () => {
  const colors = getCurrentPlatformColors();
  const [settings, setSettings] = useState({
    notifications: true,
    darkMode: false,
    locationServices: false,
  });

  const toggleSetting = (key) => {
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const renderSettingRow = (title, description, value, settingKey) => (
    <View style={styles.settingRow}>
      <View style={styles.settingInfo}>
        <Text style={[styles.settingTitle, { color: colors.text }]}>{title}</Text>
        <Text style={[styles.settingDescription, { color: colors.text }]}>
          {description}
        </Text>
      </View>
      <Switch
        value={value}
        onValueChange={() => toggleSetting(settingKey)}
        trackColor={{ false: '#767577', true: colors.primary }}
        thumbColor={isIOS ? '#ffffff' : value ? colors.primary : '#f4f3f4'}
      />
    </View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar
        barStyle={isIOS ? 'dark-content' : 'light-content'}
        backgroundColor={isIOS ? undefined : colors.primary}
      />

      {/* Header */}
      <View
        style={[
          styles.header,
          { backgroundColor: isIOS ? colors.background : colors.primary },
        ]}
      >
        <Text style={[styles.headerTitle, { color: isIOS ? colors.text : '#ffffff' }]}>
          Settings
        </Text>
        <Text style={[styles.headerSubtitle, { color: isIOS ? colors.text : '#ffffff' }]}>
          {isIOS ? 'iOS Style' : 'Android Style'}
        </Text>
      </View>

      <ScrollView style={styles.scrollView}>
        {/* General Settings Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>General</Text>
          <View style={[styles.sectionContent, { backgroundColor: '#ffffff' }]}>
            {renderSettingRow(
              'Push Notifications',
              'Receive app notifications',
              settings.notifications,
              'notifications'
            )}
            {renderSettingRow('Dark Mode', 'Use dark theme', settings.darkMode, 'darkMode')}
            {renderSettingRow(
              'Location Services',
              'Allow location access',
              settings.locationServices,
              'locationServices'
            )}
          </View>
        </View>

        {/* Platform Info Section */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>Platform Info</Text>
          <View style={[styles.sectionContent, { backgroundColor: '#ffffff' }]}>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Platform:</Text>
              <Text style={styles.infoValue}>{isIOS ? 'iOS' : 'Android'}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Button Style:</Text>
              <Text style={styles.infoValue}>
                {isIOS ? 'Rounded (12pt)' : 'Sharp (4pt)'}
              </Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Typography:</Text>
              <Text style={styles.infoValue}>{isIOS ? 'San Francisco' : 'Roboto'}</Text>
            </View>
            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>Depth Effect:</Text>
              <Text style={styles.infoValue}>{isIOS ? 'Shadow' : 'Elevation'}</Text>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.section}>
          <PlatformButton
            title="Primary Action"
            variant="primary"
            onPress={() =>
              Alert.alert('Success', `${isIOS ? 'iOS' : 'Android'} primary button`)
            }
          />
          <View style={styles.buttonSpacing} />
          <PlatformButton
            title="Secondary Action"
            variant="secondary"
            onPress={() => Alert.alert('Info', 'Secondary button pressed')}
          />
          <View style={styles.buttonSpacing} />
          <PlatformButton
            title="Reset Settings"
            variant="primary"
            onPress={() => {
              Alert.alert('Confirm', 'Reset all settings?', [
                { text: 'Cancel', style: 'cancel' },
                {
                  text: 'Reset',
                  onPress: () => {
                    setSettings({
                      notifications: true,
                      darkMode: false,
                      locationServices: false,
                    });
                    Alert.alert('Done', 'Settings reset');
                  },
                },
              ]);
            }}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingVertical: 20,
    paddingHorizontal: 16,
    paddingTop: Platform.OS === 'ios' ? 60 : 40,
    ...Platform.select({
      ios: {
        borderBottomWidth: StyleSheet.hairlineWidth,
        borderBottomColor: '#c6c6c8',
      },
      android: {
        elevation: 4,
      },
    }),
  },
  headerTitle: {
    fontSize: Platform.OS === 'ios' ? 34 : 24,
    fontWeight: 'bold',
  },
  headerSubtitle: {
    fontSize: 14,
    marginTop: 4,
    opacity: 0.7,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: '600',
    marginBottom: 8,
    textTransform: 'uppercase',
    opacity: 0.6,
  },
  sectionContent: {
    borderRadius: Platform.OS === 'ios' ? 12 : 4,
    overflow: 'hidden',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e0e0e0',
  },
  settingInfo: {
    flex: 1,
    marginRight: 16,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
  },
  settingDescription: {
    fontSize: 14,
    opacity: 0.6,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#e0e0e0',
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#666',
  },
  infoValue: {
    fontSize: 14,
    color: '#333',
  },
  buttonSpacing: {
    height: 12,
  },
});

export default SettingsScreen;
