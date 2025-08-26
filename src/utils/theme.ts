import { createTheme } from '@rneui/themed';

const theme = createTheme({
  lightColors: {
    primary: '#4CAF50', // Green - represents nature and sustainability
    secondary: '#03A9F4', // Blue - represents water and air
    background: '#F5F5F5',
    white: '#FFFFFF',
    black: '#212121',
    grey0: '#EEEEEE',
    grey1: '#BDBDBD',
    grey2: '#757575',
    success: '#4CAF50',
    warning: '#FFC107',
    error: '#F44336',
    disabled: 'rgba(0, 0, 0, 0.26)',
  },
  darkColors: {
    primary: '#4CAF50',
    secondary: '#03A9F4',
    background: '#121212',
    white: '#FFFFFF',
    black: '#E0E0E0',
    grey0: '#212121',
    grey1: '#424242',
    grey2: '#9E9E9E',
    success: '#4CAF50',
    warning: '#FFC107',
    error: '#F44336',
    disabled: 'rgba(255, 255, 255, 0.3)',
  },
  mode: 'light',
  components: {
    Button: {
      buttonStyle: {
        borderRadius: 8,
        paddingVertical: 12,
      },
      titleStyle: {
        fontWeight: 'bold',
        letterSpacing: 0.5,
      },
    },
    Text: {
      style: {
        fontFamily: 'System',
      },
      h1Style: {
        fontWeight: 'bold',
        fontSize: 32,
        letterSpacing: 0.25,
      },
      h2Style: {
        fontWeight: 'bold',
        fontSize: 24,
        letterSpacing: 0.25,
      },
      h3Style: {
        fontWeight: 'bold',
        fontSize: 20,
        letterSpacing: 0.25,
      },
      h4Style: {
        fontWeight: 'bold',
        fontSize: 16,
        letterSpacing: 0.25,
      },
    },
    Card: {
      containerStyle: {
        borderRadius: 12,
        padding: 16,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
      },
    },
  },
});

export default theme;
