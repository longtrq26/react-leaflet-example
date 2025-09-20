'use client'

import { useEffect, useState } from 'react'
import type * as Leaflet from 'leaflet'
import dynamic from 'next/dynamic'

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
}

const CustomMarker = ({ name, flag, coordinates }: MarkerProps) => {
  const [L, setL] = useState<typeof Leaflet | null>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    import('leaflet').then((leaflet) => {
      setL(leaflet)
      setIsMounted(true)
    })
  }, [])

  if (!L || !isMounted) return null

  const createMarkerIcon = (name: string, flagUrl: string) =>
    L.divIcon({
      className: 'custom-marker',
      iconSize: [24, 24],
      iconAnchor: [10.825, 10.825],
      html: `<div class="marker-content"><div class="flag-container"><img src="${flagUrl}" alt="${name} flag" class="flag-image" /></div></div>`,
    })

  return (
    <Marker
      position={coordinates}
      icon={createMarkerIcon(name, flag)}
    >
      <Tooltip
        className='custom-tooltip'
        direction='bottom'
        offset={[0, 10]}
        opacity={1}
        permanent
      >
        {name}
      </Tooltip>
    </Marker>
  )
}

export default CustomMarker
