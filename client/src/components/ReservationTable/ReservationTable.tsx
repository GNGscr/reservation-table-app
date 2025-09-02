import { useEffect, useState } from 'react';
import { TableContainer, Paper, Typography, Pagination, Skeleton } from '@mui/material';
import ReservationFilters from './ReservationFilters';
import ProductsTable from './ProductsTable';
import type { ReservationType, SortByType, SortOrderType, LimitType } from '../../types/ReservationTypes';

const typographySx = {
  mb: 2,
  fontSize: "1.5rem",
  position: "absolute",
  top: "45%",
  left: "50%",
  transform: "translateX(-50%)",
};
const tableSxContainer = {
  borderTopLeftRadius: "8px",
  borderTopRightRadius: "8px",
  overflowY: "scroll",
  height: "67.5vh",
  minWidth: "85vw",
};
const loaderSxContainer = {
  borderTopLeftRadius: "8px",
  borderTopRightRadius: "8px",
  height: "67.5vh",
  minWidth: "85vw",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
};

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
  const [isLoading, setIsLoading] = useState(false);

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
        setIsLoading(true);
        const response = await fetch(`/api/products?${params.toString()}`);
        const res = await response.json();
        setErrorMessage(!res.data.length && res.message ? res.message : '');

        if (!response.ok) {
        throw new Error(res.error || 'Failed to fetch');
        }
      
        setIsLoading(false);
        setReservations(res.data);
        setTotalPages(res.pages);
        
      } catch (err: unknown) {
        if (err instanceof Error) setErrorMessage(err.message);
        else setErrorMessage("An unknown error occurred while fetching reservations");

        // Clear reservations on error
        setReservations([]);
      }
    };
    fetchData();
  }, [page, limit, sortBy, sortOrder, debouncedFilterTerm]);

  const loader = (
    <TableContainer component={Paper} sx={loaderSxContainer}>
      <div style={{ textAlign: "center", width: "100%" }}>
        <Typography
          color={errorMessage ? "error" : "textPrimary"}
          variant="h6"
          sx={typographySx}
        >
          {errorMessage || "Loading..."}
        </Typography>
        <Skeleton variant="rectangular" width="100%" height="100vh" />
      </div>
    </TableContainer>
  );

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

      <Typography variant="h6" sx={{ m: 2 }} style={{ fontSize: "1.5rem" }}>
        Reservations
      </Typography>

      
      <TableContainer
        component={Paper}
        sx={tableSxContainer}
      >
        {isLoading || errorMessage && (loader)}
        {isLoading && loader}
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
