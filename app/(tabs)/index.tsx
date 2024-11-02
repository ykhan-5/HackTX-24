import React from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';

const LayoutPage = () => {
  return (
    <View style={styles.container}>
      {/* Header with Username and Daily Score */}
      <View style={styles.header}>
        <Text style={styles.username}>Username</Text>
        <View style={styles.dailyScore}>
          <Text style={styles.scoreText}>90</Text>
        </View>
      </View>

      {/* Avatar and Health Bars */}
      <View style={styles.avatarSection}>
        <View style={styles.avatar}>
          {/* Placeholder for Avatar */}
          <Text style={styles.avatarText}>👤</Text>
        </View>

        {/* Health Bars */}
        <View style={styles.healthBars}>
          <View style={styles.healthBar}>
            <Text>❤️</Text>
            <View style={styles.bar}>
              <View style={styles.filledBar} />
            </View>
          </View>

          <View style={styles.healthBar}>
            <Text>🍏</Text>
            <View style={styles.bar}>
              <View style={styles.filledBar} />
            </View>
          </View>
        </View>
      </View>

      {/* Weekly Score Section */}
      <View style={styles.weeklyScore}>
        <View style={styles.scoreGrid}>
          {/* Placeholder for Weekly Score Grid */}
          <Text>Weekly Score: 20</Text>
        </View>
      </View>

      {/* Bottom Navigation */}
      <View style={styles.navigation}>
        <Button title="Home" onPress={() => {}} />
        <Button title="Camera" onPress={() => {}} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between', // Aligns children (username and daily score) with space in between
    alignItems: 'center', // Centers items vertically
    marginBottom: 20,
  },
  username: {
    fontSize: 59,
    fontWeight: 'bold',
  },
  dailyScore: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scoreText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  avatarSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginBottom: 20,
  },
  avatar: {
    alignItems: 'center',
    fontSize: 30,
  },
  avatarText: {
    fontSize: 50,
  },
  healthBars: {
    flex: 1,
  },
  healthBar: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  bar: {
    flex: 1,
    height: 10,
    backgroundColor: '#ddd',
    borderRadius: 5,
    marginLeft: 10,
  },
  filledBar: {
    width: '50%',
    height: '100%',
    backgroundColor: '#ff6347',
    borderRadius: 5,
  },
  weeklyScore: {
    alignItems: 'center',
    marginBottom: 20,
  },
  scoreGrid: {
    width: '90%',
    height: 60,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default LayoutPage;
