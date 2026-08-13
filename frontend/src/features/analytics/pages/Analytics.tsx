import { useState, useEffect } from "react";
import {
  getAnalyticsSummary,
  getAnalyticsCategoryBreakdown,
  getAnalyticsMonthlyTrend,
  type AnalyticsSummary,
  type CategoryBreakdown,
  type MonthlyTrend,
} from "../../../services/analytics";
import AnalyticsHeader from "../components/AnalyticsHeader";
import SummaryCards from "../components/SummaryCards";
import SpendingByCategoryChart from "../components/SpendingByCategoryChart";
import IncomeExpenseTrendChart from "../components/IncomeExpenseTrendChart";
import TopCategoriesList from "../components/TopCategoriesList";
import DailyAverageInsight from "../components/DailyAverageInsight";
import AnalyticsSkeleton from "../components/AnalyticsSkeleton";
import BottomNavigation from "../../dashboard/components/BottomNavigation";

export default function Analytics() {
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [loading, setLoading] = useState(true);

  const [summary, setSummary] = useState<AnalyticsSummary | null>(null);
  const [categories, setCategories] = useState<CategoryBreakdown[]>([]);
  const [monthlyTrend, setMonthlyTrend] = useState<MonthlyTrend[]>([]);

  const daysInMonth = new Date(selectedYear, selectedMonth, 0).getDate();
  const dailyAverage = daysInMonth > 0 && summary ? summary.totalExpense / daysInMonth : 0;
  const topCategory = categories.length > 0 ? categories[0] : null;

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const [summaryData, categoryData, trendData] = await Promise.all([
          getAnalyticsSummary({ month: selectedMonth, year: selectedYear }),
          getAnalyticsCategoryBreakdown({ month: selectedMonth, year: selectedYear }),
          getAnalyticsMonthlyTrend(selectedYear),
        ]);
        setSummary(summaryData);
        setCategories(categoryData);
        setMonthlyTrend(trendData);
      } catch (error) {
        console.error("Failed to fetch analytics data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedMonth, selectedYear]);

  if (loading) {
    return (
      <div className="min-h-screen bg-white text-slate-950">
        <AnalyticsSkeleton />
        <BottomNavigation />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F7F7F7] pb-24">
      <div className="bg-white border-b border-[#E5E5E5]">
        <AnalyticsHeader
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
          onMonthChange={setSelectedMonth}
          onYearChange={setSelectedYear}
        />
      </div>

      <div className="space-y-6 pt-6 pb-6">
        <SummaryCards
          summary={summary ?? { totalIncome: 0, totalExpense: 0, balance: 0, transactionCount: 0 }}
          dailyAverage={dailyAverage}
        />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-2">
            <SpendingByCategoryChart categories={categories} />
            <IncomeExpenseTrendChart monthlyTrend={monthlyTrend} selectedYear={selectedYear} />
          </div>
        </div>

        <TopCategoriesList categories={categories} />

        <DailyAverageInsight
          dailyAverage={dailyAverage}
          totalExpense={summary?.totalExpense ?? 0}
          daysInMonth={daysInMonth}
          topCategory={topCategory ? { category: topCategory.category, amount: topCategory.amount } : null}
        />
      </div>

      <BottomNavigation />
    </div>
  );
}