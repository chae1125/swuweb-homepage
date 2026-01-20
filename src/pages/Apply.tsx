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

import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ApplyPage() {
  const location = useLocation();
  const [modalOpen, setModalOpen] = useState(false);
  const [shareUrl, setShareUrl] = useState<string>("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (location.state?.openPopup && location.state?.shareUrl) {
      setShareUrl(location.state.shareUrl);
      setModalOpen(true);
    }
  }, [location.state]);

  return (
    <>
      <Navbar />
      <main className={pageStyles.page}>
        <ApplyHero
          primaryHref="/apply/form"
          primaryLabel="지원서 작성하기"
          secondaryHref="/faq"
          secondaryLabel="FAQ 보기"
        />

        <ApplyInfoGrid items={APPLY_INFO} />
        <ApplyProcess steps={APPLY_STEPS} />
        <ApplyChecklist items={APPLY_CHECKLIST} />
        <ApplyCta primaryHref="/apply/form" secondaryHref="/faq" />
      </main>

      {modalOpen && (
        <div
          className={pageStyles.modalOverlay}
          role="dialog"
          aria-modal="true"
          onClick={() => setModalOpen(false)}
        >
          <div
            className={pageStyles.modal}
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className={pageStyles.modalTitle}>지원서 제출 완료</h3>

            <p className={pageStyles.modalDesc}>
              제출이 완료되었습니다. 아래의 공유 URL을 복사하여{" "}
              <b>"내 지원서 확인하기"</b> 탭에 붙여넣기 하시면 제출하신 답변을
              다시 확인할 수 있습니다.
              <br />
              <b>팝업을 닫으면 URL을 다시 알려드릴 수 없으니</b> 꼭 복사해
              주세요.
            </p>

            <div className={pageStyles.urlRow}>
              <input
                readOnly
                value={shareUrl}
                className={pageStyles.urlInput}
              />
              <button
                type="button"
                className={pageStyles.copyBtn}
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(shareUrl);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 1500);
                  } catch {
                    alert("클립보드 복사에 실패했습니다.");
                  }
                }}
              >
                {copied ? "복사됨" : "복사하기"}
              </button>
            </div>

            <div className={pageStyles.modalActions}>
              <button
                type="button"
                className={pageStyles.closeBtn}
                onClick={() => setModalOpen(false)}
              >
                닫기
              </button>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </>
  );
}
