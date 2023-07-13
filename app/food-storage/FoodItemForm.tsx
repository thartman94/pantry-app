import type { FC } from "react";
import { useMemo, useEffect } from "react";
import {
  Modal,
  TextInput,
  Grid,
  Button,
  Group,
  NumberInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { FoodItem } from "@/lib/types";
import useDatabase from "@/lib/hooks/useDatabase";

const Input = ({ ...rest }: any) => {
  const useNumbers = [
    "size",
    "calories",
    "protein",
    "carbs",
    "fat",
    "serving_size",
  ];
  const Comp = useNumbers.includes(rest.label) ? NumberInput : TextInput;
  return <Comp {...rest} className="w-1/2 px-2" />;
};

const fields = [
  { key: "name", type: "text" },
  { key: "brand", type: "text" },
  { key: "size", type: "number" },
  { key: "calories", type: "number" },
  { key: "protein", type: "number" },
  { key: "carbs", type: "number" },
  { key: "fat", type: "number" },
  { key: "serving_size", type: "number" },
  { key: "exp_date", type: "date" },
];

interface FoodItemFormProps {
  close: any;
  opened: boolean;
  item?: FoodItem;
}

const FoodItemModal: FC<FoodItemFormProps> = ({ close, opened, item }) => {
  const db = useDatabase();
  const vals = useMemo(
    () =>
      fields.reduce((acc, { key, type }) => {
        acc[key] =
          item?.[key as keyof FoodItem] || (type === "number" ? 0 : "");
        return acc;
      }, {} as FoodItem),
    [item]
  );

  const form = useForm({
    initialValues: vals,
    validate: {},
  });

  const handleDelete = (id?: string) => {
    if (id) {
      db.delete(id);
    }
    close();
  };

  useEffect(() => {
    form.setValues(vals);
  }, [vals]);

  return (
    <Modal opened={opened} onClose={close} title="Update Item" centered>
      <form
        onSubmit={form.onSubmit(async (values) => {
          await db.set(values, item?.id);
          close();
        })}
      >
        <Grid gutter={5} justify="space-around">
          {Object.keys(form.values).map((key, i) => (
            <Input
              key={i}
              label={key}
              required
              {...form.getInputProps(key as string)}
            />
          ))}
        </Grid>
        <Group position="apart" mt="lg">
          <Button onClick={() => handleDelete(item?.id)} color="red">
            {!!item ? "Delete" : "Cancel"}
          </Button>
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Modal>
  );
};

export default FoodItemModal;
