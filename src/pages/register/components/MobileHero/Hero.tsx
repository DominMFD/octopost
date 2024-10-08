import { ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from '~components/Button/Button';

import scss from './Hero.module.scss';

import Octo from './images/octo.svg?react';
import OctopostLogo from './images/octopost.svg?react';

function Hero(): ReactNode {
  const navigate = useNavigate();

  return (
    <div className={scss.mobileHeroWrapper}>
      <header className={scss.header}>
        <a aria-label="octopost logo" href="/">
          <OctopostLogo />
        </a>
        <Button
          className={scss.signin}
          color="secondary"
          onClick={() => navigate('/login')}
        >
          Sign in
        </Button>
      </header>
      <section className={scss.hero}>
        <h1 className={scss.title}>New here?</h1>
        <h2 className={scss.description}>
          Welcome to Octopost. Enter your personal details and start your
          journey with us
        </h2>
      </section>
      <div className={scss.mobileOcto} data-testId="octopost-icon">
        <Octo id="mobile-icon" />
      </div>
    </div>
  );
}

export default Hero;
