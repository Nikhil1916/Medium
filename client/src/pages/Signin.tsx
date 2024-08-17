import Auth from '../Components/Auth';
import Quotes from '../Components/Quotes';

const Signin = () => {
    return (
        <div className="block md:grid grid-cols-2">
          <div className=" h-screen">
            <Auth type={"signin"} />
          </div>
          <div className="hidden md:block">
            <Quotes />
          </div>
        </div>
      );
}

export default Signin
