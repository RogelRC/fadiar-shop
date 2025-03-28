import Image from "next/image";

import AddToCart from "@/components/AddToCart";

async function getLocation() {
  try {
    const res = await fetch("http://ip-api.com/json/");
    const data = await res.json();
    console.log(data);

    return data.countryCode || "CU";
  } catch (error) {
    console.error("Error obteniendo la ubicación:", error);
    return "CU";
  }
}

async function getProduct(id: string) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/getProductForVisual`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id_product: parseInt(id),
          id_user_action: 0,
        }),
      },
    );
    const product = await response.json();

    return product;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to fetch product");
  }
}

export default async function ProductPage({
  params,
}: {
  params: { id: string };
}) {
  const product = await getProduct(params.id);

  const location = await getLocation();
  const currencies = await product.currencys.currencys;

  console.log(currencies);

  return (
    <div className="flex flex-col gap-y-4 sm:gap-y-8 sm:p-8 p-4 w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 sm:gap-8 gap-4">
        <div>
          <Image
            src={`${process.env.NEXT_PUBLIC_API_URL}/${product.product.image}`}
            alt={product.product.name}
            width={800}
            height={800}
            className="rounded-lg shadow-lg"
          />
          <span className="flex relative w-1/2 bg-[#022953] p-2 sm:px-6 text-nowrap text-white font-semibold justify-center sm:justify-end -mt-4">
            Marca {product.product.brand}
          </span>
        </div>
        <div className="block sm:hidden">
          <div className="flex flex-col w-full bg-[#eff6ff] text-[#022953] p-4 sm:p-10 gap-y-4 sm:gap-y-8 items-center sm:items-start">
            <span className="flex font-bold text-4xl justify-center sm:justify-start">
              {location === "CU" && product.product.prices[0][2] === "CUP" && (
                <>{product.product.prices[0][1]} CUP</>
              )}
              {location !== "CU" && product.product.prices[0][2] === "USD" && (
                <>{product.product.prices[0][1]} USD</>
              )}
              {location === "CU" && product.product.prices[0][2] === "USD" && (
                <>{product.product.prices[0][1] * currencies[1].value} CUP</>
              )}
              {location !== "CU" && product.product.prices[0][2] === "CUP" && (
                <>
                  {Math.ceil(
                    (product.product.product.prices[0][1] /
                      currencies[1].value) *
                      100,
                  ) / 100}{" "}
                  USD
                </>
              )}
            </span>
            <AddToCart />
          </div>
        </div>
        <div className="flex flex-col w-full self-start bg-[#022953] rounded-xl p-4 sm:p-10 text-white gap-y-2">
          <h1 className="text-3xl font-bold">{product.product.name}</h1>
          <h3 className="text-lg font-semibold">Propiedades:</h3>
          <span style={{ whiteSpace: "pre-line" }}>
            {product.product.description}
          </span>
        </div>
      </div>
      <div className="hidden sm:block">
        <div className="flex flex-col w-full bg-[#eff6ff] text-[#022953] p-4 sm:p-10 gap-y-4 sm:gap-y-8 items-center sm:items-start">
          <span className="flex font-bold text-4xl justify-center sm:justify-start">
            {location === "CU" && product.product.prices[0][2] === "CUP" && (
              <>{product.product.prices[0][1]} CUP</>
            )}
            {location !== "CU" && product.product.prices[0][2] === "USD" && (
              <>{product.product.prices[0][1]} USD</>
            )}
            {location === "CU" && product.product.prices[0][2] === "USD" && (
              <>{product.product.prices[0][1] * currencies[1].value} CUP</>
            )}
            {location !== "CU" && product.product.prices[0][2] === "CUP" && (
              <>
                {Math.ceil(
                  (product.product.product.prices[0][1] / currencies[1].value) *
                    100,
                ) / 100}{" "}
                USD
              </>
            )}
          </span>
          <AddToCart />
        </div>
      </div>
    </div>
  );
}
