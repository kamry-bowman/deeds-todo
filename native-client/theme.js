import { AmplifyTheme } from 'aws-amplify-react-native';

const mainTheme = {
  colors: {
    bg: '#FCFF4B',
    mainLt: '#7CAFC4',
    mainDk: '#044389',
    mainDkTrans: 'rgba(4, 67, 137, 0.3)',
    mainDkOpaque: 'rgba(4, 67, 137, 0.6)',
    mainDkSheer: 'rgba(4, 67, 137, 0.05)',
    lighten: 'rgba(255, 255, 255, 0.2)',
  },
  padding: {
    outer: 10,
    headerClearance: 20,
  },
  border: {
    radius: 10,
  },
  debug: {
    borderWidth: 1,
    borderColor: 'red',
  },
};

const awsCustom = {
  ...AmplifyTheme,
  input: {
    ...AmplifyTheme.input,
    backgroundColor: mainTheme.colors.mainDkSheer,
    color: mainTheme.colors.mainDk,
  },
  inputLabel: {
    ...AmplifyTheme.inputLabel,
    color: mainTheme.colors.mainDk,
  },
  button: {
    ...AmplifyTheme.buttonDisabled,
    backgroundColor: mainTheme.colors.bg,
  },
  buttonDisabled: {
    ...AmplifyTheme.buttonDisabled,
    backgroundColor: 'rgba(252, 255, 75, 0.4)',
  },
  buttonText: {
    ...AmplifyTheme.buttonText,
    color: mainTheme.colors.mainDk,
  },
  sectionHeaderText: {
    ...AmplifyTheme.sectionHeaderText,
    color: mainTheme.colors.mainDk,
  },
  sectionFooterLink: {
    ...AmplifyTheme.sectionFooterLink,
    color: mainTheme.colors.mainDk,
  },
};

export { mainTheme as default, awsCustom };
