import dark_mode from './dark_mode'
import light_mode from './light_mode'
import AsyncStorage from '@react-native-async-storage/async-storage';

export default {
    default: dark_mode,
    async update() {
        let theme = (await AsyncStorage.getItem('theme')) || 'dark_mode';
        if (theme == 'light_mode') return light_mode
        else return dark_mode
    }
}