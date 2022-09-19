import { useEffect, useState } from 'react';
import Map, { Marker, NavigationControl } from 'react-map-gl';
import GeocoderControl from '../../components/GeocoderControl';
import InfoBox from '../../components/InfoBox';
import { MAPBOX_STYLES } from '../../constants/constant';
import { enviroment } from '../../../environment/env';
import { dataResp, lnglat } from './type';
import './index.less';

const API_DOMAIN = 'https://api.airtable.com/v0/';

export const MapComp = () => {
  const { mapBoxToken, airTableAPIKey } = enviroment;
  const [popupInfo, setPopupInfo] = useState<any>(null);
  const [geoJsonData, setGeoJsonData] = useState<lnglat[]>([]);

  const fetchLocation = async () => {
    try {
      const data = await fetch(
        `${API_DOMAIN}app5O417XDRvX4a6U/favorites?api_key=${airTableAPIKey}`
      );
      const { records } = (await data.json()) as dataResp;

      const lnglatList = records
        .filter((i) => Object.keys(i.fields).length !== 0)
        .map((i) => i.fields);
      setGeoJsonData(lnglatList);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchLocation();
  }, []);

  const markerOnClick = (event: any, selectedLocation: any) => {
    event.originalEvent.stopPropagation();
    setPopupInfo(selectedLocation);
  };

  return (
    <div className="mapcon">
      <Map
        mapboxAccessToken={mapBoxToken}
        initialViewState={{
          latitude: 22.3193,
          longitude: 114.1694,
          zoom: 10
        }}
        mapStyle={MAPBOX_STYLES.outdoors}
      >
        {geoJsonData.map((item, index) => {
          const { latitude, longitude } = item;
          return (
            <Marker
              key={`${index}-${latitude}-${longitude}`}
              style={{ cursor: 'pointer' }}
              anchor="bottom"
              latitude={latitude}
              longitude={longitude}
              onClick={(e: any) => {
                markerOnClick(e, item);
              }}
            />
          );
        })}

        {popupInfo && <InfoBox popupInfo={popupInfo} onClose={setPopupInfo} />}

        <GeocoderControl
          mapboxAccessToken={mapBoxToken}
          onClick={markerOnClick}
        />

        <NavigationControl />
      </Map>
    </div>
  );
};
