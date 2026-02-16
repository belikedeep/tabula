import { Button } from "@/components/ui/button";
import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";

const Header = () => {
  return (
    <div className="w-full border-b-2 border-foreground bg-background py-4">
      <div className="container mx-auto flex items-center justify-between px-4">
        <div className="flex items-center gap-8">
          <h1 className="text-2xl font-semibold tracking-tighter uppercase select-none">
            Tabula
          </h1>
          <div className="hidden md:flex gap-6">
            <Button variant="secondary" className="bg-yellow-400">
              Home
            </Button>
            <Button variant="secondary" inverse>
              Pricing
            </Button>
            <Button variant="secondary" inverse>
              Features
            </Button>
            <Button variant="secondary" inverse>
              About
            </Button>
          </div>
        </div>

        <div className="flex gap-4 uppercase">
          <LoginLink>
            <Button className="bg-red-500">Login</Button>
          </LoginLink>
          <RegisterLink>
            <Button className="">Register</Button>
          </RegisterLink>
        </div>
      </div>
    </div>
  );
};

export default Header;
