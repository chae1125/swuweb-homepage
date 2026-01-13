import React, { useEffect, useRef, useState } from "react";
import styles from "./RegularSessionSection.module.css";
import RegularSessionDetail from "./RegularSessionDetail";

import core1 from "../../../assets/images/core-1.jpg";
import core2 from "../../../assets/images/core-2.jpg";
import onboarding1 from "../../../assets/images/onboarding-1.jpg";
import onboarding3 from "../../../assets/images/onboarding-3.jpg";
import plan1 from "../../../assets/images/plan-1.jpg";
import plan2 from "../../../assets/images/plan-2.jpg";
import build1 from "../../../assets/images/build-1.jpg";
import build3 from "../../../assets/images/build-3.jpg";
import show1 from "../../../assets/images/show-1.jpg";
import show2 from "../../../assets/images/show-2.jpg";

const sessions = [
  {
    week: "Week 01",
    title: "온보딩 & 팀빌딩",
    points: ["OT / 운영방식 안내", "파트 소개", "팀/스터디 매칭"],
    tag: "START",
    desc: "학회 운영 방식과 협업 문화를 이해하고, 함께할 팀을 구성합니다.",
    images: [
      {
        src: onboarding1,
        alt: "온보딩 세션",
        caption: "OT 및 학회 소개",
      },
      {
        src: onboarding3,
        alt: "아이스브레이킹",
        caption: "아이스브레이킹 및 네트워킹",
      },
    ],
  },
  {
    week: "Week 02-06",
    title: "정규세션",
    points: ["매주 주제 학습 & 실습", "파트별 스터디", "코드리뷰 / 피드백"],
    tag: "CORE",
    desc: "매주 정해진 주제로 이론 학습과 실습을 진행하고, 파트별 스터디와 코드리뷰를 통해 실력을 다집니다.",
    images: [
      {
        src: core1,
        alt: "정규 세션 강의",
        caption: "주제별 핵심 개념 학습",
      },
      {
        src: core2,
        alt: "실습 세션",
        caption: "실습 중심 세션 진행",
      },
    ],
  },
  {
    week: "Week 07–10",
    title: "팀 프로젝트 기획 & 설계",
    points: [
      "아이디어 구체화 & 기획서 작성",
      "디자인 / 기술 스택 결정",
      "개발 환경 세팅 & 역할 분담",
    ],
    tag: "PLAN",
    desc: "팀별로 프로젝트 아이디어를 구체화하고, 기획·디자인·기술 스택을 결정하며 본격적인 개발 준비를 합니다.",
    images: [
      {
        src: plan1,
        alt: "아이디어 회의",
        caption: "아이디어 브레인스토밍",
      },
      {
        src: plan2,
        alt: "기획서 작성",
        caption: "기획서 및 와이어프레임 작성",
      },
    ],
  },
  {
    week: "Week 11–21",
    title: "팀 프로젝트 개발 스프린트",
    points: [
      "기능 단위 개발 & 협업",
      "주간 스프린트 리뷰",
      "문제 해결 / 리팩토링",
    ],
    tag: "BUILD",
    desc: "스프린트 단위로 기능을 개발하며 협업 경험을 쌓고, 리뷰와 리팩토링을 반복합니다.",
    images: [
      {
        src: build1,
        alt: "개발 진행",
        caption: "기능 단위 개발",
      },
      {
        src: build3,
        alt: "스프린트 리뷰",
        caption: "주간 스프린트 리뷰",
      },
    ],
  },
  {
    week: "Week 22",
    title: "최종 데모데이",
    points: ["발표 & QA", "피드백", "회고/아카이빙"],
    tag: "SHOW",
    desc: "완성된 프로젝트를 발표하고 피드백을 받으며, 전체 활동을 회고하고 결과물을 아카이빙합니다.",
    images: [
      {
        src: show1,
        alt: "데모데이 발표",
        caption: "팀 프로젝트 발표",
      },
      {
        src: show2,
        alt: "회고",
        caption: "회고 및 마무리",
      },
    ],
  },
];

export default function RegularSessionSection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);

  // 모바일에서 상세 열릴 때 배경 스크롤을 막아 레이아웃 깨짐 방지
  useEffect(() => {
    // 화면 너비 <= 980px 일 때만 body 고정(스크롤 잠금) 적용
    const MOBILE_MAX = 980;
    const prev = {
      position: document.body.style.position,
      top: document.body.style.top,
      width: document.body.style.width,
    };
    let scrollY = 0;

    if (activeIndex !== null && window.innerWidth <= MOBILE_MAX) {
      scrollY = window.scrollY || document.documentElement.scrollTop;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      return () => {
        document.body.style.position = prev.position || "";
        document.body.style.top = prev.top || "";
        document.body.style.width = prev.width || "";
        window.scrollTo(0, scrollY);
      };
    }

    return () => {};
  }, [activeIndex]);

  function toggle(i: number) {
    setActiveIndex((v) => (v === i ? null : i));
  }

  useEffect(() => {
    if (activeIndex === null) return;
    // scroll into view the active card (smooth)
    const el = cardRefs.current[activeIndex];
    if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [activeIndex]);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.head}>
          <h2 className={styles.title}>정규세션</h2>
          <p className={styles.desc}>
            매주 “배움 → 적용 → 공유” 루틴으로 실력이 쌓이게 설계된 핵심
            활동입니다.
          </p>
        </div>
        <div
          className={`${styles.grid} ${
            activeIndex !== null ? styles.detailOpen : ""
          }`}
        >
          {sessions.map((s, i) => (
            <React.Fragment key={s.week}>
              <article
                ref={(el) => {
                  cardRefs.current[i] = el;
                }}
                className={styles.card}
                onClick={() => toggle(i)}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") toggle(i);
                }}
                role="button"
                aria-expanded={activeIndex === i}
              >
                <div className={styles.cardTop}>
                  <span className={styles.week}>{s.week}</span>
                  <span className={styles.tag}>{s.tag}</span>
                </div>

                <div className={styles.cardTitle}>{s.title}</div>

                <ul className={styles.list}>
                  {s.points.map((p) => (
                    <li key={p} className={styles.item}>
                      <span className={styles.bullet} aria-hidden />
                      {p}
                    </li>
                  ))}
                </ul>

                <div className={styles.bottomBar} aria-hidden />
              </article>

              {activeIndex === i && (
                <RegularSessionDetail
                  data={s}
                  onClose={() => setActiveIndex(null)}
                />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </section>
  );
}
