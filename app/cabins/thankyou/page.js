import Link from "next/link";

export const metadata = {
  title: "Thank you",
};

export default function Page() {
  return (
    <div className="flex flex-col items-center justify-center gap-6 mt-24">
      <h1 className="text-4xl text-accent-400 font-medium">
        Thank you for your reservation!
      </h1>
      <p className="text-lg text-primary-200">
        We can&apos;t wait to welcome you. Your reservation status is pending
        confirmation and will be finalized at check-in.
      </p>
      <Link
        href="/account/reservations"
        className="border border-accent-500 px-6 py-3 hover:bg-accent-500 hover:text-primary-900 transition-all"
      >
        Manage your reservations &rarr;
      </Link>
    </div>
  );
}
