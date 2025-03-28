import ProductCard from "@/components/ProductCard";

interface Product {
  id: number;
  brand: string;
  name: string;
  model: string;
  description: string;
  img: string;
  prices: [number, number, string][];
  specs: [number, string, string][];
  count: number;
}

async function getLocation() {
  try {
    const res = await fetch("http://ip-api.com/json/");
    const data = await res.json();
    //console.log(data.countryCode);
    return data.countryCode || "CU";
  } catch (error) {
    console.error("Error obteniendo la ubicación:", error);
    return "CU";
  }
}

async function getProducts() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/inventory`,
    );
    const products = await response.json();
    return products;
  } catch (error) {
    throw new Error("Failed to fetch products");
  }
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: { name: string };
}) {
  const products = await getProducts();
  const location = (await getLocation()) || "CU";

  const currencies = await products.currencys.currencys;
  const { name } = await searchParams;

  //console.log(currencies);
  //console.log(location);

  const searchName = name || "";

  const filteredProducts = searchName
    ? products.products.filter((product: Product) =>
        product.name.toLowerCase().includes(searchName),
      )
    : products.products;

  return (
    <div className="flex flex-col w-full py-6 px-4 sm:px-8 space-y-6">
      <h1 className="font-bold text-3xl text-[#022953]">
        Catálogo de productos
      </h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts
          .sort(
            (a: Product, b: Product) =>
              (b.count > 0 ? 1 : -1) - (a.count > 0 ? 1 : -1),
          )
          .map((product: Product) => (
            <ProductCard
              key={product.id}
              product={product}
              location={location}
              currencies={currencies}
            />
          ))}
      </div>
    </div>
  );
}
