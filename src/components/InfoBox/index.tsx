import { memo } from 'react';
import { Popup } from 'react-map-gl';

function InfoBox(props: any) {
  const { popupInfo, onClose } = props || {};
  const { longitude, latitude, name } = popupInfo || {};

  return (
    <div className="infobox-con">
      <Popup
        anchor="top"
        longitude={Number(longitude)}
        latitude={Number(latitude)}
        onClose={() => onClose(null)}
        focusAfterOpen={false}
      >
        <h3>{name}</h3>
        <div>{`${longitude} | ${latitude}`}</div>
      </Popup>
    </div>
  );
}

export default memo(InfoBox);
