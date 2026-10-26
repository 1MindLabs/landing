import { X } from "lucide-react";
import { motion } from "motion/react";
import {
  useLayoutEffect,
  useRef,
  type KeyboardEvent,
  type ReactNode,
  type SyntheticEvent,
} from "react";

interface ModalProps {
  titleId: string;
  className: string;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  children: ReactNode;
}

export default function Modal({
  titleId,
  className,
  onClose,
  onNext,
  onPrev,
  children,
}: ModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    dialog?.showModal();
    return () => dialog?.close();
  }, []);

  const handleCancel = (event: SyntheticEvent<HTMLDialogElement>) => {
    event.preventDefault();
    onClose();
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLDialogElement>) => {
    if (event.key === "ArrowRight") onNext();
    if (event.key === "ArrowLeft") onPrev();
  };

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby={titleId}
      onCancel={handleCancel}
      onKeyDown={handleKeyDown}
      className="fixed inset-0 m-0 flex size-full max-h-none max-w-none items-center justify-center overflow-hidden bg-transparent px-4 text-inherit backdrop:bg-transparent"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-black/80 backdrop-blur-md"
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className={`relative max-h-[calc(100dvh-2rem)] w-full overflow-y-auto rounded-2xl border border-neutral-800 bg-neutral-950 shadow-2xl ${className}`}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 z-20 rounded-full bg-neutral-950/60 p-2 text-neutral-300 backdrop-blur-sm transition-colors hover:text-white"
        >
          <X size={20} />
        </button>
        {children}
      </motion.div>
    </dialog>
  );
}
