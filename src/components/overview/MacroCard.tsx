import {
  Button,
  Flex,
  Text,
  IconButton,
  Switch,
  Divider,
  VStack,
  Kbd,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  useColorModeValue,
  Box,
  HStack,
  Tooltip
} from '@chakra-ui/react'
import { EditIcon } from '@chakra-ui/icons'
import { Macro } from '../../types'
import { HIDLookup } from '../../maps/HIDmap'
import { useApplicationContext } from '../../contexts/applicationContext'
import { useSelectedCollection } from '../../contexts/selectors'
import { mouseEnumLookup } from '../../maps/MouseMap'
import { useCallback } from 'react'
import { KebabVertical } from '../icons'

type Props = {
  macro: Macro
  index: number
  onDelete: (index: number) => void
}

export default function MacroCard({ macro, index, onDelete }: Props) {
  const { selection, onCollectionUpdate, changeSelectedMacroIndex } =
    useApplicationContext()
  const currentCollection = useSelectedCollection()
  const bg = useColorModeValue('primary-light.200', 'primary-dark.900')
  const secondBg = useColorModeValue('primary-light.300', 'primary-dark.800')
  const shadowColour = useColorModeValue('md', 'white-md')
  const subtextColour = useColorModeValue(
    'primary-light.600',
    'primary-dark.400'
  )
  const borderColour = useColorModeValue(
    'primary-light.300',
    'primary-dark.700'
  )

  const onToggle = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const newCollection = { ...currentCollection }
      newCollection.macros[index].active = event.target.checked
      onCollectionUpdate(newCollection, selection.collectionIndex)
    },
    [currentCollection, index, onCollectionUpdate, selection.collectionIndex]
  )

  const onDuplicate = useCallback(() => {
    const newCollection = { ...currentCollection }
    newCollection.macros.push(macro)
    onCollectionUpdate(newCollection, selection.collectionIndex)
  }, [currentCollection, macro, onCollectionUpdate, selection.collectionIndex])

  return (
    <VStack
      w="100%"
      h="full"
      bg={bg}
      boxShadow={shadowColour}
      rounded="md"
      p="3"
      m="auto"
      justifyContent="space-between"
      spacing="8px"
    >
      {/** Top Row */}
      <HStack w="100%" justifyContent="space-between">
        <Flex w="100%" gap="8px" alignItems="center">
          <Box maxHeight="32px">
            <em-emoji shortcodes={macro.icon} size="32px" />
          </Box>
          <Text fontWeight="semibold">{macro.name}</Text>
        </Flex>
        <Menu variant="brand">
          <MenuButton
            as={IconButton}
            aria-label="Kebab Menu Button"
            icon={<KebabVertical />}
            variant="link"
          />
          <MenuList p="2" right={0}>
            <MenuItem onClick={onDuplicate}>Duplicate</MenuItem>
            {/* <MenuItem isDisabled>Move to Collection</MenuItem> */}
            {/* <MenuItem isDisabled>Export</MenuItem> */}
            <Divider />
            <MenuItem onClick={() => onDelete(index)} textColor="red.500">
              Delete
            </MenuItem>
          </MenuList>
        </Menu>
      </HStack>
      {/** Trigger Keys Display */}
      <VStack w="100%" spacing={1}>
        <Text fontSize="sm" color={subtextColour} alignSelf="self-start">
          Trigger Keys:
        </Text>
        <Flex w="100%" gap="4px" bg={secondBg} rounded="md" py="1" px="2">
          {macro.trigger.type === 'KeyPressEvent' &&
            macro.trigger.data.map((HIDcode) => (
              <Kbd variant="brand" key={HIDcode}>
                {HIDLookup.get(HIDcode)?.displayString}
              </Kbd>
            ))}
          {macro.trigger.type === 'MouseEvent' && (
            <Box>{mouseEnumLookup.get(macro.trigger.data)?.displayString}</Box>
          )}
        </Flex>
      </VStack>
      <Divider borderColor={borderColour} />
      {/** Buttons */}
      <Flex w="100%" alignItems="center" justifyContent="space-between">
        <Button
          size="sm"
          variant="brand"
          leftIcon={<EditIcon />}
          onClick={() => {
            changeSelectedMacroIndex(index)
          }}
        >
          Edit
        </Button>
        <Tooltip
          variant="brand"
          placement="bottom"
          hasArrow
          aria-label="Toggle Macro Switch"
          label={macro.active ? 'Disable Macro' : 'Enable Macro'}
        >
          <Box>
            <Switch
              variant="brand"
              defaultChecked={macro.active}
              onChange={onToggle}
            />
          </Box>
        </Tooltip>
      </Flex>
    </VStack>
  )
}
