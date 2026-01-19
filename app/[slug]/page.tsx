import BoringViewer from "@/components/BoringViewer";

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <BoringViewer slug={slug} />;
}
