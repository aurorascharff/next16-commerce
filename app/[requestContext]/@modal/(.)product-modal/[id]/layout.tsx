import Modal from '@/components/ui/Modal';

export default function ProductModalLayout({ children }: LayoutProps<'/[requestContext]/product/[id]'>) {
  return (
    <Modal goBackOnClose openModal={true} title="Quick Preview">
      {children}
    </Modal>
  );
}
