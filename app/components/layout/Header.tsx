import type { FC } from "react";
import { Header, Group } from "@mantine/core";

import { useSite } from "@providers/siteContext";

interface NavigationProps {}

const Navigation: FC<NavigationProps> = () => {
  const { controlBar } = useSite();
  return (
    <Header height={60} p="xs">
      <Group sx={{ height: "100%" }} px={20} position="apart">
        <span>Logo</span>
        {controlBar}
      </Group>
    </Header>
  );
};

export default Navigation;
