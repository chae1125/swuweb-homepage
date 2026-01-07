import React from "react";
import styles from "./ApplySection.module.css";
import type { ApplyChecklistItem } from "./types";
import { useReveal } from "./useReveal";

export default function ApplyChecklist({ items }: { items: ApplyChecklistItem[] }) {
const { ref, shown } = useReveal<HTMLDivElement>();

  return (
    <section className={styles.section}>
      <div ref={ref}
        className={`${styles.container} ${styles.reveal} ${shown ? styles.revealIn : ""}`}>
        <h2 className={styles.h2}>지원 전 체크</h2>

        <div className={styles.checkGrid}>
          {items.map((it, idx) => (
            <article key={it.title} className={styles.checkCard} style={{ ["--d" as any]: `${idx * 80}ms` }}>
              <div className={styles.checkTitle}>
                <span className={styles.checkIcon} aria-hidden />
                {it.title}
              </div>
              <div className={styles.checkDesc}>{it.desc}</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
