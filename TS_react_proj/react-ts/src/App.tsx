
import { useState } from "react";

import Header from "./components/Header";
import goalsImg from "./assets/goals.jpg";
import CourseGoals from "./components/CourseGoals";
import NewGoal from "./components/NewGoal";

function App() {
  const [goals, setGoals] = useState([
    { id: 1, title: 'Learn TS', description: 'Learne TS from the ground up' },
    { id: 2, title: 'Practice TS', description: 'Practis TS from rice till down' }
  ]);

  function handleDeleteGoal(id: number) {
    setGoals((prevGoals) => prevGoals.filter(g => g.id !== id));
  }

  function hendleAddGoal(text: string, summary: string) {
    setGoals((prevGoals) => {
      return prevGoals.concat({ id: Math.random(), title: text, description: summary });
    })
  }

  return (
    <>
      <main>
        <Header image={{ src: goalsImg, alt: 'list of goals' }}>
          <h1>Oure Course Goals</h1>
        </Header>
        <NewGoal onAdd={hendleAddGoal} />
        <CourseGoals goals={goals} onDelete={handleDeleteGoal} />
      </main>
    </>
  )
}

export default App;
