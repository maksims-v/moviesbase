import { Fragment } from 'react';
import React, { useState } from 'react';
import MovieCard from '../movieCard/MovieCard.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { search_options, search_filter_data, search_counter } from '../../moviesSlice/moviesSlice';

import './searchPage.css';

function SearchPage() {
  const { data, searchFilterData, movieGenreData, count } = useSelector((state) => state);
  const dispatch = useDispatch();
  const [popularityValue, setPopularityValue] = useState('0');
  const [raitingValue, setRaitingValue] = useState('0');
  const [genreValue, setGenreValue] = useState('0');

  const resetSearchFilter = () => {
    dispatch(search_filter_data(data));
    setGenreValue('0');
    setRaitingValue('0');
    setPopularityValue('0');
  };

  const filterGenre = (e) => {
    const value = e.target.value;
    dispatch(search_options(false));
    setGenreValue(value);
    const filterSort = searchFilterData.filter(function (item) {
      return item.genre_ids.includes(Number(value));
    });
    dispatch(search_filter_data(filterSort));
  };

  const filterRaiting = (e) => {
    const value = e.target.value;
    setRaitingValue(value);
    if (value === '1') {
      const filterSort = searchFilterData.filter(function (item) {
        return item.vote_average <= 5;
      });
      dispatch(search_filter_data(filterSort));
    } else if (value === '2') {
      const filterSort = searchFilterData.filter(function (item) {
        return item.vote_average >= 5;
      });
      dispatch(search_filter_data(filterSort));
    }
  };

  const filterPopularity = (e) => {
    const value = e.target.value;
    setPopularityValue(value);
    if (value === '1') {
      const filterSort = searchFilterData.filter(function (item) {
        return item.popularity <= 100;
      });
      dispatch(search_filter_data(filterSort));
    } else if (value === '2') {
      const filterSort = searchFilterData.filter(function (item) {
        return item.popularity > 100 && item.vote_count > 200;
      });
      dispatch(search_filter_data(filterSort));
    }
  };

  return (
    <div className="search_wrapper">
      <div className="search_container">
        <select value={genreValue} onChange={filterGenre} className="search_filter ">
          <option value="0" select>
            ???????????????? ????????
          </option>
          {movieGenreData.map((item) => (
            <Fragment key={item.id}>
              <option value={item.id} select>
                {item.name}
              </option>
            </Fragment>
          ))}
        </select>
        <select value={raitingValue} onChange={filterRaiting} className="search_filter ">
          <option value="0" select>
            ???????????????? ????????????
          </option>
          <option value="1">????????????</option>
          <option value="2">??????????????</option>
        </select>
        <select value={popularityValue} onChange={filterPopularity} className="search_filter ">
          <option value="0" select>
            ???????????????? ????????????????????????
          </option>
          <option value="1">??????????????????????</option>
          <option value="2">????????????????????</option>
        </select>
      </div>
      <div className="search_movie_count">?????????????? ??????????????: {searchFilterData.length}</div>
      <div className="search_card">
        <div className="search_buttons">
          <button onClick={() => dispatch(search_counter())}>??????????????????</button>
          <button onClick={resetSearchFilter}>???????????????? ????????????</button>
        </div>
        <div className="search_item">
          {searchFilterData.length === 0 ? (
            <span className="search_text">
              ????????????????, ???? ?????????????????? ?????????????????? ????????????, ?????????????? ???????? ( <br />
              ?????????????? ?????????? ????????????.
            </span>
          ) : (
            searchFilterData.map((item) => {
              return <MovieCard key={item.id} item={item} />;
            })[count]
          )}
        </div>
      </div>
    </div>
  );
}

export default SearchPage;
