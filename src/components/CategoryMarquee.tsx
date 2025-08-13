"use client";

import { FC } from "react";
import Marquee from "react-fast-marquee";

interface CategoryMarqueeProps {
  products: Array<{
    categoria?: {
      name: string;
    };
  }>;
  onCategorySelect: (category: string) => void;
}

const CategoryMarquee: FC<CategoryMarqueeProps> = ({ products, onCategorySelect }) => {
  // Get unique categories
  const uniqueCategories = products
    .map((product) => product.categoria?.name)
    .filter((cat, index, arr) => cat && arr.indexOf(cat) === index);

  return (
    <div className="w-full overflow-hidden bg-[#022953] py-2 relative">
      <Marquee
        speed={40}
        pauseOnHover={true}
        gradient={false}
        className="text-white font-semibold text-sm sm:text-base"
      >
        {uniqueCategories.map((cat, index) => (
          <span
            key={`${index}-${cat}`}
            className="inline-block mx-6 cursor-pointer hover:text-yellow-300 transition-colors"
            onClick={() => cat && onCategorySelect(cat)}
          >
            {cat}
          </span>
        ))}
      </Marquee>
    </div>
  );
};

export default CategoryMarquee;
