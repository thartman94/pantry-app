import type { FC } from "react";
import { useDisclosure } from "@mantine/hooks";
import { Group, Button, Tooltip } from "@mantine/core";

import { IconPlus } from "@tabler/icons-react";
import Form from "./FoodItemForm";

const ControlBar: FC = () => {
  const [modalOpened, { open: openModal, close: closeModal }] =
    useDisclosure(false);
  return (
    <>
      <Form opened={modalOpened} close={() => closeModal()} />
      <Group>
        <Tooltip label="Add Item">
          <IconPlus onClick={() => openModal()} />
        </Tooltip>
      </Group>
    </>
  );
};

export default ControlBar;
