import React, { useEffect } from "react";
import styles from "./Footer.module.css";

type Props = {
  open: boolean;
  password: string;
  onChangePassword: (v: string) => void;
  onClose: () => void;
  onConfirm: () => void;

  loading?: boolean;
  error?: string;
};

const AdminPasswordModal: React.FC<Props> = ({
  open,
  password,
  onChangePassword,
  onClose,
  onConfirm,
  loading = false,
  error = "",
}) => {
  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "Enter") onConfirm();
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose, onConfirm]);

  if (!open) return null;

  return (
    <div className={styles.modalOverlay} onClick={onClose}>
      <div
        className={styles.modal}
        role="dialog"
        aria-modal
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className={styles.modalTitle}>운영자 접근 — 비밀번호 입력</h3>

        <p className={styles.modalDesc}>
          운영자 전용 기능입니다. 비밀번호를 입력해 주세요.
        </p>

        <input
          autoFocus
          type="password"
          value={password}
          onChange={(e) => onChangePassword(e.target.value)}
          className={styles.modalInput}
          disabled={loading}
        />

        {!!error && <div className={styles.modalError}>{error}</div>}

        <div className={styles.modalActions}>
          <button className={styles.cancel} onClick={onClose} disabled={loading}>
            취소
          </button>
          <button className={styles.submit} onClick={onConfirm} disabled={loading}>
            {loading ? "확인 중..." : "확인"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminPasswordModal;
