export type FaqCategory = "지원" | "활동" | "프로젝트" | "운영" | "기타";

export type FaqItemType = {
  q: string;
  a: React.ReactNode;
  category?: FaqCategory;
};
