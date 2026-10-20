"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, LogOut, Save, UserRound } from "lucide-react";
import { authClient } from "@/lib/auth-client";

export default function MyProfilePage() {
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();

  if (isPending) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center bg-neutral-50">
        <p className="text-sm text-neutral-500">Loading your profile...</p>
      </main>
    );
  }

  if (!session) {
    return (
      <main className="flex min-h-[60vh] flex-col items-center justify-center gap-3 bg-neutral-50 px-4">
        <h1 className="text-xl font-bold text-neutral-900">
          Sign in to view your profile
        </h1>
        <Link
          href="/signin?callbackUrl=%2Fmy-profile"
          className="rounded-lg bg-neutral-900 px-5 py-2.5 text-sm font-semibold text-white"
        >
          Sign in
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
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [saving, setSaving] = useState(false);
  const [signingOut, setSigningOut] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setMessage("");
    setSaving(true);

    try {
      const { error } = await authClient.updateUser({
        name,
        image: image.trim() || null,
      });

      if (error) {
        setError(error.message || "Unable to update your profile.");
        return;
      }

      setMessage("Your profile has been updated.");
      router.refresh();
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  async function handleSignOut() {
    setSigningOut(true);

    try {
      await authClient.signOut();
      router.replace("/signin");
      router.refresh();
    } catch {
      setError("Unable to sign out. Please try again.");
      setSigningOut(false);
    }
  }

  const validImage = image.trim() && /^https?:\/\/.+/i.test(image.trim());

  return (
    <main className="min-h-[calc(100vh-4rem)] bg-neutral-50 px-4 py-10 sm:py-16">
      <div className="mx-auto max-w-2xl">
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 text-sm text-neutral-500 transition hover:text-neutral-900"
        >
          <ArrowLeft size={16} />
          Back to Bazar Dor
        </Link>

        <div className="overflow-hidden rounded-2xl border border-neutral-200 bg-white">
          <div className="border-b border-neutral-200 px-6 py-6 sm:px-8">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-neutral-500">
              Account settings
            </p>
            <h1 className="mt-2 text-2xl font-bold tracking-tight text-neutral-900">
              My profile
            </h1>
            <p className="mt-2 text-sm text-neutral-500">
              Manage your personal information.
            </p>
          </div>

          <div className="p-6 sm:p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex items-center gap-4">
                {validImage ? (
                  <img
                    src={image.trim()}
                    alt="Profile"
                    className="h-20 w-20 rounded-full border border-neutral-200 object-cover"
                  />
                ) : (
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-neutral-100 text-neutral-500">
                    <UserRound size={32} />
                  </div>
                )}

                <div>
                  <p className="font-semibold text-neutral-900">
                    Profile picture
                  </p>
                  <p className="mt-1 text-xs text-neutral-500">
                    Add a publicly accessible image URL below.
                  </p>
                </div>
              </div>

              <div>
                <label
                  htmlFor="image"
                  className="mb-1.5 block text-sm font-medium text-neutral-700"
                >
                  Profile picture URL
                </label>
                <input
                  id="image"
                  type="url"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  placeholder="https://example.com/avatar.jpg"
                  className="h-11 w-full rounded-lg border border-neutral-200 px-3 text-sm outline-none transition focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
                />
              </div>

              <div>
                <label
                  htmlFor="name"
                  className="mb-1.5 block text-sm font-medium text-neutral-700"
                >
                  Full name
                </label>
                <input
                  id="name"
                  type="text"
                  autoComplete="name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="h-11 w-full rounded-lg border border-neutral-200 px-3 text-sm outline-none transition focus:border-neutral-900 focus:ring-1 focus:ring-neutral-900"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="mb-1.5 block text-sm font-medium text-neutral-700"
                >
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  disabled
                  className="h-11 w-full cursor-not-allowed rounded-lg border border-neutral-200 bg-neutral-50 px-3 text-sm text-neutral-500"
                />
                <p className="mt-1.5 text-xs text-neutral-400">
                  Your email address cannot be changed here.
                </p>
              </div>

              {error && (
                <p role="alert" className="text-sm text-red-600">
                  {error}
                </p>
              )}

              {message && (
                <p role="status" className="text-sm text-green-700">
                  {message}
                </p>
              )}

              <button
                type="submit"
                disabled={saving}
                className="flex h-11 w-full items-center justify-center gap-2 rounded-lg bg-neutral-900 text-sm font-semibold text-white transition hover:bg-neutral-800 disabled:opacity-60 sm:w-auto sm:px-6"
              >
                <Save size={16} />
                {saving ? "Saving changes..." : "Save changes"}
              </button>
            </form>

            <div className="mt-8 border-t border-neutral-200 pt-6">
              <h2 className="text-sm font-semibold text-neutral-900">
                Sign out
              </h2>
              <p className="mt-1 text-sm text-neutral-500">
                Sign out of your Bazar Dor account on this device.
              </p>

              <button
                type="button"
                onClick={handleSignOut}
                disabled={signingOut}
                className="mt-4 inline-flex h-10 items-center justify-center gap-2 rounded-lg border border-neutral-200 px-4 text-sm font-medium text-neutral-700 transition hover:bg-neutral-50 disabled:opacity-50"
              >
                <LogOut size={16} />
                {signingOut ? "Signing out..." : "Sign out"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
