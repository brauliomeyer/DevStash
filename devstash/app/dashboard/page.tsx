import { TopBar } from "@/components/dashboard/top-bar";
import { Sidebar } from "@/components/dashboard/sidebar";
import { MainArea } from "@/components/dashboard/main-area";

export default function DashboardPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <TopBar />
      <div className="flex flex-1">
        <Sidebar />
        <MainArea />
      </div>
    </div>
  );
}
