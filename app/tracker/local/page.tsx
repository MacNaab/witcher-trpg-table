import BottomNavigation from "@/components/tracker/bottomNavigation";
import MyHome from "@/components/tracker/local/index";

export default function Home() {
  return (
    <main className="flex flex-col pb-24 pt-1 px-8">
      <BottomNavigation active={3} />
      <MyHome />
    </main>
  );
}
