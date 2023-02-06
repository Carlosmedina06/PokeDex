import { View, Text } from 'react-native'
import React from 'react'

import { type MainStackScreenProps } from '../../interfaces'

const Details = ({ route }: MainStackScreenProps<'Details'>) => {
  const { name } = route.params

  return (
    <View>
      <Text>{name}</Text>
    </View>
  )
}

export default Details
