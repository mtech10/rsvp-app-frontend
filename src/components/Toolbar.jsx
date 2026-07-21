import SearchBar from "./SearchBar";
import DropdownSelect from "./DropdownSelect";
import { Filter, ArrowUpDown } from "lucide-react";

export default function Toolbar({
  search,
  setSearch,
  filter,
  setFilter,
  sort,
  setSort,
}) {
  return (
    <div className="mb-8 flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:flex-row lg:items-center lg:justify-between">
      <SearchBar
        value={search}
        onChange={setSearch}
        placeholder="Search events..."
      />

      <div className="flex gap-3">
        <DropdownSelect
          icon={Filter}
          value={filter}
          onChange={setFilter}
          placeholder="Filter"
          options={[
            { label: "All Events", value: "all" },
            { label: "Free", value: "free" },
            { label: "Paid", value: "paid" },
            { label: "Approval Required", value: "approval" },
          ]}
        />

        <DropdownSelect
          icon={ArrowUpDown}
          value={sort}
          onChange={setSort}
          placeholder="Sort"
          options={[
            { label: "Newest", value: "newest" },
            { label: "Oldest", value: "oldest" },
            { label: "Title A–Z", value: "title" },
          ]}
        />
      </div>
    </div>
  );
}
