import { Table, Progress, Badge, Text, Paper, Stack, Box, Title } from '@mantine/core';

interface ProjectData {
  project: string;
  bu: string;
  allocated: number;
  utilized: number;
  balance: number;
  utilizationPercent: number;
  status: 'AT RISK' | 'ON TRACK' | 'CRITICAL';
}

const data: ProjectData[] = [
  { project: 'Bharat Net', bu: 'Telecom', allocated: 5.00, utilized: 4.50, balance: 0.50, utilizationPercent: 90.0, status: 'AT RISK' },
  { project: 'GAIL', bu: 'Gas Pipelines', allocated: 8.50, utilized: 6.00, balance: 2.50, utilizationPercent: 70.6, status: 'ON TRACK' },
  { project: 'BGCL', bu: 'Gas Pipelines', allocated: 4.20, utilized: 1.20, balance: 3.00, utilizationPercent: 28.6, status: 'ON TRACK' },
  { project: 'NFS', bu: 'Telecom', allocated: 12.00, utilized: 11.50, balance: 0.50, utilizationPercent: 95.8, status: 'CRITICAL' },
  { project: 'STP', bu: 'Sewerage', allocated: 3.50, utilized: 3.45, balance: 0.05, utilizationPercent: 98.6, status: 'CRITICAL' },
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'ON TRACK': return 'teal';
    case 'AT RISK': return 'orange';
    case 'CRITICAL': return 'red';
    default: return 'gray';
  }
};

const getProgressColor = (percent: number) => {
  if (percent > 95) return 'red';
  if (percent > 85) return 'orange';
  return 'teal';
};

export function ProjectBudgetTable() {
  const rows = data.map((item) => (
    <Table.Tr key={item.project} style={{ height: '60px' }}>
      <Table.Td>
        <Stack gap={0}>
          <Text fw={700} size="14px" c="#2C3E50">{item.project}</Text>
          <Text size="12px" c="#7F8C8D">{item.bu}</Text>
        </Stack>
      </Table.Td>
      <Table.Td>
        <Text fw={500} size="14px">₹ {item.allocated.toFixed(2)} Cr</Text>
      </Table.Td>
      <Table.Td>
        <Text fw={500} size="14px">₹ {item.utilized.toFixed(2)} Cr</Text>
      </Table.Td>
      <Table.Td>
        <Text fw={500} size="14px">₹ {item.balance.toFixed(2)} Cr</Text>
      </Table.Td>
      <Table.Td style={{ width: '200px' }}>
        <Stack gap={4}>
          <Text size="12px" fw={700} c={getProgressColor(item.utilizationPercent)}>
            {item.utilizationPercent.toFixed(1)}%
          </Text>
          <Progress 
            value={item.utilizationPercent} 
            color={getProgressColor(item.utilizationPercent)} 
            size="sm" 
            radius="xl"
          />
        </Stack>
      </Table.Td>
      <Table.Td>
        <Badge 
          variant="light" 
          color={getStatusColor(item.status)} 
          size="sm" 
          radius="sm"
          styles={{ label: { fontWeight: 800, fontSize: '10px' } }}
        >
          {item.status}
        </Badge>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <Paper withBorder radius={6} p="md" mt="md" style={{ borderColor: '#F0F0F0' }}>
      <Stack gap={9} mb="lg">
        <Title order={4} fw={700} size="16px" c="#34495E">
          Top Projects Budget Utilization
        </Title>
        <Text size="12px" c="#7F8C8D">
          Financial health and remaining balance per active project
        </Text>
      </Stack>

      <Box style={{ overflowX: 'auto' }}>
        <Table verticalSpacing="sm" highlightOnHover>
          <Table.Thead style={{ backgroundColor: '#F8F9FA' }}>
            <Table.Tr>
              <Table.Th style={{ color: '#596575', fontSize: '13px' }}>Project / BU</Table.Th>
              <Table.Th style={{ color: '#596575', fontSize: '13px' }}>Allocated Budget</Table.Th>
              <Table.Th style={{ color: '#596575', fontSize: '13px' }}>Utilized Expense</Table.Th>
              <Table.Th style={{ color: '#596575', fontSize: '13px' }}>Balance</Table.Th>
              <Table.Th style={{ color: '#596575', fontSize: '13px' }}>Utilization %</Table.Th>
              <Table.Th style={{ color: '#596575', fontSize: '13px' }}>Status</Table.Th>
            </Table.Tr>
          </Table.Thead>
          <Table.Tbody>{rows}</Table.Tbody>
        </Table>
      </Box>
    </Paper>
  );
}

