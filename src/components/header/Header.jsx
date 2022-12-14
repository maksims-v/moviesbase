import './header.css';
import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  search_options,
  detail_movie,
  exitAccount,
  openModal,
} from '../../moviesSlice/moviesSlice';
import { Link } from 'react-router-dom';
import Modal from '../modal/Modal';

function Header() {
  const { searchOptions, detailMovie, isAuth } = useSelector((data) => data);
  const dispatch = useDispatch();
  return (
    <>
      <div className="header_wrapper">
        {!detailMovie ? (
          <a
            href="/moviesbase"
            onClick={() => dispatch(detail_movie(false))}
            className="home"
            to="/moviesbase">
            MOVIE
          </a>
        ) : (
          <Link onClick={() => dispatch(detail_movie(false))} className="home" to="/search">
            MOVIE
          </Link>
        )}
        {searchOptions ? (
          <Link to="/search">
            <button className="header_button" onClick={() => dispatch(search_options(false))}>
              ПОИСК ФИЛЬМА
            </button>
          </Link>
        ) : (
          <Link to="/moviesbase">
            <button className="header_button" onClick={() => dispatch(search_options(true))}>
              ГЛАВНАЯ
            </button>
          </Link>
        )}
        {!isAuth ? (
          <button className="header_button" onClick={() => dispatch(openModal())}>
            Войти
          </button>
        ) : (
          <button className="header_button" onClick={() => dispatch(exitAccount())}>
            Выйти
          </button>
        )}
      </div>
      <Modal />
    </>
  );
}

export default Header;
