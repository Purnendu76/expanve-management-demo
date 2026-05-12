import {
  AppShell,
  NavLink,
  Group,
  Text,
  Stack,
  Image,
  Box,
  Divider,
} from "@mantine/core";
import { useLocation, useNavigate } from "react-router-dom";
import { appRoutesConfig } from "../routes/admin.routing";
import type { AppRoute } from "../utils/routes";
import logo from "../assets/logo.png";

export function AppSidebar() {
  const location = useLocation();
  const navigate = useNavigate();

  const renderNavItems = (routes: AppRoute[], parentPath = "") => {
    return routes.map((route) => {
      if (route.hidden) return null;

      const fullPath = [parentPath, route.path]
        .filter(Boolean)
        .join("/")
        .replace(/\/\/+/g, "/");
      const navPath = fullPath.startsWith("/") ? fullPath : `/${fullPath}`;

      // eslint-disable-next-line no-useless-assignment
      let isActive = false;
      if (route.path === "") {
        isActive = location.pathname === (parentPath || "/");
      } else {
        isActive = location.pathname.startsWith(navPath);
      }

      const isParent = route.children && route.children.length > 0;

      return (
        <NavLink
          key={route.label || navPath}
          label={
            <Text fw={isActive ? 700 : 500} size="sm">
              {route.label}
            </Text>
          }
          leftSection={route.icon}
          active={isActive}
          onClick={() => !isParent && navigate(navPath)}
          childrenOffset={28}
          defaultOpened={isActive}
          variant="filled"
          color="blue"
          style={{
            borderRadius: "12px",
            marginBottom: "4px",
            padding: "12px 16px",
            color: isActive ? "#fff" : "#546b8a",
          }}
        >
          {isParent &&
            route.children &&
            renderNavItems(route.children, navPath)}
        </NavLink>
      );
    });
  };

  return (
    <AppShell.Navbar p="md">
      <Box px="xs" py="md" mb="md">
        <Group align="center" gap="md">
          <Box style={{ width: 45, height: 45 }}>
            <Image src={logo} alt="Logo" fit="contain" />
          </Box>
          <Stack gap={0}>
            <Text fw={700} size="md" c="dark" style={{ lineHeight: 1.2 }}>
              Annu Projects Ltd.
            </Text>
            <Text size="xs" c="dimmed">
              v4.1.0
            </Text>
          </Stack>
        </Group>
      </Box>

      <Divider mb="xl" color="gray.1" />

      <Stack gap={4}>
        {appRoutesConfig.children &&
          renderNavItems(appRoutesConfig.children, appRoutesConfig.path)}
      </Stack>
    </AppShell.Navbar>
  );
}

export default AppSidebar;
