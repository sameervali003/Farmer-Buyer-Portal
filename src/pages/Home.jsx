import Button from '../components/Button';

const Home = () => {
    return (
      <>
        <div className="w-full h-screen bg-[url('https://wallpaperaccess.com/full/1164171.jpg')] bg-cover flex items-center mt-[-78px]">
          <div className="md:mx-40 sm:mx-20 2xs:mx-10 select-none">
          <h2 className="xs:text-2xl text-xl text-white text-opacity-70">Make it easy</h2>
          <h1 className='xs:text-6xl 2xs:text-3xl text-xl text-slate-400 text-opacity-90'>FARMEASY</h1>
                       <div className='mt-6'>
                 <Button>Get Started </Button>
              </div>
          </div>
        </div>


       
        <div className="mt-8 mx-10" id="about">

        <h1 className="text-3xl text-orange-900 font-bold ">What we do</h1>
        <br />
        <p className="text-black text-lg">
          {" "}
          “Our goal is to provide utilitarian services, which can make them more productive, like detecting diseases, and to create a platform where farmers can share their resources with their peers.”{" "}
        </p>

        <h1 className="mt-5 text-3xl text-orange-900 font-bold ">VISION</h1>
        <p className="text-black text-lg">
          {" "}
          We want to build app which every farmer in the country to utilize the immensely useful features. Starting with the proactive feature of detecting diseases, to sharing resources among the other farmers in the community, to selling their yield directly to the customers. We hope this user-friendly app will help them in making prudent decisions and increase their yield to the maximum.{" "}
        </p>
        <h1 className="mt-5 text-3xl text-orange-900 font-bold ">OUR TEAM</h1>
       
        <br />
        <ul className="list-disc list-inside">
          <li>Sai Gopal</li>
          <li>Hemanth</li>
          <li>Saran</li>
          <li>Avinash</li>
          <li>Pranav</li>
          <li>Rakshit</li>
          <li>Rahul</li>
          <li className='mb-8'>Jeshwanth</li>
  
        </ul>

        
      </div>
      </>
    );
  };
  
export default Home;