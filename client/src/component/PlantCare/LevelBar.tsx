import { Progress, Heading } from '@chakra-ui/react'

const LevelBar = ({user}) => {
 
  return (
    <div>
        <Heading size="lg">{`Level ${user.level} ${user.points}`}</Heading>
        <Progress colorScheme='green' height='22px' value={20} />
    </div>
  )
}

export default LevelBar;