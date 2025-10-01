import React, { useEffect, useRef } from 'react'
import { GeoJSON, MapContainer, ZoomControl } from 'react-leaflet'
import worldData from '../../public/data/world.json'
import 'leaflet/dist/leaflet.css'
import { COUNTRIES, SPECIAL_COUNTRIES } from '@/constants'
import { Feature, FeatureCollection, GeoJsonProperties, Geometry } from 'geojson'
import CountryLayer from './CountryLayer'
import MapHeader from './MapHeader'

const MapImplementation = () => {
  const mapRef = useRef<L.Map | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null) // Thêm ref cho container
  const isInitialized = useRef(false)

  useEffect(() => {
    // Chỉ khởi tạo nếu chưa được khởi tạo
    if (isInitialized.current) return

    isInitialized.current = true

    return () => {
      if (mapRef.current) {
        try {
          mapRef.current.off()
          mapRef.current.remove()
          mapRef.current = null
        } catch (e) {
          console.warn('Map cleanup error:', e)
        }
      }
      isInitialized.current = false
    }
  }, [])

  const getCountryStyle = (feature: Feature<Geometry, GeoJsonProperties> | undefined) => {
    const defaultStyle = {
      fillColor: '#F3F3F3',
      fillOpacity: 1,
      color: '#7F7C6E',
      weight: 0.3,
    }

    if (!feature?.properties?.name) return defaultStyle

    const countryName = feature.properties.name
    if (countryName === 'Việt Nam') return { ...defaultStyle, fillColor: '#EA3434' }
    if (SPECIAL_COUNTRIES.includes(countryName)) return { ...defaultStyle, fillColor: '#D4C0B6' }

    return defaultStyle
  }

  const geoJsonData: FeatureCollection = worldData as FeatureCollection

  const maxBounds: [[number, number], [number, number]] = [
    [90, -200],
    [-50, 200],
  ]

  return (
    <div
      ref={containerRef}
      className='h-screen w-screen'
    >
      <MapContainer
        ref={mapRef}
        center={[50, 0]}
        zoom={2}
        maxZoom={6}
        minZoom={2}
        maxBounds={maxBounds}
        style={{ height: '100%', width: '100%', backgroundColor: '#FFFFFF' }}
        attributionControl={false}
      >
        <MapHeader targets={COUNTRIES} />
        {COUNTRIES.map((item) => (
          <CountryLayer
            key={item.name}
            country={item}
            currentZoom={6}
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

export default MapImplementation
