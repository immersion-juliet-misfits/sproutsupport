import { Progress, Heading } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import axios from 'axios'

const LevelBar = ({user, score, progress}) => {

  return (
    <div>
        <Heading>Sprout Growth</Heading>
        <Heading size="lg">{`Level ${score.level}`}</Heading>
        {/* look into min/max props */}
        <Progress colorScheme='green' height='22px' value={progress} hasStripe={true} isAnimated={true}/>
    </div>
  )
}

export default LevelBar;