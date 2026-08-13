import { Card, CardContent } from "../../../components/ui/Card";
import { User, Mail, Wallet, Calendar } from "lucide-react";
import type { UserProfile } from "../../../services/auth";

interface ProfileHeaderProps {
  profile: UserProfile;
}

export default function ProfileHeader({ profile }: ProfileHeaderProps) {
  const memberSince = new Date(profile.createdAt).toLocaleDateString("en-IN", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-start gap-5">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-500 text-2xl font-bold text-white">
            {profile.name.charAt(0).toUpperCase()}
          </div>

          <div className="flex-1 space-y-3">
            <div className="flex items-center gap-3">
              <User size={18} className="text-slate-400" />
              <span className="text-sm font-semibold text-slate-900">{profile.name}</span>
            </div>

            <div className="flex items-center gap-3">
              <Mail size={18} className="text-slate-400" />
              <span className="text-sm text-slate-600">{profile.email}</span>
            </div>

            <div className="flex items-center gap-3">
              <Wallet size={18} className="text-slate-400" />
              <span className="text-sm text-slate-600">Currency: {profile.currency}</span>
            </div>

            <div className="flex items-center gap-3">
              <Calendar size={18} className="text-slate-400" />
              <span className="text-sm text-slate-600">Member since {memberSince}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}