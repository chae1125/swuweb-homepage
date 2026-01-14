import React, { useMemo, useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ApplyForm.module.css";

type FormState = {
  name: string;
  major: string;
  studentId: string;
  yearStatus: "" | "enrolled" | "leave";
  grade: string;
  semester: string;
  leaveAt: string;
  email: string;
  phone: string;
  reason: string;
  experience: string;
  problemSolving: string;
  participation: string;
  wantToBuild: string;
  portfolio: string;
  extra: string;
  febStudy: string;
};

const initialState: FormState = {
  name: "",
  major: "",
  studentId: "",
  yearStatus: "",
  grade: "",
  semester: "",
  leaveAt: "",
  email: "",
  phone: "",
  reason: "",
  experience: "",
  problemSolving: "",
  participation: "",
  wantToBuild: "",
  portfolio: "",
  extra: "",
  febStudy: "",
};

const LIMITS = {
  reason: 400,
  experience: 300,
  problemSolving: 400,
  participation: 200,
  wantToBuild: 300,
} as const;

const isBlank = (v: string) => v.trim().length === 0;

const labelMap: Record<keyof FormState, string> = {
  name: "이름",
  major: "학과",
  studentId: "학번",
  yearStatus: "학적 상태",
  grade: "학년",
  semester: "학기",
  leaveAt: "휴학 전 마지막 이수 학기",
  email: "이메일",
  phone: "전화번호",
  reason: "1번 문항",
  experience: "2번 문항",
  problemSolving: "3번 문항",
  participation: "4번 문항",
  wantToBuild: "5번 문항",
  febStudy: "2월 스터디 참여 가능 여부",
  portfolio: "포트폴리오 링크",
  extra: "추가 이야기",
};

const AutosizeTextarea: React.FC<
  React.TextareaHTMLAttributes<HTMLTextAreaElement>
> = ({ style, onChange, value, ...rest }) => {
  const ref = useRef<HTMLTextAreaElement | null>(null);

  const resize = () => {
    const el = ref.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${el.scrollHeight}px`;
  };

  useEffect(() => {
    resize();
  }, [value]);

  return (
    <textarea
      {...rest}
      ref={ref}
      value={value}
      onChange={(e) => {
        resize();
        onChange?.(e);
      }}
      style={{ overflow: "hidden", resize: "none", ...style }}
    />
  );
};

const ApplyForm: React.FC = () => {
  const [form, setForm] = useState<FormState>(initialState);
  const navigate = useNavigate();

  const API_BASE = "https://swuweb-website-production.up.railway.app";

  useEffect(() => {
    const now = Date.now();
    const openAt = new Date("2026-01-15T11:00:00+09:00").getTime();
    const closeAt = new Date("2026-01-26T00:00:00+09:00").getTime();

    if (now < openAt || now >= closeAt) {
      alert("지원 기간이 종료되었습니다.");
      navigate("/apply", { replace: true });
    }
  }, [navigate]);

  const requiredKeys = useMemo<(keyof FormState)[]>(
    () => [
      "name",
      "major",
      "studentId",
      "yearStatus",
      "email",
      "phone",
      "reason",
      "experience",
      "problemSolving",
      "participation",
      "wantToBuild",
      "febStudy",
    ],
    []
  );

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setForm((prev) => {
      if (name === "yearStatus") {
        const nextStatus = value as FormState["yearStatus"];
        if (nextStatus === "enrolled") {
          return { ...prev, yearStatus: nextStatus, leaveAt: "" };
        }
        if (nextStatus === "leave") {
          return { ...prev, yearStatus: nextStatus, grade: "", semester: "" };
        }
        return { ...prev, yearStatus: "" };
      }
      return { ...prev, [name]: value };
    });
  };

  const validate = (): { ok: boolean; message?: string } => {
    for (const key of requiredKeys) {
      if (isBlank(String(form[key]))) {
        return {
          ok: false,
          message: `필수 항목을 작성해주세요: ${labelMap[key]}`,
        };
      }
    }

    if (form.yearStatus === "enrolled") {
      if (isBlank(form.grade)) {
        return { ok: false, message: `필수 항목: ${labelMap.grade}` };
      }
      if (isBlank(form.semester)) {
        return { ok: false, message: `필수 항목: ${labelMap.semester}` };
      }
    }

    if (form.yearStatus === "leave") {
      if (isBlank(form.leaveAt)) {
        return { ok: false, message: `필수 항목: ${labelMap.leaveAt}` };
      }
    }

    if (form.reason.length > LIMITS.reason)
      return { ok: false, message: `1번 문항은 ${LIMITS.reason}자 이내` };
    if (form.experience.length > LIMITS.experience)
      return { ok: false, message: `2번 문항은 ${LIMITS.experience}자 이내` };
    if (form.problemSolving.length > LIMITS.problemSolving)
      return {
        ok: false,
        message: `3번 문항은 ${LIMITS.problemSolving}자 이내`,
      };
    if (form.participation.length > LIMITS.participation)
      return {
        ok: false,
        message: `4번 문항은 ${LIMITS.participation}자 이내`,
      };
    if (form.wantToBuild.length > LIMITS.wantToBuild)
      return { ok: false, message: `5번 문항은 ${LIMITS.wantToBuild}자 이내` };

    return { ok: true };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const v = validate();
    if (!v.ok) {
      alert(v.message);
      return;
    }

    try {
      const gradeSemester =
        form.yearStatus === "enrolled"
          ? `${form.grade}학년 ${form.semester}학기`
          : form.leaveAt;

      // ✅ 서버가 null 불가라면: "미작성" 처리(선택만)
      const safeContent = (v: string) => (v.trim() === "" ? "미작성" : v);

      const body = {
        answers: [
          { questionNum: 0, content: safeContent(form.name) },
          { questionNum: 1, content: safeContent(form.major) },
          { questionNum: 2, content: safeContent(form.studentId) },
          { questionNum: 3, content: safeContent(form.yearStatus) },
          { questionNum: 4, content: safeContent(gradeSemester) },
          { questionNum: 5, content: safeContent(form.email) },
          { questionNum: 6, content: safeContent(form.phone) },

          { questionNum: 9, content: safeContent(form.reason) },
          { questionNum: 10, content: safeContent(form.experience) },
          { questionNum: 11, content: safeContent(form.problemSolving) },
          { questionNum: 12, content: safeContent(form.participation) },
          { questionNum: 13, content: safeContent(form.wantToBuild) },
          { questionNum: 14, content: safeContent(form.febStudy) },

          // 선택
          { questionNum: 15, content: safeContent(form.portfolio) },
          { questionNum: 16, content: safeContent(form.extra) },
        ],
      };

      const res = await fetch(`${API_BASE}/application/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const text = await res.text().catch(() => "");
        console.error("❌ response body:", text);
        throw new Error(`HTTP ${res.status} ${text}`);
      }

      const data = await res.json();
      const shareUrl = data.shareUrl as string | undefined;

      if (!shareUrl) {
        alert("제출은 되었지만 shareUrl을 받지 못했습니다.");
        navigate("/apply");
        return;
      }

      // ✅ 성공하면 ApplyPage로 넘기고 팝업은 ApplyPage에서 띄움
      navigate("/apply", {
        state: {
          openPopup: true,
          shareUrl,
        },
      });
    } catch (err) {
      console.error(err);
      alert("제출 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.bg} aria-hidden>
        <span className={`${styles.blob} ${styles.blobBlue}`} />
        <span className={`${styles.blob} ${styles.blobCyan}`} />
        <span className={`${styles.blob} ${styles.blobPurple}`} />
      </div>

      <div className={styles.container}>
        <div className={styles.header}>
          <p className={styles.kicker}>2025-1 SWUWEB Recruit</p>
          <h1 className={styles.title}>SWUWEB 지원서</h1>
          <p className={styles.subTitle}>
            기본 정보와 질문에 답변해 주세요. 제출 후 수정이 어려울 수 있습니다.
            <br />
            작성 중 새로고침이나 페이지 이동 시 내용이 사라질 수 있습니다.
          </p>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <section className={styles.sectionCard}>
            <div className={styles.sectionHead}>
              <h2 className={styles.sectionTitle}>📌 기본 정보</h2>
              <span className={styles.badge}>필수 포함</span>
            </div>

            <div className={styles.grid}>
              <label>
                이름
                <input
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                학과
                <input
                  name="major"
                  value={form.major}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                학번
                <input
                  name="studentId"
                  value={form.studentId}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                <span className={styles.inlineLabel}>
                  학적 상태 <small>(2026-1학기를 기준으로 선택해주세요.)</small>
                </span>
                <select
                  name="yearStatus"
                  value={form.yearStatus}
                  onChange={handleChange}
                  required
                >
                  <option value="">선택</option>
                  <option value="enrolled">재학 중</option>
                  <option value="leave">휴학 중</option>
                </select>
              </label>

              {form.yearStatus === "enrolled" && (
                <>
                  <label>
                    학년
                    <select
                      name="grade"
                      value={form.grade}
                      onChange={handleChange}
                      required
                    >
                      <option value="">선택</option>
                      <option value="1">1학년</option>
                      <option value="2">2학년</option>
                      <option value="3">3학년</option>
                      <option value="4">4학년</option>
                    </select>
                  </label>

                  <label>
                    학기
                    <select
                      name="semester"
                      value={form.semester}
                      onChange={handleChange}
                      required
                    >
                      <option value="">선택</option>
                      <option value="1">1학기</option>
                      <option value="2">2학기</option>
                    </select>
                  </label>
                </>
              )}

              {form.yearStatus === "leave" && (
                <label>
                  휴학 전 마지막으로 이수한 학기
                  <input
                    name="leaveAt"
                    value={form.leaveAt}
                    onChange={handleChange}
                    placeholder="예: 2학년 2학기"
                    required
                  />
                </label>
              )}

              <label>
                이메일
                <input
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                  required
                />
              </label>

              <label>
                전화번호
                <input
                  name="phone"
                  value={form.phone}
                  onChange={handleChange}
                  required
                />
              </label>
            </div>
          </section>

          <section className={styles.sectionCard}>
            <div className={styles.sectionHead}>
              <h2 className={styles.sectionTitle}>📌 서류 모집 질문</h2>
              <span className={styles.badgeGhost}>필수/선택 포함</span>
            </div>

            <div className={styles.questions}>
              <label>
                1. SWUWEB에 지원하게 된 계기는 무엇이며, 활동을 통해 어떤 경험을
                해보고 싶나요?
                <small>(400자 이내 · 필수)</small>
                <AutosizeTextarea
                  name="reason"
                  value={form.reason}
                  onChange={handleChange}
                  maxLength={LIMITS.reason}
                  required
                />
                <small>
                  {form.reason.length}/{LIMITS.reason}
                </small>
              </label>

              <label>
                2. 웹 개발 관련 경험이 있다면 자유롭게 적어주세요.
                <small>
                  (전공 수업, 개인 공부, 프로젝트, 동아리, 해커톤 등 / 경험이
                  없다면 ‘없음’이라고 작성해도 괜찮습니다)
                </small>
                <small>(300자 이내 · 필수)</small>
                <AutosizeTextarea
                  name="experience"
                  value={form.experience}
                  onChange={handleChange}
                  maxLength={LIMITS.experience}
                  required
                />
                <small>
                  {form.experience.length}/{LIMITS.experience}
                </small>
              </label>

              <label>
                3. 개발 공부나 프로젝트를 진행하면서 어려움을 겪었던 경험이
                있다면, 당시 어떤 방식으로 해결하려고 했는지 말씀해주세요.
                <small>(400자 이내 · 필수)</small>
                <AutosizeTextarea
                  name="problemSolving"
                  value={form.problemSolving}
                  onChange={handleChange}
                  maxLength={LIMITS.problemSolving}
                  required
                />
                <small>
                  {form.problemSolving.length}/{LIMITS.problemSolving}
                </small>
              </label>

              <label>
                4. 학회 활동을 학기 중 다른 일정(수업, 과제 등)과 병행했을 때,
                어느 정도의 시간과 노력을 학회 활동에 투자할 수 있을지
                구체적으로 작성해주세요.
                <small>(200자 이내 · 필수)</small>
                <AutosizeTextarea
                  name="participation"
                  value={form.participation}
                  onChange={handleChange}
                  maxLength={LIMITS.participation}
                  required
                />
                <small>
                  {form.participation.length}/{LIMITS.participation}
                </small>
              </label>

              <label>
                5. SWUWEB에 합류하게 된다면, 직접 기획하거나 개발해보고 싶은
                페이지나 기능이 있다면 설명해주세요.
                <small>(300자 이내 · 필수)</small>
                <AutosizeTextarea
                  name="wantToBuild"
                  value={form.wantToBuild}
                  onChange={handleChange}
                  maxLength={LIMITS.wantToBuild}
                  required
                />
                <small>
                  {form.wantToBuild.length}/{LIMITS.wantToBuild}
                </small>
              </label>

              <label>
                6. 저희 소학회는 3월이 아닌 방학 중인 2월부터 활동을 시작할
                예정입니다. 이에 따라 2월 동안 주 1회 비대면 스터디가 진행될
                예정인데, 해당 일정에 참여 가능하신가요?
                <small>(필수 사항)</small>
                <AutosizeTextarea
                  name="febStudy"
                  value={form.febStudy}
                  onChange={handleChange}
                  required
                  placeholder="참여 가능 여부를 작성해 주시고, 참여가 어려운 경우 그 사유를 간단히 적어주세요."
                />
              </label>

              <label>
                GitHub, 개인 프로젝트, 포트폴리오 페이지 등이 있다면 자유롭게
                첨부해주세요.
                <small>(선택 사항 · 링크 형태)</small>
                <input
                  name="portfolio"
                  value={form.portfolio}
                  onChange={handleChange}
                  placeholder="https://github.com/..."
                />
              </label>

              <label>
                운영진에게 전하고 싶은 말이나 추가로 하고 싶은 이야기가 있다면
                자유롭게 적어주세요.
                <small>(선택 사항)</small>
                <AutosizeTextarea
                  name="extra"
                  value={form.extra}
                  onChange={handleChange}
                />
              </label>
            </div>
          </section>

          <div className={styles.actions}>
            <button
              type="button"
              className={styles.cancel}
              onClick={() => navigate(-1)}
            >
              취소
            </button>
            <button type="submit" className={styles.submit}>
              제출하기
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ApplyForm;
