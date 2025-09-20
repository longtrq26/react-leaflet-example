'use client'

import React, { useEffect, useRef } from 'react'
import dynamic from 'next/dynamic'
import worldData from '../../public/data/world.json'
import 'leaflet/dist/leaflet.css'
import { COUNTRIES, SPECIAL_COUNTRIES } from '@/constants'
import { Feature, FeatureCollection, GeoJsonProperties, Geometry } from 'geojson'
import CustomMarker from './CustomMarker'
import MapHeader from './MapHeader'

const MapContainer = dynamic(() => import('react-leaflet').then((m) => m.MapContainer), {
  ssr: false,
})
const GeoJSON = dynamic(() => import('react-leaflet').then((m) => m.GeoJSON), {
  ssr: false,
})
const ZoomControl = dynamic(() => import('react-leaflet').then((m) => m.ZoomControl), {
  ssr: false,
})

const Map = () => {
  const mapRef = useRef<L.Map | null>(null)

  const getCountryStyle = (feature: Feature<Geometry, GeoJsonProperties> | undefined) => {
    const defaultStyle = {
      fillColor: '#F3F3F3',
      fillOpacity: 1,
      color: '#7F7C6E',
      weight: 0.3,
    }

    if (!feature?.properties?.name) return defaultStyle

    const countryName = feature.properties.name
    if (countryName === 'Vietnam') return { ...defaultStyle, fillColor: '#EA3434' }
    if (SPECIAL_COUNTRIES.includes(countryName)) return { ...defaultStyle, fillColor: '#D4C0B6' }

    return defaultStyle
  }

  const geoJsonData: FeatureCollection = worldData as FeatureCollection

  const maxBounds: [[number, number], [number, number]] = [
    [90, -200],
    [-50, 200],
  ]

  useEffect(() => {
    return () => {
      if (mapRef.current) {
        mapRef.current.remove()
        mapRef.current = null
      }
    }
  }, [])

  return (
    <div className='h-screen w-screen'>
      <MapContainer
        ref={mapRef}
        center={[50, 0]}
        zoom={2}
        maxZoom={6}
        minZoom={2}
        maxBounds={maxBounds}
        style={{ height: '100%', width: '100%', backgroundColor: '#FFFFFF' }}
      >
        <MapHeader targets={COUNTRIES} />

        {COUNTRIES.map((item, index) => (
          <CustomMarker
            key={index}
            name={item.name}
            flag={item.flag}
            coordinates={item.coordinates}
          />
        ))}
        <GeoJSON
          style={getCountryStyle}
          data={geoJsonData}
        />

        <ZoomControl position='bottomleft' />
      </MapContainer>
    </div>
  )
}

export default Map
