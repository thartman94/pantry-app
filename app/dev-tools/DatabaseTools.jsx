"use client";
import { Group, Stack, Title, Button } from "@mantine/core";
import useDevDatabase from "@/lib/hooks/useDevDatabase";

const DatabaseTools = () => {
  const db = useDevDatabase();
  return (
    <Stack spacing="xl" className="w-full">
      <Title order={1}>Database Tools</Title>
      <Group position="start">
        <Button
          color="blue"
          variant="light"
          onClick={() => {
            db.deleteAllFood().then(db.seed());
          }}
        >
          Reset
        </Button>
        <Button color="blue" variant="light" onClick={() => db.seed()}>
          Seed
        </Button>
        <Button color="blue" variant="light" onClick={() => db.deleteAllFood()}>
          Delete All
        </Button>
      </Group>
    </Stack>
  );
};

export default DatabaseTools;
