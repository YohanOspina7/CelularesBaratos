import { prepareProducts } from "../components/helpers";
import { Brands } from "../components/Home/Brands";
import { FeatureGrid } from "../components/Home/FeatureGrid";
import { ProductGrid } from "../components/Home/ProductGrid";
import { ProductGridSkeleton } from "../components/skeletons/ProductGridSkeleton";
import { useHomeProducts } from "../hooks";

export const HomePage = () => {
  const { recentProducts, popularProducts, isLoading } = useHomeProducts();

  const preparedRecentProducts = prepareProducts(recentProducts);
  const preparedPopularProducts = prepareProducts(popularProducts);

  return (
		<div>
			<FeatureGrid />

			{isLoading ? (
				<ProductGridSkeleton numberOfProducts={4} />
			) : (
				<ProductGrid
					title='Nuevos Productos'
					products={preparedRecentProducts}
				/>
			)}

			{isLoading ? (
				<ProductGridSkeleton numberOfProducts={4} />
			) : (
				<ProductGrid
					title='Productos Destacados'
					products={preparedPopularProducts}
				/>
			)}

			<Brands />
		</div>
	);
};