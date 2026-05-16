import type { ReactNode } from "react";

interface Props {
  className?: string;
  titleSection?: string;
  children: ReactNode;
}

export const SectionFormProduct = ({
  className,
  titleSection,
  children,
}: Props) => {
  return (
    <div
      className={`flex flex-col gap-4 bg-white border-gray-300 rounded-md shadow-sm p-7 h-fit ${className}`}
    >
        {titleSection && (
            <h2 className="text-xl font-bold tracking-tight">
                {titleSection}
            </h2>
        )}
      {children}
    </div>
  );
};
