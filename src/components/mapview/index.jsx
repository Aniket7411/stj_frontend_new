import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix leaflet default icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const dummyData = [
  { id: 1, name: 'Company A', lat: 28.6139, lng: 77.2090 },
  { id: 2, name: 'Company B', lat: 19.0760, lng: 72.8777 },
  { id: 3, name: 'Company C', lat: 12.9716, lng: 77.5946 },
];

const ZoomControls = ({ setZoom }) => {
  const map = useMap();

  const handleZoomIn = () => {
    const newZoom = map?.getZoom() + 1;
    map.setZoom(newZoom);
    setZoom(newZoom);
  };

  // const handleZoomOut = () => {
  //   const newZoom = map.getZoom() - 1;
  //   map.setZoom(newZoom);
  //   setZoom(newZoom);
  // };

  return (
    // <div className="absolute top-4 right-4 z-[1000] flex flex-col gap-2">
    //   <button onClick={handleZoomIn} className="bg-white shadow p-2 rounded-full text-xl">+</button>
    //   <button onClick={handleZoomOut} className="bg-white shadow p-2 rounded-full text-xl">−</button>
    // </div>
    <>
    </>
  );
};




const MapView = ({position,role}) => {
  const [zoom, setZoom] = useState(6);

  const redIcon = new L.Icon({
  iconUrl: 'assets/location.jpg', // red
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  shadowSize: [41, 41],
});

  return (
    <div className="relative w-full h-[80vh]">
      <MapContainer
        center={[54.0, -2.0]}
        zoom={zoom}
        scrollWheelZoom={true}
        className="h-full w-full rounded-xl shadow-lg"
      >
        <TileLayer
          attribution='&copy; <a href="https://osm.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {position?.map((place) => (
          <Marker icon={redIcon}  key={place?.id} position={[place?.latitude, place?.longitude]}>
           {
            role==='employer'?
             <Popup>
      <div className="bg-white rounded-lg shadow-md  text-sm w-30">
        <p className="font-semibold text-gray-800">Name: <span className="font-normal">{place?.details?.name}</span></p>
        <p className="font-semibold text-gray-800">Profession: <span className="font-normal">{place?.details?.profession}</span></p>
      </div>
    </Popup>
   : 
    <Popup>
      <div className="bg-blue-50 rounded-lg shadow-md text-sm w-30">
        <p className="font-semibold text-blue-800">Company: <span className="font-normal">{place?.details?.companyName}</span></p>
        <p className="font-semibold text-blue-800">Job Title: <span className="font-normal">{place?.details?.jobTitle}</span></p>
      </div>
    </Popup>
           }
          </Marker>
        ))}
        <ZoomControls setZoom={setZoom} />
      </MapContainer>
    </div>
  );
};

export default MapView;
