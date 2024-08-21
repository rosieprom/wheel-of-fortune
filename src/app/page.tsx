"use client";
import { useState } from "react";
import { Button, Input } from "@nextui-org/react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import Wheel from "@/components/wheel";

export default function Home() {
  const { register, control, handleSubmit, reset, watch } = useForm({});

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  console.log({ fields });
  const [wheelItems, setWheelItems] = useState([]);
  const [prize, setPrize] = useState("");

  const onSubmit = (data: any) => {
    setWheelItems(data.items.map((item: any) => item.item));
  };

  const handleSpinEnd = (prize: any) => {
    setPrize(prize);
  };

  return (
    <main className="container mx-auto">
      <div className="px-8 py-12 grid gap-2">
        <h1 className="text-4xl font-bold">Wheel of Fortune</h1>
        <p className="text-lg">A wheel of fortune game</p>
        <div className="flex">
          <div className="w-full flex flex-col gap-4">
            <h2 className="text-2xl font-bold">Enter an item</h2>
            <p className="text-sm">
              This could be a name, pet, category or anything you like.
            </p>
            <form onSubmit={handleSubmit((data) => onSubmit(data))}>
              <div className="flex flex-col gap-4">
                <Button
                  type="button"
                  onClick={() => {
                    append({ item: "" });
                  }}
                >
                  Add an item
                </Button>
                {fields.length > 0 && (
                  <>
                    <ul>
                      {fields.map((item, index) => {
                        return (
                          <li key={item.id}>
                            <div className="flex items-center gap-3">
                              <Controller
                                render={({ field }) => (
                                  <Input
                                    variant="bordered"
                                    label="Item"
                                    type="item"
                                    {...(field as any)}
                                  />
                                )}
                                name={`items.${index}.item`}
                                control={control}
                              />
                              <Button
                                type="button"
                                color="danger"
                                onClick={() => remove(index)}
                              >
                                Remove Item
                              </Button>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                    <Button
                      isDisabled={fields.length === 0 || !wheelItems}
                      type="submit"
                    >
                      Submit
                    </Button>
                  </>
                )}
              </div>
            </form>
            {wheelItems.length > 0 && (
              <div className="flex flex-col gap-4">
                <h2 className="text-2xl font-bold">Wheel Items</h2>
                <ul>
                  {wheelItems.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
                <Wheel items={wheelItems} onSpinEnd={handleSpinEnd} />
                {prize && <p>Congratulations! You won: {prize}</p>}
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
