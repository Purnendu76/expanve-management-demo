import {
  Container,
  Paper,
  Grid,
  Group,

  Button,
  ActionIcon,
  Avatar,
  Title,
  ThemeIcon,
} from "@mantine/core";
import {
  IconLayoutDashboard,
  IconDownload,
  IconSettings,
  IconReceipt,
  IconChartBar,

  IconBuilding,
  IconBriefcase,
  IconWallet,
  IconPigMoney,
} from "@tabler/icons-react";
import { useState } from "react";
import {
  DashboardFilters,
  type FilterState,
} from "../components/dashboard/DashboardFilters";
import { KpiCard } from "../components/dashboard/KpiCard";
import { SubCategoryBreakdown } from "../components/dashboard/SubCategoryBreakdown";
import { ExpenseTrendChart } from "../components/dashboard/ExpenseTrendChart";
import { TopCategoriesChart } from "../components/dashboard/TopCategoriesChart";
import { ProjectBudgetTable } from "../components/dashboard/ProjectBudgetTable";


export default function Dashboard() {
  const [filters, setFilters] = useState<FilterState>({
    businessUnit: null,
    project: null,
    state: null,
    category: null,
    subcategory: null,
    status: null,
    dateRange: [null, null],
  });

  // Dummy data for filters
  const businessUnits = ["Telecom", "Gas Pipelines", "Sewerage", "Railways"];
  const projects = ["BGCL", "Bharat Net", "GAIL", "NFS", "NFS AMC", "STP"];
  const states = [
    "West Bengal",
    "Maharashtra",
    "Karnataka",
    "Tamil Nadu",
    "Gujarat",
    "Rajasthan",
    "Uttar Pradesh",
    "Kerala",
    "Punjab",
    "Assam",
  ];
  const categories = [
    "Office",
    "Tender",
    "Vehicle",
    "Guest House",
    "Plant & Machinery",
    "Material",
    "Services",
    "Warehouse",
    "Compliance",
    "Finance"
  ];
  const statuses = ["Pending", "Approved", "Rejected"];
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

  const subcategories = filters.category ? subcategoriesMap[filters.category] || [] : [];

  // KPI Data requested by user
  const kpiData = [
    {
      title: "Total Cost",
      value: 4500000.0,
      icon: <IconReceipt size={22} />,
      color: "blue",
      tooltip: "Total cost incurred",
    },
    {
      title: "Company Overall Expenses",
      value: 12500000.0,
      icon: <IconBuilding size={22} />,
      color: "indigo",
      tooltip: "Total company expenses",
    },
    {
      title: "Business Unit Expenses",
      value: 850000.0,
      icon: <IconBriefcase size={22} />,
      color: "cyan",
      tooltip: "Expenses for selected business unit",
    },
    {
      title: "Total Project Budget",
      value: 5000000.0,
      icon: <IconWallet size={22} />,
      color: "teal",
      tooltip: "Total allocated budget",
    },
    {
      title: "Utilized Budget",
      value: 3200000.0,
      icon: <IconChartBar size={22} />,
      color: "orange",
      tooltip: "Budget utilized so far",
    },
    {
      title: "Balance Budget",
      value: 1800000.0,
      icon: <IconPigMoney size={22} />,
      color: "green",
      tooltip: "Remaining balance",
    },
  ];

  return (
    <Container size="fluid" py="md">
      {/* Dashboard Header Bar */}
      <Paper withBorder p="xs" radius="md" mb="lg">
        <Group justify="space-between">
          <Group>
            <ThemeIcon variant="light" size={36} radius="md" color="blue">
              <IconLayoutDashboard size={20} />
            </ThemeIcon>
            <Title order={4} fw={700}>
              Dashboard
            </Title>
          </Group>

          <Group gap="sm">
            <Button
              variant="outline"
              size="xs"
              leftSection={<IconDownload size={14} />}
              radius="md"
            >
              Analysis Report
            </Button>
            <ActionIcon variant="subtle" color="gray" size="lg">
              <IconSettings size={20} />
            </ActionIcon>
            <Avatar
              src="https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-1.png"
              radius="xl"
              size={36}
            />
          </Group>
        </Group>
      </Paper>

      {/* Filters Section */}
      <Paper p="xs" radius="sm" withBorder mb="lg">
        <DashboardFilters
          filters={filters}
          onFilterChange={setFilters}
          businessUnits={businessUnits}
          projects={projects}
          states={states}
          categories={categories}
          subcategories={subcategories}
          statuses={statuses}
        />
      </Paper>

      {/* KPI Section */}
      <Grid gap={10} mt={10}>
        {kpiData.map((kpi, index) => (
          <Grid.Col key={index} span={{ base: 12, sm: 6, lg: 2 }}>
            <KpiCard
              title={kpi.title}
              value={kpi.value}
              icon={kpi.icon}
              color={kpi.color}
              tooltip={kpi.tooltip}
            />
          </Grid.Col>
        ))}
      </Grid>
      {/* Charts & Breakdown Section */}
      <Grid gap={5} mt="md">
        <Grid.Col span={{ base: 12, md: 3 }}>
          <SubCategoryBreakdown 
            category={filters.category} 
            subcategory={filters.subcategory} 
          />
        </Grid.Col>
        
        <Grid.Col span={{ base: 12, md: 6 }}>
          <ExpenseTrendChart />
        </Grid.Col>

        <Grid.Col span={{ base: 12, md: 3 }}>
          <TopCategoriesChart />
        </Grid.Col>
      </Grid>

      <ProjectBudgetTable />
    </Container>
  );
}
