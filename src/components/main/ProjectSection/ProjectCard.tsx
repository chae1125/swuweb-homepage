import styles from "./ProjectSection.module.css";

type Props = {
  title: string;
  subtitle: string;
  desc: string;
  badge?: string;
  thumbnails?: string[];
};

const ProjectCard = ({ title, subtitle, desc, badge, thumbnails }: Props) => {
  return (
    <div className={styles.card}>
      <div className={styles.thumb}>
        <div className={styles.thumbTop}>
          <div className={styles.dots}>
            <span className={styles.dot} />
            <span className={styles.dot} />
            <span className={styles.dot} />
          </div>
          {badge ? <div className={styles.badge}>{badge}</div> : null}
        </div>

        <div className={styles.thumbBody}>
          <div className={styles.thumbTitle}>{subtitle}</div>
          <div className={styles.line} />
          <div className={styles.lineShort} />

          <div className={styles.row}>
            {thumbnails && thumbnails.length > 0 ? (
              thumbnails
                .slice(0, 2)
                .map((src, idx) => (
                  <img
                    key={idx}
                    src={src}
                    alt={`${title} 썸네일 ${idx + 1}`}
                    className={styles.thumbnail}
                  />
                ))
            ) : (
              <>
                <div className={styles.box} />
                <div className={styles.boxText} />
              </>
            )}
          </div>
        </div>
      </div>

      <div className={styles.text}>
        <div className={styles.name}>{title}</div>
        <div className={styles.p}>{desc}</div>
      </div>
    </div>
  );
};

export default ProjectCard;
