import React from "react";
import styles from "./FaqSection.module.css";

export default function FaqContact() {
  return (
    <section className={styles.contactSection}>
      <div className={styles.container}>
        <div className={styles.contact}>
          <div className={styles.contactTitle}>추가 문의</div>
          <div className={styles.contactDesc}>
            답변이 부족하거나 상황이 특수한 경우, 편하게 문의해 주세요.
          </div>
          <div className={styles.contactBtns}>
            <a className={styles.cta} href="/apply">
              지원하러 가기
            </a>
            <a className={styles.ctaGhost} href="https://open.kakao.com/o/sWQhEpai">
              문의하기
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
