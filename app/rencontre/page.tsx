import Image from "next/image";
import Index from "@/components/rencontre/index";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-between p-24">
      <Index />
    </main>
  );
}
