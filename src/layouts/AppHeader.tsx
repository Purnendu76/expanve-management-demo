import { AppShell, Burger, Group, Title, TextInput, ActionIcon, Indicator, Text } from '@mantine/core';
import { IconSearch, IconBell, IconWallet, IconCommand } from '@tabler/icons-react';

interface AppHeaderProps {
  opened: boolean;
  toggle: () => void;
}

export function AppHeader({ opened, toggle }: AppHeaderProps) {
  return (
    <AppShell.Header style={{ borderBottom: '1px solid #eee' }}>
      <Group h="100%" px="md" justify="space-between">
        <Group>
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="sm" />
          <Group gap="xs">
            <ActionIcon variant="filled" color="blue" size="lg" radius="md">
              <IconWallet size={20} />
            </ActionIcon>
            <Title order={3} fw={800} style={{ letterSpacing: '-0.5px' }}>
              Expense<span style={{ color: '#228be6' }}>Hub</span>
            </Title>
          </Group>
        </Group>

        <Group gap="xl" visibleFrom="md">
          <TextInput
            placeholder="Search transactions..."
            leftSection={<IconSearch size={16} stroke={1.5} />}
            rightSection={
              <Group gap={4} pr={8}>
                <Text size="xs" c="dimmed" fw={700}>
                  <IconCommand size={12} style={{ verticalAlign: 'middle' }} />
                </Text>
                <Text size="xs" c="dimmed" fw={700}>K</Text>
              </Group>
            }
            radius="md"
            style={{ width: 400 }}
            variant="filled"
          />
        </Group>

        <Group gap="md">
          <Indicator color="red" size={8} offset={4} withBorder processing>
            <ActionIcon variant="subtle" color="gray" size="lg" radius="md">
              <IconBell size={22} stroke={1.5} />
            </ActionIcon>
          </Indicator>
        </Group>
      </Group>
    </AppShell.Header>
  );
}

export default AppHeader;
