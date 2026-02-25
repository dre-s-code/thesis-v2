import { motion } from "motion/react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import { useLanguage } from "../contexts/LanguageContext";
import { translations } from "../i18n/translations";

const rmseData = [
  { name: "Mem 1", GFS: 26.43, ERA5: 22.31 },
  { name: "Mem 2", GFS: 29.83, ERA5: 31.49 },
  { name: "Mem 3", GFS: 28.11, ERA5: 31.56 },
  { name: "Mem 4", GFS: 24.82, ERA5: 28.82 },
  { name: "Mem 5", GFS: 22.72, ERA5: 24.09 },
  { name: "Mem 6", GFS: 23.28, ERA5: 20.8 },
  { name: "Mem 7", GFS: 25.21, ERA5: 24.32 },
  { name: "Mem 8", GFS: 28.15, ERA5: 20.58 },
  { name: "Mem 9", GFS: 23.43, ERA5: 21.23 },
  { name: "Mem 10", GFS: 27.54, ERA5: 25.86 },
];

const correlationData = [
  { name: "Mem 1", GFS: 0.31, ERA5: 0.52 },
  { name: "Mem 2", GFS: 0.2, ERA5: -0.05 },
  { name: "Mem 3", GFS: 0.23, ERA5: -0.09 },
  { name: "Mem 4", GFS: 0.22, ERA5: 0.04 },
  { name: "Mem 5", GFS: 0.34, ERA5: 0.12 },
  { name: "Mem 6", GFS: 0.3, ERA5: 0.45 },
  { name: "Mem 7", GFS: 0.08, ERA5: 0.16 },
  { name: "Mem 8", GFS: 0.09, ERA5: 0.5 },
  { name: "Mem 9", GFS: 0.56, ERA5: 0.43 },
  { name: "Mem 10", GFS: -0.04, ERA5: 0.06 },
];

export function Charts() {
  const { language } = useLanguage();
  const t = translations[language].charts;

  return (
    <section className="px-4 py-12 max-w-6xl mx-auto">
      <div className="mb-8">
        <h2 className="text-3xl font-bold tracking-tight mb-2">
          {t.title}
        </h2>
        <p className="text-foreground/60">
          {t.desc}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="p-6 rounded-3xl border border-border bg-card"
        >
          <h3 className="text-lg font-bold mb-6">
            {t.rmseTitle}
          </h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={rmseData}
                margin={{ top: 5, right: 5, left: -20, bottom: 5 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="var(--border)"
                  vertical={false}
                />
                <XAxis
                  dataKey="name"
                  tick={{ fill: "var(--foreground)", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <YAxis
                  tick={{ fill: "var(--foreground)", fontSize: 12 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--card)",
                    borderColor: "var(--border)",
                    borderRadius: "12px",
                    color: "var(--foreground)",
                  }}
                  itemStyle={{ color: "var(--foreground)" }}
                  cursor={{ fill: "var(--accent)" }}
                />
                <Legend wrapperStyle={{ paddingTop: "20px" }} />
                <Bar dataKey="GFS" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="ERA5" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-foreground/50 mt-4 text-center">
            {t.rmseDesc}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="p-6 rounded-3xl border border-border bg-card"
        >
          <h3 className="text-lg font-bold mb-6">{t.corrTitle}</h3>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart
                cx="50%"
                cy="50%"
                outerRadius="80%"
                data={correlationData}
              >
                <PolarGrid stroke="var(--border)" />
                <PolarAngleAxis
                  dataKey="name"
                  tick={{ fill: "var(--foreground)", fontSize: 12 }}
                />
                <PolarRadiusAxis
                  angle={30}
                  domain={[-0.2, 0.6]}
                  tick={{ fill: "var(--foreground)", fontSize: 10 }}
                />
                <Radar
                  name="GFS"
                  dataKey="GFS"
                  stroke="#3b82f6"
                  fill="#3b82f6"
                  fillOpacity={0.3}
                />
                <Radar
                  name="ERA5"
                  dataKey="ERA5"
                  stroke="#10b981"
                  fill="#10b981"
                  fillOpacity={0.3}
                />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "var(--card)",
                    borderColor: "var(--border)",
                    borderRadius: "12px",
                    color: "var(--foreground)",
                  }}
                />
                <Legend wrapperStyle={{ paddingTop: "20px" }} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
          <p className="text-xs text-foreground/50 mt-4 text-center">
            {t.corrDesc}
          </p>
        </motion.div>
      </div>
    </section>
  );
}
