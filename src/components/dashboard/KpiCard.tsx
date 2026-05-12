import { Paper, Text, Group, ThemeIcon, Tooltip, Stack } from '@mantine/core';
import { type ReactNode } from 'react';

interface KpiCardProps {
  title: string;
  value: number | string;
  icon: ReactNode;
  color: string;
  tooltip?: string;
  isCurrency?: boolean;
}

export function KpiCard({ title, value, icon, color, tooltip, isCurrency = true }: KpiCardProps) {
  const formatValue = (val: number | string) => {
    if (!isCurrency || typeof val !== 'number') return val;
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }).format(val);
  };

  const cardContent = (
    <Paper withBorder p="md" radius="sm" style={{ height: '100%', backgroundColor: '#fff' }}>
      <Group justify="space-between" align="center" wrap="nowrap">
        <Stack gap={4} style={{ flex: 1, overflow: 'hidden' }}>
          <Text size="xs" c="dimmed" fw={700} tt="uppercase" truncate="end" style={{ letterSpacing: '0.5px' }}>
            {title}
          </Text>
          <Text fw={700} size="lg" truncate="end" c="dark">
            {formatValue(value)}
          </Text>
        </Stack>
        <ThemeIcon color={color} variant="light" size={42} radius="md">
          {icon}
        </ThemeIcon>
      </Group>
    </Paper>
  );

  if (tooltip) {
    return (
      <Tooltip label={tooltip} position="bottom" withArrow>
        {cardContent}
      </Tooltip>
    );
  }

  return cardContent;
}

export default KpiCard;
