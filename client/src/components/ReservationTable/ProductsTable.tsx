import { Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import ReservationRow from './ReservationRow';
import type { ReservationType } from '../../types/ReservationTypes';

const ProductsTable = ({ reservations }: { reservations: ReservationType[] }) => {
  return (
    <>
      {reservations.map((res) => (
        <Table key={res.reservation_uuid}>
          <TableHead>
            <TableRow>
              <TableCell>Reservation UUID</TableCell>
              <TableCell>Number of Active Purchases</TableCell>
              <TableCell>Sum of Active Charges</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>{res.reservation_uuid}</TableCell>
              <TableCell>{res.number_of_active_purchases}</TableCell>
              <TableCell>{Math.floor(res.sum_of_active_charges)}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell colSpan={3} sx={{ fontWeight: 'bold', pt: 3, backgroundColor: 'gray' }}>
                Reservation Products
              </TableCell>
            </TableRow>
            {res.products.map((product, idx) => (
              <ReservationRow key={idx} product={product} />
            ))}
          </TableBody>
        </Table>
      ))}
    </>
  );
};

export default ProductsTable;
