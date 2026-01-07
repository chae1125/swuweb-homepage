import styles from "./CurriculumSection.module.css";

type StopSide = "top" | "bottom";

export default function Timeline() {
  return (
    <div className={styles.timelineWrap}>
      {/* bar */}
      <div className={styles.timelineBar}>
        <div className={styles.timelineFill} />
      </div>

      {/* stops (사진처럼 위/아래 번갈아 배치) */}
      <Stop left="12%" n="01" label="온보딩 OT" side="top" tone="t1" />
      <Stop left="38%" n="02" label="파트별 스터디" side="bottom" tone="t2" />
      <Stop left="62%" n="03" label="팀 프로젝트" side="top" tone="t3" />
      <Stop left="88%" n="04" label="최종 데모데이" side="bottom" tone="t4" />
    </div>
  );
}

function Stop({
  left,
  n,
  label,
  side,
  tone,
}: {
  left: string;
  n: string;
  label: string;
  side: StopSide;
  tone: "t1" | "t2" | "t3" | "t4";
}) {
  const isTop = side === "top";

  return (
    <div className={styles.stop} style={{ left }}>
      {/* 다이아몬드 마커 */}
      <div
        className={[
          styles.diamond,
          styles[tone],
          isTop ? styles.diamondDown : styles.diamondUp,
        ].join(" ")}
      />

      {/* 스템(세로선) */}
      <div className={[styles.stem, styles[tone], isTop ? styles.stemDown : styles.stemUp].join(" ")} />

      {/* 원(번호) */}
      <div className={[styles.circle, styles[tone], isTop ? styles.circleTop : styles.circleBottom].join(" ")}>
        {n}
      </div>

      {/* 라벨 */}
      <div className={[styles.label, isTop ? styles.labelBottom : styles.labelTop].join(" ")}>
        {label}
      </div>
    </div>
  );
}
