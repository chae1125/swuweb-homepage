import { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import logo from "../../../assets/images/logo.png";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className={styles.header}>
        <div className={styles.inner}>
          <Link to="/" className={styles.brand} aria-label="SWUWEB Home">
            <img src={logo} alt="SWUWEB Logo" className={styles.logo} />
          </Link>

          <nav className={styles.nav}>
            <Link className={styles.link} to="/activities">
              활동
            </Link>
            <Link className={styles.link} to="/faq">
              자주 묻는 질문
            </Link>
            <Link className={styles.link} to="/apply">
              지원하기
            </Link>
            <Link className={styles.link} to="/login">
              로그인
            </Link>
          </nav>

          <div className={styles.icons}>
            <a
              className={styles.iconBtn}
              href="https://github.com/swuweb2nd"
              aria-label="Github"
            >
              <GithubIcon />
            </a>
            <a
              className={styles.iconBtn}
              href="https://www.instagram.com/swuweb"
              aria-label="Instagram"
            >
              <InstagramIcon />
            </a>
          </div>
        </div>
      </header>

      {/* Mobile menu button (헤더 바깥, 뷰포트에 고정되어 표시됩니다) */}
      <button
        className={`${styles.menuButton} ${open ? styles.menuButtonHidden : ""}`}
        aria-label={open ? "메뉴 닫기" : "메뉴 열기"}
        aria-expanded={open}
        aria-controls="mobile-menu"
        onClick={() => setOpen((s) => !s)}
      >
        {open ? <CloseIcon /> : <HamburgerIcon />}
      </button>

      {/* Mobile menu overlay */}
      <div
        id="mobile-menu"
        className={`${styles.mobileMenu} ${open ? styles.open : ""}`}
        role="dialog"
        aria-modal="true"
        aria-hidden={!open}
        onClick={() => setOpen(false)}
      >
        <div
          className={styles.mobileMenuInner}
          onClick={(e) => e.stopPropagation()}
        >
          <nav>
            <Link
              className={styles.mobileLink}
              to="/activities"
              onClick={() => setOpen(false)}
            >
              활동
            </Link>
            <Link
              className={styles.mobileLink}
              to="/faq"
              onClick={() => setOpen(false)}
            >
              자주 묻는 질문
            </Link>
            <Link
              className={styles.mobileLink}
              to="/apply"
              onClick={() => setOpen(false)}
            >
              지원하기
            </Link>
            <Link
              className={styles.mobileLink}
              to="/login"
              onClick={() => setOpen(false)}
            >
              로그인
            </Link>
          </nav>
          <div className={styles.mobileIcons}>
            <a
              className={styles.iconBtn}
              href="https://github.com/swuweb2nd"
              aria-label="Github"
            >
              <GithubIcon />
            </a>
            <a
              className={styles.iconBtn}
              href="https://www.instagram.com/swuweb"
              aria-label="Instagram"
            >
              <InstagramIcon />
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;

/* icons same as before */
function GithubIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M12 2C6.48 2 2 6.58 2 12.26c0 4.5 2.87 8.31 6.84 9.66.5.1.68-.22.68-.49 0-.24-.01-.88-.01-1.72-2.78.62-3.37-1.37-3.37-1.37-.45-1.18-1.1-1.49-1.1-1.49-.9-.64.07-.63.07-.63 1 .07 1.52 1.06 1.52 1.06.89 1.58 2.34 1.12 2.91.86.09-.66.35-1.12.64-1.38-2.22-.26-4.56-1.15-4.56-5.11 0-1.13.39-2.06 1.03-2.78-.1-.26-.45-1.32.1-2.75 0 0 .84-.27 2.75 1.06A9.2 9.2 0 0 1 12 6.9c.83 0 1.67.12 2.45.35 1.9-1.33 2.74-1.06 2.74-1.06.56 1.43.21 2.49.11 2.75.64.72 1.03 1.65 1.03 2.78 0 3.97-2.34 4.85-4.57 5.1.36.33.68.98.68 1.98 0 1.43-.01 2.58-.01 2.93 0 .27.18.6.69.49A10.07 10.07 0 0 0 22 12.26C22 6.58 17.52 2 12 2Z"
        fill="currentColor"
        opacity="0.9"
      />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M7.5 2h9A5.5 5.5 0 0 1 22 7.5v9A5.5 5.5 0 0 1 16.5 22h-9A5.5 5.5 0 0 1 2 16.5v-9A5.5 5.5 0 0 1 7.5 2Z"
        stroke="currentColor"
        strokeWidth="1.8"
        opacity="0.9"
      />
      <path
        d="M12 8.2a3.8 3.8 0 1 0 0 7.6 3.8 3.8 0 0 0 0-7.6Z"
        stroke="currentColor"
        strokeWidth="1.8"
        opacity="0.9"
      />
      <circle cx="17.3" cy="6.8" r="1" fill="currentColor" opacity="0.9" />
    </svg>
  );
}

function HamburgerIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M3 6h18"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M3 12h18"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M3 18h18"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M6 6l12 12"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
      <path
        d="M18 6L6 18"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
