import { Blocks } from "react-loader-spinner";

function Loader({ loader }) {
  return (
    <div id="overlay" style={{ display: loader ? "block" : "none" }}>
      <Blocks
        height="80"
        width="80"
        color="#4fa94d"
        ariaLabel="blocks-loading"
        // wrapperStyle={{}}
        wrapperClass="blocks-wrapper loader"
        visible={true}
      />
    </div>
  );
}

export default Loader;
