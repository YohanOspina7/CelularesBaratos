import { Separator } from "../shared/Separator";

const availableBrands = [
  "Samsung",
  "Apple",
  "Huawei",
  "Xiaomi",
  "Realme",
  "Honor",
];

interface Props {
  selectedBrands: string[];
  setSelectedBrands: (brands: string[]) => void;
}

export const ContainerFilter = ({
  selectedBrands,
  setSelectedBrands,
}: Props) => {
  const handleBrandChange = (brand: string) => {
    if (selectedBrands.includes(brand)) {
      setSelectedBrands(selectedBrands.filter((b) => b !== brand));
    } else {
      setSelectedBrands([...selectedBrands, brand]);
    }
  };

  return (
    <div className="col-span-2 p-5 border rounded-lg border-slate-200 h-fit lg:col-span-1">
      <h3 className="mb-4 text-xl font-semibold">Filtros</h3>

      {/* SEPARADOR */}
      <Separator />

      <div className="flex flex-col gap-3">
        <h3 className="text-lg font-medium text-black">Marcas</h3>

        <div className="flex flex-col gap-2">
          {availableBrands.map((brand) => (
            <label key={brand} className="inline-flex items-center ">
              <input
                type="checkbox"
                className="text-black border-black focus:ring-black accent-black"
                checked={selectedBrands.includes(brand)}
                onChange={() => handleBrandChange(brand)}
              />
              <span className="ml-2 text-sm text-black cursor-pointer">
                {brand}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};
