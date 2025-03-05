import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";

interface WinnerProps {
  winner: string;
  isModalOpen: boolean;
  onCloseModal: () => void;
}

const WinnerModal: React.FC<WinnerProps> = ({
  isModalOpen,
  winner,
  onCloseModal,
}) => {
  return (
    <Modal isOpen={isModalOpen} onClose={onCloseModal}>
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          Congratulations!
        </ModalHeader>
        <ModalBody>
          <p>The winner is: {winner}!</p>
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onPress={onCloseModal}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default WinnerModal;
