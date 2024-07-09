import BottomNavigation from "@/components/tracker/bottomNavigation";
import Global from "@/components/tracker/db/global";
export default function Home() {
  return (
    <main className="flex flex-col pb-24 pt-1 px-8">
      <BottomNavigation active={2} />
      <div>
        <Global />
      </div>
    </main>
  );
}
