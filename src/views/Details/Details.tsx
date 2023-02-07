/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
/* eslint-disable @typescript-eslint/strict-boolean-expressions */
import type React from 'react'

import { useQuery } from '@tanstack/react-query'
import { AspectRatio, Image, Text, Heading, Stack, HStack, Center, Skeleton } from 'native-base'

import {
  type Pokemon,
  type MainStackScreenProps,
  getTypeColor,
  formatNumber,
  type Species,
  removeEscapeCharacters,
} from '../../interfaces'
import { fetchFn } from '../../components/Card/Card'

const Details = ({ route }: MainStackScreenProps<'Details'>) => {
  const { name, url } = route.params
  const { data } = useQuery<Pokemon>(['pokemon', name], async () => await fetchFn(url))
  const { isLoading: isSpeciesLoading, data: species } = useQuery<Species>(
    ['species', name],
    async () => await fetchFn(data?.species.url || ''),
    {
      enabled: !(data == null),
    },
  )

  if (data == null) return null

  return (
    <Stack>
      <Center safeArea backgroundColor={getTypeColor(data?.types[0].type.name) + '.500'}>
        <Heading
          _dark={{
            color: 'white',
          }}
          _light={{
            color: 'white',
          }}
        >
          #{formatNumber(data.id)}
        </Heading>
        <Heading
          _dark={{
            color: 'white',
          }}
          _light={{
            color: 'white',
          }}
        >
          {data.name}
        </Heading>
        <AspectRatio ratio={1} width="80%">
          <Image
            alt={data?.name}
            resizeMode="cover"
            source={{
              uri: data?.sprites.front_default,
            }}
          />
        </AspectRatio>
      </Center>
      <Stack p="3">
        <HStack justifyContent="center">
          {data.types.map((type) => (
            <Center
              key={type.type.name}
              _text={{
                color: 'white',
                fontSize: 'lg',
                fontWeight: 'bold',
                textTransform: 'capitalize',
              }}
              backgroundColor={getTypeColor(type.type.name) + '.500'}
              minW="32"
              mx="2"
              p="1"
              rounded="full"
            >
              {type.type.name}
            </Center>
          ))}
        </HStack>
        <Center>
          <Text fontSize="xl" mt="4">
            {data.height / 10} m
          </Text>
          <Text fontSize="xl" mt="4">
            {data.weight / 10} kg
          </Text>
          {isSpeciesLoading && <Skeleton.Text />}
          {!!species && (
            <Text fontSize="xl" mt="4">
              {removeEscapeCharacters(species.flavor_text_entries[0].flavor_text)}
            </Text>
          )}
        </Center>
      </Stack>
    </Stack>
  )
}

export default Details
