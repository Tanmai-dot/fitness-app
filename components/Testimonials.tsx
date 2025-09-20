import React from "react";
import { View, Text, FlatList, StyleSheet, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const customerTestimonials = [
  { id: "1", name: "Amit Sharma", feedback: "This app made my fitness journey smooth and enjoyable. Love the progress tracking!" },
  { id: "2", name: "Riya Patel", feedback: "Very easy to use and helps me stay consistent. Highly recommended!" },
  { id: "3", name: "Vikram Singh", feedback: "The workout plans are perfect for beginners like me. I feel more confident." },
  { id: "4", name: "Sneha Iyer", feedback: "Simple, clean, and effective. I've seen real results in 3 months." },
  { id: "5", name: "Rahul Mehta", feedback: "Customer support is amazing. They respond quickly and genuinely care." },
  { id: "6", name: "Priya Desai", feedback: "Best fitness app I've tried so far. It keeps me motivated daily." },
  { id: "7", name: "Arjun Reddy", feedback: "The progress tracking and reminders are super helpful. Totally worth it!" },
];

const clientTestimonials = [
  { id: "8", name: "GlobalFit Ltd.", feedback: "Partnering with this platform increased our reach and brand visibility." },
  { id: "9", name: "WellnessPro", feedback: "Seamless integration and amazing results. Our clients love it!" },
  { id: "10", name: "ActiveLife", feedback: "The analytics dashboard is a game changer. Helps us optimize services." },
  { id: "11", name: "HealthHub", feedback: "We've onboarded more customers thanks to this collaboration." },
  { id: "12", name: "ZenCare", feedback: "Professional, reliable, and supportive team. Great experience!" },
  { id: "13", name: "FitWorld", feedback: "The platform's design and ease of use helped us improve engagement." },
  { id: "14", name: "WellFit", feedback: "A perfect partner to grow in the digital fitness space. Highly satisfied." },
];

const Testimonials = () => {
  const renderItem = ({ item }: { item: { id: string; name: string; feedback: string } }) => (
    <View style={styles.card}>
      <Text style={styles.feedback}>"{item.feedback}"</Text>
      <Text style={styles.name}>- {item.name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Customer Testimonials</Text>
      <FlatList
        horizontal
        data={customerTestimonials}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
      />

      <Text style={styles.header}>Client Testimonials</Text>
      <FlatList
        horizontal
        data={clientTestimonials}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        showsHorizontalScrollIndicator={false}
        pagingEnabled
      />
    </View>
  );
};

export default Testimonials;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 20,
    backgroundColor: "#fff",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 15,
    marginTop: 20,
    marginBottom: 10,
    color: "#333",
  },
  card: {
    width: width * 0.8,
    marginHorizontal: 10,
    padding: 20,
    backgroundColor: "#f8f9fa",
    borderRadius: 15,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 3,
  },
  feedback: {
    fontSize: 16,
    fontStyle: "italic",
    color: "#444",
    marginBottom: 10,
  },
  name: {
    fontSize: 14,
    fontWeight: "600",
    color: "#555",
    textAlign: "right",
  },
});