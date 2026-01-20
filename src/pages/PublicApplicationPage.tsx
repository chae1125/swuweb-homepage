import { useLayoutEffect, useEffect, useMemo, useState, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import styles from "./ApplyForm.module.css";

type Answer = { questionNum: number; content: string };

type ApiResponse = {
  applicationId: number;
  createdAt: string;
  answers: Answer[];
};

type FormState = {
  name: string;
  major: string;
  studentId: string;
  yearStatus: "" | "enrolled" | "leave";
  yearDetail: string;
  email: string;
  phone: string;

  part: "" | "frontend" | "backend";
  reason: string;
  experience: string;
  problemSolving: string;
  participation: string;
  wantToBuild: string;

  febStudy: string;
  portfolio: string;
  extra: string;
};

function useAutosizeTextArea(value: string) {
  const ref = useRef<HTMLTextAreaElement | null>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;

    // 높이 초기화 후 scrollHeight로 다시 설정
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  }, [value]);

  return ref;
}

const initialState: FormState = {
  name: "",
  major: "",
  studentId: "",
  yearStatus: "",
  yearDetail: "",
  email: "",
  phone: "",
  part: "",

  reason: "",
  experience: "",
  problemSolving: "",
  participation: "",
  wantToBuild: "",

  febStudy: "",
  portfolio: "",
  extra: "",
};

const API_BASE = import.meta.env.VITE_API_BASE as string;

const pick = (map: Map<number, string>, n: number) => map.get(n) ?? "";

const toFormState = (answers: Answer[]): FormState => {
  const map = new Map<number, string>();
  answers.forEach((a) => map.set(a.questionNum, a.content ?? ""));

  return {
    name: pick(map, 0),
    major: pick(map, 1),
    studentId: pick(map, 2),
    yearStatus: (pick(map, 3) as FormState["yearStatus"]) ?? "",
    yearDetail: pick(map, 4),
    email: pick(map, 5),
    phone: pick(map, 6),
    part: (pick(map, 7) as FormState["part"]) ?? "",
    reason: pick(map, 9),
    experience: pick(map, 10),
    problemSolving: pick(map, 11),
    participation: pick(map, 12),
    wantToBuild: pick(map, 13),

    febStudy: pick(map, 14),
    portfolio: pick(map, 15),
    extra: pick(map, 16),
  };
};

const partLabel = (v: FormState["part"]) => {
  if (v === "frontend") return "프론트엔드";
  if (v === "backend") return "백엔드";
  return "";
};

const statusLabel = (v: FormState["yearStatus"]) => {
  if (v === "enrolled") return "재학 중";
  if (v === "leave") return "휴학 중";
  return "";
};

const countChars = (v: string) => (v ? v.length : 0);

