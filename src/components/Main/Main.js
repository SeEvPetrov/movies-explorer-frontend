import Header from '../Header/Header';
import MainHeader from '../Header/MainHeader/MainHeader';
import Promo from '../Main/Promo/Promo';
import NavTab from '../Main/NavTab/NavTab';
import AboutProject from '../Main/AboutProject/AboutProject';
import Techs from '../Main/Techs/Techs';
import AboutMe from '../Main/AboutMe/AboutMe';
import Portfolio from '../Main/Portfolio/Portfolio';
import Footer from '../Footer/Footer';
import MoviesHeader from '../Header/MoviesHeader/MoviesHeader';

function Main({ loggedIn }) {
  return (
    <>
      {loggedIn ? (
        <Header
          color={'header__theme_blue'}
          location={'header__container_movies'}
        >
          <MoviesHeader />
        </Header>
      ) : (
        <Header
          color={'header__theme_blue'}
          location={'header__container_landing'}
        >
          <MainHeader />
        </Header>
      )}
      <main className='landing'>
        <Promo />
        <NavTab />
        <AboutProject />
        <Techs />
        <AboutMe />
        <Portfolio />
      </main>
      <Footer />
    </>
  );
}

export default Main;
