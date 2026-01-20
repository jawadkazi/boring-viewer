import BoringViewer from "@/components/BoringViewer";
import { getRoutes } from "@/lib/data";

export default async function Home() {
  const routes = await getRoutes();
  return <BoringViewer routes={routes} />;
}
