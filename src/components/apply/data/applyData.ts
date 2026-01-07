import type { ApplyChecklistItem, ApplyInfoCard, ApplyStep } from "../types";

export const APPLY_INFO: ApplyInfoCard[] = [
  { label: "모집 대상", value: "서울여자대학교 재학생", hint: "전공/학년 제한 없음" },
  { label: "활동 기간", value: "2026.02 ~ 2026.07", hint: "약 6개월" },
  { label: "정규 세션", value: "주 1회", hint: "평일 저녁(스케줄 반영)" },
  { label: "프로젝트", value: "팀 프로젝트 1회", hint: "기획 → 개발 → 데모데이" },
];

export const APPLY_STEPS: ApplyStep[] = [
  { title: "서류 지원", date: "1/15 ~ 1/25", desc: "왜 SWUWEB에 지원하게 되었는지, 어떤 활동을 기대하고 있는지 자유롭게 적어주세요." },
  { title: "비대면 면접", date: "1/26 ~ 1/28", desc: "지원서 내용을 바탕으로 관심사와 학회 활동에 대해 가볍게 이야기를 나눕니다." },
  { title: "합격 발표", date: "1/30", desc: "합격 여부는 개별적으로 안내되며, 이후 활동을 위한 채널로 초대됩니다." },
  { title: "OT 시작", date: "2월 첫째 주", desc: "학회 운영 방식과 앞으로의 일정, 팀·스터디 구성을 함께 안내합니다." },
];

export const APPLY_CHECKLIST: ApplyChecklistItem[] = [
  { title: "매주 세션 참여 가능", desc: "꾸준함이 가장 큰 성장 포인트예요." },
  { title: "과제/실습 해볼 의지", desc: "완벽보다 ‘직접 해보기’가 중요합니다." },
  { title: "협업에 대한 열린 태도", desc: "코드 리뷰·커뮤니케이션을 함께 배워요." },
  { title: "노트북 지참 권장", desc: "Windows/macOS 모두 가능, 세팅 가이드 제공." },
];
