import React, { useCallback } from "react";
import { Button, Input } from "@nextui-org/react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { Trash2 } from "lucide-react";
import { debounce } from "lodash-es";

interface ItemFormProps {
  onItemsChange: (items: string[]) => void;
  onClear: () => void;
}

interface FormValues {
  items: { item: string }[];
}

const ItemForm = ({ onItemsChange, onClear }: ItemFormProps) => {
  const { control, handleSubmit, watch, reset } = useForm<FormValues>({
    defaultValues: {
      items: [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "items",
  });

  const watchItems = watch("items");

  const debouncedUpdateItems = useCallback(
    debounce((items: string[]) => {
      onItemsChange(items);
    }, 300),
    [onItemsChange]
  );

  const onSubmit = (data: any) => {
    const items = data.items
      .map((item: any) => item.item)
      .filter((item: string) => item !== "");
    onItemsChange(items);
  };

  const updateItems = () => {
    const items = watchItems
      .map((item: any) => item.item)
      .filter((item: string) => item !== "");
    debouncedUpdateItems(items);
  };

  const clearForm = () => {
    reset({ items: [] });
    onClear();
  };

  return (
    <div className="grid gap-2">
      <h2 className="text-2xl font-bold">Enter an item</h2>
      <p className="text-sm">
        This could be a name, pet, category or anything you like.
      </p>

      <form onSubmit={handleSubmit(onSubmit)}>
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
                            {...field}
                            onChange={(e) => {
                              field.onChange(e);
                              updateItems();
                            }}
                          />
                        )}
                        name={`items.${index}.item`}
                        control={control}
                      />
                      <Button
                        type="button"
                        color="danger"
                        onClick={() => {
                          remove(index);
                          updateItems();
                        }}
                      >
                        <Trash2 size={16} />
                      </Button>
                    </div>
                  </div>
                );
              })}
              <Button type="button" color="secondary" onClick={clearForm}>
                Clear
              </Button>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};
export default ItemForm;
