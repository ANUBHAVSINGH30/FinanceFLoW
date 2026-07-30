import TransactionCard from "./TransactionCard";

export default function TransactionList() {
  return (
    <div className=" rounded-2xl border border-[#E5E5E5] bg-white overflow-hidden">
      <TransactionCard />
      <TransactionCard />
      <TransactionCard />
      <TransactionCard />
      <TransactionCard />
    </div>
  );
}