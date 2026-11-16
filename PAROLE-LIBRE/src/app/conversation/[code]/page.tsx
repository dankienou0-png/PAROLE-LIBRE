import Conversation from "@/components/Conversation";
export default async function ConversationPage({ params }: { params: Promise<{ code: string }> }) {
  const { code } = await params;
  return <main className="simple-page"><Conversation code={code}/></main>;
}
