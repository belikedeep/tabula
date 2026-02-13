import {
  RegisterLink,
  LoginLink,
} from "@kinde-oss/kinde-auth-nextjs/components";

const Header = () => {
  return (
    <div className="flex gap-10 justify-center">
      <LoginLink>Login</LoginLink>
      <RegisterLink>Register</RegisterLink>
    </div>
  );
};

export default Header;
