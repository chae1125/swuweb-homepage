import React from "react";
import pageStyles from "./ApplyPage.module.css";

import Navbar from "../components/layout/Navbar/Navbar";
import Footer from "../components/layout/Footer/Footer";

import ApplyHero from "../components/apply/ApplyHero";
import ApplyInfoGrid from "../components/apply/ApplyInfoGrid";
import ApplyProcess from "../components/apply/ApplyProcess";
import ApplyChecklist from "../components/apply/ApplyChecklist";
import ApplyCta from "../components/apply/ApplyCta";

import {
  APPLY_CHECKLIST,
  APPLY_INFO,
  APPLY_STEPS,
} from "../components/apply/data/applyData";

export default function ApplyPage() {
  return (
    <>
      <Navbar />
      <main className={pageStyles.page}>

        <ApplyHero
          countdownTargetISO="2026-01-15T12:00:00+09:00"
          primaryHref=""
          primaryLabel="지원서 작성하기"
          secondaryHref="/faq"
          secondaryLabel="FAQ 보기"
        />

        <ApplyInfoGrid items={APPLY_INFO} />
        <ApplyProcess steps={APPLY_STEPS} />
        <ApplyChecklist items={APPLY_CHECKLIST} />
        <ApplyCta
          primaryHref=""
          secondaryHref="/faq"
        />
      </main>
      <Footer />
    </>
  );
}
