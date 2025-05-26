import {Outlet} from "react-router-dom";

const RootLayout = () => {
  return (
    <div>
      <h1 className="text-center py-5 text-[40px] font-bold">File Management System </h1>
      <Outlet/>
    </div>
  )
}

export default RootLayout
