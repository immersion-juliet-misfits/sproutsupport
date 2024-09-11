import { Progress, Heading, Text } from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import axios from 'axios'

const LevelBar = ({user, score, progress}) => {

  return (
    <div>
        <Heading size="lg">Sprout Growth</Heading>
        {/* <Heading size="lg">{`Level ${score.level}`}</Heading> */}
        {progress < 90 ? (<Heading size="lg">{`Level ${score.level}`}</Heading>) : (<Heading  bgGradient='linear(to-br, #93c482, #b9da44)' bgClip='text' size="lg">{`Level ${score.level}`}</Heading>)}
        {/* look into min/max props */}
        <Progress sx={{'& > div': {
          backgroundColor: '#b9da44'
        }}} borderRadius="lg" bgGradient='linear(to-r, #4AAD52, #6EB257, #93c482)' height='22px' value={progress} hasStripe={true} isAnimated={true}/>
    </div>
  )
}

export default LevelBar;