import { useState } from "react";
import pageStyles from "../components/faq/FaqSection.module.css";

import { FAQS } from "../components/faq/data/FaqData";
import FaqHero from "../components/faq/FaqHero";
import FaqList from "../components/faq/FaqList";
import FaqContact from "../components/faq/FaqContact";
import Navbar from "../components/layout/Navbar/Navbar";
import Footer from "../components/layout/Footer/Footer";

export default function FaqPage() {
  const [query, setQuery] = useState<string>("");

  return (
    <>
      <Navbar />
      <main className={pageStyles.page}>
        <div className={pageStyles.bg} aria-hidden>
          <span className={`${pageStyles.blob} ${pageStyles.blobBlue}`} />
          <span className={`${pageStyles.blob} ${pageStyles.blobCyan}`} />
          <span className={`${pageStyles.blob} ${pageStyles.blobPurple}`} />
        </div>
        <FaqHero
          query={query}
          onChangeQuery={setQuery}
          onReset={() => setQuery("")}
        />
        <FaqList items={FAQS} query={query} />
        <FaqContact />
      </main>
      <Footer />
    </>
  );
}
