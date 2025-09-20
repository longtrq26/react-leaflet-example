import React, { memo } from 'react'
import Image from 'next/image'
import { useMap } from 'react-leaflet'

interface Target {
  name: string
  flag: string
  coordinates: [number, number]
  zoom: number
}

const MapHeader = memo(({ targets }: { targets: Target[] }) => {
  const map = useMap()

  const handleClick = (target: Target) => {
    map.setView(target.coordinates, target.zoom, { animate: true })
  }

  return (
    <header
      className='absolute top-0 left-0 z-[1000] w-full'
      style={{
        background: 'linear-gradient(180deg, #FFF 56.16%, rgba(255, 255, 255, 0.00) 100%)',
      }}
    >
      <nav className='flex h-[7.625rem] w-full'>
        <ul className='flex items-center gap-x-10 px-10'>
          {targets.slice(3).map((item, index) => (
            <li key={index}>
              <button
                onClick={() => handleClick(item)}
                className='group flex cursor-pointer flex-col items-center justify-center'
              >
                <div className='flex cursor-pointer items-center gap-x-2'>
                  <Image
                    src={item.flag}
                    alt={`${item.name} flag`}
                    height={20}
                    width={20}
                    className='h-5 w-5 shrink-0 rounded-full border border-white bg-gradient-to-b from-transparent via-transparent to-white/70 object-cover'
                  />
                  <span className='text-base font-medium whitespace-nowrap'>{item.name}</span>
                </div>

                {/* underline */}
                <span className='mt-1 h-[2px] w-full origin-left scale-x-0 transform rounded-full bg-gradient-to-r from-[#95502F] to-[#F5C178] transition-transform duration-300 group-hover:scale-x-100' />
              </button>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
})

MapHeader.displayName = 'MapHeader'

export default MapHeader
