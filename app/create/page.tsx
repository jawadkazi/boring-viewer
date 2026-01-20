import Header from "@/components/layout/Header";
import CreateProposalForm from "@/components/create/CreateProposalForm";

export default function CreatePage() {
  return (
    <main className="flex flex-col min-h-screen w-full bg-slate-100 font-sans">
      <Header />
      <div className="flex-1 overflow-y-auto pb-20">
        <CreateProposalForm />
      </div>
    </main>
  );
}
