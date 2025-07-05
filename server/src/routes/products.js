import { Router } from "express";
import productAssignment from '../../data/product_assignment.json' with { type: 'json' };
import productCharges from '../../data/product_charges.json' with { type: 'json' };

import {
  buildReservations,
  filterReservations,
  sortReservations,
  paginate
} from "../utils/productsUtils.js";

const router = Router();

router.get('/', (req, res) => {
  try {
    const { page = 1, limit = 10, sort, order = 'asc', filter } = req.query;
    let reservations = buildReservations(productAssignment, productCharges);
    reservations = filterReservations(reservations, filter);
    reservations = sortReservations(reservations, sort, order);
    const paginated = paginate(reservations, Number(page), Number(limit));

    res.json(paginated);
  } catch (err) {
    console.error('Error in /api/products:', err);
    res.status(400).json({
      error: err instanceof Error ? err.message : 'Unknown error'
    });
  }
});

export default router;