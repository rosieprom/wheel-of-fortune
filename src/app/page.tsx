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

  const clearWheel = () => {
    setWheelItems([]);
    setResetWheel(true);
  };

  return (
    <main className="container mx-auto">
      <div className="px-8 py-12 grid gap-2">
        <h1 className="text-5xl font-bold">Wheel of Fortune</h1>
        <p className="text-lg">Will you be lucky today?</p>
        <div className="flex gap-8">
          <div className="w-1/3 h-full">
            <ItemForm onItemsChange={handleItemsChange} onClear={clearWheel} />
          </div>
          <div className="flex-1 h-full justify-center align-middle content-center">
            <Wheel items={wheelItems} reset={resetWheel} />
          </div>
        </div>
      </div>
    </main>
  );
}
