import React from "react";
import { View, Text, FlatList, StyleSheet, Dimensions } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get("window");

const customerTestimonials = [
  { id: "1", name: "Amit Sharma", feedback: "This app made my fitness journey smooth and enjoyable. Love the progress tracking!", rating: 5, gradient: ['#FF6B6B', '#FF8E53'] },
  { id: "2", name: "Riya Patel", feedback: "Very easy to use and helps me stay consistent. Highly recommended!", rating: 5, gradient: ['#4ECDC4', '#44A08D'] },
  { id: "3", name: "Vikram Singh", feedback: "The workout plans are perfect for beginners like me. I feel more confident.", rating: 5, gradient: ['#A8E6CF', '#7FCDCD'] },
  { id: "4", name: "Sneha Iyer", feedback: "Simple, clean, and effective. I've seen real results in 3 months.", rating: 5, gradient: ['#FFD93D', '#FF6B6B'] },
  { id: "5", name: "Rahul Mehta", feedback: "Customer support is amazing. They respond quickly and genuinely care.", rating: 5, gradient: ['#6C5CE7', '#A29BFE'] },
  { id: "6", name: "Priya Desai", feedback: "Best fitness app I've tried so far. It keeps me motivated daily.", rating: 5, gradient: ['#FD79A8', '#FDCB6E'] },
  { id: "7", name: "Arjun Reddy", feedback: "The progress tracking and reminders are super helpful. Totally worth it!", rating: 5, gradient: ['#00B894', '#00CEC9'] },
  { id: "8", name: "Maya Gupta", feedback: "Lost 15kg in 6 months! The meal plans and workout routines are fantastic.", rating: 5, gradient: ['#E17055', '#FDCB6E'] },
  { id: "9", name: "Karan Joshi", feedback: "The community feature keeps me motivated. Love competing with friends!", rating: 5, gradient: ['#0984E3', '#74B9FF'] },
  { id: "10", name: "Ananya Roy", feedback: "Perfect for busy professionals. Quick workouts that actually work!", rating: 5, gradient: ['#A29BFE', '#FD79A8'] },
  { id: "11", name: "Deepak Kumar", feedback: "The AI coach suggestions are spot-on. Feels like having a personal trainer.", rating: 5, gradient: ['#00CEC9', '#55EFC4'] },
  { id: "12", name: "Kavya Nair", feedback: "Amazing transformation in just 4 months. The app adapts to my progress perfectly.", rating: 5, gradient: ['#FDCB6E', '#E17055'] },
];

const clientTestimonials = [
  { id: "13", name: "GlobalFit Ltd.", feedback: "Partnering with this platform increased our reach and brand visibility.", type: "Gym Chain", gradient: ['#667EEA', '#764BA2'] },
  { id: "14", name: "WellnessPro", feedback: "Seamless integration and amazing results. Our clients love it!", type: "Wellness Center", gradient: ['#F093FB', '#F5576C'] },
  { id: "15", name: "ActiveLife", feedback: "The analytics dashboard is a game changer. Helps us optimize services.", type: "Fitness Studio", gradient: ['#4FACFE', '#00F2FE'] },
  { id: "16", name: "HealthHub", feedback: "We've onboarded more customers thanks to this collaboration.", type: "Health Clinic", gradient: ['#43E97B', '#38F9D7'] },
  { id: "17", name: "ZenCare", feedback: "Professional, reliable, and supportive team. Great experience!", type: "Spa & Wellness", gradient: ['#FA709A', '#FEE140'] },
  { id: "18", name: "FitWorld", feedback: "The platform's design and ease of use helped us improve engagement.", type: "Fitness Chain", gradient: ['#A8EDEA', '#FED6E3'] },
  { id: "19", name: "WellFit", feedback: "A perfect partner to grow in the digital fitness space. Highly satisfied.", type: "Digital Fitness", gradient: ['#FF9A9E', '#FECFEF'] },
  { id: "20", name: "PowerGym Elite", feedback: "Our member retention increased by 40% after implementing this platform.", type: "Premium Gym", gradient: ['#667EEA', '#764BA2'] },
  { id: "21", name: "FlexFit Studios", feedback: "The virtual training integration revolutionized our business model.", type: "Yoga Studio", gradient: ['#FFECD2', '#FCB69F'] },
  { id: "22", name: "BodyBoost Corp", feedback: "Exceptional ROI and customer satisfaction. Our best tech investment yet!", type: "Corporate Wellness", gradient: ['#A8E6CF', '#DCEDC1'] },
  { id: "23", name: "FitTech Solutions", feedback: "The API integration was flawless. Saved us months of development time.", type: "Tech Partner", gradient: ['#FFD93D', '#FF6B6B'] },
  { id: "24", name: "HealthFirst Network", feedback: "Scalable, reliable, and user-friendly. Perfect for our multi-location setup.", type: "Healthcare Network", gradient: ['#6C5CE7', '#A29BFE'] },
];

