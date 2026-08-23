import { getDashboardStats } from "./posts/actions";

const CATEGORY_COLORS = ["#7c3aed", "#f59e0b", "#10b981", "#ec4899", "#0ea5e9", "#ef4444"];

const STATUS_COLORS = {
  published: "#059669", // sharp emerald
  drafts: "#d97706", // sharp amber
  scheduled: "#0284c7", // sharp sky
};

const DISC_SIZE = 220;
const CATEGORY_DISC_SIZE = 200;

// Build conic-gradient stops for a solid pie disc from proportional segments
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

  // TODO: verify getDashboardStats() in ./posts/actions.ts computes
  // `drafts` and `scheduled` from a real status check (not both falling
  // back to the same condition as `published`). Log stats server-side
  // to confirm the raw numbers coming out of the DB query.

  const totalCategorized = stats.categoryBreakdown.reduce((sum, c) => sum + c.count, 0);

  const statusSegments = [
    { label: "Published", count: stats.published, color: STATUS_COLORS.published },
    { label: "Drafts", count: stats.drafts, color: STATUS_COLORS.drafts },
    { label: "Scheduled", count: stats.scheduled, color: STATUS_COLORS.scheduled },
  ];

  const discBackground = buildConicGradient(statusSegments, stats.totalPosts);

  // Category segments, colored & sized proportionally to post count
  const categorySegments = stats.categoryBreakdown.map((cat, i) => ({
    label: cat.name,
    count: cat.count,
    color: CATEGORY_COLORS[i % CATEGORY_COLORS.length],
  }));
  const categoryDiscBackground = buildConicGradient(categorySegments, totalCategorized);

  // Split categories into left / right lists flanking the disc
  const midpoint = Math.ceil(categorySegments.length / 2);
  const leftCategories = categorySegments.slice(0, midpoint);
  const rightCategories = categorySegments.slice(midpoint);

  return (
    <div className="px-8 py-8">
      <h1 className="text-2xl font-semibold text-text mb-8">Dashboard</h1>

      {/* Single fancy overview chart */}
      <div className="rounded-[20px] border border-border bg-gradient-to-br from-white to-[#f7f8fc] p-8 mb-10 shadow-sm">
        <h2 className="text-sm font-medium text-text mb-8">Content Overview</h2>

        <div className="flex flex-col lg:flex-row items-center justify-center gap-12 max-w-2xl mx-auto">
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

          {/* Legend — column stack, status only (Categories tile removed) */}
          <div className="w-full lg:w-80 flex flex-col gap-4">
            {statusSegments.map((seg) => (
              <div
                key={seg.label}
                className="rounded-[14px] px-6 py-4 flex items-center justify-between shadow-sm"
                style={{ backgroundColor: seg.color }}
              >
                <p className="text-sm text-white/85">{seg.label}</p>
                <p className="text-xl font-semibold text-white leading-none">{seg.count}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Category breakdown — disc with side legends */}
      <div className="rounded-[16px] border border-border bg-white p-6">
        <h2 className="text-sm font-medium text-text mb-8">Posts by Category</h2>

        {categorySegments.length === 0 ? (
          <p className="text-sm text-text-muted">No categorized posts yet.</p>
        ) : (
          <div className="flex flex-col lg:flex-row items-center justify-center gap-10 max-w-3xl mx-auto">
            {/* Left legend */}
            <div className="flex flex-col gap-3 w-full lg:w-56">
              {leftCategories.map((cat) => (
                <div key={cat.label} className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: cat.color }}
                  />
                  <p className="text-xs text-text truncate flex-1">{cat.label}</p>
                  <p className="text-xs font-semibold text-text-muted">{cat.count}</p>
                </div>
              ))}
            </div>

            {/* Category pie disc */}
            <div
              className="relative flex-shrink-0"
              style={{ width: CATEGORY_DISC_SIZE, height: CATEGORY_DISC_SIZE }}
            >
              <div
                className="rounded-full"
                style={{
                  width: CATEGORY_DISC_SIZE,
                  height: CATEGORY_DISC_SIZE,
                  background: categoryDiscBackground,
                  filter: "drop-shadow(0 4px 14px rgba(0,0,0,0.12))",
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center rounded-full bg-white/90 backdrop-blur-sm w-20 h-20 flex flex-col items-center justify-center shadow-sm">
                  <p className="text-2xl font-semibold text-text">{categorySegments.length}</p>
                  <p className="text-[10px] text-text-muted mt-0.5">Categories</p>
                </div>
              </div>
            </div>

            {/* Right legend */}
            <div className="flex flex-col gap-3 w-full lg:w-56">
              {rightCategories.map((cat) => (
                <div key={cat.label} className="flex items-center gap-2">
                  <span
                    className="w-2.5 h-2.5 rounded-full flex-shrink-0"
                    style={{ backgroundColor: cat.color }}
                  />
                  <p className="text-xs text-text truncate flex-1">{cat.label}</p>
                  <p className="text-xs font-semibold text-text-muted">{cat.count}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}