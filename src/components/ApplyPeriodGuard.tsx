import { Navigate } from "react-router-dom";

const APPLY_OPEN_ISO = "2026-01-15T11:00:00+09:00";
const APPLY_CLOSE_ISO = "2026-01-26T00:00:00+09:00";

export default function ApplyPeriodGuard({
  children,
}: {
  children: React.ReactNode;
}) {
  const now = Date.now();
  const openAt = new Date(APPLY_OPEN_ISO).getTime();
  const closeAt = new Date(APPLY_CLOSE_ISO).getTime();

  const isWithinPeriod = now >= openAt && now < closeAt;

  if (!isWithinPeriod) {
    return <Navigate to="/apply" replace />;
  }

  return <>{children}</>;
}
