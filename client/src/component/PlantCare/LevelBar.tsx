import { Progress, Heading } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import axios from 'axios'

const LevelBar = ({user, score}) => {
  // const [score, setScore] = useState(null) // source of issue
 
  // const getScore = () => {
  //   axios.get(`/plants/points/${user.id}`)
  //     .then((scorecard) => {
  //       console.log(scorecard)
  //     })
  // }

  // useEffect(() => {
  //   // getScore()
  // }, [getScore])

  return (
    <div>
        <Heading size="lg">{`Level ${score.level} ${score.points}`}</Heading>
        <Progress colorScheme='green' height='22px' value={score.points} />
    </div>
  )
}

export default LevelBar;