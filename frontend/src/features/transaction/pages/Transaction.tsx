import TransactionHeader from "../components/TransactionHeader";
import SearchBar from "../components/SearchBar";
import FilterBar from "../components/FilterBar";
import TransactionCard from "../components/TransactionCard";
import TransactionList from "../components/TransactionList";
import Pagination from "../components/Pagination";

export default function Transactions() {
  return (
    <div className="min-h-screen bg-[#F7F7F7] pb-28">
      <div className="mx-auto max-w-3xl space-y-4 p-4">
        <TransactionHeader />

        <SearchBar />

        <FilterBar />

        <TransactionCard />

        <TransactionList />

        <Pagination />
      </div>
    </div>
  );
}