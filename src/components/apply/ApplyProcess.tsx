import styles from "./ApplySection.module.css";
import type { ApplyStep } from "./types";
import { useReveal } from "./useReveal";

export default function ApplyProcess({ steps }: { steps: ApplyStep[] }) {
    const { ref, shown } = useReveal<HTMLDivElement>();

  return (
    <section className={styles.section}>
      <div ref={ref}
        className={`${styles.container} ${styles.reveal} ${shown ? styles.revealIn : ""}`}>
        <h2 className={styles.h2}>지원 절차</h2>
        <p className={styles.p}>
          코드보다 중요한 건 꾸준한 학습과 의지입니다. 기술 면접보다 <strong>관심사 · 성장 의지</strong>를 더 중요하게 봅니다.
        </p>

        <ol className={styles.timeline}>
          {steps.map((s, idx) => (
            <li key={s.title} className={styles.step}>
              <div className={styles.stepDot} aria-hidden />
              <div className={styles.stepBody} style={{ ["--d" as any]: `${idx * 90}ms` }}>
                <div className={styles.stepTop}>
                  <div className={styles.stepTitle}>
                    <span className={styles.stepIdx}>0{idx + 1}</span>
                    {s.title}
                  </div>
                  <div className={styles.stepDate}>{s.date}</div>
                </div>
                <div className={styles.stepDesc}>{s.desc}</div>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