const Testimonials = () => {
  const renderCustomerItem = ({ item }: { item: { id: string; name: string; feedback: string; rating: number; gradient: string[] } }) => (
    <LinearGradient colors={item.gradient} style={styles.card} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
      <View style={styles.cardContent}>
        <View style={styles.ratingContainer}>
          {[...Array(item.rating)].map((_, i) => (
            <Text key={i} style={styles.star}>⭐</Text>
          ))}
        </View>
        <Text style={styles.feedback}>"{item.feedback}"</Text>
        <View style={styles.authorContainer}>
          <View style={styles.avatar}>
            <Text style={styles.avatarText}>{item.name.charAt(0)}</Text>
          </View>
          <Text style={styles.name}>{item.name}</Text>
        </View>
      </View>
    </LinearGradient>
  );

  const renderClientItem = ({ item }: { item: { id: string; name: string; feedback: string; type: string; gradient: string[] } }) => (
    <LinearGradient colors={item.gradient} style={styles.card} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }}>
      <View style={styles.cardContent}>
        <View style={styles.clientBadge}>
          <Text style={styles.clientType}>{item.type}</Text>
        </View>
        <Text style={styles.feedback}>"{item.feedback}"</Text>
        <View style={styles.authorContainer}>
          <View style={styles.companyAvatar}>
            <Text style={styles.avatarText}>🏢</Text>
          </View>
          <Text style={styles.name}>{item.name}</Text>
        </View>
      </View>
    </LinearGradient>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Customer Testimonials</Text>
      <FlatList
        horizontal
        data={customerTestimonials}
        keyExtractor={(item) => item.id}
        renderItem={renderCustomerItem}
        showsHorizontalScrollIndicator={false}
        snapToInterval={width * 0.85}
        decelerationRate="fast"
        contentContainerStyle={styles.listContainer}
      />

      <Text style={styles.header}>Client Testimonials</Text>
      <FlatList
        horizontal
        data={clientTestimonials}
        keyExtractor={(item) => item.id}
        renderItem={renderClientItem}
        showsHorizontalScrollIndicator={false}
        snapToInterval={width * 0.85}
        decelerationRate="fast"
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

export default Testimonials;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    backgroundColor: "#f5f7fa",
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginLeft: 20,
    marginTop: 25,
    marginBottom: 15,
    color: "#2c3e50",
    textShadowColor: 'rgba(0,0,0,0.1)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  listContainer: {
    paddingHorizontal: 10,
  },
  card: {
    width: width * 0.8,
    marginHorizontal: 8,
    borderRadius: 20,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 5 },
    elevation: 8,
  },
  cardContent: {
    padding: 25,
    backgroundColor: 'rgba(255,255,255,0.95)',
    borderRadius: 20,
    margin: 2,
  },
  ratingContainer: {
    flexDirection: 'row',
    marginBottom: 15,
    justifyContent: 'center',
  },
  star: {
    fontSize: 18,
    marginHorizontal: 2,
  },
  clientBadge: {
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255,255,255,0.9)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
    marginBottom: 15,
  },
  clientType: {
    fontSize: 12,
    fontWeight: '600',
    color: '#2c3e50',
    textTransform: 'uppercase',
  },
  feedback: {
    fontSize: 16,
    fontStyle: "italic",
    color: "#2c3e50",
    marginBottom: 20,
    lineHeight: 24,
    textAlign: 'center',
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(52, 152, 219, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  companyAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(155, 89, 182, 0.8)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatarText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
  name: {
    fontSize: 16,
    fontWeight: "700",
    color: "#2c3e50",
  },
});