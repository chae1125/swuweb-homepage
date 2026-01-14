import styles from "./ApplySection.module.css";
import ApplyCountdown from "./ApplyCountdown";
import { useEffect, useMemo, useState } from "react";

type Props = {
  title?: string;
  desc?: string;
  primaryHref: string;
  primaryLabel: string;
  secondaryHref?: string;
  secondaryLabel?: string;
  countdownTargetISO: string;
};

const APPLY_OPEN_ISO = "2026-01-15T11:00:00+09:00";

export default function ApplyHero({
  title = "지원하기",
  desc = "혼자서는 만들기 어려웠던 웹 서비스를 함께 완성해보고 싶다면, 지금 함께할 부원을 모집해요.",
  primaryHref,
  primaryLabel,
  secondaryHref,
  secondaryLabel,
  countdownTargetISO,
}: Props) {
  const openAtMs = useMemo(() => new Date(APPLY_OPEN_ISO).getTime(), []);
  const [nowMs, setNowMs] = useState(() => Date.now());

  useEffect(() => {
    const t = setInterval(() => setNowMs(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  const isOpen = nowMs >= openAtMs;

  const handleApplyClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isOpen) return;
    e.preventDefault();
    alert("아직 지원 기간이 아니에요.\n1/15 오전 11시부터 지원할 수 있습니다.");
  };

  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <div className={styles.heroCard}>
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
                <a
                  className={styles.cta}
                  href={primaryHref}
                  onClick={handleApplyClick}
                  aria-disabled={!isOpen}
                >
                  {primaryLabel}
                </a>

                {secondaryHref && secondaryLabel ? (
                  <a className={styles.ctaGhost} href={secondaryHref}>
                    {secondaryLabel}
                  </a>
                ) : null}
              </div>

              <div className={styles.heroHint}>
                * 형식보다는 솔직한 답변을 중요하게 보고 있어요.
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
