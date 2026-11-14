import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

type Props = {
  label: string;
  value: string | number;
};

export default function StatCard({ label, value }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardDescription>{label}</CardDescription>
        <CardTitle className="text-3xl">{value}</CardTitle>
      </CardHeader>
    </Card>
  );
}
