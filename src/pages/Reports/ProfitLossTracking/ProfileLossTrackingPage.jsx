import SectionHeader from "@/components/ui/section-header";
import TableHeader from "@/components/ui/table-header";
import { LuCalendarDays } from "react-icons/lu";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { format } from "date-fns";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@radix-ui/react-popover";

const data = [
  { name: "Profit", value: 24000 },
  { name: "Loss", value: 12000 },
];

const dataComparison = [
  { name: "Jan Profit", value: 4000 },
  { name: "Jan Loss", value: 2400 },
  { name: "Feb Profit", value: 3000 },
  { name: "Feb Loss", value: 1398 },
];

const COLORS = ["#82ca9d", "#ff6f61"];

const ProfitLossTrackingPage = () => {
  const [dateFrom, setDateFrom] = useState(null);
  const [dateTo, setDateTo] = useState(null);
  return (
    <div className="mb-8">
      {/* Page Header */}
      <div>
        <SectionHeader title={"Profit/Loss Tracking"} />
      </div>

      {/* Filters Section */}
      <div className="wrapper mb-8">
      <div className="xl:flex gap-5 mb-6">
          <div className="flex md:flex-row flex-col gap-6 flex-wrap">
            {/* Date From */}
            <Popover>
              <PopoverTrigger asChild>
                <button className="flex max-w-[350px] md:max-w-none items-center md:justify-normal justify-between space-x-5 border text-sm border-primary px-8 py-2 rounded-full text-gray-400 flex-shrink-0 w-full sm:w-auto">
                  <span>
                    {dateFrom ? (
                      <span className="text-gray-600">
                        {format(dateFrom, "PPP")}
                      </span>
                    ) : (
                      "Date From"
                    )}
                  </span>
                  <LuCalendarDays className="text-primary" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={dateFrom}
                  onSelect={setDateFrom}
                  initialFocus
                />
              </PopoverContent>
            </Popover>

            {/* Date To */}
            <Popover>
              <PopoverTrigger asChild>
                <button className="flex max-w-[350px]  items-center md:justify-normal justify-between space-x-5 border text-sm border-primary px-8 py-2 rounded-full text-gray-400 flex-shrink-0 w-full sm:w-auto">
                  <span>
                    {dateTo ? (
                      <span className="text-gray-600">
                        {format(dateTo, "PPP")}
                      </span>
                    ) : (
                      "Date To"
                    )}
                  </span>
                  <LuCalendarDays className="text-primary" />
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="single"
                  selected={dateTo}
                  onSelect={setDateTo}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Summary Table */}
        <div>
          <TableHeader
            title={"Profit/Loss Summary"}
            selectedWidth={"w-[200px]"}
          />
        </div>
        <div className="overflow-x-auto">
          <table className="table container min-w-full">
            <thead>
              <tr className="text-left text-gray-800 border-b">
                <th className="py-2">Date</th>
                <th>Total Profit</th>
                <th>Total Loss</th>
                <th>Net Balance</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b hover:bg-gray-100">
                <td className="py-4">16 August, 2024</td>
                <td className="text-green-600">50,000 TK</td>
                <td className="text-red-600">20,000 TK</td>
                <td className="text-blue-600">30,000 TK</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Graphical Summary */}
      <div className="wrapper">
        <div>
          <TableHeader
            title={"Graphical Summary"}
            selectedWidth={"w-[120px]"}
          />
        </div>

        {/* Pie Charts */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-8">
          {/* Pie Chart 1 */}
          <div className="h-80 pb-12">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <p className="text-center font-medium text-gray-600">
              Profit vs. Loss (Current Month)
            </p>
          </div>

          {/* Pie Chart 2 */}
          <div className="h-80 pb-12">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={dataComparison}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#82ca9d"
                  dataKey="value"
                  label
                >
                  {dataComparison.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <p className="text-center font-medium text-gray-600">
              Profit/Loss Breakdown (Jan & Feb)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfitLossTrackingPage;
