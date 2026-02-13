import { useKindeBrowserClient } from "@kinde-oss/kinde-auth-nextjs";
import SideNavTopSection from "./sideNavTopSection";

const SideNav = () => {
  const { user } = useKindeBrowserClient();
  return (
    <div className="bg-gray-300 h-screen fixed w-72 border-r border-gray-200">
      <SideNavTopSection user={user} />
    </div>
  );
};

export default SideNav;
