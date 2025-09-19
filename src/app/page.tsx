"use client";

import Map from "@/components/Map";

const HomePage = () => {
  return (
    <div className="w-screen h-screen overflow-hidden">
      <div className="size-full flex items-center justify-center">
        {/* Container cho bản đồ với kích thước cố định */}
        <div className="size-full bg-gray-100 border border-gray-300 rounded-lg shadow-lg">
          <Map />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
