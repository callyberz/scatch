interface enviromentType {
  mapBoxToken: string;
  airTableAPIKey: string;
}

export const enviroment: enviromentType = {
  mapBoxToken: import.meta.env.VITE_MAPBOX_ACCESS_TOKEN,
  airTableAPIKey: import.meta.env.VITE_AIRTABLE_API_KEY
};
