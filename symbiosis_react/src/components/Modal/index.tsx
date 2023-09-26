import { Modal, Card, Button } from "antd";
import { CloseOutlined } from "@ant-design/icons";
import styles from "./Modal.module.css";

type CommonModalProps = {
  modalMessage: string;
  title: string;
  resetModal: () => void;
  showModal: boolean;
};

const CommonModal = (props: CommonModalProps) => {
  const { modalMessage, resetModal, showModal } = props;
  const handleModalOk = () => {
    resetModal();
  };

  return (
    <Modal title={props.title} centered open={showModal} cancelButtonProps={{ className: styles["modal__cancelButton"] }} closeIcon={<CloseOutlined className={styles["modal__closeIcon"]} />} onOk={handleModalOk} onCancel={handleModalOk} footer={null}>
      <Card className={styles["modal-card"]}>
        <p className={styles["modal-card__message"]}>{modalMessage}</p>
        <span style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
          <Button type="primary" className={styles["modal-card__button"]} onClick={handleModalOk}>
            OK
          </Button>
        </span>
      </Card>
    </Modal>
  );
};
export default CommonModal;
