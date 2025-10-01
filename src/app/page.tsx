'use client'

import dynamic from 'next/dynamic'

const Map = dynamic(() => import('@/components/Map'), {
  ssr: false,
})

const HomePage = () => {
  return (
    <div className='h-screen w-screen overflow-hidden'>
      <div className='flex size-full items-center justify-center'>
        <div className='size-full rounded-lg border border-gray-300 bg-gray-100 shadow-lg'>
          <Map />
        </div>
      </div>
    </div>
  )
}

export default HomePage
