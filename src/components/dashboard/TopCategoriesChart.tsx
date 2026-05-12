import { Paper, Text, Stack, Box } from '@mantine/core';
import {
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from 'recharts';

const data = [
  { category: 'Material', amount: 95, color: '#4C8BF5' },
  { category: 'Services', amount: 80, color: '#8E5AF1' },
  { category: 'Plant &\nMach.', amount: 60, color: '#E6499A' },
  { category: 'Office', amount: 32, color: '#F59F00' },
  { category: 'Vehicle', amount: 20, color: '#12B886' },
];

export function TopCategoriesChart() {
  return (
    <Paper
      withBorder
      radius={6}
      p="md"
      h={395}
      style={{ borderColor: '#F0F0F0' }}
    >
      {/* Header */}
      <Stack gap={9} mb="sm">
        <Text fw={700} size="16px" c="#34495E">
          Top Expense Categories
        </Text>

        <Text size="12px" c="#7F8C8D">
          Highest spending areas (in Crores)
        </Text>
      </Stack>

      {/* Chart */}
      <Box h={300}>
        <ResponsiveContainer width="100%" height="100%">
          <ReBarChart
            data={data}
            layout="vertical"
            margin={{
              top: 10,
              right: 20,
              left: 10,
              bottom: 0,
            }}
            barCategoryGap={26}
          >
            {/* Hidden X Axis */}
            <XAxis type="number" hide />

            {/* Y Labels */}
            <YAxis
              type="category"
              dataKey="category"
              axisLine={false}
              tickLine={false}
              width={90}
              tick={({ x, y, payload }) => {
                const lines = payload.value.split('\n');

                return (
                  <g transform={`translate(${x},${y})`}>
                    {lines.map((line: string, index: number) => (
                      <text
                        key={index}
                        x={0}
                        y={index * 14}
                        dy={4}
                        textAnchor="end"
                        fill="#34495E"
                        fontSize={12}
                        fontWeight={500}
                      >
                        {line}
                      </text>
                    ))}
                  </g>
                );
              }}
            />

            {/* Tooltip */}
            <Tooltip
              cursor={{ fill: 'rgba(0,0,0,0.03)' }}
              contentStyle={{
                borderRadius: '8px',
                border: '1px solid #ECECEC',
                boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                fontSize: '12px',
              }}
              formatter={(value: any) => [`₹${value} Cr`, 'Amount']}
            />

            {/* Bars */}
            <Bar
              dataKey="amount"
              radius={[0, 4, 4, 0]}
              barSize={18}
            >
              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={entry.color}
                />
              ))}
            </Bar>
          </ReBarChart>
        </ResponsiveContainer>
      </Box>
    </Paper>
  );
}