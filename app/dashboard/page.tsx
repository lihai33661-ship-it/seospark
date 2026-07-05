import { DashboardForm } from "./form";

export default function Dashboard({
  searchParams,
}: {
  searchParams: { keyword?: string; topic?: string };
}) {
  return <DashboardForm keyword={searchParams.keyword} topic={searchParams.topic} />;
}
