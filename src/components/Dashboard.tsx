import React from "react";
import {
  FileText,
  Users,
  CheckCircle,
  Clock,
  Award,
  ChevronRight,
  Search,
} from "lucide-react";
import { Link } from "react-router-dom";

const stats = [
  {
    icon: FileText,
    label: "Total Documents Uploaded",
    value: 245,
    progress: 65,
    color: "from-blue-500 to-indigo-600",
  },
  {
    icon: FileText,
    label: "Total Sub Parts Created",
    value: 789,
    progress: 85,
    color: "from-emerald-500 to-teal-600",
  },
  {
    icon: Users,
    label: "Total Documents Assigned",
    value: 156,
    progress: 45,
    color: "from-violet-500 to-purple-600",
  },
  {
    icon: CheckCircle,
    label: "Total Documents Contributed",
    value: 134,
    progress: 55,
    color: "from-rose-500 to-pink-600",
  },
  {
    icon: Clock,
    label: "Documents Under Contribution",
    value: 22,
    progress: 25,
    color: "from-amber-500 to-orange-600",
  },
  {
    icon: CheckCircle,
    label: "Total Documents Validated",
    value: 98,
    progress: 75,
    color: "from-cyan-500 to-blue-600",
  },
  {
    icon: Clock,
    label: "Documents Under Validation",
    value: 36,
    progress: 35,
    color: "from-fuchsia-500 to-pink-600",
  },
  {
    icon: Award,
    label: "Golden Documents Created",
    value: 45,
    progress: 95,
    color: "from-yellow-400 to-orange-500",
  },
];

const CircleProgress = ({
  progress,
  color,
}: {
  progress: number;
  color: string;
}) => {
  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (progress / 100) * circumference;

  return (
    <div className="relative w-14 h-14">
      <svg className="transform -rotate-90 w-14 h-14">
        <circle
          className="text-gray-100"
          strokeWidth="4"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="28"
          cy="28"
        />
        <circle
          className={`bg-gradient-to-r ${color} transition-all duration-1000 ease-in-out`}
          strokeWidth="4"
          strokeLinecap="round"
          stroke="currentColor"
          fill="transparent"
          r={radius}
          cx="28"
          cy="28"
          style={{
            strokeDasharray: circumference,
            strokeDashoffset,
          }}
        />
      </svg>
      <span className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-sm font-medium">
        {progress}%
      </span>
    </div>
  );
};

const pendingTasks = [
  { label: "Documents Pending for Assignment to Contributor", count: 12 },
  { label: "Documents Pending to be Assigned to Validator", count: 8 },
  { label: "Documents Pending to Assign to Subject Matter Expert", count: 5 },
];

const recentActivities = [
  {
    user: "Ajay Rajawat",
    action: "contributed to",
    document: "Sanskrit Grammar Vol 2",
    time: "3 mins ago",
  },
  {
    user: "Prernana Bhandari",
    action: "validated",
    document: "Hindi Literature Chapter 4",
    time: "7 mins ago",
  },
  {
    user: "Rahul Sharma",
    action: "uploaded",
    document: "Ancient Scripts Collection",
    time: "15 mins ago",
  },
];

const Dashboard = () => {
  return (
    <div className="flex-1 p-4 sm:p-6 lg:p-8 bg-gray-50">
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="relative bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl shadow-sm overflow-hidden group hover:shadow-md transition-all duration-300 hover:scale-[1.02]"
          >
            <div className="absolute right-0 top-0 w-32 h-32 -mr-8 -mt-8">
              <div
                className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-10 rounded-full transform rotate-45`}
              ></div>
            </div>
            <div className="relative">
              <div className="flex items-center justify-between mb-4">
                <div
                  className={`p-3 rounded-lg bg-gradient-to-br ${stat.color} bg-opacity-10`}
                >
                  <stat.icon
                    className={`w-6 h-6 bg-gradient-to-br ${stat.color} [&>path]:stroke-white`}
                  />
                </div>
                <CircleProgress progress={stat.progress} color={stat.color} />
              </div>
              <h3 className="text-sm text-gray-500 mb-1">{stat.label}</h3>
              <p className="text-2xl font-semibold text-gray-900">
                {stat.value}
              </p>
            </div>
          </div>
        ))}
      </div>

      <hr className="my-6 sm:my-8 border-gray-200" />

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-4 sm:gap-6">
        <div className="xl:col-span-3 space-y-4 sm:space-y-6">
          {pendingTasks.map((task, index) => (
            <div
              key={index}
              className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.01]"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    {task.label}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {task.count} documents waiting
                  </p>
                </div>
                <Link
                  to="/pending-documents"
                  className="w-full sm:w-auto px-4 py-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white rounded-lg hover:from-blue-600 hover:to-indigo-700 transition-all duration-300 flex items-center justify-center sm:justify-start gap-2 group shadow-sm hover:shadow"
                >
                  Assign
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-br from-white to-gray-50 p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.01]">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-gray-900">
              Recent Activities
            </h3>
            <button className="text-sm bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent hover:from-blue-600 hover:to-indigo-700 flex items-center gap-1 group font-medium">
              See all
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          <div className="space-y-4">
            {recentActivities.map((activity, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="relative">
                  <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-indigo-600" />
                  {index !== recentActivities.length - 1 && (
                    <div className="absolute top-2 left-1 w-[1px] h-[calc(100%+1rem)] bg-gradient-to-b from-blue-500/20 to-indigo-600/20" />
                  )}
                </div>
                <div>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium text-gray-900">
                      {activity.user}
                    </span>{" "}
                    {activity.action}{" "}
                    <span className="font-medium bg-gradient-to-r from-blue-500 to-indigo-600 bg-clip-text text-transparent hover:from-blue-600 hover:to-indigo-700 cursor-pointer">
                      {activity.document}
                    </span>
                  </p>
                  <p className="text-xs text-gray-500">{activity.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
