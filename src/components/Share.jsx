import ProductCard from "./ProductCard";
const Share = () => {
    return (
      <>
        <div className="flex flex-row-4 py-2 ">
        <div class="px-2 pb-2">
            <ProductCard className="px-5 w-60 h-100"> </ProductCard>
        </div>
        <div class="px-2 pb-2">
            <ProductCard className="px-5 w-60 h-100"> </ProductCard>
        </div>
        </div>
      </>
    );
  };
  
export default Share;