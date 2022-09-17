import videobg from '../../src/components/assets/video2.mp4';
import Button from './Button';

const Section = () => {
    return (
        <>
        <div className="w-full h-screen flex items-center">
            <video src={videobg} autoPlay loop w-full h-full object-cover className="fixed -z-10" />
            <div className='uppercase text-center text-black font-extrabold px-40'>
              <h3>Make it easy</h3>
              <h1 className='text-8xl '>FARMEASY</h1>
              <Button>Get Started </Button>
          </div>
        </div>
    
      </>
    );
  };
  
  export default Section;