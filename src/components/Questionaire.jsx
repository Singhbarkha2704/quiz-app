import React, { useState} from 'react';
import './style.css';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { useSelector} from 'react-redux';

const Questionaire = () => {
  //select from redux slice
  const questions = useSelector(state => state.quiz.questions);
  const loading = useSelector(state => state.quiz.loading);

  const [currentIdx, setCurrentIdx] = useState(0);
  const [score, setScore] = useState(0);
  const [showAnswers, setShowAnswers] = useState(false);

  const navigate = useNavigate();

  
  //sorting in random order
  const shuffledAnswer = [questions[currentIdx].correct_answer, ...questions[currentIdx].incorrect_answers].sort(() => Math.random() - 0.5);
  
  const handleAnswer = (e, item) => {
    e.preventDefault();
    if (!showAnswers) {
      //prevent double answers
      if (item === questions[currentIdx].correct_answer) {
      setScore(score + 1);
      }
    }
    setShowAnswers(true);
  };

  const handleNext = (event) => { 
    event.preventDefault();
    setShowAnswers(false);
      setCurrentIdx(currentIdx + 1);   
  };

  return (
    <div>
      {console.log(`questions`, questions)}
      
      <Helmet><title>Quiz App-Playground</title></Helmet>
      {
        currentIdx>=questions.length-2 ? (
          navigate(`/score/:${score}`)
        ):
        !loading && questions.length > 0 ?
        (
        <>
        <h1 className='heading'>PlayGround</h1>
          <div className='playground'>
            <div>
              <span className='me-5 text-secondary'>{currentIdx + 1} out of {questions.length}</span> 
              <span className='ms-5'>Score: {score}/10</span>
            </div>
            
            <div>
              <div>
                <h4 dangerouslySetInnerHTML={{__html:questions[currentIdx].question}}/>
              </div>

              <div className='container d-grid'>
                <div className='row'>
                  <div className='col-md-6 custom-col'>                       
                    {
                      shuffledAnswer.map((item, index) => {
                        
                        const bgColor = showAnswers ?
                          (item === questions[currentIdx].correct_answer)
                            ? 'btn-success'
                            : 'btn-danger'
                          : 'default-btn';
                        
                        // const textColor = showAnswers ? 'text-white' : 'text-dark';

                        return ( 
                            <button
                            key={index}
                            className={` btn btn-lg  ${bgColor} text-white custom-btn`}
                            onClick={(e) => { handleAnswer(e, item) }}
                          >
                            {item}
                          </button>
                          
                        )
                      })
                    }
                    </div>
                  </div>
                </div>    

              {showAnswers && (
                <button className='btn btn-lg btn-info fa fa-hand-o-right' onClick={(e) => { handleNext(e) }}>next</button>   
              )}
              
            </div>  
           
          </div>
        </>)
        :
        (<pre>loading..</pre>)
      }      
    </div>
  )
}

export default Questionaire;
