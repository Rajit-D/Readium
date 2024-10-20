import Quotes from "../components/Quotes";
import Auth from "../components/Auth";

const Signup = () => {
  return (
    <div className="grid lg:grid-cols-2 grid-cols-1">
      <div className="">
        <Auth type="signup" />
      </div>
      <div className="hidden lg:block">
        <Quotes />
      </div>
    </div>
  );
};

export default Signup;
