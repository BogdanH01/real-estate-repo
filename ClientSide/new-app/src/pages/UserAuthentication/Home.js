import React from "react";
import MainHeader from "../../components/UI/MainHeader";
import Oglasi from '../../components/oglasi/Oglasi';
import { useSelector } from "react-redux";

const Pretraga = React.lazy(() => import('../components/Pretraga'));
const DodajOglas = React.lazy(() => import('../components/DodajOglas'));

const Home = () => {
  const isLoggedIn = useSelector(state => state.login.isLoggedIn);

  return (
    <div>
      <MainHeader />
      {isLoggedIn && <Pretraga />}
      <Oglasi />
      {isLoggedIn && <DodajOglas />}
    </div>
  );
};

export default Home;
