import { useMemo, useState } from "react";
import styles from "./FaqSection.module.css";
import type { FaqItemType } from "./types";
import FaqItem from "./FaqItem";

type Props = {
  items: FaqItemType[];
  query: string;
};

export default function FaqList({ items, query }: Props) {
  const [openIdx, setOpenIdx] = useState<number>(0);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;

    return items.filter((f) => {
      const hay = `${f.q} ${f.category ?? ""}`.toLowerCase();
      return hay.includes(q);
    });
  }, [items, query]);

  return (
    <section className={styles.body}>
      <div className={styles.container}>
        <div className={styles.list}>
          {filtered.length === 0 ? (
            <div className={styles.empty}>검색 결과가 없어요. 다른 키워드로 시도해 주세요.</div>
          ) : (
            filtered.map((item, idx) => (
              <FaqItem
                key={`${item.category ?? "etc"}-${item.q}`}
                item={item}
                open={openIdx === idx}
                onToggle={() => setOpenIdx((prev) => (prev === idx ? -1 : idx))}
              />
            ))
          )}
        </div>
      </div>
    </section>
  );
}
