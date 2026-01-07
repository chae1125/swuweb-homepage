import React from "react";
import styles from "./ApplySection.module.css";
import ApplyCountdown from "./ApplyCountdown";

type Props = {
  title?: string;
  desc?: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref?: string;
  secondaryLabel?: string;

  // ✅ 카운트다운 타겟
  countdownTargetISO: string;
};

export default function ApplyHero({
  title = "지원하기",
  desc = "혼자서는 만들기 어려웠던 웹 서비스를 함께 완성해보고 싶다면, 지금 함께할 부원을 모집해요.",
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
  countdownTargetISO,
}: Props) {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.heroCard}>
          {/* 배경 일러스트(가벼운 SVG) */}
          <div className={styles.heroArt} aria-hidden>
            <span className={`${styles.orb} ${styles.orbA}`} />
            <span className={`${styles.orb} ${styles.orbB}`} />
            <span className={`${styles.orb} ${styles.orbC}`} />
            <svg className={styles.heroSvg} viewBox="0 0 560 220" fill="none">
              <path
                d="M34 156c54-68 164-90 262-44 92 44 146 36 230-18"
                stroke="rgba(38,96,255,0.35)"
                strokeWidth="10"
                strokeLinecap="round"
              />
              <path
                d="M60 176c64-56 156-70 246-30 88 40 150 30 220-10"
                stroke="rgba(0,212,255,0.25)"
                strokeWidth="8"
                strokeLinecap="round"
              />
            </svg>
          </div>

          <div className={styles.heroGrid}>
            <div className={styles.heroText}>
              <h1 className={styles.title}>{title}</h1>
              <p className={styles.desc}>{desc}</p>

              <div className={styles.heroBtns}>
                <a className={styles.cta} href={primaryHref}>
                  {primaryLabel}
                </a>
                {secondaryHref && secondaryLabel ? (
                  <a className={styles.ctaGhost} href={secondaryHref}>
                    {secondaryLabel}
                  </a>
                ) : null}
              </div>

              <div className={styles.heroHint}>
                * 지원서 작성 시간은 약 5~10분 정도예요.
              </div>
            </div>

            {/* ✅ 카운트다운 카드 */}
            <div className={styles.heroRight}>
              <ApplyCountdown targetISO={countdownTargetISO} />
              <div className={styles.microCards} aria-hidden>
                <div className={styles.microCard}>React</div>
                <div className={styles.microCard}>Node.js</div>
                <div className={styles.microCard}>GitHub</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
