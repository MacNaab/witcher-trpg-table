import BottomNavigation from "@/components/tracker/bottomNavigation";
import HomePage from "@/components/tracker/home";
export default function Home() {
  return (
    <main className="flex flex-col pb-24 pt-1 px-8">
      <BottomNavigation active={0} />
      <div>
        <HomePage />
      </div>
    </main>
  );
}
