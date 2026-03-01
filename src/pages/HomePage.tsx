import { prepareProducts } from "../components/helpers";
import { Brands } from "../components/Home/Brands";
import { FeatureGrid } from "../components/Home/FeatureGrid";
import { ProductGrid } from "../components/Home/ProductGrid";
import { popularCelulares, recentCelulares } from "../data/initialData";

export const HomePage = () => {

  const preparedRecentProducts = prepareProducts(recentCelulares);
  const preparedPopularProducts = prepareProducts(popularCelulares);


  return (
    <div>
      <FeatureGrid />

      <ProductGrid title={"Nuevos Productos"} products={preparedRecentProducts} />
      <ProductGrid title={"Productos Destacados"} products={preparedPopularProducts} />

      <Brands />
    </div>
  );
};
