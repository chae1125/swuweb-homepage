import { useEffect, useMemo, useState } from "react";
import styles from "./ApplySection.module.css";

type Props = {
  /** 예: "2026-01-15T12:00:00+09:00" */
  targetISO: string;
  label?: string;
};

type Left = { d: number; h: number; m: number; s: number; done: boolean };

function calcLeft(targetMs: number): Left {
  const now = Date.now();
  const diff = targetMs - now;

  if (diff <= 0) return { d: 0, h: 0, m: 0, s: 0, done: true };

  const totalSec = Math.floor(diff / 1000);
  const d = Math.floor(totalSec / 86400);
  const h = Math.floor((totalSec % 86400) / 3600);
  const m = Math.floor((totalSec % 3600) / 60);
  const s = totalSec % 60;

  return { d, h, m, s, done: false };
}

export default function ApplyCountdown({ targetISO, label = "모집 시작까지" }: Props) {
  const targetMs = useMemo(() => new Date(targetISO).getTime(), [targetISO]);
  const [left, setLeft] = useState<Left>(() => calcLeft(targetMs));

  useEffect(() => {
    const t = setInterval(() => setLeft(calcLeft(targetMs)), 1000);
    return () => clearInterval(t);
  }, [targetMs]);

  return (
    <div className={styles.countdownCard} aria-label="모집 카운트다운">
      <div className={styles.countdownTop}>
        <span className={styles.countdownLabel}>{label}</span>
        <span className={styles.kstBadge}>KST</span>
      </div>

      {left.done ? (
        <div className={styles.countdownDone}>모집이 시작되었습니다 🎉</div>
      ) : (
        <div className={styles.timeGrid}>
          <TimeBox value={left.d} unit="일" />
          <TimeBox value={left.h} unit="시간" />
          <TimeBox value={left.m} unit="분" />
          <TimeBox value={left.s} unit="초" />
        </div>
      )}

      <div className={styles.countdownHint}>* 2026년 1월 15일(목) 11:00 기준</div>
    </div>
  );
}

function TimeBox({ value, unit }: { value: number; unit: string }) {
  const vv = String(value).padStart(2, "0");
  return (
    <div className={styles.timeBox}>
      <div className={styles.timeValue}>{vv}</div>
      <div className={styles.timeUnit}>{unit}</div>
    </div>
  );
}
