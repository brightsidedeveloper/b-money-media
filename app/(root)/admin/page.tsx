import AdminPush from "@/components/forms/AdminPush"
import AwardClown from "./AwardClown"
import { Separator } from "@/components/ui/separator"

export default function page() {
  return (
    <div className="-mt-12 flex flex-col gap-4">
      <h1 className="text-heading2-semibold text-light-1">Admin Dashboard</h1>
      <Separator />
      <AwardClown />
      <Separator />
      <AdminPush />
    </div>
  )
}
