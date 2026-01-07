import styles from "./FaqSection.module.css";

type Props = {
  query: string;
  onChangeQuery: (v: string) => void;
  onReset: () => void;
};

export default function FaqHero({ query, onChangeQuery, onReset }: Props) {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <h1 className={styles.title}>FAQ</h1>
        <p className={styles.desc}>
          자주 묻는 질문을 모아두었어요. 찾는 내용이 없으면 문의해 주세요!
        </p>

        <div className={styles.searchRow}>
          <input
            className={styles.search}
            value={query}
            onChange={(e) => onChangeQuery(e.target.value)}
            placeholder="검색"
            aria-label="FAQ 검색"
          />
          <button
            type="button"
            className={styles.reset}
            onClick={onReset}
            disabled={!query}
          >
            초기화
          </button>
        </div>
      </div>
    </section>
  );
}
