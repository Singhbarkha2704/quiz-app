import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCategory } from './../store/CategorySlice';
import { fetchQuestions } from './../store/QuizSlice';

const Settings = () => {
  const category = useSelector(state => state.category.category);
  const loading = useSelector(state => state.category.loading);

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const [idState, setIdState] = useState(-1); //selected id

   
  const loadCategory = () => {
    if(loading)
     dispatch(fetchCategory());
  };
  
  useEffect(() => {
    loadCategory();
  }, []);

  const quizPlayer = (e) => {
    e.preventDefault();
    dispatch(fetchQuestions({ id: idState }));  //dispatching api
    navigate(`/quiz/:${idState}`);
  }

  const optionSelector = (e) => {
    e.preventDefault();
    const index = e.target.selectedIndex;
    console.log('index', index);
    const selectedId = category[index].id
    setIdState(selectedId);
    console.log(selectedId);
  }

  return (
    <div>
      <Helmet><title>Quiz App-Settings</title></Helmet>
      {console.log(category)}

        <h1 className='mt-4'>Settings</h1>
      <select className='mt-3 form-control-sm' onChange={(e) => {optionSelector(e)}}>
          {
          category.map((item,index) => (
            <option key={item.id} index={index}>{item.name}</option>   
          ))
          }
      </select>
      <div>
        <button className='fa fa-play btn btn-lg btn-success mt-4' onClick={quizPlayer}> Let's Start</button>
      </div>
          
    </div>
  )
}

export default Settings
