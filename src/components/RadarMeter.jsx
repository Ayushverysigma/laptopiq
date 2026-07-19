import { RadarChart, PolarGrid, PolarAngleAxis, Radar, ResponsiveContainer } from "recharts";

export default function RadarMeter({ meters }) {
  if (!meters) return null;
  const data = [
    { k: "Perf", v: meters.performance }, { k: "Battery", v: meters.battery },
    { k: "Coding", v: meters.coding }, { k: "Gaming", v: meters.gaming },
    { k: "Editing", v: meters.editing }, { k: "Portable", v: meters.portability },
    { k: "Value", v: meters.value },
  ];

  return (
    <ResponsiveContainer width="100%" height={190}>
      <RadarChart data={data} outerRadius={68}>
        <PolarGrid stroke="var(--line)" />
        <PolarAngleAxis dataKey="k" tick={{ fill: "var(--muted)", fontSize: 10 }} />
        <Radar dataKey="v" stroke="var(--cobalt)" fill="var(--cobalt)" fillOpacity={0.28} strokeWidth={2} />
      </RadarChart>
    </ResponsiveContainer>
  );
}
