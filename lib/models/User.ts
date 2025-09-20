import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  _id: string;
  projectId: string;
  fullName: string;
  email: string;
  phone: string;
  weight: number;
  weightPhoto?: string;
  height: number;
  age: number;
  gender: 'Male' | 'Female' | 'Other';
  location: string;
  state: string;
  village: string;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema({
  projectId: { type: String, required: true, default: '68ce980a1e67792a5e86d8a1' },
  fullName: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  phone: { type: String, required: true },
  weight: { type: Number, required: true },
  weightPhoto: { type: String },
  height: { type: Number, required: true },
  age: { type: Number, required: true },
  gender: { type: String, enum: ['Male', 'Female', 'Other'], required: true },
  location: { type: String, required: true },
  state: { type: String, required: true },
  village: { type: String, required: true },
}, {
  timestamps: true
});

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);