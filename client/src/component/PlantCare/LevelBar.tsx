import { Progress, Heading, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import axios from 'axios'

const LevelBar = ({user, score, progress}) => {

  return (
    <div>
        <Heading>Sprout Growth</Heading>
        {/* <Heading size="lg">{`Level ${score.level}`}</Heading> */}
        {progress < 90 ? (<Heading size="lg">{`Level ${score.level}`}</Heading>) : (<Heading  bgGradient='linear(to-br, green.100, yellow.300)' bgClip='text' size="lg">{`Level ${score.level}`}</Heading>)}
        {/* look into min/max props */}
        <Progress bgGradient='linear(to-r, green.300, green.200, green.100)' colorScheme='green' height='22px' value={progress} hasStripe={true} isAnimated={true}/>
    </div>
  )
}

export default LevelBar;