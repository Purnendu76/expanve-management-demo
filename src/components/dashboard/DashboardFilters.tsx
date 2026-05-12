import { Group, Select, Button, ActionIcon, Tooltip, Menu } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { IconFilterOff, IconCalendar, IconChevronDown } from '@tabler/icons-react';
import { useState, useEffect } from 'react';
import dayjs from 'dayjs';

export interface FilterState {
  businessUnit: string | null;
  project: string | null;
  state: string | null;
  category: string | null;
  subcategory: string | null;
  status: string | null;
  dateRange: [Date | null, Date | null];
}

interface DashboardFiltersProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  businessUnits: string[];
  projects: string[];
  states: string[];
  categories: string[];
  subcategories: string[];
  statuses: string[];
}

export function DashboardFilters({
  filters,
  onFilterChange,
  businessUnits,
  projects,
  states,
  categories,
  subcategories,

}: DashboardFiltersProps) {
  const [localDateRange, setLocalDateRange] = useState<[Date | null, Date | null]>(filters.dateRange);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setLocalDateRange(filters.dateRange);
  }, [filters.dateRange]);

  const handleClearFilters = () => {
    onFilterChange({
      businessUnit: null,
      project: null,
      state: null,
      category: null,
      subcategory: null,
      status: null,
      dateRange: [null, null],
    });
    setLocalDateRange([null, null]);
  };

  const setFinancialYear = (yearOffset: number = 0) => {
    const now = dayjs();
    let startYear = now.month() < 3 ? now.year() - 1 : now.year();
    startYear += yearOffset;
    
    const start = dayjs(`${startYear}-04-01`).toDate();
    const end = dayjs(`${startYear + 1}-03-31`).toDate();
    
    const newRange: [Date, Date] = [start, end];
    setLocalDateRange(newRange);
    onFilterChange({ ...filters, dateRange: newRange });
  };

  const filterStyle = { flex: 1, minWidth: '150px' };

  return (
    <Group gap="xs" wrap="nowrap" align="center" justify="center">
      <Select
        placeholder="All Business Units"
        data={businessUnits}
        value={filters.businessUnit}
        onChange={(val) => onFilterChange({ ...filters, businessUnit: val })}
        searchable
        clearable
        style={filterStyle}
        size="sm"
      />

      <Select
        placeholder="All Projects"
        data={projects}
        value={filters.project}
        onChange={(val) => onFilterChange({ ...filters, project: val })}
        searchable
        clearable
        style={filterStyle}
        size="sm"
      />

      <Select
        placeholder="All States"
        data={states}
        value={filters.state}
        onChange={(val) => onFilterChange({ ...filters, state: val })}
        searchable
        clearable
        style={filterStyle}
        size="sm"
      />

      <Select
        placeholder="All Categories"
        data={categories}
        value={filters.category}
        onChange={(val) => onFilterChange({ ...filters, category: val, subcategory: null })}
        searchable
        clearable
        style={filterStyle}
        size="sm"
      />

      {filters.category && (
        <Select
          placeholder="All Subcategories"
          data={subcategories}
          value={filters.subcategory}
          onChange={(val) => onFilterChange({ ...filters, subcategory: val })}
          searchable
          clearable
          style={filterStyle}
          size="sm"
        />
      )}

      <Group gap={0} style={{ flex: 2, minWidth: '280px' }}>
        <DatePickerInput
          type="range"
          placeholder="Select Date Range or FY"
          value={localDateRange}
          onChange={(val: any) => {
            setLocalDateRange(val);
            if (val[0] && val[1]) {
              onFilterChange({ ...filters, dateRange: val });
            }
          }}
          leftSection={<IconCalendar size="1.1rem" stroke={1.5} />}
          clearable
          style={{ flex: 1 }}
          size="sm"
        />
        
        <Menu shadow="md" width={200} position="bottom-end">
          <Menu.Target>
            <ActionIcon variant="light" size="lg" h={36} w={36} radius="sm">
              <IconChevronDown size="1.1rem" />
            </ActionIcon>
          </Menu.Target>

          <Menu.Dropdown>
            <Menu.Label>Financial Year Presets</Menu.Label>
            <Menu.Item onClick={() => setFinancialYear(0)}>
              Current FY ({dayjs().month() < 3 ? dayjs().year() - 1 : dayjs().year()}-{dayjs().month() < 3 ? dayjs().year() : dayjs().year() + 1})
            </Menu.Item>
            <Menu.Item onClick={() => setFinancialYear(-1)}>
              Last FY ({dayjs().month() < 3 ? dayjs().year() - 2 : dayjs().year() - 1}-{dayjs().month() < 3 ? dayjs().year() - 1 : dayjs().year()})
            </Menu.Item>
          </Menu.Dropdown>
        </Menu>
      </Group>

      <Tooltip label="Clear All Filters">
        <Button
          variant="light"
          color="gray"
          onClick={handleClearFilters}
          leftSection={<IconFilterOff size="1.1rem" />}
          h={36}
          radius="sm"
        >
          Clear
        </Button>
      </Tooltip>
    </Group>
  );
}

export default DashboardFilters;
