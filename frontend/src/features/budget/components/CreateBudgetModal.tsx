import { useState } from "react";
import Modal from "../../../components/ui/Modal";
import CreateBudgetForm, { type BudgetFormData } from "./CreateBudgetForm";
import { createBudget } from "../../../services/budget";

type CreateBudgetModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
};

export default function CreateBudgetModal({
  isOpen,
  onClose,
  onSuccess,
}: CreateBudgetModalProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (data: BudgetFormData) => {
    setIsSubmitting(true);
    setError("");

    try {
      await createBudget(data);

      onSuccess();
      onClose();
    } catch (err: unknown) {
      const message =
        err instanceof Error
          ? err.message
          : "Failed to create budget";

      setError(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Create Budget"
    >
      {error && (
        <div className="mb-4 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
          {error}
        </div>
      )}

      <CreateBudgetForm
        onSubmit={handleSubmit}
        onCancel={onClose}
        isSubmitting={isSubmitting}
      />
    </Modal>
  );
}