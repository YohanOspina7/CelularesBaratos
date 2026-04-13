import { useEffect, useRef } from "react";
import { useGlobalStore } from "../../store/global.store";
import { Cart } from "./Cart";
import { Search } from "./Search";

export const Sheet = () => {
  const sheetRef = useRef<HTMLDivElement | null>(null);
  const sheetContent = useGlobalStore((state) => state.sheetContent);
  const closeSheet = useGlobalStore((state) => state.closeSheet);
  const isSheetOpen = useGlobalStore((state) => state.isSheetOpen);

  useEffect(() => {
    // Solo bloqueamos el scroll si el sheet está abierto
    if (isSheetOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Funcion para manejar clicks fuera del sheet
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        sheetRef.current &&
        !sheetRef.current.contains(event.target as Node)
      ) {
        closeSheet();
      }
    };

    // Agregar event Listener
    document.addEventListener("mousedown", handleOutsideClick);

    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.body.style.overflow = "unset";
    };
  }, [closeSheet, isSheetOpen]);

  // Funcion para saber el componente de renderizadar
  const renderContent = () => {
    switch (sheetContent) {
      case "cart":
        return <Cart />;
      case "search":
        return <Search />;
      default:
        return null;
    }
  };

  return (
    // CONTENEDOR PRINCIPAL: Controla la opacidad del fondo
    <div
      className={`fixed inset-0 z-50 flex justify-end transition-all duration-300 ease-in-out ${
        isSheetOpen ? "opacity-100 visible" : "opacity-0 invisible"
      }`}
    >
      {/* FONDO OSCURO: Le ponemos el onClick aquí para mayor seguridad */}
      <div className="absolute inset-0 bg-black/50" onClick={closeSheet} />

      {/* PANEL BLANCO: Se desliza hacia la derecha (translate-x-full) cuando se cierra */}
      <div
        ref={sheetRef}
        className={`relative h-screen text-black bg-white shadow-lg w-125 transition-transform duration-300 ease-in-out ${
          isSheetOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {renderContent()}
      </div>
    </div>
  );
};
