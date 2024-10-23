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

  const [wheelItems, setWheelItems] = useState([]);

  const onSubmit = (data: any) => {
    setWheelItems(data.items.map((item: any) => item.item));
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
                  <div className="grid gap-2 w-full">
                    {fields.map((item, index) => {
                      return (
                        <div key={item.id} className="w-full">
                          <div className="flex items-center gap-3">
                            <Controller
                              render={({ field }) => (
                                <Input
                                  variant="flat"
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
                        </div>
                      );
                    })}
                    <Button
                      isDisabled={fields.length === 0 || !wheelItems}
                      type="submit"
                    >
                      Submit
                    </Button>
                  </div>
                )}
              </div>
            </form>
            {wheelItems.length > 0 && (
              <div className="grid grid-cols-4 gap-4">
                <h2 className="col-span-4 text-2xl font-bold text-center">
                  Wheel Items
                </h2>
                <div className="col-span-1">
                  <p className="text-sm text-center">Your Entries</p>
                  <ul>
                    {wheelItems.map((item, index) => (
                      <li key={index} className="text-center">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="col-span-3">
                  <Wheel items={wheelItems} />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
