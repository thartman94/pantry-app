import { useEffect } from "react";
import { FoodItem } from "@/lib/types";
import {
  Modal,
  TextInput,
  Grid,
  Checkbox,
  Button,
  Group,
  NumberInput,
  Box,
} from "@mantine/core";
import { useForm } from "@mantine/form";

import { useSetFood } from "@/lib/hooks";

const Input = ({ ...rest }: any) => {
  const useNumbers = ["calories", "protein", "carbs", "fat"];
  const Comp = useNumbers.includes(rest.label) ? NumberInput : TextInput;
  return <Comp {...rest} className="w-1/2 px-2" />;
};

export default function FoodItemModal({
  close,
  opened,
  item,
}: {
  close: any;
  opened: boolean;
  item: FoodItem | null;
}) {
  const form = useForm({
    initialValues: {
      name: item?.name || "",
      brand: item?.brand || "",
      size: item?.size || "",
      calories: item?.calories || "",
      protein: item?.protein || "",
      carbs: item?.carbs || "",
      fat: item?.fat || "",
      serving_size: item?.serving_size || "",
    },
    validate: {
      name: (value) => value.trim().length > 0,
    },
  });

  useEffect(() => {
    form.setValues({
      name: item?.name || "",
      brand: item?.brand || "",
      size: item?.size || "",
      calories: item?.calories || "",
      protein: item?.protein || "",
      carbs: item?.carbs || "",
      fat: item?.fat || "",
      serving_size: item?.serving_size || "",
    });
  }, [item]);

  return (
    <Modal opened={opened} onClose={close} title="Update Item" centered>
      <form onSubmit={form.onSubmit((values) => console.log(values))}>
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
        <Group position="right" mt="lg">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Modal>
  );
}
