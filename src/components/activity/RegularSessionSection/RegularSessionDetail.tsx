import { useEffect, useLayoutEffect, useRef, useState } from "react";
import styles from "./RegularSessionSection.module.css";

type Data = {
  week: string;
  title: string;
  points: string[];
  tag: string;
  desc?: string;
  images?: {
    src: string;
    alt: string;
    caption?: string;
  }[];
};

export default function RegularSessionDetail({
  data,
  onClose,
}: {
  data: Data;
  onClose: () => void;
}) {
  const innerRef = useRef<HTMLDivElement | null>(null);
  const [maxH, setMaxH] = useState<number>(0);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  // ✅ 높이 계산 함수
  const measure = () => {
    if (!innerRef.current) return;
    const h = innerRef.current.scrollHeight;
    // next frame에 적용해야 transition 자연스러움
    requestAnimationFrame(() => setMaxH(h));
  };

  // data 바뀔 때 높이 재측정
  useLayoutEffect(() => {
    setMaxH(0); // 닫힘 → 열림 트랜지션 만들기
    requestAnimationFrame(() => measure());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.week]); // data 객체 전체 말고 키(week) 같은 걸로

  // ✅ 이미지 로딩 이후 높이 재측정 (핵심!)
  useEffect(() => {
    const imgs = innerRef.current?.querySelectorAll("img");
    if (!imgs || imgs.length === 0) return;

    let done = 0;
    const onDone = () => {
      done += 1;
      if (done === imgs.length) measure();
    };

    imgs.forEach((img) => {
      if (img.complete) onDone();
      else img.addEventListener("load", onDone, { once: true });
    });

    return () => {
      imgs.forEach((img) => img.removeEventListener("load", onDone));
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data.week]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);

    // 열릴 때 닫기 버튼 포커스
    closeBtnRef.current?.focus();

    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className={styles.detail}
      style={{
        maxHeight: maxH ? `${maxH}px` : "0px",
        opacity: maxH ? 1 : 0,
      }}
      aria-hidden={maxH === 0}
    >
      <div ref={innerRef} className={styles.detailInner}>
        <div className={styles.detailHeader}>
          <div className={styles.detailHeaderText}>
            <div className={styles.detailKicker}>
              {data.week} · {data.tag}
            </div>
            <h3 className={styles.detailTitle}>{data.title}</h3>
            {data.desc ? (
              <p className={styles.detailDesc}>{data.desc}</p>
            ) : null}
          </div>

          <button
            ref={closeBtnRef}
            className={styles.closeBtn}
            onClick={onClose}
            aria-label="상세 닫기"
            type="button"
          >
            닫기
          </button>
        </div>

        <div className={styles.detailBody}>
          {/* ✅ 실제 이미지 렌더 */}
          {data.images && data.images.length > 0 ? (
            <div className={styles.detailImages}>
              {data.images.map((img) => (
                <figure key={img.src} className={styles.figure}>
                  <img
                    className={styles.detailImg}
                    src={img.src}
                    alt={img.alt}
                    loading="lazy"
                    onLoad={measure} // 로딩마다 높이 갱신(안전)
                  />
                  {img.caption ? (
                    <figcaption className={styles.caption}>
                      {img.caption}
                    </figcaption>
                  ) : null}
                </figure>
              ))}
            </div>
          ) : null}

          {/* ✅ 설명 + bullet(기존 points) */}
          <div className={styles.detailText}>
            <ul className={styles.detailList}>
              {data.points.map((pt) => (
                <li key={pt}>{pt}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
