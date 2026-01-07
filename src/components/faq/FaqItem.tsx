import React, { useLayoutEffect, useRef, useState } from "react";
import styles from "./FaqSection.module.css";
import type { FaqItemType } from "./types";

type Props = {
  item: FaqItemType;
  open: boolean;
  onToggle: () => void;
};

export default function FaqItem({ item, open, onToggle }: Props) {
  const innerRef = useRef<HTMLDivElement | null>(null);
  const [h, setH] = useState<number>(0);

  useLayoutEffect(() => {
    if (!innerRef.current) return;
    setH(open ? innerRef.current.scrollHeight : 0);
  }, [open, item]);

  return (
    <article className={`${styles.item} ${open ? styles.open : ""}`}>
      <button
        type="button"
        className={styles.qRow}
        onClick={onToggle}
        aria-expanded={open}
      >
        <div className={styles.qLeft}>
          {item.category ? <span className={styles.badge}>{item.category}</span> : null}
          <span className={styles.qText}>{item.q}</span>
        </div>
        <span className={styles.chev} aria-hidden />
      </button>

      <div className={styles.aWrap} style={{ maxHeight: `${h}px` }} aria-hidden={!open}>
        <div ref={innerRef} className={styles.aInner}>
          <div className={styles.aText}>{item.a}</div>
        </div>
      </div>
    </article>
  );
}
