import NodeCache from 'node-cache';

// Initialize NodeCache outside the handler to persist the cache across requests
const distanceCache = new NodeCache({ stdTTL: 3600, checkperiod: 3600 });

// Haversine function to calculate the great-circle distance between two points
function haversine(lat1, lon1, lat2, lon2) {
  const R = 6371; // Earth's radius in kilometers
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLon = (lon2 - lon1) * Math.PI / 180;

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c; // Distance in kilometers
}

// Shipping cost calculation function (base rate + surcharge based on weight)
function calculateShippingCost(distance, weight) {
  const baseRate = 5000; // Base cost per km
  const weightSurcharge = weight > 1000 ? 2000 : 0; // Add surcharge for heavy items (>1000 grams)

  let cost = baseRate * distance + weightSurcharge;

  // Apply minimum charge if the distance is less than 1km
  if (distance < 1) {
    cost = 10000; // Minimum charge
  }

  // Round cost to the nearest 500
  return Math.round(cost / 500) * 500;
}

// Handler function for shipping cost calculation
const shippingCostHandler = (req, res) => {
  const { originLatLng, destLatLng, weightGram } = req.body;

  // Validate coordinates
  const isValidLatLng = (lat, lng) => lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180;

  if (
    !originLatLng ||
    !destLatLng ||
    !originLatLng.lat ||
    !originLatLng.lng ||
    !destLatLng.lat ||
    !destLatLng.lng ||
    !isValidLatLng(originLatLng.lat, originLatLng.lng) ||
    !isValidLatLng(destLatLng.lat, destLatLng.lng)
  ) {
    return res.status(400).json({ error: 'Invalid coordinates' });
  }

  const { lat: originLat, lng: originLng } = originLatLng;
  const { lat: destLat, lng: destLng } = destLatLng;

  // Check if the distance is already cached
  const cacheKey = `${originLat},${originLng},${destLat},${destLng}`;
  let distance = distanceCache.get(cacheKey);

  if (!distance) {
    // If not cached, calculate the distance
    distance = haversine(originLat, originLng, destLat, destLng);

    // Cache the distance for 1 hour
    distanceCache.set(cacheKey, distance);
  }

  // Calculate the shipping cost
  const shippingCost = calculateShippingCost(distance, weightGram);

  // Return the response with shipping cost and distance
  return res.json({ shippingCost, distance });
};

const handler = {
    shippingCostHandler
}

export default handler;