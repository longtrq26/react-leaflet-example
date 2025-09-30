import React, { useMemo } from 'react'
import { Country } from '@/types'
import type * as Leaflet from 'leaflet'
import dynamic from 'next/dynamic'
import CustomMarker from './CustomMarker'

const MarkerClusterGroup = dynamic(() => import('react-leaflet-cluster'), { ssr: false })

interface CountryLayerProps {
  country: Country
  currentZoom: number
}

const CountryLayer = ({ country, currentZoom }: CountryLayerProps) => {
  const hasCities = Array.isArray(country.cities) && country.cities.length > 0
  const showCities = hasCities && currentZoom >= country.zoom

  // Custom icon for cluster
  const createClusterCustomIcon = useMemo(() => {
    return (cluster: any) => {
      if (typeof window === 'undefined') return undefined

      // eslint-disable-next-line @typescript-eslint/no-require-imports
      const L = require('leaflet') as typeof Leaflet

      const count = cluster.getChildCount()

      // Custom HTML cho cluster với flag
      const html = `
        <div class="cluster-marker">
          <div class="cluster-flag-container">
            <img src="${country.flag}" alt="${country.name}" class="cluster-flag" />
            <span class="cluster-count">${count}</span>
          </div>
        </div>
      `

      return L.divIcon({
        html,
        className: 'custom-cluster-icon',
        iconSize: L.point(40, 40, true),
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
        zoom={12}
        permanentTooltip={false}
      />
    ))
  }, [country])

  if (!showCities) {
    return (
      <CustomMarker
        name={country.name}
        flag={country.flag}
        coordinates={country.coordinates}
        zoom={country.zoom}
        permanentTooltip
      />
    )
  }

  return (
    <MarkerClusterGroup
      chunkedLoading
      spiderfyOnEveryZoom={false}
      showCoverageOnHover={false}
      iconCreateFunction={createClusterCustomIcon}
    >
      {cityMarkers}
    </MarkerClusterGroup>
  )
}

export default CountryLayer
