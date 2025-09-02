export const setStatus = (charge) =>
    !charge ? 'offeredOnly' : charge.active ? 'active' : false;
  
  export const buildReservations = (assignments, charges) => {
    const reservations = {};
  
    assignments?.forEach(({ id, reservation_uuid, name }) => {
      if (!reservations[reservation_uuid]) {
        reservations[reservation_uuid] = {
          reservation_uuid,
          products: [],
        };
      }
  
      const charge = charges.find((c) => c.special_product_assignment_id === id);
  
      reservations[reservation_uuid].products.push({
        name,
        charge: charge ? charge.amount : 0,
        status: setStatus(charge),
      });
    });
  
    return Object.values(reservations).map((r) => {
      const activeCharges = r.products.filter((p) => p.status === 'active');
      return {
        reservation_uuid: r.reservation_uuid,
        number_of_active_purchases: activeCharges.length,
        sum_of_active_charges: activeCharges.reduce((sum, p) => sum + p.charge, 0),
        products: r.products,
      };
    });
  };
  
    export const filterReservations = (reservations, nameFilter) => {
        if (!nameFilter) return reservations;

        if (typeof nameFilter !== 'string') {
            throw new Error('Filter must be a string');
        }

        if (nameFilter.match(/[^a-zA-Z0-9\s%()’]/)) {
            throw new Error("Filter can only contain letters, numbers, spaces, %, (, ), and ’");
        }
    
        const tlc = (str) => str.toLowerCase();

        // If no reservations, return empty array
        if (reservations.length === 0) return [];
    
        return reservations
        .map((r) => ({
            ...r,
            products: r.products.filter((p) => tlc(p.name).includes(tlc(nameFilter))),
        })) // Ensure the return of reservations with matching products
        .filter((r) => r.products.length > 0);
  };

  export const sortReservations = (reservations, sortBy, order = 'asc') => {
    const sorted = [...reservations].sort((a, b) => {
      if (typeof a[sortBy] === 'number') {
        return a[sortBy] - b[sortBy];
      } else {
        return String(a[sortBy]).localeCompare(String(b[sortBy]));
      }
    });
    return order === 'desc' ? sorted.reverse() : sorted;
  };
  
  export const paginate = (items, page = 1, limit = 10) => {
    const start = (page - 1) * limit;
    const paginated = items.slice(start, start + limit);
    return {
      data: paginated,
      total: items.length,
      page: Number(page),
      pages: Math.ceil(items.length / limit),
    };
  };
  