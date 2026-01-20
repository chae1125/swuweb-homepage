import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Footer.module.css";
import AdminPasswordModal from "./AdminPasswordModal";

const Footer = () => {
  const navigate = useNavigate();

  const [clickCount, setClickCount] = useState(0);
  const timeoutRef = useRef<number | null>(null);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [password, setPassword] = useState("");

  const [checking, setChecking] = useState(false);
  const [checkError, setCheckError] = useState("");

  const API_BASE = import.meta.env.VITE_API_BASE as string;

  useEffect(() => {
    if (clickCount === 0) return;
    if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    timeoutRef.current = window.setTimeout(() => setClickCount(0), 800);
  }, [clickCount]);

  const handleMetaClick = () => {
    setClickCount((c) => {
      const next = c + 1;
      if (next >= 3) {
        setConfirmOpen(true);
        setCheckError("");
        setClickCount(0);
        if (timeoutRef.current) {
          window.clearTimeout(timeoutRef.current);
          timeoutRef.current = null;
        }
      }
      return next >= 3 ? 0 : next;
    });
  };

  const closeModal = () => {
    setConfirmOpen(false);
    setPassword("");
    setCheckError("");
    setChecking(false);
  };

  const handleConfirm = async () => {
    if (checking) return;

    const pw = password.trim();
    if (!pw) {
      setCheckError("비밀번호를 입력해 주세요.");
      return;
    }

    setChecking(true);
    setCheckError("");

    try {
      const res = await fetch(`${API_BASE}/admin/password/check`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ password: pw }),
      });

      if (!res.ok) {
        setCheckError("요청에 실패했어요. 잠시 후 다시 시도해 주세요.");
        return;
      }

      const data: { valid?: boolean } = await res.json();

      if (data.valid) {
        try {
          sessionStorage.setItem("adminUnlocked", "true");
        } catch {}
        closeModal();

        navigate("/admin/applications");
      } else {
        setCheckError("비밀번호가 올바르지 않습니다.");
      }
    } catch (e) {
      setCheckError("네트워크 오류가 발생했어요. 연결을 확인해 주세요.");
    } finally {
      setChecking(false);
    }
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.copy}>Copyright © SWUWEB All Rights Reserved.</div>
        <div className={styles.divider} aria-hidden />

        <div className={styles.bottom}>
          <div className={styles.meta}>
            <div>Made by SWUWEB | 2025 Ver.</div>
            <div
              onClick={handleMetaClick}
              style={{ cursor: "pointer", userSelect: "none" }}
            >
              Created by 팀 최재영, 이채영
            </div>
          </div>

          <div className={styles.right}>
            <Link className={styles.link} to="/activities">Activities</Link>
            <span className={styles.sep}>|</span>
            <Link className={styles.link} to="/faq">FAQ</Link>
            <span className={styles.sep}>|</span>
            <Link className={styles.link} to="/apply">Join Us</Link>
            <span className={styles.sep}>|</span>
            <Link className={styles.link} to="/apply/check">My Application</Link>
          </div>
        </div>
      </div>

      <AdminPasswordModal
        open={confirmOpen}
        password={password}
        onChangePassword={setPassword}
        onClose={closeModal}
        onConfirm={handleConfirm}
        loading={checking}
        error={checkError}
      />
    </footer>
  );
};

export default Footer;
