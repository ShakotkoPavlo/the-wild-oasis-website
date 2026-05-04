import CabinCard from "@/app/_components/CabinCard";
import { getCabins } from "@/app/_lib/data-service";

async function CabinList({ filter }) {
  const cabins = await getCabins();

  if (!cabins || cabins.length === 0) {
    return null;
  }

  let filteredCabins = cabins;

  if (filter !== "all") {
    filteredCabins = filteredCabins.filter((cabin) => {
      if (filter === "small") {
        return cabin.maxCapacity >= 1 && cabin.maxCapacity <= 3;
      } else if (filter === "medium") {
        return cabin.maxCapacity >= 4 && cabin.maxCapacity <= 7;
      } else if (filter === "large") {
        return cabin.maxCapacity >= 8 && cabin.maxCapacity <= 12;
      }
      return true;
    });
  }

  return (
    <div className="grid sm:grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 xl:gap-14">
      {filteredCabins.map((cabin) => (
        <CabinCard cabin={cabin} key={cabin.id} />
      ))}
    </div>
  );
}

export default CabinList;
