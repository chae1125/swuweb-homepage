import React, { useLayoutEffect, useMemo, useRef, useState } from "react";
import styles from "./FaqSection.module.css";

type FaqItem = {
  q: string;
  a: React.ReactNode;
  category?: "지원" | "활동" | "프로젝트" | "운영" | "기술" | "기타";
};

const FAQS: FaqItem[] = [
  {
    category: "지원",
    q: "비전공자/초보도 지원할 수 있나요?",
    a: (
      <>
        네! 기초부터 함께 쌓아가는 커리큘럼이라 초보도 충분히 따라올 수 있어요.
        <br />
        다만, 꾸준히 참여하고 과제를 해보려는 의지가 가장 중요합니다.
      </>
    ),
  },
  {
    category: "지원",
    q: "모집은 어떤 방식으로 진행되나요?",
    a: (
      <ul>
        <li>서류 지원 → 비대면 면접 → 최종 합격 안내</li>
        <li>일정 및 방식은 공지 채널(인스타/공지 페이지)에 안내돼요.</li>
      </ul>
    ),
  },
  {
    category: "활동",
    q: "정규세션은 주 몇 회이고, 시간은 어느 정도인가요?",
    a: (
      <>
        보통 주 1회 정규세션 + 파트별 스터디(팀에 따라 추가)가 진행돼요.
        <br />
        정확한 요일/시간은 학기 초에 구성원 스케줄을 반영해서 확정합니다.
      </>
    ),
  },
  {
    category: "활동",
    q: "결석하면 불이익이 있나요?",
    a: (
      <>
        불가피한 사유는 사전에 공유해주면 괜찮아요.
        <br />
        다만 팀 프로젝트 협업이 있기 때문에 무단 결석/지각이 반복되면 활동에 제한이 있을 수 있어요.
      </>
    ),
  },
  {
    category: "프로젝트",
    q: "프로젝트는 어떤 주제로 진행하나요?",
    a: (
      <>
        팀이 직접 주제를 정해요. 문제를 발견하고 해결하는 과정 자체를 중요하게 봅니다.
        <br />
        예: 교내 생활 편의, 일정/커뮤니티, 예약/주문 플로우, 지도 연동 등
      </>
    ),
  },
  {
    category: "프로젝트",
    q: "협업은 어떻게 진행하나요? (GitHub 등)",
    a: (
      <ul>
        <li>GitHub를 활용해 브랜치 전략으로 협업합니다.</li>
        <li>PR 기반 코드리뷰/피드백 문화가 있어요.</li>
        <li>팀별로 Notion/Figma/Discord 등을 함께 사용합니다.</li>
      </ul>
    ),
  },
  {
    category: "운영",
    q: "회비가 있나요?",
    a: (
      <>
        운영비(행사/데모데이 등) 목적의 회비가 있을 수 있어요.
        <br />
        금액과 사용처는 모집 공지에서 투명하게 안내합니다.
      </>
    ),
  },
  {
    category: "기타",
    q: "활동 결과물은 어디에서 볼 수 있나요?",
    a: (
      <>
        데모데이 이후 프로젝트를 아카이빙해 공개합니다.
        <br />
        (사이트 프로젝트 섹션 / 깃허브 / 노션 등으로 정리)
      </>
    ),
  },
];

type AccordionProps = {
  item: FaqItem;
  open: boolean;
  onToggle: () => void;
};

function AccordionItem({ item, open, onToggle }: AccordionProps) {
  const innerRef = useRef<HTMLDivElement | null>(null);
  const [h, setH] = useState<number>(0);

  useLayoutEffect(() => {
    if (!innerRef.current) return;
    // 열릴 때는 실제 높이 측정해서 max-height로 애니메이션
    if (open) {
      const next = innerRef.current.scrollHeight;
      setH(next);
    } else {
      setH(0);
    }
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

      <div
        className={styles.aWrap}
        style={{ maxHeight: `${h}px` }}
        aria-hidden={!open}
      >
        <div ref={innerRef} className={styles.aInner}>
          <div className={styles.aText}>{item.a}</div>
        </div>
      </div>
    </article>
  );
}

export default function FaqPage() {
  const [openIdx, setOpenIdx] = useState<number>(0);
  const [query, setQuery] = useState<string>("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return FAQS;
    return FAQS.filter((f) => {
      const plain =
        (typeof f.a === "string" ? f.a : "") + " " + f.q + " " + (f.category ?? "");
      return plain.toLowerCase().includes(q);
    });
  }, [query]);

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.container}>
          <h1 className={styles.title}>FAQ</h1>
          <p className={styles.desc}>
            자주 묻는 질문을 모아두었어요. 찾는 내용이 없으면 DM/메일로 문의해 주세요!
          </p>

          <div className={styles.searchRow}>
            <input
              className={styles.search}
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="검색 (예: 면접, 회비, 프로젝트)"
              aria-label="FAQ 검색"
            />
            <button
              type="button"
              className={styles.reset}
              onClick={() => setQuery("")}
              disabled={!query}
            >
              초기화
            </button>
          </div>
        </div>
      </section>

      <section className={styles.body}>
        <div className={styles.container}>
          <div className={styles.list}>
            {filtered.length === 0 ? (
              <div className={styles.empty}>
                검색 결과가 없어요. 다른 키워드로 다시 시도해 주세요.
              </div>
            ) : (
              filtered.map((item, idx) => (
                <AccordionItem
                  key={`${item.category ?? "etc"}-${item.q}`}
                  item={item}
                  open={openIdx === idx}
                  onToggle={() => setOpenIdx((prev) => (prev === idx ? -1 : idx))}
                />
              ))
            )}
          </div>

          <div className={styles.contact}>
            <div className={styles.contactTitle}>추가 문의</div>
            <div className={styles.contactDesc}>
              답변이 부족하거나 상황이 특수한 경우, 편하게 문의해 주세요.
            </div>
            <div className={styles.contactBtns}>
              <a className={styles.cta} href="/apply">
                지원하러 가기
              </a>
              <a className={styles.ctaGhost} href="/contact">
                문의하기
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
