"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { LogOut, Save, UserRound } from "lucide-react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function MyProfilePage() {
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return (
      <main className="container mx-auto flex min-h-[60vh] items-center justify-center p-4">
        <p className="text-sm text-[#68675F]">প্রোফাইল লোড হচ্ছে...</p>
      </main>
    );
  }

  if (!session) {
    return (
      <main className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center gap-3 p-4">
        <h1 className="text-xl font-bold tracking-tight text-[#20221E]">
          প্রোফাইল দেখতে সাইন ইন করুন
        </h1>

        <Link
          href="/signin?callbackUrl=%2Fmy-profile"
          className="flex h-12 items-center justify-center rounded-lg bg-[#20221E] px-5 text-sm font-semibold text-[#FBF9F4] transition-colors hover:bg-[#42634A] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#42634A]/20"
        >
          সাইন ইন করুন
        </Link>
      </main>
    );
  }

  return (
    <ProfileForm
      key={session.user.id}
      initialName={session.user.name ?? ""}
      email={session.user.email}
      initialImage={session.user.image ?? ""}
    />
  );
}

function ProfileForm({
  initialName,
  email,
  initialImage,
}: {
  initialName: string;
  email: string;
  initialImage: string;
}) {
  const router = useRouter();

  const [name, setName] = useState(initialName);
  const [image, setImage] = useState(initialImage);
  const [isSaving, setIsSaving] = useState(false);
  const [isSigningOut, setIsSigningOut] = useState(false);

  const isBusy = isSaving || isSigningOut;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSaving(true);

    try {
      const { error } = await authClient.updateUser({
        name: name.trim(),
        image: image.trim() || null,
      });

      if (error) {
        toast.error(
          error.message || "প্রোফাইল আপডেট করা যায়নি। আবার চেষ্টা করুন।",
        );
        return;
      }

      toast.success("আপনার প্রোফাইল আপডেট করা হয়েছে।");
      router.refresh();
    } catch {
      toast.error("একটি সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setIsSaving(false);
    }
  }

  async function handleSignOut() {
    setIsSigningOut(true);

    try {
      const { error } = await authClient.signOut();

      if (error) {
        toast.error(error.message || "সাইন আউট করা যায়নি। আবার চেষ্টা করুন।");
        return;
      }

      toast.success("সফলভাবে সাইন আউট হয়েছে।");
      router.replace("/signin");
      router.refresh();
    } catch {
      toast.error("সাইন আউট করতে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setIsSigningOut(false);
    }
  }

  const trimmedImage = image.trim();
  const validImage = /^https?:\/\/.+/i.test(trimmedImage);

  const inputClassName =
    "h-12 w-full rounded-lg border border-[#DCD6C9] bg-[#FBF9F4] px-4 text-sm text-[#20221E] outline-none transition-colors duration-200 placeholder:text-[#969187] hover:border-[#B8B09F] focus:border-[#42634A] focus:ring-4 focus:ring-[#42634A]/10 disabled:cursor-not-allowed disabled:opacity-60";

  const labelClassName = "block text-xs font-medium text-[#20221E]";

  const primaryButtonClassName =
    "flex h-12 w-full items-center justify-center gap-2 rounded-lg bg-[#20221E] px-4 text-sm font-semibold text-[#FBF9F4] transition-colors duration-200 hover:bg-[#42634A] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#42634A]/20 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60";

  const secondaryButtonClassName =
    "inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-lg border border-[#DCD6C9] bg-[#FBF9F4] px-3 text-xs font-medium text-[#20221E] transition-colors hover:bg-[#EDE8DE] focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-[#42634A]/20 active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-50";

  return (
    <main className="container mx-auto mb-8 flex justify-center p-4">
      <div className="w-full max-w-xl">
        <div className="overflow-hidden rounded-2xl border border-[#DCD6C9] bg-[#FBF9F4]">
          {/* Profile Header */}
          <div className="flex flex-col gap-4 border-b border-[#DCD6C9] p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div className="flex min-w-0 items-center gap-4">
              {validImage ? (
                <img
                  src={trimmedImage}
                  alt={`${name || "ব্যবহারকারী"}-এর প্রোফাইল ছবি`}
                  className="h-14 w-14 shrink-0 rounded-full border border-[#DCD6C9] bg-[#F4F0E7] object-cover"
                />
              ) : (
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-[#DCD6C9] bg-[#F4F0E7] text-[#68675F]">
                  <UserRound size={26} />
                </div>
              )}

              <div className="min-w-0">
                <p className="truncate text-base font-semibold text-[#20221E]">
                  {name.trim() || "আপনার নাম"}
                </p>
                <p className="truncate text-xs leading-5 text-[#68675F]">
                  {email}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={handleSignOut}
              disabled={isBusy}
              className={secondaryButtonClassName}
            >
              <LogOut size={15} />
              {isSigningOut ? "সাইন আউট হচ্ছে..." : "সাইন আউট"}
            </button>
          </div>

          {/* Edit Profile Form */}
          <div className="p-6 sm:p-8">
            <div className="mb-6">
              <h1 className="text-xl font-bold tracking-tight text-[#20221E]">
                প্রোফাইল সম্পাদনা
              </h1>
              <p className="text-xs leading-6 text-[#68675F]">
                আপনার ব্যক্তিগত তথ্য আপডেট করুন।
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Profile Picture */}
              <div className="space-y-1">
                <label htmlFor="image" className={labelClassName}>
                  ছবির URL
                </label>
                <input
                  id="image"
                  name="image"
                  type="url"
                  autoComplete="url"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  disabled={isBusy}
                  placeholder="https://example.com/avatar.jpg"
                  className={inputClassName}
                />
                <p className="text-xs leading-5 text-[#868277]">
                  আপনার প্রোফাইল ছবির সরাসরি URL দিন।
                </p>
              </div>

              {/* Full Name */}
              <div className="space-y-1">
                <label htmlFor="name" className={labelClassName}>
                  পুরো নাম
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  autoComplete="name"
                  required
                  maxLength={100}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  disabled={isBusy}
                  className={inputClassName}
                  placeholder="আপনার নাম লিখুন"
                />
              </div>

              {/* Email */}
              <div className="space-y-1">
                <label htmlFor="email" className={labelClassName}>
                  ইমেইল
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  readOnly
                  className={`${inputClassName} cursor-not-allowed bg-[#F0EDE5] text-[#868277]`}
                />
                <p className="text-xs leading-5 text-[#868277]">
                  এখান থেকে ইমেইল পরিবর্তন করা যাবে না।
                </p>
              </div>

              {/* Save Changes */}
              <button
                type="submit"
                disabled={isBusy || !name.trim()}
                className={primaryButtonClassName}
              >
                <Save size={16} />
                {isSaving ? "সংরক্ষণ হচ্ছে..." : "পরিবর্তন সংরক্ষণ করুন"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
