import { Suspense } from "react";
import { TermsContent } from "@/components/terms-content";

export default function TermsPage() {
  return (
    <Suspense
      fallback={
        <main className="min-h-dvh bg-[#0c0f0e] px-5 py-10 text-[#E8EEE9]" />
      }
    >
      <TermsContent />
    </Suspense>
  );
}
