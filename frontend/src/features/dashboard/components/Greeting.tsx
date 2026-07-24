import { Bell, CalendarDays } from "lucide-react";
import { formatCurrentDate } from "../utils/date";
import { getGreeting } from "../utils/greeting";

type GreetingProps = {
  name: string;
};



export default function Greeting({name} : GreetingProps) {
  return (
    <section className="flex items-center justify-between gap-4">
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 overflow-hidden rounded-full bg-slate-200">
          <div className="flex h-full w-full items-center justify-center bg-blue-100 text-sm font-bold text-blue-600">
            A
          </div>
        </div>
        <div>
          <div className="flex gap-1">
            <h1 className="text-lg font-bold tracking-tight text-slate-950 md:text-2xl">
              {getGreeting()}, {name}
            </h1>
          </div>
          <p className="text-sm font-medium text-slate-500">{formatCurrentDate()}</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-slate-600 shadow-sm ring-1 ring-slate-200"
          type="button"
          aria-label="Notifications"
        >
          <Bell size={18} />
        </button>
        <button
          className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-slate-600 shadow-sm ring-1 ring-slate-200"
          type="button"
          aria-label="Calendar"
        >
          <CalendarDays size={18} />
        </button>
      </div>
    </section>
  );
}
