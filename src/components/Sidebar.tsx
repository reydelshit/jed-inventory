import { Link } from 'react-router-dom';
import { Button } from './ui/button';
export default function Sidebar() {
  return (
    <div className="font-bold w-[15rem] h-screen flex flex-col items-center justify-center border-r-2">
      <div className="mt-[-15rem]">
        <Link className="p-2 mb-2 flex items-center gap-2" to="/">
          {/* <RxDashboard className="text-md h-[1.5rem] w-[1.5rem]" /> Dashboard */}
          Dashboard
        </Link>

        <Link className="p-2 mb-2 flex items-center gap-2" to="/product">
          {/* <RxDashboard className="text-md h-[1.5rem] w-[1.5rem]" /> Dashboard */}
          Product
        </Link>

        <Link className="p-2 mb-2 flex items-center gap-2" to="/supplier">
          {/* <RxDashboard className="text-md h-[1.5rem] w-[1.5rem]" /> Dashboard */}
          Supplier
        </Link>
        <Link className="p-2 mb-2 flex items-center gap-2" to="/stock">
          {/* <RxDashboard className="text-md h-[1.5rem] w-[1.5rem]" /> Dashboard */}
          Stock
        </Link>

        <Link className="p-2 mb-2 flex items-center gap-2" to="/reports">
          {/* <RxDashboard className="text-md h-[1.5rem] w-[1.5rem]" /> Dashboard */}
          Reports
        </Link>

        <Link className="p-2 mb-2 flex items-center gap-2" to="/racks">
          {/* <RxDashboard className="text-md h-[1.5rem] w-[1.5rem]" /> Dashboard */}
          Racks
        </Link>
      </div>
    </div>
  );
}
