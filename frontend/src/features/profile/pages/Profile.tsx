import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProfile, type UserProfile } from "../../../services/auth";
import ProfileHeader from "../components/ProfileHeader";
import EditProfileForm from "../components/EditProfileForm";
import ChangePasswordForm from "../components/ChangePasswordForm";
import ProfileSkeleton from "../components/ProfileSkeleton";
import BottomNavigation from "../../dashboard/components/BottomNavigation";

export default function Profile() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [showEditProfile, setShowEditProfile] = useState(false);
  const [showChangePassword, setShowChangePassword] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const data = await getProfile();
        setProfile(data);
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/signin");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#F7F7F7]">
        <ProfileSkeleton />
        <BottomNavigation />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F7F7] pb-24">
      <div className="mx-auto max-w-2xl px-4 pt-6 space-y-6">
        <button
          onClick={() => navigate("/dashboard")}
          className="mb-5 text-sm font-semibold text-blue-600"
        >
          ← Back
        </button>

        <ProfileHeader profile={profile!} />

        <div className="space-y-4">
          <button
            onClick={() => setShowEditProfile(!showEditProfile)}
            className="w-full rounded-2xl border border-slate-200 bg-white p-4 text-left font-semibold text-slate-900 shadow-sm hover:bg-slate-50 transition-colors"
            type="button"
          >
            Edit Profile
          </button>
          {showEditProfile && (
            <EditProfileForm
              profile={profile!}
              onSuccess={(updated) => {
                setProfile(updated);
                setShowEditProfile(false);
              }}
              onCancel={() => setShowEditProfile(false)}
            />
          )}

          <button
            onClick={() => setShowChangePassword(!showChangePassword)}
            className="w-full rounded-2xl border border-slate-200 bg-white p-4 text-left font-semibold text-slate-900 shadow-sm hover:bg-slate-50 transition-colors"
            type="button"
          >
            Change Password
          </button>
          {showChangePassword && (
            <ChangePasswordForm
              onSuccess={() => setShowChangePassword(false)}
              onCancel={() => setShowChangePassword(false)}
            />
          )}

          <button
            onClick={handleLogout}
            className="w-full rounded-2xl border border-red-200 bg-white p-4 text-left font-semibold text-red-600 shadow-sm hover:bg-red-50 transition-colors"
            type="button"
          >
            Log out
          </button>
        </div>
      </div>

      <BottomNavigation />
    </div>
  );
}