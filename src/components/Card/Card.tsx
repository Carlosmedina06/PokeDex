import React from 'react'
import { useQuery } from '@tanstack/react-query'
import { useNavigation } from '@react-navigation/native'
import {
  Center,
  Image,
  Box,
  HStack,
  Stack,
  Pressable,
  Heading,
  AspectRatio,
  Text,
} from 'native-base'
import { ActivityIndicator } from 'react-native'

import {
  formatNumber,
  getTypeColor,
  type MainStackScreenProps,
  type Pokemon,
  type PokeProps,
} from '../../interfaces'

export async function fetchFn(endpoint: string): Promise<Pokemon> {
  const response = await fetch(endpoint)
  const data = await response.json()

  return data
}
export default function Card({ url, name }: PokeProps) {
  const { isLoading, error, data } = useQuery<Pokemon>(
    ['pokemon', name],
    async () => await fetchFn(url),
  )

  const navigation = useNavigation<MainStackScreenProps<'Home'>['navigation']>()

  return (
    <>
      {(data == null && !isLoading) || Boolean(error) ? <Text>Error</Text> : null}
      {isLoading && <ActivityIndicator />}
      {data != null && (
        <Pressable
          backgroundColor={getTypeColor(data?.types[0].type.name) + '.500'}
          flex={1}
          m="1.5"
          p="4"
          rounded="md"
          onPress={() => {
            navigation.navigate('Details', { name })
          }}
        >
          <Center>
            <Stack alignItems={'center'}>
              <Text>#{formatNumber(data.id)}</Text>
              <Heading
                _dark={{
                  color: 'white',
                }}
                _light={{
                  color: 'white',
                }}
                mt={2}
                size="md"
                textTransform={'capitalize'}
              >
                {data?.name}
              </Heading>
            </Stack>
            <AspectRatio ratio={1} width="80%">
              <Image
                alt={data?.name}
                borderRadius={10}
                resizeMode="cover"
                source={{
                  uri: data?.sprites.front_default,
                }}
              />
            </AspectRatio>
            <HStack mt={5} space={2}>
              {data?.types.map((type) => (
                <Box
                  key={type.type.name}
                  _text={{
                    color: 'white',
                    fontWeight: 'bold',
                    fontSize: 'sm',
                    textTransform: 'capitalize',
                  }}
                  backgroundColor={getTypeColor(type.type.name) + '.400'}
                  px={2}
                  py={1}
                  rounded="md"
                >
                  {type.type.name}
                </Box>
              ))}
            </HStack>
          </Center>
        </Pressable>
      )}
    </>
  )
}
