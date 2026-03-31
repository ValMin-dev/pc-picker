import { getBuildToEdit } from "@/lib/builds";
import { EditBuildForm } from "./components/EditBuildForm";

type Props = {
  params: Promise<{ buildId: string }>;
};

export default async function EditBuildPage({ params }: Props) {
  const { buildId } = await params;
  const build = await getBuildToEdit(buildId);

  if (!build) {
    return;
  }
  const buildComponents = build.components.map((bc) => ({
    id: bc.componentId,
    name: bc.component.name,
    type: bc.component.type,
    price: bc.component.price,
    socket: bc.component.socket,
  }));

  return (
    <div className="py-6">
      <EditBuildForm buildName={build.name} buildComponents={buildComponents} />
    </div>
  );
}
