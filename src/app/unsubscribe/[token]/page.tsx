import UnsubscribeClient from "./UnsubscribeClient";

// ✅ Next.js 15 cere ca params să fie Promise
type UnsubscribePageProps = {
  params: Promise<{ token: string }>;
};

export default async function UnsubscribePage({ params }: UnsubscribePageProps) {
  const { token } = await params;
  return <UnsubscribeClient token={token} />;
}
