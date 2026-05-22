import ReservationCard from "@/app/_components/ReservationCard";
import ReservationList from "@/app/_components/ReservationList";
import { auth } from "@/app/_lib/auth";
import { getBookings } from "@/app/_lib/data-service";
import Link from "next/link";

export const metadata = {
  title: "Reservations",
};

export default async function Page() {
  const session = await auth();
  const bookings = await getBookings(session.user.guestId);

  return (
    <div>
      <div className="flex items-center justify-between mb-7">
        <h2 className="font-semibold text-2xl text-accent-400">
          Your reservations
        </h2>

        <Link
          href="/cabins"
          className="bg-accent-500 px-5 py-3 text-primary-800 font-semibold hover:bg-accent-600 transition-all"
        >
          Book another cabin &rarr;
        </Link>
      </div>

      {bookings.length === 0 ? (
        <p className="text-lg">
          You have no reservations yet. Check out our{" "}
          <Link className="underline text-accent-500" href="/cabins">
            luxury cabins &rarr;
          </Link>
        </p>
      ) : (
        <ReservationList bookings={bookings} />
      )}
    </div>
  );
}
