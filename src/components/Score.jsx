import React from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom'

const Score = () => {
    const params = useParams();
  return (
    <div>
          <h1 className='heading'>ScoreBoard</h1>
          <h2>Score {params.score}</h2>
          <Link to='/settings' ><button>Go to Settings</button></Link>
    </div>
  )
}

export default Score
