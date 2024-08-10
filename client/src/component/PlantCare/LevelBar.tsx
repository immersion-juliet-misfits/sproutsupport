import { Progress, Heading } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import axios from 'axios'

const LevelBar = ({user, score, progress}) => {

  return (
    <div>
        <Heading size="lg">{`Level ${score.level} ${progress}`}</Heading>
        <Progress colorScheme='green' height='22px' value={progress} />
    </div>
  )
}

export default LevelBar;