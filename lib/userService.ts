import { db } from "@/lib/firebase";
import { User } from "firebase/auth";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";

export interface UserProfile {
  uid: string;
  email: string;
  firstName: string;
  lastName: string;
  phoneNumber: string;
  gender: "male" | "female" | "";
  photoURL?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateUserProfileData {
  firstName: string;
  lastName: string;
  phoneNumber: string;
  gender: "male" | "female" | "";
}

export class UserService {
  private static getUserDocRef(userId: string) {
    return doc(db, "users", userId);
  }

  // Create user profile in Firestore
  static async createUserProfile(user: User, additionalData: CreateUserProfileData): Promise<void> {
    try {
      const userRef = this.getUserDocRef(user.uid);

      const userProfile: UserProfile = {
        uid: user.uid,
        email: user.email || "",
        firstName: additionalData.firstName,
        lastName: additionalData.lastName,
        phoneNumber: additionalData.phoneNumber,
        gender: additionalData.gender,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // Only add photoURL if it exists and is not null/undefined
      if (user.photoURL) {
        userProfile.photoURL = user.photoURL;
      }

      await setDoc(userRef, userProfile);
      console.log("User profile created successfully:", userProfile);
    } catch (error) {
      console.error("Error creating user profile:", error);
      throw error;
    }
  }

  // Get user profile from Firestore
  static async getUserProfile(userId: string): Promise<UserProfile | null> {
    try {
      const userRef = this.getUserDocRef(userId);
      const userSnap = await getDoc(userRef);

      if (userSnap.exists()) {
        const userData = userSnap.data() as UserProfile;
        console.log("User profile loaded:", userData);
        return userData;
      } else {
        console.log("No user profile found");
        return null;
      }
    } catch (error) {
      console.error("Error loading user profile:", error);
      throw error;
    }
  }

  // Update user profile
  static async updateUserProfile(
    userId: string,
    updateData: Partial<Omit<UserProfile, "uid" | "createdAt">>,
  ): Promise<void> {
    try {
      const userRef = this.getUserDocRef(userId);

      const updatedData = {
        ...updateData,
        updatedAt: new Date(),
      };

      // Remove undefined values from updateData
      const cleanedData = Object.fromEntries(Object.entries(updatedData).filter(([_, value]) => value !== undefined));

      await updateDoc(userRef, cleanedData);
      console.log("User profile updated successfully");
    } catch (error) {
      console.error("Error updating user profile:", error);
      throw error;
    }
  }

  // Create profile from Google OAuth data
  static async createGoogleUserProfile(user: User): Promise<void> {
    try {
      const userRef = this.getUserDocRef(user.uid);

      // Check if profile already exists
      const existingProfile = await getDoc(userRef);
      if (existingProfile.exists()) {
        console.log("Google user profile already exists");
        return;
      }

      // Extract names from displayName
      const nameParts = (user.displayName || "").split(" ");
      const firstName = nameParts[0] || "";
      const lastName = nameParts.slice(1).join(" ") || "";

      const userProfile: UserProfile = {
        uid: user.uid,
        email: user.email || "",
        firstName: firstName,
        lastName: lastName,
        phoneNumber: user.phoneNumber || "",
        gender: "",
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      // Only add photoURL if it exists and is not null/undefined
      if (user.photoURL) {
        userProfile.photoURL = user.photoURL;
      }

      await setDoc(userRef, userProfile);
      console.log("Google user profile created successfully:", userProfile);
    } catch (error) {
      console.error("Error creating Google user profile:", error);
      throw error;
    }
  }
}
