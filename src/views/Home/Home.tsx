import React from 'react'
import { Spinner, FlatList, Center } from 'native-base'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useInfiniteQuery } from '@tanstack/react-query'
import { ActivityIndicator } from 'react-native'

import { type AllPoke } from '../../interfaces'
import Card from '../../components/Card/Card'

export async function fetchAllPokemon({ pageParam }: { pageParam?: string }) {
  const response = await fetch(pageParam ?? 'https://pokeapi.co/api/v2/pokemon')

  return await response.json()
}

export default function Home() {
  const { data, isLoading, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useInfiniteQuery<AllPoke>(['pokemon'], fetchAllPokemon, {
      getNextPageParam: (lastPage) => lastPage.next ?? undefined,
    })

  const loadMore = () => {
    if (hasNextPage ?? false) {
      fetchNextPage().catch((err) => {
        // eslint-disable-next-line no-console
        console.error(err)
      })
    }
  }

  if (isLoading)
    return (
      <Center flex={1}>
        <Spinner />
      </Center>
    )

  return (
    <SafeAreaView>
      <FlatList
        ListFooterComponent={isFetchingNextPage ? <Spinner color="black" mt="4" size="lg" /> : null}
        _contentContainerStyle={{ p: 2, bg: 'white' }}
        contentInsetAdjustmentBehavior="automatic"
        data={data?.pages.flatMap((page) => page.results)}
        keyExtractor={(item) => item.name}
        numColumns={2}
        renderItem={({ item }) => <Card name={item.name} url={item.url} />}
        onEndReached={loadMore}
      />
    </SafeAreaView>
  )
}
