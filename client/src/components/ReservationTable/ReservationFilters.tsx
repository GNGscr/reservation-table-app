import {
    TextField,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Stack,
    InputAdornment,
    IconButton,
  } from '@mui/material';
  import ClearIcon from '@mui/icons-material/Clear';
  import type { SortByType, SortOrderType, LimitType } from '../../types/ReservationTypes';
  
  interface Props {
    filterTerm: string;
    setFilterTerm: (f: string) => void;
    sortBy: SortByType;
    setSortBy: (s: SortByType) => void;
    sortOrder: SortOrderType;
    setSortOrder: (o: SortOrderType) => void;
    limit: LimitType;
    setLimit: (l: LimitType) => void;
    setPage: (p: number) => void;
  };

  const limitSizes = [10, 20, 50];
  const menuItems = [
    { id: 0, val: "", label: "All Products" },
    { id: 1, val: "reservation_uuid", label: "Reservation UUID" },
    { id: 2, val: "number_of_active_purchases", label: "# Purchases" },
    { id: 3, val: "sum_of_active_charges", label: "Sum of Charges" }
  ];
  
  const ReservationFilters = ({
    filterTerm,
    setFilterTerm,
    sortBy,
    setSortBy,
    sortOrder,
    setSortOrder,
    limit,
    setLimit,
    setPage,
  }: Props) => {
    return (
      <Stack direction="row" spacing={3} sx={{ mb: 2 }}>
        <TextField
          label="Search Products"
          variant="outlined"
          size="small"
          value={filterTerm}
          onChange={(e) => {
            setPage(1);
            setFilterTerm(e.target.value);
          }}
          sx={{ minWidth: 300 }}
          slotProps={{
            input: {
              endAdornment: filterTerm && (
                <InputAdornment position="end">
                  <IconButton size="small" onClick={() => setFilterTerm("")}>
                    <ClearIcon fontSize="small" />
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />

        <FormControl size="small" sx={{ minWidth: 200 }}>
          <InputLabel>Sort By</InputLabel>
          <Select
            value={sortBy}
            label="Sort By"
            onChange={(e) => setSortBy(e.target.value as SortByType)}>
            {menuItems.map(({id, val, label}) => <MenuItem key={id} value={val}>{label}</MenuItem>)}
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Order</InputLabel>
          <Select
            value={sortOrder}
            label="Order"
            onChange={(e) => setSortOrder(e.target.value as SortOrderType)}
          >
            <MenuItem value="asc">Ascending</MenuItem>
            <MenuItem value="desc">Descending</MenuItem>
          </Select>
        </FormControl>

        <FormControl size="small" sx={{ minWidth: 120 }}>
          <InputLabel>Limit</InputLabel>
          <Select
            value={limit}
            label="Limit"
            onChange={(e) => setLimit(e.target.value as LimitType)}
          >
            {limitSizes.map(size => 
              <MenuItem key={size} value={size}>{size}</MenuItem>
            )}
          </Select>
        </FormControl>
      </Stack>
    );
  };
  
  export default ReservationFilters;
  