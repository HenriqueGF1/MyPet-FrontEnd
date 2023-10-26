import { useContext } from "react";
import { Context } from "../context/apiContext";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar/NavBar";

function Home() {
  const { authenticated } = useContext(Context);

  return (
    <>
      <h1>Home</h1>
      <NavBar />
    </>
  );
}

export default Home;
