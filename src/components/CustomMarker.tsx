'use client'

import { useMemo } from 'react'
import type * as Leaflet from 'leaflet'
import dynamic from 'next/dynamic'
import { useMap } from 'react-leaflet'

const Marker = dynamic(() => import('react-leaflet').then((m) => m.Marker), {
  ssr: false,
})

interface MarkerProps {
  name: string
  flag: string
  coordinates: [number, number]
  zoom: number
  permanentTooltip?: boolean
}

const CustomMarker = ({ name, flag, coordinates, zoom = 6 }: MarkerProps) => {
  const map = useMap()

  const icon = useMemo(() => {
    if (typeof window === 'undefined') return undefined

    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const L = require('leaflet') as typeof Leaflet

    const wrapper = `<img
                src="/bg-marker.png"
                alt="${name}"
                class="absolute w-full h-full top-0 !left-1/2 !-translate-x-1/2 object-cover marker-bound"
              />
              <img
                src="${flag}"
                alt="${name}"
                class="absolute !size-[1.5rem] top-[1rem] !left-1/2 !-translate-x-1/2 object-cover marker-bound rounded-full"
              />
              <div class="text-brown absolute bottom-[-0.1rem] left-1/2 flex h-[1.375rem] w-fit -translate-x-1/2 translate-y-full items-center whitespace-nowrap rounded-[6.25rem] bg-[#E1DDC5] px-[0.5rem] text-[0.75rem] font-semibold uppercase leading-[1.2] tracking-[-0.0075rem]">
                ${name}
              </div>`

    return L.divIcon({
      className:
        'custom-marker pointer-events-none !w-[5rem] !h-[3.26rem] absolute !left-[-1.5rem] top-0',
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
    />
  )
}

export default CustomMarker
