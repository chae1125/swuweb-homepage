import styles from "./HeroSection.module.css";

export default function HeroSection() {
  return (
    <section className={styles.hero}>
      <div className={styles.inner}>
        <div className={styles.left}>
          <div className={styles.badgeRow}>
            <span className={styles.badgeAlt}>2026 • 1학기 신규 학회원 모집</span>
          </div>

          <h1 className={styles.title}>
            함께 만들고,
            <br />
            끝까지 완성하는 웹 개발 소학회
          </h1>

          <p className={styles.desc}>
            스터디부터 팀 프로젝트, 데모데이까지.
            <br />
            “완성”을 목표로 성장하는 실전형 소학회.
          </p>

          <div className={styles.ctaRow}>
            <a className={styles.ctaPrimary} href="/apply">
              지원하기 <span className={styles.ctaArrow}>↗</span>
            </a>
            <a className={styles.ctaGhost} href="/activities">
              활동 보기
            </a>
          </div>
        </div>

        <div className={styles.right}>
          <div className={styles.splineWrap} aria-label="3D Hero">
            <iframe
              className={styles.spline}
              src="https://my.spline.design/abstract3diconset-eH6HXolR9wPV4ngZk9BehmsM/"
              width="100%"
              height="100%"
              loading="lazy"
              allow="autoplay; fullscreen; xr-spatial-tracking"
              allowFullScreen
              title="SWUWEB 3D Hero"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
