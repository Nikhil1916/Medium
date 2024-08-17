import Auth from "../Components/Auth";
import Quotes from "../Components/Quotes";
export const Signup = () => {
  return (
    <div className="block md:grid grid-cols-2">
      <div className=" h-screen">
        <Auth type={"signup"} />
      </div>
      <div className="hidden md:block">
        <Quotes />
      </div>
    </div>
  );
};
