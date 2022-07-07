import React from "react";
import styles from "./Modal.module.css";

const Modal = ({ setIsOpen }) => {
  return (
    <>
      <div className={styles.darkBG} onClick={() => setIsOpen(false)} />
      <div className={styles.centered}>
        <div className={styles.modal}>
          <div className={styles.modalHeader}>
            <h5 className={styles.heading}>Exclusão</h5>
          </div>
          <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
            <p>X</p>
          </button>
          <div className={styles.modalContent}>
            Tem certeza que deseja excluir o usuário?
          </div>
          <div className={styles.modalActions}>
            <div className={styles.actionsContainer}>
              <button className={styles.deleteBtn} onClick={() => setIsOpen(false)}>
                Deletar
              </button>
              <button
                className={styles.cancelBtn}
                onClick={() => setIsOpen(false)}
              >
                Cancelar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;