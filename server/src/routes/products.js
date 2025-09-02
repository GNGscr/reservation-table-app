import { Router } from "express";
import { fetchJsonData } from "../routes/dataFetcher.js";
import {
  buildReservations,
  filterReservations,
  sortReservations,
  paginate,
} from "../utils/productsUtils.js";
import localAssignment from "../../data/product_assignment.json" with { type: "json" };
import localCharges from "../../data/product_charges.json" with { type: "json" };

const router = Router();
let reservations = [];

router.get("/", async (req, res) => {
  try {
    const results = await fetchJsonData();

    const productAssignment = results[0].data;
    const productCharges = results[1].data;

    if (!productAssignment || !productCharges) {
      console.warn("Falling back to local JSON data");
      reservations = buildReservations(localAssignment, localCharges);
      // Send warning header about fallback
      res.setHeader("X-Warning", "Using local fallback data due to fetch failure");
      // Return local data with 200 status
      return res.json(paginate(reservations, 1, 10));
      
      // Uncomment below to return empty array instead of local data

      // return res.status(500).json({
      //   error: "Failed to fetch product data from S3",
      //   fallback: [], // Return empty array on failure
      // });
    }

    const { page = 1, limit = 10, sort, order = "asc", filter } = req.query;
    reservations = buildReservations(productAssignment, productCharges);
    reservations = filterReservations(reservations, filter);
    reservations = sortReservations(reservations, sort, order);
    const paginated = paginate(reservations, Number(page), Number(limit));

    res.json(paginated);
  } catch (err) {
    console.error("Error in /api/products:", err);
    res.status(400).json({
      error: err instanceof Error ? err.message : "Unknown error",
    });
  }
});

export default router;
