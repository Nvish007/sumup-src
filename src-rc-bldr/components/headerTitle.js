import React from 'react'
import { Text } from 'react-native'
import TextStyles from '../Screen/styles/TextStyles'

function HeaderTitle({ title }) {
    return (
        <Text style={[TextStyles.bold18White, { alignSelf: 'center', marginTop: 5 }]}>{title}</Text>
    )
}

export default HeaderTitle