import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./AdminApplicationsPage.module.css";

const API_BASE = import.meta.env.VITE_API_BASE as string;

type Application = {
  applicationShareId: number;
  link: string;
  name: string;
};

type AdminApplicationsResponse = {
  applications: Application[];
};

export default function AdminApplicationsPage() {
  const navigate = useNavigate();

  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState("");
  const [q, setQ] = useState("");
  const [copiedLink, setCopiedLink] = useState<string | null>(null);
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    const unlocked = sessionStorage.getItem("adminUnlocked") === "true";
    if (!unlocked) navigate("/", { replace: true });
  }, [navigate]);

  const fetchLinks = async () => {
    setLoading(true);
    setErr("");

    try {
      const res = await fetch(`${API_BASE}/admin/applications`, {
        method: "GET",
        headers: { Accept: "application/json" },
      });

      if (!res.ok) {
        setErr("목록을 불러오지 못했어요. (서버 응답 오류)");
        return;
      }

      const data = (await res.json()) as AdminApplicationsResponse;

      if (!data || !Array.isArray(data.applications)) {
        setErr("응답 형식이 예상과 달라요.");
        return;
      }

      setApplications(data.applications);
    } catch {
      setErr("네트워크 오류가 발생했어요. 연결을 확인해 주세요.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLinks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filtered = useMemo(() => {
    const keyword = q.trim().toLowerCase();
    if (!keyword) return applications;

    return applications.filter((a) => {
      const hay =
        `${a.applicationShareId} ${a.name ?? ""} ${a.link ?? ""}`.toLowerCase();
      return hay.includes(keyword);
    });
  }, [applications, q]);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedLink(text);
      window.setTimeout(() => setCopiedLink(null), 900);
    } catch {
      try {
        const ta = document.createElement("textarea");
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy");
        document.body.removeChild(ta);
        setCopiedLink(text);
        window.setTimeout(() => setCopiedLink(null), 900);
      } catch {
        alert("복사에 실패했어요. 브라우저 권한을 확인해 주세요.");
      }
    }
  };

  const handleCopyAll = () => {
    copyToClipboard(filtered.map((a) => a.link).join("\n"));
  };

  const handleLogout = () => {
    try {
      sessionStorage.removeItem("adminUnlocked");
    } catch {}
    navigate("/", { replace: true });
  };

  const handleDelete = async (id: number) => {
    const ok = window.confirm("해당 지원서 링크를 삭제할까요?");
    if (!ok) return;

    try {
      const res = await fetch(`${API_BASE}/admin/applications/${id}`, {
        method: "DELETE",
        headers: { Accept: "application/json" },
      });

      if (!res.ok) {
        alert("삭제에 실패했어요. (서버 오류)");
        return;
      }

      await fetchLinks();

      setToast("삭제되었습니다.");
      setTimeout(() => setToast(null), 1500);
    } catch {
      alert("네트워크 오류가 발생했어요.");
    }
  };

  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>운영자 · 지원서 링크 목록</h1>
          <p className={styles.sub}>
            GET <code>/admin/applications</code> 결과를 표시합니다.
          </p>
        </div>

        <div className={styles.headerActions}>
          <button
            className={styles.ghost}
            onClick={fetchLinks}
            disabled={loading}
          >
            {loading ? "불러오는 중..." : "새로고침"}
          </button>
          <button className={styles.ghost} onClick={handleLogout}>
            잠금 해제 종료
          </button>
        </div>
      </header>

      <section className={styles.toolbar}>
        <div className={styles.searchWrap}>
          <input
            className={styles.search}
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="검색 (id, 이름, 링크, 도메인, 경로 등)"
          />
          <div className={styles.count}>
            {filtered.length} / {applications.length}
          </div>
        </div>

        <div className={styles.toolbarActions}>
          <button
            className={styles.primary}
            onClick={handleCopyAll}
            disabled={!filtered.length}
          >
            전체 복사
          </button>
        </div>
      </section>

      {err && <div className={styles.errorBox}>{err}</div>}

      <main className={styles.list}>
        {loading ? (
          <div className={styles.state}>불러오는 중…</div>
        ) : filtered.length === 0 ? (
          <div className={styles.state}>표시할 링크가 없어요.</div>
        ) : (
          filtered.map((a, idx) => (
            <div
              key={a.applicationShareId ?? `${a.link}-${idx}`}
              className={styles.row}
            >
              <div className={styles.left}>
                <div className={styles.index}>{idx + 1}</div>

                <div className={styles.meta}>
                  <span className={styles.name}>{a.name}</span>
                  <span className={styles.id}>#{a.applicationShareId}</span>
                </div>

                <a
                  className={styles.url}
                  href={a.link}
                  target="_blank"
                  rel="noreferrer"
                >
                  {a.link}
                </a>

                {copiedLink === a.link && (
                  <span className={styles.badge}>복사됨</span>
                )}
              </div>

              <div className={styles.right}>
                <button
                  className={styles.small}
                  onClick={() => window.open(a.link, "_blank")}
                >
                  새 탭
                </button>
                <button
                  className={styles.small}
                  onClick={() => copyToClipboard(a.link)}
                >
                  복사
                </button>
                <button
                  className={styles.small}
                  onClick={() => handleDelete(a.applicationShareId)}
                >
                  삭제
                </button>
              </div>
            </div>
          ))
        )}
        {toast && <div className={styles.toast}>{toast}</div>}
      </main>
    </div>
  );
}