export default function PublicApplicationPage() {
  const { token } = useParams<{ token: string }>();
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string>("");
  const [form, setForm] = useState<FormState>(initialState);
  const [createdAt, setCreatedAt] = useState<string>("");

  function AutosizeTextarea({ value }: { value: string }) {
  const ref = useAutosizeTextArea(value);
  const len = countChars(value);

  return (
    <div className={styles.textareaWrap}>
      <textarea
        ref={ref}
        value={value}
        readOnly
        rows={1}
        className={styles.textareaReadOnly}
      />
      <span className={styles.charCount}>{len}자</span>
    </div>
  );
}


  useEffect(() => {
    if (!token) return;

    (async () => {
      setLoading(true);
      setErr("");

      try {
        const res = await fetch(`${API_BASE}/application/${token}`);
        if (!res.ok) {
          const text = await res.text().catch(() => "");
          throw new Error(`조회 실패 (${res.status}) ${text}`);
        }
        const data = (await res.json()) as ApiResponse;

        setCreatedAt(data.createdAt);
        setForm(toFormState(data.answers));
      } catch (e: any) {
        setErr(e?.message ?? "알 수 없는 오류");
      } finally {
        setLoading(false);
      }
    })();
  }, [token]);

  const createdText = useMemo(() => {
    if (!createdAt) return "";
    try {
      const d = new Date(createdAt);
      const kst = new Date(d.getTime() + 9 * 60 * 60 * 1000);

      return kst.toLocaleString("ko-KR");
    } catch {
      return createdAt;
    }
  }, [createdAt]);

  if (loading) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h1 className={styles.title}>지원서 조회</h1>
            <p className={styles.subTitle}>불러오는 중…</p>
          </div>
        </div>
      </div>
    );
  }

  if (err) {
    return (
      <div className={styles.page}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h1 className={styles.title}>지원서 조회</h1>
            <p className={styles.subTitle}>조회에 실패했어요: {err}</p>
            <div style={{ marginTop: 16 }}>
              <Link to="/" style={{ textDecoration: "underline" }}>
                홈으로
              </Link>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <div className={styles.bg} aria-hidden>
        <span className={`${styles.blob} ${styles.blobBlue}`} />
        <span className={`${styles.blob} ${styles.blobCyan}`} />
        <span className={`${styles.blob} ${styles.blobPurple}`} />
      </div>

      <div className={styles.container}>
        <div className={styles.header}>
          <p className={styles.kicker}>SWUWEB Application</p>
          <h1 className={styles.title}>지원서 조회</h1>
          <p className={styles.subTitle}>
            제출된 지원서 내용을 확인하는 페이지입니다. (수정 불가)
            {createdText ? (
              <>
                <br />
                제출 시각: {createdText}
              </>
            ) : null}
          </p>
        </div>

        <div className={styles.form}>
          <section className={styles.sectionCard}>
            <div className={styles.sectionHead}>
              <h2 className={styles.sectionTitle}>📌 기본 정보</h2>
              <span className={styles.badge}>제출 내용</span>
            </div>

            <div className={styles.grid}>
              <label>
                이름
                <input value={form.name} readOnly />
              </label>

              <label>
                학과
                <input value={form.major} readOnly />
              </label>

              <label>
                학번
                <input value={form.studentId} readOnly />
              </label>

              <label>
                학적 상태
                <input value={statusLabel(form.yearStatus)} readOnly />
              </label>

              <label>
                학적 상세
                <input value={form.yearDetail} readOnly />
              </label>

              <label>
                이메일
                <input value={form.email} readOnly />
              </label>

              <label>
                전화번호
                <input value={form.phone} readOnly />
              </label>
            </div>
          </section>

          <section className={styles.sectionCard}>
            <div className={styles.sectionHead}>
              <h2 className={styles.sectionTitle}>📌 서류 모집 질문</h2>
              <span className={styles.badgeGhost}>제출 내용</span>
            </div>

            <div className={styles.questions}>
              <label>
                지원 파트
                <input
                  value={form.part ? partLabel(form.part) : "프론트엔드"}
                  readOnly
                />
              </label>

              <label>
                1. SWUWEB에 지원하게 된 계기는 무엇이며, 활동을 통해 어떤 경험을
                해보고 싶나요?
                <AutosizeTextarea value={form.reason} />
              </label>

              <label>
                2. 웹 개발 관련 경험이 있다면 자유롭게 적어주세요.
                <AutosizeTextarea value={form.experience} />
              </label>

              <label>
                3. 개발 공부나 프로젝트를 진행하면서 어려움을 겪었던 경험이
                있다면, 당시 어떤 방식으로 해결하려고 했는지 말씀해주세요.
                <AutosizeTextarea value={form.problemSolving} />
              </label>

              <label>
                4. 학회 활동을 학기 중 다른 일정(수업, 과제 등)과 병행했을 때,
                어느 정도의 시간과 노력을 학회 활동에 투자할 수 있을지
                구체적으로 작성해주세요.
                <AutosizeTextarea value={form.participation} />
              </label>

              <label>
                5. SWUWEB에 합류하게 된다면, 직접 기획하거나 개발해보고 싶은
                페이지나 기능이 있다면 설명해주세요.
                <AutosizeTextarea value={form.wantToBuild} />
              </label>

              <label>
                6. 저희 소학회는 3월이 아닌 방학 중인 2월부터 활동을 시작할
                예정입니다. 이에 따라 2월 동안 주 1회 비대면 스터디가 진행될
                예정인데, 해당 일정에 참여 가능하신가요?
                <AutosizeTextarea value={form.febStudy} />
              </label>

              <label>
                GitHub, 개인 프로젝트, 포트폴리오 페이지 등이 있다면 자유롭게
                첨부해주세요.
                <input value={form.portfolio} readOnly />
              </label>

              <label>
                운영진에게 전하고 싶은 말이나 추가로 하고 싶은 이야기가 있다면
                자유롭게 적어주세요.
                <AutosizeTextarea value={form.extra} />
              </label>
            </div>
          </section>

          <div className={styles.actions}>
            <Link
              className={styles.ctaGhost}
              to="/apply"
              onClick={() =>
                window.scrollTo({ top: 0, left: 0, behavior: "auto" })
              }
            >
              모집 페이지로 돌아가기
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
