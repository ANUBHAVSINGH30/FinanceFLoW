import TransactionCard from "./TransactionCard";

export default function TransactionList() {
  return (
    <div className="space-y-3">
      <TransactionCard />
      <TransactionCard />
      <TransactionCard />
      <TransactionCard />
      <TransactionCard />
    </div>
  );
}