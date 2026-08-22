import { getDashboardStats } from "./posts/actions";

const CATEGORY_COLORS = ["#7c3aed", "#f59e0b", "#10b981", "#ec4899", "#0ea5e9", "#ef4444"];

const STATUS_COLORS = {
  published: "#059669", // sharp emerald
  drafts: "#d97706", // sharp amber
  scheduled: "#0284c7", // sharp sky
};
const CATEGORIES_COLOR = "#9333ea"; // sharp purple accent

const RING_SIZE = 220;
const RING_STROKE = 22;
const RING_RADIUS = (RING_SIZE - RING_STROKE) / 2;
const RING_CIRCUMFERENCE = 2 * Math.PI * RING_RADIUS;

// Build SVG stroke segments (offset + length) for a multi-color ring
function buildRingSegments(
  segments: { label: string; count: number; color: string }[],
  total: number
) {
  let cumulative = 0;
  return segments.map((seg) => {
    const fraction = total > 0 ? seg.count / total : 0;
    const length = fraction * RING_CIRCUMFERENCE;
    const gap = RING_CIRCUMFERENCE - length;
    const offset = -cumulative * RING_CIRCUMFERENCE;
    cumulative += fraction;
    return { ...seg, dashArray: `${length} ${gap}`, dashOffset: offset };
  });
}

export default async function AdminDashboardPage() {
  const stats = await getDashboardStats();

  const totalCategorized = stats.categoryBreakdown.reduce((sum, c) => sum + c.count, 0);
  const totalCategories = stats.categoryBreakdown.length;
  const maxCategoryCount = Math.max(...stats.categoryBreakdown.map((c) => c.count), 1);

  const statusSegments = [
    { label: "Published", count: stats.published, color: STATUS_COLORS.published },
    { label: "Drafts", count: stats.drafts, color: STATUS_COLORS.drafts },
    { label: "Scheduled", count: stats.scheduled, color: STATUS_COLORS.scheduled },
  ];

  const ringSegments = buildRingSegments(statusSegments, stats.totalPosts);

  return (
    <div className="px-8 py-8">
      <h1 className="text-2xl font-semibold text-text mb-8">Dashboard</h1>

      {/* Single fancy overview chart */}
      <div className="rounded-[20px] border border-border bg-gradient-to-br from-white to-[#f7f8fc] p-8 mb-10 shadow-sm">
        <h2 className="text-sm font-medium text-text mb-8">Content Overview</h2>

        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Ring */}
          <div className="relative flex-shrink-0" style={{ width: RING_SIZE, height: RING_SIZE }}>
            <svg
              width={RING_SIZE}
              height={RING_SIZE}
              className="-rotate-90"
              style={{ filter: "drop-shadow(0 4px 14px rgba(0,0,0,0.08))" }}
            >
              <circle
                cx={RING_SIZE / 2}
                cy={RING_SIZE / 2}
                r={RING_RADIUS}
                fill="none"
                stroke="#f1f1f4"
                strokeWidth={RING_STROKE}
              />
              {ringSegments.map((seg) => (
                <circle
                  key={seg.label}
                  cx={RING_SIZE / 2}
                  cy={RING_SIZE / 2}
                  r={RING_RADIUS}
                  fill="none"
                  stroke={seg.color}
                  strokeWidth={RING_STROKE}
                  strokeDasharray={seg.dashArray}
                  strokeDashoffset={seg.dashOffset}
                  strokeLinecap="round"
                />
              ))}
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <p className="text-4xl font-semibold text-text">{stats.totalPosts}</p>
                <p className="text-xs text-text-muted mt-1">Total Posts</p>
              </div>
            </div>
          </div>

          {/* Legend / stats — sharp solid color tiles */}
          <div className="flex-1 w-full grid grid-cols-2 gap-4">
            {statusSegments.map((seg) => (
              <div
                key={seg.label}
                className="rounded-[14px] p-4 flex items-center gap-3 shadow-sm"
                style={{ backgroundColor: seg.color }}
              >
                <div>
                  <p className="text-lg font-semibold text-white leading-none">{seg.count}</p>
                  <p className="text-xs text-white/85 mt-1">{seg.label}</p>
                </div>
              </div>
            ))}

            <div
              className="rounded-[14px] p-4 flex items-center gap-3 shadow-sm"
              style={{ backgroundColor: CATEGORIES_COLOR }}
            >
              <div>
                <p className="text-lg font-semibold text-white leading-none">{totalCategories}</p>
                <p className="text-xs text-white/85 mt-1">Categories</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Category breakdown — finance-style bar chart */}
      <div className="rounded-[16px] border border-border bg-white p-6">
        <h2 className="text-sm font-medium text-text mb-8">Posts by Category</h2>

        {stats.categoryBreakdown.length === 0 ? (
          <p className="text-sm text-text-muted">No categorized posts yet.</p>
        ) : (
          <div className="flex items-end gap-6 h-56 px-2">
            {stats.categoryBreakdown.map((cat, i) => {
              const heightPercent = (cat.count / maxCategoryCount) * 100;
              const color = CATEGORY_COLORS[i % CATEGORY_COLORS.length];
              return (
                <div key={cat.name} className="flex-1 flex flex-col items-center h-full">
                  <div className="flex-1 w-full flex items-end justify-center">
                    <div
                      className="w-full max-w-[52px] rounded-t-[8px] relative group transition-all"
                      style={{
                        height: `${heightPercent}%`,
                        backgroundColor: color,
                        minHeight: "4px",
                      }}
                    >
                      <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-semibold text-text whitespace-nowrap">
                        {cat.count}
                      </span>
                    </div>
                  </div>
                  <p className="text-xs text-text-muted mt-3 text-center truncate w-full">
                    {cat.name}
                  </p>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}