import { redirect } from "next/navigation";

export default function LegacyPatientDashboardRoute() {
  redirect("/Dashboard/patient");
}
