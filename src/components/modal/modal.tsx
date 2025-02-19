import { Dialog } from "../common";

interface ModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children: React.ReactNode;
}

const Modal = ({ open, onOpenChange, children }: ModalProps) => {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      {children}
    </Dialog.Root>
  );
};

interface ModalPortalProps {
  container?: HTMLElement;
  children: React.ReactNode;
}

const ModalPortal = ({ container, children }: ModalPortalProps) => {
  return (
    <Dialog.Portal container={container}>
      <Dialog.Overlay className="fixed inset-0 z-30 bg-gray-6 opacity-60 data-[state=open]:animate-overlayShow" />
      {children}
    </Dialog.Portal>
  );
};

interface ModalTitleProps {
  children: React.ReactNode;
  className?: string;
}

const ModalTitle = ({ children, className }: ModalTitleProps) => {
  return (
    <div>
      <Dialog.Title className={className}>{children}</Dialog.Title>
    </div>
  );
};

Modal.Portal = ModalPortal;
Modal.Button = Dialog.Trigger;
Modal.Content = Dialog.Content;
// Modal.Title = ModalTitle;
Modal.Title = Dialog.Title;
Modal.Close = Dialog.Close;
export default Modal;
