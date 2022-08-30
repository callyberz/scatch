export type lnglat = {
  name: string;
  longitude: number;
  latitude: number;
};

export type dataResp = {
  records: [
    {
      fields: lnglat;
    }
  ];
};
