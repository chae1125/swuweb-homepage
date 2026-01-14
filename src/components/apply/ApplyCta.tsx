import { useEffect, useMemo, useState } from "react";
import styles from "./ApplySection.module.css";
import { useReveal } from "./useReveal";

const APPLY_OPEN_ISO = "2026-01-15T11:00:00+09:00";
const APPLY_CLOSE_ISO = "2026-01-26T00:00:00+09:00";

export default function ApplyCta({
  primaryHref,
  secondaryHref,
}: {
  primaryHref: string;
  secondaryHref: string;
}) {
  const { ref, shown } = useReveal<HTMLDivElement>();

  const openAtMs = useMemo(() => new Date(APPLY_OPEN_ISO).getTime(), []);
  const closeAtMs = useMemo(() => new Date(APPLY_CLOSE_ISO).getTime(), []);
  const [nowMs, setNowMs] = useState(() => Date.now());

  useEffect(() => {
    const t = setInterval(() => setNowMs(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  const isOpen = nowMs >= openAtMs;
  const isClosed = nowMs >= closeAtMs;
  const isWithinPeriod = isOpen && !isClosed;

  const handleApplyClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (isWithinPeriod) return;

    e.preventDefault();

    if (!isOpen) {
      alert(
        "아직 지원 기간이 아니에요.\n1/15 오전 11시부터 지원할 수 있습니다."
      );
      return;
    }

    alert("지원이 마감되었습니다.");
  };
  return (
    <section className={styles.contactSection}>
      <div
        ref={ref}
        className={`${styles.container} ${styles.reveal} ${
          shown ? styles.revealIn : ""
        }`}
      >
        <div className={styles.contact}>
          <div className={styles.contactTitle}>지금 지원해볼까요?</div>
          <div className={styles.contactDesc}>
            지원서 작성이 어렵게 느껴져도 괜찮아요. 최대한 솔직하게, 그리고 하고
            싶은 마음을 적어주면 충분합니다.
          </div>

          <div className={styles.contactBtns}>
            <a
              className={`${styles.cta} ${
                !isWithinPeriod ? styles.ctaDisabled : ""
              }`}
              href={primaryHref}
              onClick={handleApplyClick}
              aria-disabled={!isWithinPeriod}
            >
              지원서 작성하기
            </a>
            <a className={styles.ctaGhost} href={secondaryHref}>
              FAQ 먼저 보기
            </a>
          </div>

          <div className={styles.miniNote}>
            * 문의는 인스타/오픈채팅/메일 등 공식 채널로 주세요.
          </div>
        </div>
      </div>
    </section>
  );
}
