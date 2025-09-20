import React, { useState, useCallback, memo } from 'react';
import { View, TextInput, Pressable, Alert, StyleSheet, ScrollView, ActivityIndicator } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import * as ImagePicker from 'expo-image-picker';
import { Image } from 'expo-image';
import { UserData } from '@/lib/services/profileService';
import { useAuth } from '@/lib/contexts/AuthContext';

type ProfileValues = {
  weight: string;
  weightPhoto?: string;
  height: string;
  age: string;
  gender: string;
  location: string;
  state: string;
  village: string;
};

type ValidationErrors = {
  weight?: string;
  height?: string;
  age?: string;
  gender?: string;
  location?: string;
  state?: string;
};

export const ProfileForm = memo(() => {
  const { token } = useAuth();
  const [formData, setFormData] = useState<ProfileValues>({
    weight: '',
    weightPhoto: undefined,
    height: '',
    age: '',
    gender: '',
    location: '',
    state: '',
    village: '',
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);

  const validate = useCallback((): boolean => {
    const newErrors: ValidationErrors = {};
    
    if (!formData.weight || isNaN(Number(formData.weight)) || Number(formData.weight) <= 0) {
      newErrors.weight = 'Valid weight is required';
    }
    if (!formData.height || isNaN(Number(formData.height)) || Number(formData.height) <= 0) {
      newErrors.height = 'Valid height is required';
    }
    if (!formData.age || isNaN(Number(formData.age)) || Number(formData.age) <= 0) {
      newErrors.age = 'Valid age is required';
    }
    if (!formData.gender) {
      newErrors.gender = 'Gender is required';
    }
    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }
    if (!formData.state.trim()) {
      newErrors.state = 'State is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const pickImage = useCallback(async () => {
    try {
      setImageLoading(true);
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permission required', 'We need access to your photos.');
        return;
      }
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });
      if (!result.canceled && result.assets[0]) {
        setFormData(prev => ({ ...prev, weightPhoto: result.assets[0].uri }));
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to pick image. Please try again.');
    } finally {
      setImageLoading(false);
    }
  }, []);

  const onSubmit = useCallback(async () => {
    if (!token) {
      Alert.alert('Error', 'Please log in to update your profile.');
      return;
    }

    if (!validate()) {
      Alert.alert('Validation Error', 'Please fix the errors before submitting.');
      return;
    }

    try {
      setLoading(true);
      const userData: UserData = {
        fullName: 'Alex Johnson',
        phone: '123-456-7890',
        profile: formData
      };

      // await ProfileService.updateProfile(userData, token);
      console.log('Profile data:', userData);
      Alert.alert('Success', 'Profile updated successfully!');
      setErrors({});
    } catch (error) {
      Alert.alert('Error', 'Failed to update profile. Please try again.');
      console.error('Profile update error:', error);
    } finally {
      setLoading(false);
    }
  }, [formData, token, validate]);

  const updateField = useCallback((field: keyof ProfileValues, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field as keyof ValidationErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  }, [errors]);

  return (
    <ThemedView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.card}>
          <ThemedText type="defaultSemiBold" style={styles.cardTitle}>Registered Information</ThemedText>
          <View style={styles.infoGrid}>
            <View style={styles.infoItem}>
              <ThemedText style={styles.infoLabel}>Full Name</ThemedText>
              <ThemedText>Alex Johnson</ThemedText>
            </View>
            <View style={styles.infoItem}>
              <ThemedText style={styles.infoLabel}>Email</ThemedText>
              <ThemedText>alex.j@example.com</ThemedText>
            </View>
            <View style={styles.infoItem}>
              <ThemedText style={styles.infoLabel}>Phone</ThemedText>
              <ThemedText>123-456-7890</ThemedText>
            </View>
          </View>
        </View>

        <View style={styles.formGrid}>
          <View style={styles.fieldGroup}>
            <ThemedText style={styles.label}>Weight (kg) *</ThemedText>
            <TextInput
              style={[styles.input, errors.weight && styles.inputError]}
              placeholder="70"
              keyboardType="numeric"
              value={formData.weight}
              onChangeText={(text) => updateField('weight', text)}
            />
            {errors.weight && <ThemedText style={styles.errorText}>{errors.weight}</ThemedText>}
          </View>
          
          <View style={styles.fieldGroup}>
            <ThemedText style={styles.label}>Weight Photo</ThemedText>
            <Pressable onPress={pickImage} style={styles.uploadButton} disabled={imageLoading}>
              {imageLoading ? (
                <ActivityIndicator size="small" color="#3B82F6" />
              ) : (
                <ThemedText style={styles.uploadButtonText}>Choose File</ThemedText>
              )}
            </Pressable>
            {formData.weightPhoto && (
              <Image source={{ uri: formData.weightPhoto }} style={styles.preview} contentFit="cover" />
            )}
            <ThemedText style={styles.helperText}>Upload a photo for verification.</ThemedText>
          </View>
          
          <View style={styles.fieldGroup}>
            <ThemedText style={styles.label}>Height (cm) *</ThemedText>
            <TextInput
              style={[styles.input, errors.height && styles.inputError]}
              placeholder="175"
              keyboardType="numeric"
              value={formData.height}
              onChangeText={(text) => updateField('height', text)}
            />
            {errors.height && <ThemedText style={styles.errorText}>{errors.height}</ThemedText>}
          </View>
          
          <View style={styles.fieldGroup}>
            <ThemedText style={styles.label}>Age *</ThemedText>
            <TextInput
              style={[styles.input, errors.age && styles.inputError]}
              placeholder="28"
              keyboardType="numeric"
              value={formData.age}
              onChangeText={(text) => updateField('age', text)}
            />
            {errors.age && <ThemedText style={styles.errorText}>{errors.age}</ThemedText>}
          </View>
          
          <View style={styles.fieldGroup}>
            <ThemedText style={styles.label}>Gender *</ThemedText>
            <View style={styles.genderRow}>
              {['Male', 'Female', 'Other'].map((gender) => (
                <Pressable
                  key={gender}
                  style={[styles.genderButton, formData.gender === gender && styles.genderButtonActive]}
                  onPress={() => updateField('gender', gender)}
                >
                  <ThemedText style={[styles.genderButtonText, formData.gender === gender && styles.genderButtonActiveText]}>{gender}</ThemedText>
                </Pressable>
              ))}
            </View>
            {errors.gender && <ThemedText style={styles.errorText}>{errors.gender}</ThemedText>}
          </View>
        </View>
        
        <View style={styles.locationGrid}>
          <View style={styles.fieldGroup}>
            <ThemedText style={styles.label}>Location (City/Town) *</ThemedText>
            <TextInput
              style={[styles.input, errors.location && styles.inputError]}
              placeholder="Sunnyvale"
              value={formData.location}
              onChangeText={(text) => updateField('location', text)}
            />
            {errors.location && <ThemedText style={styles.errorText}>{errors.location}</ThemedText>}
          </View>
          
          <View style={styles.fieldGroup}>
            <ThemedText style={styles.label}>State *</ThemedText>
            <TextInput
              style={[styles.input, errors.state && styles.inputError]}
              placeholder="California"
              value={formData.state}
              onChangeText={(text) => updateField('state', text)}
            />
            {errors.state && <ThemedText style={styles.errorText}>{errors.state}</ThemedText>}
          </View>
        </View>

        <Pressable onPress={onSubmit} style={[styles.submitButton, loading && styles.submitButtonDisabled]} disabled={loading}>
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <ThemedText type="defaultSemiBold" style={styles.submitButtonText}>Save Changes</ThemedText>
          )}
        </Pressable>
      </ScrollView>
    </ThemedView>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 16,
    gap: 24,
  },
  card: {
    padding: 16,
    borderRadius: 12,
    backgroundColor: 'rgba(127,127,127,0.08)',
    gap: 12,
  },
  cardTitle: {
    fontSize: 16,
  },
  infoGrid: {
    gap: 12,
  },
  infoItem: {
    gap: 4,
  },
  infoLabel: {
    fontSize: 12,
    opacity: 0.7,
  },
  formGrid: {
    gap: 16,
  },
  locationGrid: {
    gap: 16,
  },
  fieldGroup: {
    gap: 8,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
  },
  input: {
    height: 44,
    borderRadius: 8,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: 'rgba(127,127,127,0.35)',
    paddingHorizontal: 12,
    backgroundColor: 'rgba(127,127,127,0.08)',
    fontSize: 16,
  },
  inputError: {
    borderColor: '#EF4444',
    borderWidth: 1,
  },
  errorText: {
    fontSize: 12,
    color: '#EF4444',
    marginTop: 4,
  },
  uploadButton: {
    alignSelf: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: 'rgba(127,127,127,0.15)',
  },
  uploadButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  preview: {
    width: 100,
    height: 100,
    borderRadius: 8,
    marginTop: 8,
  },
  helperText: {
    fontSize: 12,
    opacity: 0.7,
  },
  genderRow: {
    flexDirection: 'row',
    gap: 8,
  },
  genderButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: 'rgba(127,127,127,0.15)',
  },
  genderButtonActive: {
    backgroundColor: '#3B82F6',
  },
  genderButtonText: {
    fontSize: 14,
  },
  genderButtonActiveText: {
    color: '#fff',
  },
  submitButton: {
    alignSelf: 'flex-end',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    backgroundColor: '#3B82F6',
    minWidth: 120,
    alignItems: 'center',
  },
  submitButtonDisabled: {
    backgroundColor: 'rgba(59,130,246,0.5)',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});