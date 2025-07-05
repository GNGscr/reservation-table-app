import { TableRow, TableCell, Tooltip, IconButton } from '@mui/material';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';

type Product = {
  name: string;
  status: boolean;
  charge: number;
};

const ReservationRow = ({ product }: { product: Product }) => {
  return (
    <TableRow className={product.status ? 'active' : 'cancelled'}>
      <TableCell>
        {product.name}
        <Tooltip title="Copy to clipboard">
          <IconButton
            size="small"
            onClick={() => navigator.clipboard.writeText(product.name)}
            sx={{ width: 24, height: 24, opacity: 0.8, ml: 0.5 }}
          >
            <ContentCopyIcon fontSize="small" sx={{ fontSize: 16 }} />
          </IconButton>
        </Tooltip>
      </TableCell>
      <TableCell>{product.status ? 'active' : 'cancelled'}</TableCell>
      <TableCell>{Math.floor(product.charge)}</TableCell>
    </TableRow>
  );
};

export default ReservationRow;
