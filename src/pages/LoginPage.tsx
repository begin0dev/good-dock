import { Image, Text, View, StyleSheet, Button, TouchableNativeFeedback } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import useColor from '../hooks/useColor';
import { IcKakao } from '../assets/svgs';

function LoginPage() {
  const colors = useColor();

  return (
    <SafeAreaView>
      <View style={styles.wrapper}>
        <Image style={styles.image} source={require('../assets/images/main_logo.png')} />
        <Text style={{ color: colors.TEXT_0, ...styles.subText }}>
          카카오 계정으로 서비스를 이용해보세요
        </Text>
        <TouchableNativeFeedback>
          <View style={styles.kakaoBtn}>
            <IcKakao />
            <Text style={styles.kakaoBtnText}>카카오 로그인</Text>
          </View>
        </TouchableNativeFeedback>
      </View>
    </SafeAreaView>
  );
}

export default LoginPage;

const styles = StyleSheet.create({
  wrapper: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
  },
  image: {
    width: 80,
    height: 140,
    resizeMode: 'contain',
    marginBottom: 110,
  },
  subText: {
    fontSize: 12,
    marginBottom: 10,
  },
  kakaoBtn: {
    flexDirection: 'row',
    width: '100%',
    height: 48,
    padding: 14,
    paddingRight: 14 + 18,
    backgroundColor: '#FEE500',
    borderRadius: 6,
  },
  kakaoBtnText: {
    width: '100%',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
  },
});
