import { Link } from "react-router-dom";
import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        {/* 1줄짜리 copyright */}
        <div className={styles.copy}>
          Copyright © SWUWEB All Rights Reserved.
        </div>

        {/* divider */}
        <div className={styles.divider} aria-hidden />

        {/* 아래 영역: 왼 meta / 오 link */}
        <div className={styles.bottom}>
          <div className={styles.meta}>
            <div>Made by SWUWEB | 2025 Ver.</div>
            <div>Created by 팀 최재영, 이채영</div>
          </div>

          <div className={styles.right}>
            <Link className={styles.link} to="/activities">
              Activities
            </Link>
            <span className={styles.sep}>|</span>
            <Link className={styles.link} to="/faq">
              FAQ
            </Link>
            <span className={styles.sep}>|</span>
            <Link className={styles.link} to="/apply">
              Join Us
            </Link>
            <span className={styles.sep}>|</span>
            <Link className={styles.link} to="/login">
              Login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
