import React from "react";
import { MapContainer, GeoJSON, Marker, Tooltip } from "react-leaflet";
import L from "leaflet";
import worldData from "../../public/data/world.json";
import "leaflet/dist/leaflet.css";

import {
  Feature,
  FeatureCollection,
  GeoJsonProperties,
  Geometry,
} from "geojson";

const MarkerPositions = [
  {
    name: "Hà Nội",
    flag: "/vietnam.png",
    coordinates: { lat: 21.0278, lng: 105.8342 },
  },
  {
    name: "Trường Sa",
    flag: "/vietnam.png",
    coordinates: { lat: 10.7233, lng: 115.8265 },
  },
  {
    name: "Hoàng Sa",
    flag: "/vietnam.png",
    coordinates: { lat: 16.5333, lng: 111.6019 },
  },
  {
    name: "Châu Âu",
    flag: "/eu.png",
    coordinates: { lat: 50.8477, lng: 4.3572 },
  },
  {
    name: "Úc",
    flag: "/australia.png",
    coordinates: { lat: -35.2802, lng: 149.131 },
  },
  {
    name: "New Zealand",
    flag: "/new-zealand.png",
    coordinates: { lat: -41.2924, lng: 174.7787 },
  },
  {
    name: "Caribe",
    flag: "/caribe.png",
    coordinates: { lat: 21.4691, lng: -78.6569 },
  },
  {
    name: "Mỹ",
    flag: "/us.png",
    coordinates: { lat: 47.7511, lng: -120.7401 },
  },
  {
    name: "Canada",
    flag: "/canada.png",
    coordinates: { lat: 45.4201, lng: -75.7003 },
  },
];

const createMarkerIcon = (flagUrl: string) =>
  L.divIcon({
    className: "custom-marker",
    iconSize: [21.65, 21.65],
    iconAnchor: [10.825, 10.825],
    html: `<div class="marker-content"><div class="flag-container"><img src="${flagUrl}" alt="${name} flag" class="flag-image" /></div></div>`,
  });

const Map = () => {
  const getCountryStyle = (
    feature: Feature<Geometry, GeoJsonProperties> | undefined
  ) => {
    const defaultStyle = {
      fillColor: "#F3F3F3",
      fillOpacity: 1,
      color: "#7F7C6E",
      weight: 0.3,
    };

    if (!feature?.properties?.name) {
      return defaultStyle;
    }

    const countryName = feature.properties.name;
    const specialCountries = [
      "Australia",
      "Canada",
      "United States of America",
      "Austria",
      "Belgium",
      "Bulgaria",
      "Croatia",
      "Cyprus",
      "Czech Republic",
      "Denmark",
      "Estonia",
      "Finland",
      "France",
      "Germany",
      "Greece",
      "Hungary",
      "Ireland",
      "Italy",
      "Latvia",
      "Lithuania",
      "Luxembourg",
      "Malta",
      "Netherlands",
      "Poland",
      "Portugal",
      "Romania",
      "Slovakia",
      "Slovenia",
      "Spain",
      "Sweden",
      "New Zealand",
    ];

    if (countryName === "Vietnam") {
      return { ...defaultStyle, fillColor: "#EA3434" };
    }

    if (specialCountries.includes(countryName)) {
      return { ...defaultStyle, fillColor: "#D4C0B6" };
    }

    return defaultStyle;
  };

  const geoJsonData: FeatureCollection = worldData as FeatureCollection;

  const maxBounds: [[number, number], [number, number]] = [
    [85, -180],
    [-85, 180],
  ];

  return (
    <div>
      <MapContainer
        center={[40, 0]}
        zoom={2}
        maxZoom={6}
        minZoom={2}
        maxBounds={maxBounds}
        style={{ height: "100vh", width: "100%", backgroundColor: "#000" }}
      >
        {MarkerPositions.map((item, index) => (
          <Marker
            key={index}
            position={[item.coordinates.lat, item.coordinates.lng]}
            icon={createMarkerIcon(item.flag)}
          >
            <Tooltip
              className="custom-tooltip"
              direction="bottom"
              offset={[0, 10]}
              opacity={1}
              permanent
            >
              {item.name}
            </Tooltip>
          </Marker>
        ))}
        <GeoJSON style={getCountryStyle} data={geoJsonData} />
      </MapContainer>
    </div>
  );
};

export default Map;
