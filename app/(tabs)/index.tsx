import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';

const getCurrentWeekData = () => {
  const today = new Date();
  const currentDay = today.getDay(); // 0 (Sun) to 6 (Sat)
  const mondayOffset = currentDay === 0 ? -6 : 1 - currentDay; // Adjust for Monday
  const mondayDate = new Date(today.setDate(today.getDate() + mondayOffset));
  
  const weeklyData = [];
  for (let i = 0; i < 7; i++) {
    const dayDate = new Date(mondayDate);
    dayDate.setDate(mondayDate.getDate() + i);
    
    // You can replace this with actual data fetching logic
    const score = Math.floor(Math.random() * 5); // Random score from 0 to 4
    weeklyData.push({ day: dayDate.toLocaleDateString('en-US', { weekday: 'short' }), score });
  }

  return weeklyData;
};

// Function to format the current date as "Nov 2nd"
const getFormattedDate = () => {
  const today = new Date();
  const options = { month: 'short', day: 'numeric' };
  const dateString = today.toLocaleDateString('en-US', options);
  
  const day = today.getDate();
  const suffix = day === 1 || day === 21 || day === 31 ? 'st' : 
                 day === 2 || day === 22 ? 'nd' : 
                 day === 3 || day === 23 ? 'rd' : 'th';

  return `Today ${dateString}${suffix}`; // e.g., "Nov 2nd"
};

const LayoutPage = () => {
  const weeklyData = getCurrentWeekData();
  const weeklyScore = weeklyData.reduce((acc, curr) => acc + curr.score, 0); // Sum of scores for the week
  const currentDate = getFormattedDate(); // Get the formatted date

  return (
    <View style={styles.container}>
      {/* Header with Username and Daily Score */}
      <View style={styles.header}>
        <Text style={styles.username}>Braxton Bourne</Text>
        <View style={styles.dailyScore}>
          <Text style={styles.scoreText}>GO</Text>
        </View>
      </View>

      {/* Display the current date */}
      <Text style={styles.dateText}>{currentDate}</Text> {/* New line for current date */}

      {/* Avatar and Health Bars Section */}
      <View style={styles.avatarSection}>
        <View style={styles.avatar}>
          {/* Placeholder for Avatar */}
          <Image
            source={require('../../assets/images/pixel-avatar.png')} // Adjust the path as necessary
            style={styles.avatarImage}
          />
        </View>

        {/* Vertical Divider */}
        <View style={styles.verticalDivider} />

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

      {/* Heatmap Calendar Section */}
      <View style={styles.heatmapContainer}>
        <View style={styles.calendar}>
          {weeklyData.map((data, index) => (
            <View key={index} style={[styles.box, { backgroundColor: getColor(data.score) }]}>
              <Text style={styles.dayText}>{data.day}</Text>
              <Text style={styles.scoreText}>{data.score}</Text>
            </View>
          ))}
          {/* Extra box for weekly score */}
          <View style={styles.box}>
            <Text style={styles.dayText}>Weekly Score</Text>
            <Text style={styles.scoreText}>{weeklyScore}</Text>
          </View>
        </View>
      </View>
    </View>
  );
};

const getColor = (score) => {
  // Return color based on score
  if (score === 0) return '#ffffff'; // No contributions
  if (score <= 2) return '#e0f7fa'; // Low contributions
  if (score <= 4) return '#80deea'; // Medium contributions
  return '#00bcd4'; // High contributions
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
    alignItems: 'flex-start'
  },
  dateText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'left', // Align to the left or center as per your layout
    marginVertical: 10, // Space above and below
  },
  avatarSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    flex: 2, // Take up more space relative to other sections
  },
  avatar: {
    alignItems: 'center',
    fontSize: 30,
  },
  avatarImage: {
    width: 300, // Set width for the image
    height: 300, // Set height for the image
    // borderRadius: 25, // Optional: make the image circular
  },
  verticalDivider: {
    width: 1, // Thickness of the divider
    height: '100%', // Full height of the parent container
    backgroundColor: '#ccc', // Color of the divider
    marginHorizontal: 10, // Space around the divider
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
  heatmapContainer: {
    marginTop: 20,
    alignItems: 'flex-start', // Align items to the left
  },
  calendar: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: 300, // Adjust width to fit the layout
  },
  box: {
    width: 60,  // Increased width
    height: 60, // Increased height
    margin: 5,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#ccc',
  },
  dayText: {
    fontSize: 12,
    fontWeight: 'bold',
    alignItems: 'center'
  },
});

export default LayoutPage;
