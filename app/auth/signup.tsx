import React, { useState } from 'react';
import { ScrollView, StyleSheet, View, TextInput, Pressable, Alert } from 'react-native';
import { Image } from 'expo-image';
import * as ImagePicker from 'expo-image-picker';
import { router } from 'expo-router';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';

export default function SignupScreen() {
	const [formData, setFormData] = useState({
		fullName: '',
		phoneNumber: '',
		email: '',
		height: '',
		weight: '',
		age: '',
		gender: '',
		state: '',
		village: '',
		password: '',
		confirmPassword: '',
	});
	const [weightPhoto, setWeightPhoto] = useState<string | null>(null);
	const [errors, setErrors] = useState<Record<string, string>>({});

	const validatePassword = (password: string) => {
		const minLength = password.length >= 8;
		const hasNumber = /\d/.test(password);
		const hasSpecial = /[!@#$%^&*(),.?":{}|<>]/.test(password);
		return minLength && hasNumber && hasSpecial;
	};

	const validateForm = () => {
		const newErrors: Record<string, string> = {};

		if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
		if (!formData.phoneNumber.trim()) newErrors.phoneNumber = 'Phone number is required';
		if (!formData.email.trim()) newErrors.email = 'Email is required';
		if (!formData.height.trim()) newErrors.height = 'Height is required';
		if (!formData.weight.trim()) newErrors.weight = 'Weight is required';
		if (!formData.age.trim()) newErrors.age = 'Age is required';
		if (!formData.gender) newErrors.gender = 'Gender is required';
		if (!formData.state.trim()) newErrors.state = 'State is required';
		if (!formData.village.trim()) newErrors.village = 'Village is required';
		if (!weightPhoto) newErrors.weightPhoto = 'Weight photo is mandatory';
		if (!validatePassword(formData.password)) {
			newErrors.password = 'Password must be 8+ chars with 1 number & 1 special character';
		}
		if (formData.password !== formData.confirmPassword) {
			newErrors.confirmPassword = 'Passwords do not match';
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const pickWeightPhoto = async () => {
		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.Images,
			allowsEditing: true,
			aspect: [4, 3],
			quality: 1,
		});

		if (!result.canceled) {
			setWeightPhoto(result.assets[0].uri);
		}
	};

	const handleSignup = () => {
		if (validateForm()) {
			Alert.alert('Success', 'Account created successfully!', [
				{ text: 'OK', onPress: () => router.push('/auth/login') }
			]);
		}
	};

	return (
		<ScrollView contentContainerStyle={styles.container}>
			<ThemedView style={styles.header}>
				<ThemedText type="title">Create Account</ThemedText>
				<ThemedText type="default">Join our fitness community</ThemedText>
			</ThemedView>

			<View style={styles.form}>
				<View style={styles.inputGroup}>
					<ThemedText type="defaultSemiBold">Full Name *</ThemedText>
					<TextInput
						style={styles.input}
						value={formData.fullName}
						onChangeText={(text) => setFormData({...formData, fullName: text})}
						placeholder="Enter your full name"
					/>
					{errors.fullName && <ThemedText style={styles.error}>{errors.fullName}</ThemedText>}
				</View>

				<View style={styles.inputGroup}>
					<ThemedText type="defaultSemiBold">Phone Number *</ThemedText>
					<TextInput
						style={styles.input}
						value={formData.phoneNumber}
						onChangeText={(text) => setFormData({...formData, phoneNumber: text})}
						placeholder="Enter phone number"
						keyboardType="phone-pad"
					/>
					{errors.phoneNumber && <ThemedText style={styles.error}>{errors.phoneNumber}</ThemedText>}
				</View>

				<View style={styles.inputGroup}>
					<ThemedText type="defaultSemiBold">Email Address *</ThemedText>
					<TextInput
						style={styles.input}
						value={formData.email}
						onChangeText={(text) => setFormData({...formData, email: text})}
						placeholder="Enter email address"
						keyboardType="email-address"
						autoCapitalize="none"
					/>
					{errors.email && <ThemedText style={styles.error}>{errors.email}</ThemedText>}
				</View>

				<View style={styles.row}>
					<View style={[styles.inputGroup, styles.halfWidth]}>
						<ThemedText type="defaultSemiBold">Height (cm) *</ThemedText>
						<TextInput
							style={styles.input}
							value={formData.height}
							onChangeText={(text) => setFormData({...formData, height: text})}
							placeholder="170"
							keyboardType="numeric"
						/>
						{errors.height && <ThemedText style={styles.error}>{errors.height}</ThemedText>}
					</View>

					<View style={[styles.inputGroup, styles.halfWidth]}>
						<ThemedText type="defaultSemiBold">Weight (kg) *</ThemedText>
						<TextInput
							style={styles.input}
							value={formData.weight}
							onChangeText={(text) => setFormData({...formData, weight: text})}
							placeholder="70"
							keyboardType="numeric"
						/>
						{errors.weight && <ThemedText style={styles.error}>{errors.weight}</ThemedText>}
					</View>
				</View>

				<View style={styles.inputGroup}>
					<ThemedText type="defaultSemiBold">Weight Photo * (Mandatory)</ThemedText>
					<Pressable style={styles.photoButton} onPress={pickWeightPhoto}>
						{weightPhoto ? (
							<Image source={{ uri: weightPhoto }} style={styles.photoPreview} contentFit="cover" />
						) : (
							<ThemedText style={styles.photoButtonText}>📷 Upload Weight Photo</ThemedText>
						)}
					</Pressable>
					{errors.weightPhoto && <ThemedText style={styles.error}>{errors.weightPhoto}</ThemedText>}
				</View>

				<View style={styles.row}>
					<View style={[styles.inputGroup, styles.halfWidth]}>
						<ThemedText type="defaultSemiBold">Age *</ThemedText>
						<TextInput
							style={styles.input}
							value={formData.age}
							onChangeText={(text) => setFormData({...formData, age: text})}
							placeholder="25"
							keyboardType="numeric"
						/>
						{errors.age && <ThemedText style={styles.error}>{errors.age}</ThemedText>}
					</View>

					<View style={[styles.inputGroup, styles.halfWidth]}>
						<ThemedText type="defaultSemiBold">Gender *</ThemedText>
						<View style={styles.genderRow}>
							{['Male', 'Female'].map((gender) => (
								<Pressable
									key={gender}
									style={[styles.genderButton, formData.gender === gender && styles.genderSelected]}
									onPress={() => setFormData({...formData, gender})}
								>
									<ThemedText style={[styles.genderText, formData.gender === gender && styles.genderTextSelected]}>
										{gender}
									</ThemedText>
								</Pressable>
							))}
						</View>
						{errors.gender && <ThemedText style={styles.error}>{errors.gender}</ThemedText>}
					</View>
				</View>

				<View style={styles.inputGroup}>
					<ThemedText type="defaultSemiBold">State *</ThemedText>
					<TextInput
						style={styles.input}
						value={formData.state}
						onChangeText={(text) => setFormData({...formData, state: text})}
						placeholder="Enter your state"
					/>
					{errors.state && <ThemedText style={styles.error}>{errors.state}</ThemedText>}
				</View>

				<View style={styles.inputGroup}>
					<ThemedText type="defaultSemiBold">Village *</ThemedText>
					<TextInput
						style={styles.input}
						value={formData.village}
						onChangeText={(text) => setFormData({...formData, village: text})}
						placeholder="Enter your village"
					/>
					{errors.village && <ThemedText style={styles.error}>{errors.village}</ThemedText>}
				</View>

				<View style={styles.inputGroup}>
					<ThemedText type="defaultSemiBold">Password *</ThemedText>
					<TextInput
						style={styles.input}
						value={formData.password}
						onChangeText={(text) => setFormData({...formData, password: text})}
						placeholder="Min 8 chars, 1 number, 1 special char"
						secureTextEntry
					/>
					{errors.password && <ThemedText style={styles.error}>{errors.password}</ThemedText>}
				</View>

				<View style={styles.inputGroup}>
					<ThemedText type="defaultSemiBold">Confirm Password *</ThemedText>
					<TextInput
						style={styles.input}
						value={formData.confirmPassword}
						onChangeText={(text) => setFormData({...formData, confirmPassword: text})}
						placeholder="Confirm your password"
						secureTextEntry
					/>
					{errors.confirmPassword && <ThemedText style={styles.error}>{errors.confirmPassword}</ThemedText>}
				</View>

				<Pressable style={styles.signupButton} onPress={handleSignup}>
					<ThemedText style={styles.signupButtonText}>Create Account</ThemedText>
				</Pressable>

				<Pressable onPress={() => router.push('/auth/login')}>
					<ThemedText style={styles.loginLink}>Already have an account? Login</ThemedText>
				</Pressable>
			</View>
		</ScrollView>
	);
}

const styles = StyleSheet.create({
	container: {
		padding: 20,
		paddingTop: 60,
	},
	header: {
		alignItems: 'center',
		marginBottom: 32,
		gap: 8,
	},
	form: {
		gap: 20,
	},
	inputGroup: {
		gap: 8,
	},
	input: {
		borderWidth: 1,
		borderColor: 'rgba(127,127,127,0.3)',
		borderRadius: 12,
		padding: 16,
		fontSize: 16,
		backgroundColor: '#fff',
	},
	row: {
		flexDirection: 'row',
		gap: 12,
	},
	halfWidth: {
		flex: 1,
	},
	photoButton: {
		borderWidth: 2,
		borderColor: 'rgba(127,127,127,0.3)',
		borderStyle: 'dashed',
		borderRadius: 12,
		padding: 20,
		alignItems: 'center',
		justifyContent: 'center',
		minHeight: 120,
	},
	photoButtonText: {
		fontSize: 16,
		opacity: 0.7,
	},
	photoPreview: {
		width: '100%',
		height: 120,
		borderRadius: 8,
	},
	genderRow: {
		flexDirection: 'row',
		gap: 8,
	},
	genderButton: {
		flex: 1,
		padding: 12,
		borderRadius: 8,
		borderWidth: 1,
		borderColor: 'rgba(127,127,127,0.3)',
		alignItems: 'center',
	},
	genderSelected: {
		backgroundColor: '#007AFF',
		borderColor: '#007AFF',
	},
	genderText: {
		fontSize: 16,
	},
	genderTextSelected: {
		color: '#fff',
		fontWeight: '600',
	},
	signupButton: {
		backgroundColor: '#007AFF',
		padding: 18,
		borderRadius: 12,
		alignItems: 'center',
		marginTop: 12,
	},
	signupButtonText: {
		color: '#fff',
		fontSize: 18,
		fontWeight: '600',
	},
	loginLink: {
		textAlign: 'center',
		color: '#007AFF',
		fontSize: 16,
		marginTop: 16,
	},
	error: {
		color: '#FF3B30',
		fontSize: 14,
	},
});