import TransactionRow from "./TransactionRow";

type Transaction = {
  id: string;
  title: string;
  category: string;
  date: string;
  amount: number;
  type: "income" | "expense";
};

type TransactionListProps = {
  transactions: Transaction[];
};

export default function TransactionList({ transactions }: TransactionListProps) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white px-4 py-2 shadow-sm">
      {transactions.map((transaction) => (
        <TransactionRow
          key={transaction.id}
          title={transaction.title}
          category={transaction.category}
          date={transaction.date}
          amount={transaction.amount}
          type={transaction.type}
        />
      ))}
    </div>
  );
}
