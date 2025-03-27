import Link from "next/link";

interface Product {
  id: number;
  name: string;
  img: string;
}

async function loadProducts() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/inventory`,
    );
    const products = await response.json();
    return products.products;
  } catch (error) {
    console.error("Error loading products:", error);
    return [];
  }
}

export default async function Carousel() {
  const products: Product[] = await loadProducts();

  const getGridPosition = (index: number) => {
    switch (index % 5) {
      case 0: // 1A-2B (2x2)
        return "col-start-1 col-end-3 row-start-1 row-end-3";
      case 1: // 3A-4D (2x4)
        return "col-start-1 col-end-5 row-start-3 row-end-5";
      case 2: // 1C-2F (2x4)
        return "col-start-3 col-end-7 row-start-1 row-end-3";
      case 3: // 3E-4F (2x2)
        return "col-start-5 col-end-7 row-start-3 row-end-5";
      case 4: // 1G-4I (4x3)
        return "col-start-7 col-end-10 row-start-1 row-end-5";
      default:
        return "";
    }
  };

  return (
    <div className="overflow-x-auto pb-20">
      <div className="flex space-x-4 px-4">
        {products
          .reduce((chunks: Product[][], product, index) => {
            const chunkIndex = Math.floor(index / 5);
            if (!chunks[chunkIndex]) chunks[chunkIndex] = [];
            chunks[chunkIndex].push(product);
            return chunks;
          }, [])
          .map((chunk, index) => (
            <div
              key={index}
              className="grid grid-rows-4 grid-cols-9 h-[500px] w-[1200px] gap-4 shrink-0"
            >
              {chunk.map((product, idx) => (
                <Link
                  key={product.id}
                  href={`/products/${product.id}`}
                  className={`${getGridPosition(idx)} relative group bg-white rounded-xl shadow-lg overflow-hidden`}
                >
                  <img
                    src={`https://app.fadiar.com/api/${product.img}`}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </Link>
              ))}
            </div>
          ))}
      </div>
    </div>
  );
}
