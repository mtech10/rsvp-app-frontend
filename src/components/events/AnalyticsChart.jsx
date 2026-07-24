import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { TrendingUp } from "lucide-react";

import { DashboardSection, DashboardEmptyState } from "../dashboard";

export default function AnalyticsChart({ data }) {
  if (!data?.length) {
    return (
      <DashboardEmptyState
        icon={TrendingUp}
        title="No RSVP Data"
        description="RSVP activity will appear here once guests begin registering."
      />
    );
  }

  const chartData = data.map((item) => ({
    date: new Date(item._id).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    }),
    rsvps: item.count,
  }));

  return (
    <DashboardSection
      title="RSVP Trend"
      description="Daily registrations over time."
      icon={TrendingUp}
    >
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" />

            <XAxis dataKey="date" />

            <YAxis allowDecimals={false} />

            <Tooltip />

            <Line
              type="monotone"
              dataKey="rsvps"
              stroke="#0f172a"
              strokeWidth={3}
              dot={{ r: 5 }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </DashboardSection>
  );
}
