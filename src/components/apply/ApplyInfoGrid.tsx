import React from "react";
import styles from "./ApplySection.module.css";
import type { ApplyInfoCard } from "./types";
import { useReveal } from "./useReveal";

export default function ApplyInfoGrid({ items }: { items: ApplyInfoCard[] }) {
  const { ref, shown } = useReveal<HTMLDivElement>();

  return (
    <section className={styles.section}>
      <div
        ref={ref}
        className={`${styles.container} ${styles.reveal} ${shown ? styles.revealIn : ""}`}
      >
        <h2 className={styles.h2}>모집 요약</h2>

        <div className={styles.infoGrid}>
          {items.map((it, idx) => (
            <article
              key={it.label}
              className={styles.infoCard}
              style={{ ["--d" as any]: `${idx * 70}ms` }}
            >
              <div className={styles.infoLabel}>{it.label}</div>
              <div className={styles.infoValue}>{it.value}</div>
              {it.hint ? <div className={styles.infoHint}>{it.hint}</div> : null}
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
