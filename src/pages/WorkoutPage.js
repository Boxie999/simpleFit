import React, {useState} from 'react'
import ExerciseCard from '../components/ExerciseCard'
import Timer from '../components/Timer'
import TimerCard from '../components/TimerCard'
import "../styles/WorkoutPage.css"


const WorkoutPage = () => {
  const [exerciseInProgress, setExerciseInProgress] = useState(true)
  const [timeRemaining, setTimeRemaining] = useState(30)
  const [exerciseIndex, setExerciseIndex] = useState(0)

  return (
    <div className='workoutPage'>
      
      
      < TimerCard  exerciseInProgress={exerciseInProgress}
      exerciseIndex={exerciseIndex}
      timeRemaining={timeRemaining}/>


       
      
    </div>
    
  )
}

export default WorkoutPage