import { ClientColumn, ClientJobApplication } from "@/lib/models/models.types";

interface JobApplicationCardProps {
  job: ClientJobApplication;
  columns: ClientColumn[];
}

export default function JobApplicationCard({
  job,
  columns,
}: JobApplicationCardProps) {
  return <div>JobApplicationCard</div>;
}
