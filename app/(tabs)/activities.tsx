import { router } from 'expo-router';
import { Pressable, StyleSheet, View, FlatList, ScrollView } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { PlaceHolderImages } from '@/src/lib/placeholder-images';
import type { ActivityType } from '@/src/lib/types';
import { Image } from 'expo-image';

const activities: { name: ActivityType; href: string; description: string; imageId: string }[] = [
	{ name: 'Running', href: '/activities/running', description: 'Track your pace and distance.', imageId: 'running-card' },
	{ name: 'Long Jump', href: '/activities/long-jump', description: 'Measure your explosive power.', imageId: 'long-jump-card' },
	{ name: 'Sit-ups', href: '/activities/sit-ups', description: 'Count your reps and check form.', imageId: 'sit-ups-card' },
	{ name: 'Push-ups', href: '/activities/push-ups', description: 'Build upper body strength.', imageId: 'push-ups-card' },
	{ name: 'High Jump', href: '/activities/high-jump', description: 'Test your vertical leap.', imageId: 'high-jump-card' },
];

export default function ActivitiesTab() {
	return (
		<ScrollView style={styles.scrollContainer}>
			<ThemedView style={styles.container}>
				<View>
					<ThemedText type="title">Choose Your Arena</ThemedText>
					<ThemedText type="default">Select an activity below to start a new session and track your performance.</ThemedText>
				</View>
				<View style={styles.grid}>
					{activities.map((a) => (
						<ActivityCard key={a.name} name={a.name} description={a.description} imageId={a.imageId} href={a.href} />
					))}
				</View>
			
			</ThemedView>
		</ScrollView>
	);
}

function ActivityCard({ name, description, imageId, href }: { name: ActivityType; description: string; imageId: string; href: string }) {
	const placeholder = PlaceHolderImages.find((p) => p.id === imageId);
	return (
		<Pressable style={styles.card} onPress={() => router.push(href as any)}>
			{placeholder?.imageUrl ? (
				<Image source={{ uri: placeholder.imageUrl }} style={styles.cardImage} contentFit="cover" />
			) : null}
			<View style={styles.cardBody}>
				<ThemedText type="defaultSemiBold">{name}</ThemedText>
				<ThemedText type="default" numberOfLines={2}>{description}</ThemedText>
			</View>
		</Pressable>
	);
}

const styles = StyleSheet.create({
	scrollContainer: {
		flex: 1,
	},
	container: {
		flex: 1,
		padding: 16,
		gap: 16,
	},
	grid: {
		flexDirection: 'row',
		flexWrap: 'wrap',
		gap: 12,
	},
	card: {
		width: '48%',
		borderRadius: 12,
		overflow: 'hidden',
		backgroundColor: 'rgba(127,127,127,0.08)',
	},
	cardImage: {
		width: '100%',
		height: 120,
	},
	cardBody: {
		padding: 10,
		gap: 4,
	},
	testimonialsSection: {
		marginTop: 24,
		gap: 12,
	},
	testimonialsList: {
		paddingHorizontal: 4,
	},
	testimonialCard: {
		width: 280,
		marginRight: 12,
		padding: 16,
		borderRadius: 12,
		backgroundColor: 'rgba(127,127,127,0.05)',
		gap: 8,
	},
	testimonialText: {
		fontStyle: 'italic',
		lineHeight: 20,
	},
	testimonialName: {
		textAlign: 'right',
		opacity: 0.8,
	},
});
