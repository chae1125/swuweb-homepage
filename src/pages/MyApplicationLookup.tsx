import React, { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./MyApplicationLookup.module.css";

import Navbar from "../components/layout/Navbar/Navbar";
import Footer from "../components/layout/Footer/Footer";

const extractToken = (input: string) => {
  const v = input.trim();

  if (/^[a-f0-9]{32}$/i.test(v)) return v;

  try {
    const u = new URL(v);
    const parts = u.pathname.split("/").filter(Boolean);

    // ✅ "/public/application/:token" 또는 "/public/applications/:token" 대응
    const idx1 = parts.findIndex((p) => p === "application");
    if (idx1 !== -1 && parts[idx1 + 1]) return parts[idx1 + 1];

    const idx2 = parts.findIndex((p) => p === "applications");
    if (idx2 !== -1 && parts[idx2 + 1]) return parts[idx2 + 1];

    if (parts.length > 0) return parts[parts.length - 1];
  } catch {
    // ignore
  }

  return null;
};

export default function MyApplicationLookup() {
  const navigate = useNavigate();
  const [value, setValue] = useState("");
  const [err, setErr] = useState("");
  const [touched, setTouched] = useState(false);

  const token = useMemo(() => extractToken(value), [value]);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setTouched(true);
    setErr("");

    if (!value.trim()) {
      setErr("공유 링크(또는 토큰)를 입력해주세요.");
      return;
    }
    if (!token) {
      setErr("유효한 링크/토큰이 아니에요. 다시 확인해 주세요.");
      return;
    }

    navigate(`/public/application/${token}`);
  };

  const showHint = value.trim().length > 0 && !!token;

  return (
    <>
      <Navbar />

      <div className={styles.page}>
        <div className={styles.bg} aria-hidden>
          <span className={`${styles.blob} ${styles.blobBlue}`} />
          <span className={`${styles.blob} ${styles.blobCyan}`} />
          <span className={`${styles.blob} ${styles.blobPurple}`} />
        </div>

        <div className={styles.container}>
          <div className={styles.header}>
            <p className={styles.kicker}>SWUWEB Application</p>
            <h1 className={styles.title}>내 지원서 확인하기</h1>
            <p className={styles.subTitle}>
              제출 후 발급된 <b>공유 링크</b>를 붙여넣으면 지원서를 확인할 수 있어요.
            </p>
          </div>

          <form className={styles.form} onSubmit={onSubmit}>
            <section className={styles.sectionCard}>
              <div className={styles.sectionHead}>
                <h2 className={styles.sectionTitle}>🔎 공유 링크 입력</h2>
                <span className={styles.badge}>확인</span>
              </div>

              <div className={styles.field}>
                <label className={styles.label}>
                  공유 링크 또는 토큰
                  <input
                    className={styles.input}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    onBlur={() => setTouched(true)}
                    placeholder="https://swuweb-homepage.vercel.app/public/application/...."
                    inputMode="url"
                    autoComplete="off"
                  />
                </label>

                {touched && err ? <div className={styles.error}>{err}</div> : null}

                {showHint ? (
                  <div className={styles.hint}>
                    인식된 토큰: <span className={styles.mono}>{token}</span>
                  </div>
                ) : null}
              </div>
            </section>

            <div className={styles.actions}>
              <button className={styles.submit} type="submit">
                확인
              </button>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </>
  );
}
