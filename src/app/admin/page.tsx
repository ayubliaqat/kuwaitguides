import { getDashboardStats } from "./posts/actions";

const CATEGORY_COLORS = ["#7c3aed", "#f59e0b", "#10b981", "#ec4899", "#0ea5e9", "#ef4444"];

const STATUS_COLORS = {
  published: "#059669", // sharp emerald
  drafts: "#d97706", // sharp amber
  scheduled: "#0284c7", // sharp sky
};
const CATEGORIES_COLOR = "#9333ea"; // sharp purple accent

const DISC_SIZE = 220;

// Build conic-gradient stops for a solid pie disc using the same colors as the legend
function buildConicGradient(
  segments: { label: string; count: number; color: string }[],
  total: number
) {
  if (total === 0) return "#f1f1f4";

  let cumulative = 0;
  const stops: string[] = [];

  segments.forEach((seg) => {
    const fraction = seg.count / total;
    const start = cumulative * 360;
    cumulative += fraction;
    const end = cumulative * 360;
    if (fraction > 0) {
      stops.push(`${seg.color} ${start}deg ${end}deg`);
    }
  });

  return `conic-gradient(${stops.join(", ")})`;
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

  const discBackground = buildConicGradient(statusSegments, stats.totalPosts);

  return (
    <div className="px-8 py-8">
      <h1 className="text-2xl font-semibold text-text mb-8">Dashboard</h1>

      {/* Single fancy overview chart */}
      <div className="rounded-[20px] border border-border bg-gradient-to-br from-white to-[#f7f8fc] p-8 mb-10 shadow-sm">
        <h2 className="text-sm font-medium text-text mb-8">Content Overview</h2>

        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Solid pie disc */}
          <div className="relative flex-shrink-0" style={{ width: DISC_SIZE, height: DISC_SIZE }}>
            <div
              className="rounded-full"
              style={{
                width: DISC_SIZE,
                height: DISC_SIZE,
                background: discBackground,
                filter: "drop-shadow(0 4px 14px rgba(0,0,0,0.12))",
              }}
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center rounded-full bg-white/90 backdrop-blur-sm w-24 h-24 flex flex-col items-center justify-center shadow-sm">
                <p className="text-3xl font-semibold text-text">{stats.totalPosts}</p>
                <p className="text-[10px] text-text-muted mt-0.5">Total Posts</p>
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
          <div className="flex items-end justify-center gap-2 h-56 px-2">
            {stats.categoryBreakdown.map((cat, i) => {
              const heightPercent = (cat.count / maxCategoryCount) * 100;
              const color = CATEGORY_COLORS[i % CATEGORY_COLORS.length];
              return (
                <div key={cat.name} className="flex flex-col items-center h-full w-16">
                  <div className="flex-1 w-full flex items-end justify-center">
                    <div
                      className="w-full max-w-[40px] rounded-t-[8px] relative group transition-all"
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