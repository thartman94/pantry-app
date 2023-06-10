"use client";
import { FoodItem } from "@/lib/types";
import { useState } from "react";
import {
  createStyles,
  Table,
  ScrollArea,
  UnstyledButton,
  Group,
  Text,
  Center,
  TextInput,
  rem,
} from "@mantine/core";
import {
  IconSelector,
  IconChevronDown,
  IconChevronUp,
  IconSearch,
} from "@tabler/icons-react";
import { useDisclosure } from "@mantine/hooks";
import FoodItemForm from "./FoodItemForm";
import { keys } from "@mantine/utils";
const useStyles = createStyles((theme) => ({
  th: {
    padding: "0 !important",
  },

  control: {
    width: "100%",
    padding: `${theme.spacing.xs} ${theme.spacing.md}`,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[6]
          : theme.colors.gray[0],
    },
  },

  icon: {
    width: rem(21),
    height: rem(21),
    borderRadius: rem(21),
  },
}));

interface ThProps {
  children: React.ReactNode;
  reversed: boolean;
  sorted: boolean;
  onSort(): void;
}

function Th({ children, reversed, sorted, onSort }: ThProps) {
  const { classes } = useStyles();
  const Icon = sorted
    ? reversed
      ? IconChevronUp
      : IconChevronDown
    : IconSelector;
  return (
    <th className={classes.th}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group position="apart">
          <Text fw={500} fz="sm" className="capitalize">
            {children}
          </Text>
          <Center className={classes.icon}>
            <Icon size="0.9rem" stroke={1.5} />
          </Center>
        </Group>
      </UnstyledButton>
    </th>
  );
}

function filterData(data: FoodItem[], search: string) {
  const query = search.toLowerCase().trim();
  return data.filter((item) =>
    Object.keys(data[0]).some((key) =>
      String(item[key]).toLowerCase().includes(query)
    )
  );
}

function sortData(
  data: FoodItem[],
  payload: { sortBy: keyof FoodItem | null; reversed: boolean; search: string }
) {
  const { sortBy, reversed, search } = payload;
  if (sortBy) {
    if (typeof data[0][sortBy] === "number") {
      data.sort((a, b) =>
        reversed
          ? Number(b[sortBy]) - Number(a[sortBy])
          : Number(a[sortBy]) - Number(b[sortBy])
      );
    } else {
      data.sort((a, b) =>
        reversed
          ? String(b[sortBy]).localeCompare(String(a[sortBy]))
          : String(a[sortBy]).localeCompare(String(b[sortBy]))
      );
    }
  }

  return filterData(data, search);
}

function header(text: string) {
  // convert camelcase to space spererated capitalized words
  return text.replace(/_/g, " ").replace(/([A-Z])/g, " $1");
}

export default function FoodList({ data }: { data: FoodItem[] }) {
  // const keys = Object.keys(data[0]) as (keyof FoodItem)[];
  const keys = [
    "id",
    "name",
    "brand",
    "size",
    "calories",
    "protein",
    "carbs",
    "fat",
    "serving_size",
    "exp_date",
  ] as (keyof FoodItem)[];
  const [search, setSearch] = useState("");
  const [sortedData, setSortedData] = useState(data);
  const [selectedItem, setSelectedItem] = useState<FoodItem | null>(null);
  const [sortBy, setSortBy] = useState<keyof FoodItem | null>(null);
  const [reverseSortDirection, setReverseSortDirection] =
    useState<boolean>(false);
  const [modalOpened, { open: openModal, close: closeModal }] =
    useDisclosure(false);

  const setSorting = (field: keyof FoodItem) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(
      sortData(data, {
        sortBy,
        reversed: reverseSortDirection,
        search,
      })
    );
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearch(value);

    setSortedData(
      sortData(data, { sortBy, reversed: reverseSortDirection, search: value })
    );
  };

  const openItem = (item: FoodItem) => {
    setSelectedItem(item);
    openModal();
  };

  const closeItem = () => {
    closeModal();
  };

  const rows = sortedData.map((item: FoodItem, i) => (
    <tr key={i} onClick={() => openItem(item)}>
      {keys.map((key: keyof FoodItem, j) => (
        <td key={j}>{String(item[key])}</td>
      ))}
    </tr>
  ));

  return (
    <>
      <FoodItemForm
        opened={modalOpened}
        close={closeItem}
        item={selectedItem}
      />
      <ScrollArea>
        <TextInput
          placeholder="Search by any field"
          mb="md"
          icon={<IconSearch size="0.9rem" stroke={1.5} />}
          value={search}
          onChange={handleSearchChange}
        />
        <Table
          horizontalSpacing="md"
          verticalSpacing="xs"
          miw="100%"
          sx={{ tableLayout: "fixed" }}
        >
          <thead>
            <tr>
              {keys.map((key, i) => (
                <Th
                  sorted={sortBy === key}
                  reversed={reverseSortDirection}
                  onSort={() => setSorting(key)}
                  key={i}
                >
                  {header(String(key))}
                </Th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sortedData?.length > 0 ? (
              rows
            ) : (
              <tr>
                <td colSpan={keys.length}>
                  <Text weight={500} align="center">
                    Nothing found
                  </Text>
                </td>
              </tr>
            )}
          </tbody>
        </Table>
      </ScrollArea>
    </>
  );
}
