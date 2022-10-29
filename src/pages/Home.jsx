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

        <div className='mt-10' id="#about">
          <div className='md:mx-40 sm:mx-20 2xs:mx-10'>
            <h1 className='text-3xl text-slate-400 text-opacity-90 mb-4'> What we do </h1>
            <p className='text-xl text-slate-400 text-opacity-70'>Our goal is to provide utilitarian services, which can make them more productive, like detecting diseases, and to create a platform where farmers can share their resources with their peers.</p>
            
            <div className='mt-10'>
              <div className='grid grid-cols-2 gap-4'>
                <div className=''>
                  <h1 className='text-2xl text-slate-400 text-opacity-90'>For Farmers</h1>
                  <p className='text-xl text-slate-400 text-opacity-70'>We provide a platform for farmers to sell their products directly to the consumers.</p>
                  </div>
        </div>
        </div>
        </div>
        </div>
      </>
    );
  };
  
export default Home;