import styled from 'styled-components/native'
import { Platform } from 'react-native'
import { getBottomSpace } from 'react-native-iphone-x-helper'

export const Container = styled.View`
  flex: 1;
  justify-content: center;
  padding: 0 30px ${Platform.OS === 'android' ? 120 : 40}px;
  position: relative;
`

export const Title = styled.Text`
  font-size: 20px;
  color: #f4ede8;
  font-family: 'RobotoSlab-Medium';
  margin: 12px 0 24px;
`

export const BackButton = styled.TouchableOpacity`
  margin-top: 140px;
`

export const UserAvatarButton = styled.TouchableOpacity``

export const UserAvatar = styled.Image`
  width: 180px;
  height: 180px;
  border-radius: 90px;
  align-self: center;
`
