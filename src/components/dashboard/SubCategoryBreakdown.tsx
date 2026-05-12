import { Paper, Text, Group, Stack, Badge, ThemeIcon, ScrollArea, Box } from '@mantine/core';
import { IconBuilding } from '@tabler/icons-react';

interface SubCategoryItem {
  subcategory: string;
  category: string;
  amount: number;
}

interface SubCategoryBreakdownProps {
  category: string | null;
  subcategory: string | null;
}

export function SubCategoryBreakdown({ category, subcategory }: SubCategoryBreakdownProps) {
  // Mock data for breakdown
  const subcategoriesMap: Record<string, string[]> = {
    Office: ["Rent", "Security Deposit", "Electricity Charges", "Maintenance", "Printing & Stationery", "Legal & Notary Charges", "Tour & Travel", "Admin", "Misc", "Staff Salary", "Banking Charges", "IT Assets"],
    Tender: ["EMD", "Cost of Tender Document", "CA Fees"],
    Vehicle: ["Vehicle EMI", "Vehicle Fuel", "Vehicle Diesel"],
    "Guest House": ["Rent", "Maintenance", "Care Taker Salary", "Guest House Admin Expense"],
    "Plant & Machinery": ["Equipment EMI", "Equipment- Diesel", "Equipment- Insurance", "Equipment- Maintenance", "Equipment- Spares", "Equipment- Transportation", "Equipment - Purchase", "Equipment - Downpayment"],
    Material: ["Supply", "Primary Transportation", "Secondary Transportation"],
    Services: ["Vendor Payment", "Right of Way Payment", "Labour Charges", "Site- Expenses"],
    Warehouse: ["Rent", "Security Deposit", "Electricity Charges", "Maintenance", "Printing & Stationery", "Establishment", "Security", "IT Assets", "Labour Charges _ Loading Unloading"],
    Compliance: ["Project Insurance", "Labour License", "Registration Expenses", "Consultancy Charges"],
    Finance: ["Finance Charges"]
  };

  const allData: SubCategoryItem[] = Object.entries(subcategoriesMap).flatMap(([cat, subs]) => 
    subs.map(sub => ({
      subcategory: sub,
      category: cat,
      amount: Math.floor(Math.random() * 100) + 10 // Mock random amount
    }))
  );

  const filteredData = allData.filter(item => {
    if (category && item.category !== category) return false;
    if (subcategory && item.subcategory !== subcategory) return false;
    return true;
  });

  const total = filteredData.reduce((acc, curr) => acc + curr.amount, 0);

  return (
    <Paper withBorder radius={6} p={0} h={395} display="flex" style={{ flexDirection: 'column', overflow: 'hidden', borderColor: '#F0F0F0' }}>
      <Box p="md" pb="xs">
        <Text fw={700} size="16px" style={{ color: '#34495E' }}>
          Sub-Categories Breakdown
        </Text>
      </Box>

      <ScrollArea flex={1} px="md" pb="md">
        <Stack gap={5}>
          {filteredData.map((item, index) => (
            <Paper key={index} p="8px 12px" radius={6} style={{ backgroundColor: '#EBF5FB' }}>
              <Group justify="space-between" wrap="nowrap" gap="xs">
                <Group wrap="nowrap" gap="xs">
                  <ThemeIcon variant="transparent" color="gray" size="sm">
                    <IconBuilding size={16} color="#7F8C8D" />
                  </ThemeIcon>
                  <Stack gap={0}>
                    <Text fw={600} size="14px" style={{ color: '#2C3E50', lineHeight: 1.2 }}>{item.subcategory}</Text>
                    <Text size="11px" color="dimmed" style={{ lineHeight: 1.1 }}>{item.category}</Text>
                  </Stack>
                </Group>
                <Badge 
                  variant="filled" 
                  radius="md"
                  px={10}
                  styles={{
                    root: { backgroundColor: '#FEF9E7', color: '#000', border: 'none', height: 24 },
                    label: { fontWeight: 700, fontSize: '12px', textTransform: 'none' }
                  }}
                >
                  ₹ {item.amount.toFixed(2)}
                </Badge>
              </Group>
            </Paper>
          ))}
        </Stack>
      </ScrollArea>

      <Paper p="sm" px="md" style={{ backgroundColor: '#F9FAFB', borderTop: '1px solid #F0F0F0' }}>
        <Group justify="space-between">
          <Text fw={700} size="16px" style={{ color: '#2C3E50' }}>Total</Text>
          <Text fw={700} size="16px" style={{ color: '#2C3E50' }}>₹ {total.toFixed(2)}</Text>
        </Group>
      </Paper>
    </Paper>
  );
}


