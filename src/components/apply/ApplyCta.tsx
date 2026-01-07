import styles from "./ApplySection.module.css";
import { useReveal } from "./useReveal";

export default function ApplyCta({
  primaryHref,
  secondaryHref,
}: {
  primaryHref: string;
  secondaryHref: string;
}) {
    const { ref, shown } = useReveal<HTMLDivElement>();
  return (
    

    <section className={styles.contactSection}>
      <div ref={ref}
        className={`${styles.container} ${styles.reveal} ${shown ? styles.revealIn : ""}`}>
        <div className={styles.contact}>
          <div className={styles.contactTitle}>지금 지원해볼까요?</div>
          <div className={styles.contactDesc}>
            지원서 작성이 어렵게 느껴져도 괜찮아요. 최대한 솔직하게, 그리고 하고 싶은 마음을 적어주면 충분합니다.
          </div>

          <div className={styles.contactBtns}>
            <a className={styles.cta} href={primaryHref}>
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
