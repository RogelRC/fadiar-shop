import HeroSlider from "@/components/HeroSlider";
import CatPre from "@/components/CatPre";
import NewProducts from "@/components/NewProducts";

export default function Home() {
  return (
    <div>
      <div className="relative z-0">
        <HeroSlider />
      </div>
      <div className="relative z-10 -mt-4">
        {" "}
        {/* Ajusta el margen si quieres que suba sobre el slider */}
        <NewProducts />
      </div>
      <CatPre />
    </div>
  );
}
