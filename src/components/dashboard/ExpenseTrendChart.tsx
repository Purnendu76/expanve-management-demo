import { Paper, Text, Group, Stack, Box } from "@mantine/core";
import { AreaChart } from "@mantine/charts";

const data = [
  { month: "Oct", "Invoiced Amount": 420, "Paid Amount": 380 },
  { month: "Nov", "Invoiced Amount": 480, "Paid Amount": 400 },
  { month: "Dec", "Invoiced Amount": 510, "Paid Amount": 450 },
  { month: "Jan", "Invoiced Amount": 400, "Paid Amount": 440 },
  { month: "Feb", "Invoiced Amount": 650, "Paid Amount": 520 },
  { month: "Mar", "Invoiced Amount": 720, "Paid Amount": 650 },
];

interface ChartTooltipPayload {
  name?: any;
  value?: any;
  color?: any;
  [key: string]: any;
}

interface ChartTooltipProps {
  active?: boolean;
  payload?: readonly ChartTooltipPayload[];
  label?: any;
}

export function ExpenseTrendChart() {
  return (
    <Paper
      withBorder
      radius={6}
      p="md"
      h={390}
      style={{ borderColor: "#F0F0F0" }}
    >
      {/* Header */}
      <Stack gap={9} mb={8}>
        <Text fw={700} size="16px" c="#34495E">
          6-Month Expense vs. Paid Trend
        </Text>

        <Text size="12px" c="#7F8C8D">
          Cash flow velocity (in Crores)
        </Text>
      </Stack>

      {/* Custom Legend */}
      <Group justify="center" gap={18} mb={10}>
        <Group gap={6}>
          <Box
            w={10}
            h={10}
            style={{
              borderRadius: "50%",
              background: "#FA5252",
            }}
          />

          <Text size="12px" fw={500} c="#FA5252">
            Invoiced Amount
          </Text>
        </Group>

        <Group gap={6}>
          <Box
            w={10}
            h={10}
            style={{
              borderRadius: "50%",
              background: "#40C057",
            }}
          />

          <Text size="12px" fw={500} c="#40C057">
            Paid Amount
          </Text>
        </Group>
      </Group>

      {/* Chart */}
      <AreaChart
        h={285}
        data={data}
        dataKey="month"
        withLegend={false}
        series={[
          {
            name: "Invoiced Amount",
            color: "#FA5252",
          },
          {
            name: "Paid Amount",
            color: "#40C057",
          },
        ]}
        curveType="monotone"
        withTooltip
        tooltipProps={{
          content: ({ active, payload, label }: ChartTooltipProps) => {
            if (active && payload && payload.length) {
              return (
                <Paper
                  withBorder
                  p="xs"
                  radius="md"
                  shadow="sm"
                  style={{
                    background: "#fff",
                    border: "1px solid #ECECEC",
                  }}
                >
                  <Text fw={700} size="xs" mb={4}>
                    {label}
                  </Text>

                  {payload.map((item: ChartTooltipPayload) => (
                    <Group key={item.name} gap={6}>
                      <Box
                        w={8}
                        h={8}
                        style={{
                          borderRadius: "50%",
                          background: item.color,
                        }}
                      />

                      <Text size="xs">
                        <span style={{ color: "#7F8C8D" }}>{item.name}:</span>

                        <span
                          style={{
                            fontWeight: 600,
                            marginLeft: 4,
                          }}
                        >
                          ₹{item.value}
                        </span>
                      </Text>
                    </Group>
                  ))}
                </Paper>
              );
            }

            return null;
          },
        }}
        tickLine="y"
        gridAxis="xy"
        withXAxis
        withYAxis
        yAxisProps={{
          width: 45,
          fontSize: 11,
          tickFormatter: (value) => `₹${value}`,
        }}
        xAxisProps={{
          fontSize: 11,
        }}
        strokeWidth={2.5}
        dotProps={{ r: 0 }}
        activeDotProps={{
          r: 5,
          strokeWidth: 2,
        }}
        fillOpacity={0.12}
        gridProps={{
          strokeDasharray: "3 3",
          vertical: false,
          stroke: "#E9ECEF",
        }}
        areaProps={{
          isAnimationActive: true,
        }}
      />
    </Paper>
  );
}
