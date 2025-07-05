import { useEffect, useState } from 'react';
import { TableContainer, Paper, Typography, Pagination } from '@mui/material';
import ReservationFilters from './ReservationFilters';
import ProductsTable from './ProductsTable';
import type { ReservationType, SortByType, SortOrderType, LimitType } from '../../types/ReservationTypes';

const ReservationTable = () => {
  const [reservations, setReservations] = useState<ReservationType[]>([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [limit, setLimit] = useState<LimitType>(10);
  const [sortBy, setSortBy] = useState<SortByType>('');
  const [sortOrder, setSortOrder] = useState<SortOrderType>('asc');
  const [filterTerm, setFilterTerm] = useState('');
  const [debouncedFilterTerm, setDebouncedFilterTerm] = useState(filterTerm);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedFilterTerm(filterTerm);
    }, 500);
    return () => clearTimeout(handler);
  }, [filterTerm]);

  useEffect(() => {
    const fetchData = async () => {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: limit.toString(),
        sort: sortBy,
        order: sortOrder,
        filter: debouncedFilterTerm,
      });
      try {
        const response = await fetch(`/api/products?${params.toString()}`);
        const res = await response.json();
        if (!response.ok) {
        throw new Error(res.error || 'Failed to fetch');
        }

        setReservations(res.data);
        setTotalPages(res.pages);
        // Clear any previous error messages
        setErrorMessage('');
      } catch (err: unknown) {
        if (err instanceof Error) setErrorMessage(err.message);
        else setErrorMessage("An unknown error occurred while fetching reservations");

        // Clear reservations on error
        setReservations([]);
      }
    };
    fetchData();
  }, [page, limit, sortBy, sortOrder, debouncedFilterTerm]);

  return (
    <>
      <ReservationFilters
        filterTerm={filterTerm}
        setFilterTerm={setFilterTerm}
        sortBy={sortBy}
        setSortBy={setSortBy}
        sortOrder={sortOrder}
        setSortOrder={setSortOrder}
        limit={limit}
        setLimit={setLimit}
        setPage={setPage}
      />

      {errorMessage && (
        <Typography color="error" sx={{ m: 2 }}>
          {errorMessage}
        </Typography>
      )}

      <Typography variant="h6" sx={{ m: 2 }} style={{ fontSize: "1.5rem" }}>
        Reservations
      </Typography>

      <TableContainer
        component={Paper}
        sx={{
          borderTopLeftRadius: "8px",
          borderTopRightRadius: "8px",
          overflowY: "scroll",
          height: "67.5vh",
          // Define a minimum width for the table on Error message
          minWidth: "90vw",
        }}
      >
        <ProductsTable reservations={reservations} />
      </TableContainer>

      <Pagination
        count={totalPages}
        page={page}
        onChange={(_, value) => setPage(value)}
        color="primary"
        sx={{ mt: 2, display: "flex", justifyContent: "center" }}
      />
    </>
  );
};

export default ReservationTable;
