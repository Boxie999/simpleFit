import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Header from './components/Header';
import Home from './pages/Home';
import Home2 from './pages/Home2';
import BuildWorkout from './pages/BuildWorkout';
import BuildWorkoutX from './pages/BuildWorkoutX';
import WorkoutPicker from './pages/WorkoutPicker';
import WorkoutPage from './pages/WorkoutPage';
import List from './components/List';
import FavouriteExercises from './pages/FavouriteExercises';
import exercises from "./exercises.json";
import WorkoutConfirm from "./pages/WorkoutConfirm";
import WorkoutFinish from "./pages/WorkoutFinish";
import WorkoutList from "./pages/WorkoutList";
import { searchOptions, retrieveApiData } from './utils/retrieveApiData';

function App() {
  let localStorageArray;
  if(!(JSON.parse(localStorage.getItem("workout builder list")))) {
      localStorageArray=[];
  } else {
      localStorageArray = JSON.parse(localStorage.getItem("workout builder list"));
      
  }
    const [searchTerm, setSearchTerm] = useState(""); // This tracks and represents what the user will type into the search field
    const [exerciseList, setExerciseList] = useState(localStorageArray) // excercise list *Global State*
    const [exerciseResults, setExerciseResults] = useState([]); // This tracks and represents the entire COLLECTION of search results DISPLAYED after the user search is submitted
    
    // Function that will be used to make the API call on submission

    const handleSubmit = async () => {
        
        if(searchTerm) {

            const exerciseApiResults = exercises;

            //= await retrieveApiData("https://exercisedb.p.rapidapi.com/exercises", searchOptions);

            // The searchOptions variable contains the information that will authorise the API call during the search

            // Now, we want to add actual search functionality, by filtering through the array of objects and grabbing all objects with values that correspond to the search term. The proviso is that they are all body weight exercises.

            const specificExerciseSearches = exerciseApiResults.filter((exercise) => (exercise.equipment.toLowerCase() === "body weight") 
            && (exercise.bodyPart.toLowerCase().includes(searchTerm)
            || exercise.equipment.toLowerCase().includes(searchTerm)
            || exercise.name.toLowerCase().includes(searchTerm)
            || exercise.target.toLowerCase().includes(searchTerm)
            )
            )
            
            // We want to ensure that, after the search result is submitted, the search field is cleared and the exerciseResult state value is set to the resulting data from the search.

            setSearchTerm("");

            setExerciseResults(specificExerciseSearches);
        }
    }



  return (
    <Router>
      <Header />
      <div>
        {/* Wrap Route elements in a Routes component */}
        <Routes>
          {/* Define routes using the Route component to render different page components at different paths */}
          {/* Define a default route that will render the Home component */}
          <Route path="/" element={<Home />} />
          <Route path="WorkoutPicker" element={<WorkoutPicker />} />
          <Route path="Home2" element={<Home2 />} />
          <Route path="BuildWorkout" element={<BuildWorkout />} />
          <Route path="Timer" element={<WorkoutPage />} />
          <Route path="BuildWorkoutX" element={<BuildWorkoutX searchTerm={searchTerm} setSearchTerm={setSearchTerm} handleSubmit={handleSubmit} exerciseResults={exerciseResults} setExerciseResults={setExerciseResults}/>} />
          <Route path="FavouriteExercises" element={<FavouriteExercises searchTerm={searchTerm} setSearchTerm={setSearchTerm} handleSubmit={handleSubmit} exerciseResults={exerciseResults} setExerciseResults={setExerciseResults} />} />
          <Route path="WorkoutConfirm" element={<WorkoutConfirm />} />
          <Route path="List" element={<List />} />
          <Route path="WorkoutPage" element={<WorkoutPage exerciseList={exerciseList} setExerciseList={setExerciseList} />} />
          <Route path="WorkoutFinish" element={<WorkoutFinish />} />
          <Route path="WorkoutList" element={<WorkoutList exerciseList={exerciseList} setExerciseList = {setExerciseList} />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
