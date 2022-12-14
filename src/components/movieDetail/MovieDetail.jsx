import './movieDetail.css';
import favoriteImg from './img/favorite.svg';
import favoriteOK from './img/favoriteOK.svg';
import addToBookmark from './img/bookmarks.svg';
import bookmarkRemove from './img/bookmarksOK.svg';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  detail_movie,
  add_to_favorite_arr,
  filtered_sort_data,
  movie_with_favorite_data,
  add_to_bookmarks_arr,
} from '../../moviesSlice/moviesSlice';

const icontitle = {
  addfav: 'Добавить в избранное',
  removefav: 'Удалить из избранного',
  addbookmark: 'Смотреть позже',
  removebookmarks: 'Удалить из списка',
};

const MovieDetail = () => {
  const {
    searchOptions,
    detailMovie,
    movieGenreData,
    favoriteOn,
    isAuth,
    favoriteArr,
    bookmarksArr,
    sortData,
  } = useSelector((data) => data);

  function addToFavoriteArray(item, arr) {
    if (isAuth) {
      const sortetArray = sortData.map((movie) => {
        if (item.id == movie.id && item.favorite === false) {
          dispatch(add_to_favorite_arr([...arr, ...[{ ...item, favorite: true }]]));
          dispatch(detail_movie({ ...item, favorite: true }));
          return { ...movie, favorite: true };
        } else if (item.id == movie.id && item.favorite === true) {
          dispatch(add_to_favorite_arr(arr.filter((movie) => movie.id != item.id)));
          dispatch(detail_movie({ ...item, favorite: false }));
          return { ...movie, favorite: false };
        }
        return movie;
      });
      dispatch(filtered_sort_data(sortetArray));
      dispatch(movie_with_favorite_data(sortetArray));
    } else {
      alert('Нужно войти в аккаунт! ');
    }
  }

  const { release_date, vote_average, genre_ids, backdrop_path, title, overview } = detailMovie;
  const dispatch = useDispatch();

  const addToFavorite = (detailMovie) => {
    addToFavoriteArray(detailMovie, favoriteArr);
  };

  const addToBookmarks = ({ detailMovie, bookmarksArr }) => {
    if (isAuth) {
      const sortetArray = sortData.map((movie) => {
        if (detailMovie.id == movie.id && detailMovie.bookmarks === false) {
          dispatch(
            add_to_bookmarks_arr([...bookmarksArr, ...[{ ...detailMovie, bookmarks: true }]]),
          );
          dispatch(detail_movie({ ...detailMovie, bookmarks: true }));

          return { ...movie, bookmarks: true };
        } else if (detailMovie.id == movie.id && detailMovie.bookmarks === true) {
          dispatch(
            add_to_bookmarks_arr(bookmarksArr.filter((movie) => movie.id != detailMovie.id)),
          );
          dispatch(detail_movie({ ...detailMovie, bookmarks: false }));

          return { ...movie, bookmarks: false };
        }
        return movie;
      });
      dispatch(filtered_sort_data(sortetArray));
      dispatch(movie_with_favorite_data(sortetArray));
    } else {
      alert('Нужно войти в аккаунт! ');
    }
  };

  const genre = movieGenreData.filter((item) => genre_ids.includes(item.id));

  const picture = `https://image.tmdb.org/t/p/w500${backdrop_path}`;

  return (
    <div className="movie_detail_wrapper">
      <div className="movie_detail_wrapper_header_img">
        <img src={picture} alt="" />
      </div>
      <div className="movie_detail_wrapper_header_description">
        {!searchOptions || favoriteOn ? null : (
          <div className="favoritesIcon">
            <div onClick={() => addToFavorite(detailMovie)} className="favoritesIcon" href="">
              <img
                className="movie_card_img1"
                title={!detailMovie.favorite ? icontitle.addfav : icontitle.removefav}
                src={!detailMovie.favorite ? favoriteImg : favoriteOK}
                alt=""
              />
            </div>
            <div
              onClick={() => addToBookmarks({ detailMovie, bookmarksArr })}
              className="favoritesIcon"
              href="">
              <img
                className="movie_card_img2"
                title={!detailMovie.favorite ? icontitle.addbookmark : icontitle.removebookmarks}
                src={!detailMovie.bookmarks ? addToBookmark : bookmarkRemove}
                alt=""
              />
            </div>
          </div>
        )}
        <div className="movie_description_tittle">{title}</div>
        <div className="movie_genre">Жанр: {`${genre.map((item) => item.name)}`}</div>
        <div className="movie_description_raiting">
          Рейтинг: <span className="raiting_color">{vote_average}</span>{' '}
          <span>Дата выхода: {release_date} </span>
        </div>
        <div className="movie_description_text">{overview}</div>
        <div className="movie_description_bottom">
          {!searchOptions ? (
            <Link onClick={() => dispatch(detail_movie(false))} to="/search">
              Назад
            </Link>
          ) : (
            <Link onClick={() => dispatch(detail_movie(false))} to="/moviesbase">
              Назад
            </Link>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetail;
