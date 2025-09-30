'use client'

import { useMemo } from 'react'
import type * as Leaflet from 'leaflet'
import dynamic from 'next/dynamic'
import { useMap } from 'react-leaflet'

const Marker = dynamic(() => import('react-leaflet').then((m) => m.Marker), {
  ssr: false,
})
const Tooltip = dynamic(() => import('react-leaflet').then((m) => m.Tooltip), {
  ssr: false,
})

interface MarkerProps {
  name: string
  flag: string
  coordinates: [number, number]
  zoom: number
  permanentTooltip?: boolean
}

const CustomMarker = ({
  name,
  flag,
  coordinates,
  zoom = 6,
  permanentTooltip = false,
}: MarkerProps) => {
  const map = useMap()

  const icon = useMemo(() => {
    if (typeof window === 'undefined') return undefined

    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const L = require('leaflet') as typeof Leaflet

    const wrapper = `
      <div class="marker-content">
        <div class="flag-container">
          ${flag ? `<img src="${flag}" alt="${name} flag" class="flag-image" />` : ''}
        </div>
      </div>
    `

    return L.divIcon({
      className: 'custom-marker',
      iconSize: [24, 24],
      iconAnchor: [10.825, 10.825],
      html: wrapper,
    })
  }, [name, flag])

  if (!icon) return null

  const handleClick = () => {
    map.flyTo(coordinates, zoom, { animate: true })
  }

  return (
    <Marker
      position={coordinates}
      icon={icon}
      eventHandlers={{ click: handleClick }}
    >
      <Tooltip
        className='custom-tooltip'
        direction='bottom'
        offset={[0, 10]}
        opacity={1}
        permanent={permanentTooltip}
      >
        {name}
      </Tooltip>
    </Marker>
  )
}

export default CustomMarker
