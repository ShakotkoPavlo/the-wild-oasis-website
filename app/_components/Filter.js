"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

function Filter() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathName = usePathname();
  const activeFilter = searchParams.get("capacity") || "all";

  function handleFilterClick(filter) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("capacity", filter);
    router.replace(`${pathName}?${params.toString()}`, { scroll: false });
  }

  return (
    <div className="border border-primary-800 flex">
      <Button
        filter="all"
        onClick={handleFilterClick}
        activeFilter={activeFilter}
      >
        All
      </Button>
      <Button
        filter="small"
        onClick={handleFilterClick}
        activeFilter={activeFilter}
      >
        1&mdash;3 guests
      </Button>
      <Button
        filter="medium"
        onClick={handleFilterClick}
        activeFilter={activeFilter}
      >
        4&mdash;7 guests
      </Button>
      <Button
        filter="large"
        onClick={handleFilterClick}
        activeFilter={activeFilter}
      >
        8&mdash;12 guests
      </Button>
    </div>
  );
}

function Button({ filter, onClick, activeFilter, children }) {
  const isActive = filter === activeFilter;
  return (
    <button
      className={`px-5 py-2 hover:bg-primary-700 ${isActive ? "bg-primary-700" : ""}`}
      onClick={() => onClick(filter)}
    >
      {children}
    </button>
  );
}

export default Filter;
