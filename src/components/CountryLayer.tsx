/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useMemo } from 'react'
import { Country } from '@/types'
import type * as Leaflet from 'leaflet'
import dynamic from 'next/dynamic'
import { useMap } from 'react-leaflet'
import CustomMarker from './CustomMarker'

const MarkerClusterGroup = dynamic(() => import('react-leaflet-cluster'), { ssr: false })

interface CountryLayerProps {
  country: Country
  currentZoom: number
}

const CountryLayer = React.memo(({ country, currentZoom }: CountryLayerProps) => {
  const map = useMap()
  const hasCities = Array.isArray(country.cities) && country.cities.length > 0
  const showCities = hasCities && currentZoom >= country.zoom

  const createClusterCustomIcon = useMemo(() => {
    return (cluster: any) => {
      if (typeof window === 'undefined') return undefined

      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const L = require('leaflet') as typeof Leaflet

      const count = cluster.getChildCount()

      const html = `
        <div class="relative w-[5rem] h-[3.26rem]">
          <img
            src="/bg-marker.png"
            alt="${country.name}"
            class="absolute w-full h-full top-0 left-1/2 -translate-x-1/2 object-cover"
          />
          <img
            src="${country.flag}"
            alt="${country.name}"
            class="absolute size-[1.5rem] top-[1rem] left-1/2 -translate-x-1/2 object-cover rounded-full"
          />
          <div class="absolute top-[0.5rem] right-[0.5rem] flex size-[1.25rem] items-center justify-center rounded-full bg-[#EA3434] text-[0.625rem] font-bold text-white shadow-md">
            ${count}
          </div>
          <div class="text-brown absolute bottom-[-0.1rem] left-1/2 flex h-[1.375rem] w-fit -translate-x-1/2 translate-y-full items-center whitespace-nowrap rounded-[6.25rem] bg-[#E1DDC5] px-[0.5rem] text-[0.75rem] font-semibold uppercase leading-[1.2] tracking-[-0.0075rem]">
            ${country.name}
          </div>
        </div>
      `

      return L.divIcon({
        html,
        className: 'custom-marker',
        iconSize: [80, 52],
        iconAnchor: [40, 26],
      })
    }
  }, [country.flag, country.name])

  const cityMarkers = useMemo(() => {
    if (!hasCities) return null
    return country.cities!.map((c, i) => (
      <CustomMarker
        key={`${country.name}-city-${i}`}
        name={c.name}
        flag={country.flag}
        coordinates={c.coordinates}
        zoom={6}
      />
    ))
  }, [country, hasCities])

  if (!showCities) {
    return (
      <CustomMarker
        name={country.name}
        flag={country.flag}
        coordinates={country.coordinates}
        zoom={country.zoom}
      />
    )
  }

  return (
    <MarkerClusterGroup
      chunkedLoading
      animate
      animateAddingMarkers
      zoomToBoundsOnClick={false}
      showCoverageOnHover={false}
      iconCreateFunction={createClusterCustomIcon}
      maxClusterRadius={50}
      eventHandlers={{
        clusterclick: (e: any) => {
          map.flyTo(e.latlng, country.zoom, { animate: true })
        },
      }}
    >
      {cityMarkers}
    </MarkerClusterGroup>
  )
})

CountryLayer.displayName = 'CountryLayer'

export default CountryLayer
