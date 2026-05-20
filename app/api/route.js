import { getBookedDatesByCabinId, getCabin } from "../_lib/data-service";

export async function GET(request, { params }) {
  const { cabinId } = params;

  try {
    const [cabin, bookedDates] = await Promise.all([
      getCabin(cabinId),
      getBookedDatesByCabinId(cabinId),
    ]);
  } catch (error) {
    console.error("Error fetching cabin or booked dates:", error);
  }

  return Response.json({ cabin, bookedDates });
}
