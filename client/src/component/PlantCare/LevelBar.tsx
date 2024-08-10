import { Progress, Heading } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import axios from 'axios'

const LevelBar = ({user}) => {
  const [score, setScore] = useState(null)
 
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
        <Heading size="lg">{`Level ${user.level} ${user.points}`}</Heading>
        <Progress colorScheme='green' height='22px' value={20} />
    </div>
  )
}

export default LevelBar;