const mapping: Record<string, string> = {
  companies: 'company',
  cycles: 'cycle',
  stations: 'station',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
