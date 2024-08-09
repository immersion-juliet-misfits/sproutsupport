import { Progress, Heading } from '@chakra-ui/react'

const LevelBar = () => {
 
  return (
    <div>
        <Heading size="lg">{`Level ${"hi"}`}</Heading>
        <Progress colorScheme='green' height='22px' value={20} />
    </div>
  )
}

export default LevelBar;