import BoringViewer from "@/components/BoringViewer";
import { getRoutes } from "@/lib/data";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const routes = await getRoutes();
  return <BoringViewer slug={slug} routes={routes} />;
}
