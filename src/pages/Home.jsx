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
      </>
    );
  };
  
export default Home;