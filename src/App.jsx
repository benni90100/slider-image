import "./App.css";
import { ImageSlider } from "./component/ImageSlider";

function App() {
  return (
    <>
      <div className="cont">
        <ImageSlider url={"https://fakestoreapi.com/products"} />
      </div>
    </>
  );
}

export default App;
