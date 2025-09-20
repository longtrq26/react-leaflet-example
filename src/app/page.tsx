'use client'

import Map from '@/components/Map'

const HomePage = () => {
  return (
    <div className='h-screen w-screen overflow-hidden'>
      <div className='flex size-full items-center justify-center'>
        {/* Container cho bản đồ với kích thước cố định */}
        <div className='size-full rounded-lg border border-gray-300 bg-gray-100 shadow-lg'>
          <Map />
        </div>
      </div>
    </div>
  )
}

export default HomePage
