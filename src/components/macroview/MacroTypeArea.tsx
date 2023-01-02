import {
  HStack,
  IconButton,
  Text,
  useColorModeValue,
  StackDivider
} from '@chakra-ui/react'
import { HiArrowRight, HiArrowDownTray, HiArrowPath } from 'react-icons/hi2'
import { useMacroContext } from '../../contexts/macroContext'
import { MacroType } from '../../enums'
import { checkIfStringIsNonNumeric } from '../../utils'

export default function MacroTypeArea() {
  const { macro, updateMacroType } = useMacroContext()
  const borderColour = useColorModeValue('gray.400', 'gray.600')
  const typeIcons = [
    <HiArrowRight />,
    <HiArrowPath />,
    <HiArrowDownTray />
  ]

  return (
    <HStack
      w="fit"
      h="fit"
      p="2"
      border="1px"
      borderColor={borderColour}
      divider={<StackDivider />}
      rounded="md"
      spacing="16px"
    >
      <Text fontWeight="semibold" fontSize={['sm', 'md']}>
        Macro Type
      </Text>
      <HStack>
        {(Object.keys(MacroType) as Array<keyof typeof MacroType>)
          .filter(checkIfStringIsNonNumeric)
          .map((value: string, index: number) => (
            <IconButton
              icon={typeIcons[index]}
              aria-label="macro type button"
              size="sm"
              colorScheme={macro.macro_type === value ? 'primary-accent' : 'gray'}
              onClick={() => updateMacroType(index)}
              key={value}
            ></IconButton>
          ))}
      </HStack>
    </HStack>
  )
}
