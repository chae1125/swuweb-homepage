import styles from "./CoreValuesSection.module.css";
import ValueCard from "./ValueCard";

const CoreValuesSection = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>핵심 가치</h2>
        <p className={styles.desc}>
          SWUWEB은 도전을 두려워하지 않는{" "}
          <span className={styles.bold}>열정</span>으로 새로운 가능성에
          도전합니다.
          <br />
          끝까지 해내는 <span className={styles.bold}>끈기</span>와 함께
          어제보다 더 나은 <span className={styles.bold}>성장</span>을
          만들어갑니다.
        </p>

        <div className={styles.grid}>
          <ValueCard label="열정" variant="s" />
          <ValueCard label="끈기" variant="w" />
          <ValueCard label="성장" variant="u" />
        </div>
      </div>
    </section>
  );
};

export default CoreValuesSection;
