import { useState } from "react";
import Modal from "../../../components/ui/Modal";
import CreateTransactionForm from "./CreateTransactionForm";
import { createTransaction } from "../../../services/transaction";

type CreateTransactionModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

export default function CreateTransactionModal({
  isOpen,
  onClose,
  onSuccess,
}: CreateTransactionModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (data: {
    title: string;
    amount: number;
    type: "income" | "expense";
    category: string;
    date: string;
    note?: string;
  }) => {
    setIsSubmitting(true);
    setError("");

    try {
      await createTransaction({
        ...data,
        note: data.note || undefined,
      });
      onSuccess();
      onClose();
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : "Failed to create transaction";
      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="New Transaction">
      {error && (
        <div className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}
      <CreateTransactionForm
        onSubmit={handleSubmit}
        onCancel={onClose}
        isSubmitting={isSubmitting}
      />
    </Modal>
  );
}
