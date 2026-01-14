import { useEffect, useMemo, useState } from "react";
import styles from "./ApplySection.module.css";

type Props = {
  openISO: string; // 모집 시작
  closeISO: string; // 모집 마감
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

export default function ApplyCountdown({ openISO, closeISO }: Props) {
  const openMs = useMemo(() => new Date(openISO).getTime(), [openISO]);
  const closeMs = useMemo(() => new Date(closeISO).getTime(), [closeISO]);

  const [nowMs, setNowMs] = useState(() => Date.now());

  useEffect(() => {
    const t = setInterval(() => setNowMs(Date.now()), 1000);
    return () => clearInterval(t);
  }, []);

  const isOpen = nowMs >= openMs;
  const isClosed = nowMs >= closeMs;

  const targetMs = isOpen ? closeMs : openMs;

  const [left, setLeft] = useState<Left>(() => calcLeft(targetMs));
  useEffect(() => {
    const t = setInterval(() => setLeft(calcLeft(targetMs)), 1000);
    return () => clearInterval(t);
  }, [targetMs]);

  const label = isClosed
    ? "모집 상태"
    : isOpen
    ? "모집 마감까지"
    : "모집 시작까지";

  return (
    <div className={styles.countdownCard} aria-label="모집 카운트다운">
      <div className={styles.countdownTop}>
        <span className={styles.countdownLabel}>{label}</span>
        <span className={styles.kstBadge}>KST</span>
      </div>

      {isClosed ? (
        <div className={styles.countdownDone}>지원이 마감되었습니다 🙏</div>
      ) : left.done ? (
        <div className={styles.countdownDone}>
          {isOpen ? "곧 마감됩니다 ⏳" : "모집이 시작되었습니다 🎉"}
        </div>
      ) : (
        <div className={styles.timeGrid}>
          <TimeBox value={left.d} unit="일" />
          <TimeBox value={left.h} unit="시간" />
          <TimeBox value={left.m} unit="분" />
          <TimeBox value={left.s} unit="초" />
        </div>
      )}

      <div className={styles.countdownHint}>
        * 시작: 2026년 1월 15일(목) 11:00 / 마감: 2026년 1월 25일(일) 24:00
      </div>
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
