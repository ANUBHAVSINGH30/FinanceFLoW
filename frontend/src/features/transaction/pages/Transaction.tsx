import { useState, useEffect, useCallback, useRef } from "react";
import SearchBar from "../components/SearchBar";
import FilterBar, {
  type DateRangePreset,
  type SortOption,
  getDateRange,
} from "../components/FilterBar";
import TransactionList from "../components/TransactionList";
import Pagination from "../components/Pagination";
import EmptyState from "../components/EmptyState";
import TransactionSkeleton from "../components/TransactionSkeleton";
import CreateTransactionModal from "../components/CreateTransactionModal";
import BottomNavigation from "../../dashboard/components/BottomNavigation";
import {
  getTransactions,
  type Transaction,
  type Pagination as PaginationType,
} from "../../../services/transaction";
import { useNavigate } from "react-router-dom";
import { useMediaQuery } from "../../../hooks/useMediaQuery";

const LIMIT = 10;

export default function Transactions() {
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 767px)");

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [activeType, setActiveType] = useState<"all" | "income" | "expense">(
    "all"
  );
  const [selectedCategory, setSelectedCategory] = useState("");
  const [dateRange, setDateRange] = useState<DateRangePreset>("");
  const [customStartDate, setCustomStartDate] = useState("");
  const [customEndDate, setCustomEndDate] = useState("");
  const [sort, setSort] = useState<SortOption>("newest");
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [pagination, setPagination] = useState<PaginationType>({
    page: 1,
    limit: LIMIT,
    total: 0,
    totalPages: 0,
  });
  const [showCreateModal, setShowCreateModal] = useState(false);

  const debounceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const requestIdRef = useRef(0);
  const previousIsMobileRef = useRef(isMobile);
  const scrollRef = useRef<HTMLDivElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }
    debounceTimer.current = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);
    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [search]);

  const getDateParams = useCallback(() => {
    if (dateRange === "custom") {
      if (customStartDate && customEndDate) {
        return {
          startDate: new Date(customStartDate).toISOString(),
          endDate: new Date(
            new Date(customEndDate).getFullYear(),
            new Date(customEndDate).getMonth(),
            new Date(customEndDate).getDate(),
            23, 59, 59
          ).toISOString(),
        };
      }
      return {};
    }
    if (dateRange) return getDateRange(dateRange);
    return {};
  }, [dateRange, customStartDate, customEndDate]);

  const getSortParams = useCallback(() => {
    if (sort === "oldest") {
      return { sortBy: "date" as const, orderBy: "asc" as const };
    }

    if (sort === "highest") {
      return { sortBy: "amount" as const, orderBy: "desc" as const };
    }

    if (sort === "lowest") {
      return { sortBy: "amount" as const, orderBy: "asc" as const };
    }

    return { sortBy: "date" as const, orderBy: "desc" as const };
  }, [sort]);

  const buildParams = useCallback(
    (page: number) => ({
      page,
      limit: LIMIT,
      search: debouncedSearch || undefined,
      type: activeType === "all" ? undefined : activeType,
      category: selectedCategory || undefined,
      ...getDateParams(),
      ...getSortParams(),
    }),
    [
      debouncedSearch,
      activeType,
      selectedCategory,
      getDateParams,
      getSortParams,
    ]
  );

  const fetchPage = useCallback(
    async (page: number, { append = false } = {}) => {
      const id = ++requestIdRef.current;
      if (append) setLoadingMore(true);
      else setLoading(true);
      try {
        const result = await getTransactions(buildParams(page));
        if (id !== requestIdRef.current) return;
        if (append) {
          setTransactions((prev) => [...prev, ...result.transactions]);
        } else {
          setTransactions(result.transactions);
        }
        setPagination(result.pagination);
      } catch (err) {
        if (id !== requestIdRef.current) return;
        console.error("Failed to fetch transactions:", err);
      } finally {
        if (id === requestIdRef.current) {
          if (append) setLoadingMore(false);
          else setLoading(false);
        }
      }
    },
    [buildParams]
  );

  useEffect(() => {
    fetchPage(1);
  }, [fetchPage]);

  useEffect(() => {
    const wasMobile = previousIsMobileRef.current;
    previousIsMobileRef.current = isMobile;

    if (wasMobile && !isMobile) {
      requestIdRef.current++;
      setTransactions([]);
      fetchPage(1);
    }
  }, [isMobile, fetchPage]);

  useEffect(() => {
    if (!isMobile || loading) return;
    const sentinel = sentinelRef.current;
    const scrollEl = scrollRef.current;
    if (!sentinel || !scrollEl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (
          entries[0].isIntersecting &&
          !loadingMore &&
          pagination.page < pagination.totalPages
        ) {
          const next = pagination.page + 1;
          fetchPage(next, { append: true });
        }
      },
      { root: scrollEl, rootMargin: "200px" }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [
    isMobile,
    loading,
    loadingMore,
    pagination.page,
    pagination.totalPages,
    fetchPage,
  ]);

  const resetAndFetch = () => {
    requestIdRef.current++;
    setTransactions([]);
    setLoading(true);
  };

  const handleTypeChange = (type: "all" | "income" | "expense") => {
    setActiveType(type);
    resetAndFetch();
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    resetAndFetch();
  };

  const handleDateRangeChange = (preset: DateRangePreset) => {
    setDateRange(preset);
    resetAndFetch();
  };

  const handleCustomDateChange = (start: string, end: string) => {
    setCustomStartDate(start);
    setCustomEndDate(end);
    resetAndFetch();
  };

  const handleSortChange = (nextSort: SortOption) => {
    setSort(nextSort);
    resetAndFetch();
  };

  const handleCreated = () => {
    resetAndFetch();
  };

  const handleDesktopPageChange = (page: number) => {
    requestIdRef.current++;
    fetchPage(page);
  };

  const hasTransactions = transactions.length > 0;

  return (
    <div className="flex min-h-screen flex-col bg-[#F7F7F7]">
      <div className="mx-auto w-full max-w-3xl px-4 pt-5">
        <div className="space-y-3">
          <SearchBar
            value={search}
            onChange={setSearch}
            onBack={() => navigate("/dashboard")}
          />
          <FilterBar
            activeType={activeType}
            onTypeChange={handleTypeChange}
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
            dateRange={dateRange}
            onDateRangeChange={handleDateRangeChange}
            customStartDate={customStartDate}
            customEndDate={customEndDate}
            onCustomDateChange={handleCustomDateChange}
            sort={sort}
            onSortChange={handleSortChange}
          />
        </div>
      </div>

      <div
        className={`mx-auto w-full max-w-3xl px-4 pt-4 ${
          isMobile ? "flex min-h-0 flex-1 flex-col pb-4" : "pb-5"
        }`}
      >
        {loading ? (
          <TransactionSkeleton />
        ) : hasTransactions ? (
          <div
            ref={scrollRef}
            className={
              isMobile
                ? "min-h-0 flex-1 overflow-y-auto pb-[calc(8rem+env(safe-area-inset-bottom))]"
                : "pb-1"
            }
          >
            <TransactionList transactions={transactions} />

            {isMobile && (
              <div ref={sentinelRef} className="py-4">
                {loadingMore && (
                  <div className="flex justify-center py-3">
                    <div className="h-5 w-5 animate-spin rounded-full border-2 border-slate-300 border-t-slate-600" />
                  </div>
                )}
                {!loadingMore && pagination.page >= pagination.totalPages && (
                  <p className="text-center text-xs text-slate-400">
                    No more transactions
                  </p>
                )}
              </div>
            )}
          </div>
        ) : (
          <EmptyState onAddTransaction={() => setShowCreateModal(true)} />
        )}
      </div>

      {!isMobile && hasTransactions && !loading && (
        <div className="mx-auto w-full max-w-3xl px-4 pb-5">
          <Pagination
            currentPage={pagination.page}
            totalPages={pagination.totalPages}
            onPrevious={() =>
              handleDesktopPageChange(Math.max(1, pagination.page - 1))
            }
            onNext={() =>
              handleDesktopPageChange(
                Math.min(pagination.totalPages, pagination.page + 1)
              )
            }
          />
        </div>
      )}

      <CreateTransactionModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
        onSuccess={handleCreated}
      />

      <BottomNavigation />
    </div>
  );
}
