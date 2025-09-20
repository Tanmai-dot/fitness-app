import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, TextInput, Pressable, Alert } from 'react-native';
import { router } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function LoginScreen() {
	const [formData, setFormData] = useState({
		email: '',
		password: '',
	});
	const [errors, setErrors] = useState<Record<string, string>>({});

	const validateForm = () => {
		const newErrors: Record<string, string> = {};

		if (!formData.email.trim()) newErrors.email = 'Email is required';
		if (!formData.password.trim()) newErrors.password = 'Password is required';

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const handleLogin = () => {
		if (validateForm()) {
			Alert.alert('Success', 'Login successful!', [
				{ text: 'OK', onPress: () => router.push('/(tabs)') }
			]);
		}
	};

	const handleForgotPassword = () => {
		Alert.alert('Forgot Password', 'Password reset link will be sent to your email.');
	};

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<ThemedView style={styles.header}>
				<ThemedText type="title" style={{ fontSize: 28, color: '#1E293B' }}>🏆 Welcome Back</ThemedText>
				<ThemedText type="default" style={{ fontSize: 16, opacity: 0.7, textAlign: 'center' }}>Sign in to continue your fitness journey and compete with athletes nationwide!</ThemedText>
			</ThemedView>

			<View style={styles.form}>
				<View style={styles.inputGroup}>
					<ThemedText type="defaultSemiBold">Email Address</ThemedText>
					<TextInput
						style={styles.input}
						value={formData.email}
						onChangeText={(text) => setFormData({...formData, email: text})}
						placeholder="Enter your email"
						keyboardType="email-address"
						autoCapitalize="none"
					/>
					{errors.email && <ThemedText style={styles.error}>{errors.email}</ThemedText>}
				</View>

				<View style={styles.inputGroup}>
					<ThemedText type="defaultSemiBold">Password</ThemedText>
					<TextInput
						style={styles.input}
						value={formData.password}
						onChangeText={(text) => setFormData({...formData, password: text})}
						placeholder="Enter your password"
						secureTextEntry
					/>
					{errors.password && <ThemedText style={styles.error}>{errors.password}</ThemedText>}
				</View>

				<Pressable onPress={handleForgotPassword}>
					<ThemedText style={styles.forgotPassword}>Forgot Password?</ThemedText>
				</Pressable>

				<Pressable style={styles.loginButton} onPress={handleLogin}>
					<ThemedText style={styles.loginButtonText}>Sign In</ThemedText>
				</Pressable>

				<Pressable onPress={() => router.push('/auth/signup')}>
					<ThemedText style={styles.signupLink}>Don't have an account? Sign Up</ThemedText>
				</Pressable>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		padding: 20,
		paddingTop: 80,
		justifyContent: 'center',
		backgroundColor: '#F8FAFC',
	},
	header: {
		alignItems: 'center',
		marginBottom: 48,
		gap: 12,
		padding: 24,
		backgroundColor: '#FFFFFF',
		borderRadius: 20,
		shadowColor: '#000',
		shadowOpacity: 0.05,
		shadowRadius: 10,
		shadowOffset: { width: 0, height: 2 },
		elevation: 3,
	},
	form: {
		gap: 24,
		padding: 24,
		backgroundColor: '#FFFFFF',
		borderRadius: 20,
		shadowColor: '#000',
		shadowOpacity: 0.05,
		shadowRadius: 10,
		shadowOffset: { width: 0, height: 2 },
		elevation: 3,
	},
	inputGroup: {
		gap: 8,
	},
	input: {
		borderWidth: 1,
		borderColor: '#D1D5DB',
		borderRadius: 12,
		padding: 16,
		fontSize: 16,
		backgroundColor: '#FFFFFF',
		shadowColor: '#000',
		shadowOpacity: 0.02,
		shadowRadius: 4,
		shadowOffset: { width: 0, height: 1 },
		elevation: 1,
	},
	forgotPassword: {
		textAlign: 'right',
		color: '#3B82F6',
		fontSize: 16,
		marginTop: -8,
		fontWeight: '500',
	},
	loginButton: {
		backgroundColor: '#3B82F6',
		padding: 18,
		borderRadius: 12,
		alignItems: 'center',
		marginTop: 12,
		shadowColor: '#3B82F6',
		shadowOpacity: 0.3,
		shadowRadius: 8,
		shadowOffset: { width: 0, height: 4 },
		elevation: 5,
	},
	loginButtonText: {
		color: '#FFFFFF',
		fontSize: 18,
		fontWeight: 'bold',
	},
	signupLink: {
		textAlign: 'center',
		color: '#3B82F6',
		fontSize: 16,
		marginTop: 16,
		fontWeight: '500',
	},
	error: {
		color: '#EF4444',
		fontSize: 14,
		fontWeight: '500',
	},
});