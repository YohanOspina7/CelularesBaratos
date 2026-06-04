import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema, type ProductFormValues } from "../../../lib/validators";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { SectionFormProduct } from "./SectionFormProduct";
import { useForm } from "react-hook-form";
import { InputForm } from "./InputForm";
import { FeaturesInput } from "./FeaturesInput";
import { useEffect } from "react";
import { generateSlug } from "../../helpers";
import { VariantsInput } from "./VariantsInput";
import { UpLoaderImages } from "./UpLoaderImages";
import { Editor } from "./Editor";

interface Props {
  titleForm: string;
}

export const FormProduct = ({ titleForm }: Props) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    control,
  } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
  });

  const navigate = useNavigate();

  const onSubmit = handleSubmit((data) => {
    console.log(data);
  });

  const watchName = watch("name");

  useEffect(() => {
    if (!watchName) return;

    const generatedSlug = generateSlug(watchName);
    setValue("slug", generatedSlug, { shouldTouch: true });
  }, [watchName, setValue]);

  return (
    <div className="relative flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            className="bg-white p-1.5 rounded-md shadow-sm border border-slate-200 transition-all group-hover:scale-105"
            onClick={() => navigate(-1)}
          >
            <IoIosArrowBack
              size={18}
              className="transition-all group-hover:scale-125"
            />
          </button>
          <h2 className="text-2xl font-bold tracking-tight capitalize">
            {titleForm}
          </h2>
        </div>
      </div>

      <form
        className="grid flex-1 grid-cols-1 gap-8 lg:grid-cols-3 auto-rows-max"
        onSubmit={onSubmit}
      >
        <SectionFormProduct
          titleSection="Detalles del Producto"
          className="lg:col-span-2 lg:row-span-2"
        >
          <InputForm
            type="text"
            placeholder="Ejemplo: iPhone 13 Pro Max"
            label="nombre"
            name="name"
            register={register}
            errors={errors}
            required
          />
          <FeaturesInput control={control} errors={errors} />
        </SectionFormProduct>

        <SectionFormProduct>
          <InputForm
            type="text"
            label="Slug"
            name="slug"
            placeholder="iphone-13-pro-max"
            register={register}
            errors={errors}
          />

          <InputForm
            type="text"
            label="Marca"
            name="brand"
            placeholder="Apple"
            register={register}
            errors={errors}
            required
          />
        </SectionFormProduct>

        <SectionFormProduct
          titleSection="Variantes del Producto"
          className="h-2 lg:col-span-2"
        >
          <VariantsInput
            control={control}
            errors={errors}
            register={register}
          />
        </SectionFormProduct>

        <SectionFormProduct titleSection="Imágenes del producto">
          <UpLoaderImages errors={errors} setValue={setValue} watch={watch} />
        </SectionFormProduct>

        <SectionFormProduct
          titleSection="Descripción del producto"
          className="col-span-full"
        >
          <Editor setValue={setValue} errors={errors} />
        </SectionFormProduct>

        <div className="absolute top-0 right-0 flex gap-3">
          <button
            className="btn-secondary-outline"
            type="button"
            onClick={() => navigate(-1)}
          >
            Cancelar
          </button>
          <button className="btn-primary" type="submit">
            Guardar Producto
          </button>
        </div>
      </form>
    </div>
  );
};
