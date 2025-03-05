"use client";
import { useState } from "react";
import Wheel from "@/components/wheel";
import ItemForm from "@/components/items-form";

export default function Home() {
  const [wheelItems, setWheelItems] = useState<string[]>([]);
  const [resetWheel, setResetWheel] = useState<boolean>(false);

  const handleItemsChange = (items: string[]) => {
    setWheelItems(items);
  };

  function clearWheel() {
    setWheelItems([]);
    setResetWheel(true);
  };

  return (
    <main className="container mx-auto">
      <div className="flex flex-col gap-2 w-full h-full space-y-4 p-8">
        <div className="block md:hidden bg-red-300 border border-red-500 p-4 rounded-lg">
          <h2 className="text-xl font-semibold">
            For the best experience, use this on a desktop.
          </h2>
        </div>
        <h1 className="text-5xl font-bold">Wheel of Fortune</h1>
        <p className="text-lg">Will you be lucky today?</p>
        <div className="flex flex-col md:flex-row gap-4 w-full h-full">
          <div className="w-full md:w-1/3 h-full">
            <ItemForm onItemsChange={handleItemsChange} onClear={clearWheel} />
          </div>
          <div className="flex-1 w-full h-full justify-center align-middle content-center">
            <Wheel items={wheelItems} reset={resetWheel} />
          </div>
        </div>
      </div>
    </main>
  );
}
