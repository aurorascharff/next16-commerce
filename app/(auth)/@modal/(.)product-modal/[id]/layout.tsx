import Modal from '@/components/ui/Modal';

export default function ProductModalLayout({ children }: LayoutProps<'/product/[id]'>) {
  return (
    <Modal goBackOnClose openModal={true} title="Quick Preview">
      {children}
    </Modal>
  );
}
