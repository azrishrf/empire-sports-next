"use client";

import Breadcrumb from "@/components/Breadcrumb";
import { useAuth } from "@/contexts/AuthContext";
import { UserProfile, UserService } from "@/lib/userService";
import { updateProfile } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { FiCalendar, FiEdit2, FiMail, FiMapPin, FiPhone, FiShield, FiUser, FiUsers } from "react-icons/fi";
import { PropagateLoader } from "react-spinners";
import Toastify from "toastify-js";

export default function MyAccountPage() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [isLoadingFirestore, setIsLoadingFirestore] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    gender: "",
    phone: "",
    address: "",
  });

  useEffect(() => {
    const loadUserProfile = async () => {
      // Wait for auth loading to complete
      if (loading) {
        return;
      }

      // If not loading and no user, redirect to auth
      if (!user) {
        router.push("/auth");
        return;
      }

      // User is authenticated, load their profile
      try {
        // Fetch user profile from Firestore
        const profile = await UserService.getUserProfile(user.uid);

        if (profile) {
          setUserProfile(profile);
          setFormData({
            firstName: profile.firstName || "",
            lastName: profile.lastName || "",
            email: user.email || "",
            gender: profile.gender || "",
            phone: profile.phoneNumber || "",
            address: profile.address || "",
          });
        } else {
          // Fallback to Firebase Auth data if no Firestore profile exists
          const nameParts = (user.displayName || "").split(" ");
          const firstName = nameParts[0] || "";
          const lastName = nameParts.slice(1).join(" ") || "";

          setFormData({
            firstName,
            lastName,
            email: user.email || "",
            gender: "",
            phone: user.phoneNumber || "",
            address: "",
          });
        }
      } catch (error) {
        console.error("Error loading user profile:", error);
        // Fallback to Firebase Auth data on error
        const nameParts = (user.displayName || "").split(" ");
        const firstName = nameParts[0] || "";
        const lastName = nameParts.slice(1).join(" ") || "";

        setFormData({
          firstName,
          lastName,
          email: user.email || "",
          gender: "",
          phone: user.phoneNumber || "",
          address: "",
        });
      } finally {
        setIsLoadingFirestore(false);
      }
    };

    loadUserProfile();
  }, [user, loading, router]);

  const breadcrumbItems = [
    { label: "Home", href: "/" },
    { label: "My Account", href: "/my-account" },
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSaveProfile = async () => {
    if (!user) return;

    try {
      setIsSaving(true);
      // Combine first name and last name for display name
      const displayName = `${formData.firstName} ${formData.lastName}`.trim();

      // Update the display name
      await updateProfile(user, {
        displayName,
      });

      await UserService.updateUserProfile(user.uid, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        phoneNumber: formData.phone,
        gender: formData.gender,
        address: formData.address,
        updatedAt: new Date(),
      });

      // Refresh the user profile data from Firestore
      const updatedProfile = await UserService.getUserProfile(user.uid);
      if (updatedProfile) {
        setUserProfile(updatedProfile);
        setFormData({
          firstName: updatedProfile.firstName || "",
          lastName: updatedProfile.lastName || "",
          email: user.email || "",
          gender: updatedProfile.gender || "",
          phone: updatedProfile.phoneNumber || "",
          address: updatedProfile.address || "",
        });
      }

      setIsEditing(false);
      Toastify({
        text: "Profile updated successfully!",
        duration: 3000,
        backgroundColor: "#10B981",
        close: true,
      }).showToast();
    } catch (error) {
      console.error("Error updating profile:", error);
      Toastify({
        text: "Error updating profile. Please try again.",
        duration: 3000,
        backgroundColor: "#EF4444",
      }).showToast();
    } finally {
      setIsSaving(false);
    }
  };

  if (loading || isLoadingFirestore) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <PropagateLoader color="var(--color-primary-green)" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gray-50">
        <Breadcrumb items={breadcrumbItems} />
      </div>

      <div className="container mx-auto px-4 py-12 !pt-4 sm:px-6 lg:px-8">
        {/* Loading Overlay */}
        {isSaving && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
            <div className="text-center">
              <PropagateLoader color="var(--color-primary-green)" size={15} />
            </div>
          </div>
        )}
        <div className="relative col-span-2 mb-8 overflow-hidden rounded-2xl border border-gray-200 bg-white">
          {/* Profile Header */}
          <div className="bg-gradient-to-r from-gray-900 to-gray-700 px-6 py-8">
            <div className="flex flex-col items-center text-center sm:flex-row sm:text-left">
              <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-white/10 sm:mr-6 sm:mb-0">
                <FiUser className="h-10 w-10 text-white" />
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-white">{user.displayName || "User"}</h2>
                <p className="text-gray-300">{user.email || "Loading..."}</p>
                <div className="mt-2 flex items-center justify-center sm:justify-start">
                  <FiCalendar className="mr-2 h-4 w-4 text-gray-400" />
                  <span className="text-sm text-gray-400">
                    Member since {new Date(user.metadata?.creationTime || Date.now()).toLocaleDateString()}
                  </span>
                </div>
              </div>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="mt-4 flex items-center rounded-lg bg-white/10 px-4 py-2 text-sm text-white transition-colors hover:bg-white/20 sm:mt-0"
              >
                <FiEdit2 className="mr-2 h-3 w-3" />
                {isEditing ? "Cancel" : "Edit Profile"}
              </button>
            </div>
          </div>

          {/* Profile Form */}
          <div className="p-6">
            {isEditing ? (
              <div className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <label htmlFor="firstName" className="mb-2 block text-sm font-medium text-gray-700">
                      First Name
                    </label>
                    <div className="relative">
                      <FiUser className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full rounded-lg border border-gray-300 py-3 pr-4 pl-10 focus:border-gray-400 focus:ring-1 focus:ring-gray-400 focus:outline-none"
                        placeholder="Enter your first name"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="lastName" className="mb-2 block text-sm font-medium text-gray-700">
                      Last Name
                    </label>
                    <div className="relative">
                      <FiUser className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
                      <input
                        type="text"
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full rounded-lg border border-gray-300 py-3 pr-4 pl-10 focus:border-gray-400 focus:ring-1 focus:ring-gray-400 focus:outline-none"
                        placeholder="Enter your last name"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-medium text-gray-700">
                      Email Address
                    </label>
                    <div className="relative">
                      <FiMail className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        disabled
                        className="w-full rounded-lg border border-gray-300 bg-gray-50 py-3 pr-4 pl-10 text-gray-500"
                        placeholder="Email cannot be changed"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="gender" className="mb-2 block text-sm font-medium text-gray-700">
                      Gender
                    </label>
                    <div className="relative">
                      <FiUsers className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
                      <select
                        id="gender"
                        name="gender"
                        value={formData.gender}
                        onChange={handleInputChange}
                        className="w-full appearance-none rounded-lg border border-gray-300 bg-white py-3 pr-4 pl-10 focus:border-gray-400 focus:ring-1 focus:ring-gray-400 focus:outline-none"
                      >
                        <option value="">Select gender</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="phone" className="mb-2 block text-sm font-medium text-gray-700">
                      Phone Number
                    </label>
                    <div className="relative">
                      <FiPhone className="absolute top-1/2 left-3 h-5 w-5 -translate-y-1/2 text-gray-400" />
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full rounded-lg border border-gray-300 py-3 pr-4 pl-10 focus:border-gray-400 focus:ring-1 focus:ring-gray-400 focus:outline-none"
                        placeholder="Enter your phone number"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid gap-6">
                  <div>
                    <label htmlFor="address" className="mb-2 block text-sm font-medium text-gray-700">
                      Address
                    </label>
                    <div className="relative">
                      <FiMapPin className="absolute top-3 left-3 h-5 w-5 text-gray-400" />
                      <textarea
                        id="address"
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        rows={3}
                        className="w-full rounded-lg border border-gray-300 py-3 pr-4 pl-10 focus:border-gray-400 focus:ring-1 focus:ring-gray-400 focus:outline-none"
                        placeholder="Enter your address"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-4">
                  <button
                    onClick={() => setIsEditing(false)}
                    className="rounded-lg border border-gray-300 px-6 py-3 text-gray-700 transition-colors hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveProfile}
                    disabled={isSaving}
                    className="rounded-lg bg-gray-900 px-6 py-3 text-sm text-white transition-colors hover:bg-gray-800 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {isSaving ? "Saving..." : "Save Changes"}
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-lg border border-gray-200 p-4">
                  <div className="mb-2 flex items-center">
                    <FiUser className="mr-2 h-5 w-5 text-gray-400" />
                    <span className="text-sm font-medium text-gray-500">First Name</span>
                  </div>
                  <p className="text-gray-900">{userProfile?.firstName || "Not provided"}</p>
                </div>

                <div className="rounded-lg border border-gray-200 p-4">
                  <div className="mb-2 flex items-center">
                    <FiUser className="mr-2 h-5 w-5 text-gray-400" />
                    <span className="text-sm font-medium text-gray-500">Last Name</span>
                  </div>
                  <p className="text-gray-900">{userProfile?.lastName || "Not provided"}</p>
                </div>

                <div className="rounded-lg border border-gray-200 p-4">
                  <div className="mb-2 flex items-center">
                    <FiMail className="mr-2 h-5 w-5 text-gray-400" />
                    <span className="text-sm font-medium text-gray-500">Email Address</span>
                  </div>
                  <p className="text-gray-900">{user.email || "Loading..."}</p>
                </div>

                <div className="rounded-lg border border-gray-200 p-4">
                  <div className="mb-2 flex items-center">
                    <FiUsers className="mr-2 h-5 w-5 text-gray-400" />
                    <span className="text-sm font-medium text-gray-500">Gender</span>
                  </div>
                  <p className="text-gray-900 capitalize">{userProfile?.gender || "Not provided"}</p>
                </div>

                <div className="rounded-lg border border-gray-200 p-4">
                  <div className="mb-2 flex items-center">
                    <FiPhone className="mr-2 h-5 w-5 text-gray-400" />
                    <span className="text-sm font-medium text-gray-500">Phone Number</span>
                  </div>
                  <p className="text-gray-900">{userProfile?.phoneNumber || "Not provided"}</p>
                </div>

                <div className="rounded-lg border border-gray-200 p-4">
                  <div className="mb-2 flex items-center">
                    <FiShield className="mr-2 h-5 w-5 text-gray-400" />
                    <span className="text-sm font-medium text-gray-500">Account Status</span>
                  </div>
                  <p className="text-green-600">Active</p>
                </div>

                <div className="rounded-lg border border-gray-200 p-4 md:col-span-2">
                  <div className="mb-2 flex items-center">
                    <FiMapPin className="mr-2 h-5 w-5 text-gray-400" />
                    <span className="text-sm font-medium text-gray-500">Address</span>
                  </div>
                  <p className="text-gray-900">{userProfile?.address || "Not provided"}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
