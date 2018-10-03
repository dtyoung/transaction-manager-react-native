import { createStackNavigator, createDrawerNavigator, createSwitchNavigator } from 'react-navigation'
import {
  AddTransactionScreen,
  LoginScreen,
  CategoryOverviewScreen,
  CreateAccountScreen,
  TransactionOverviewScreen,
  AddCategoryScreen,
  AnalyticsScreen,
  TransactionDetailScreen,
  UpdateTransactionScreen
} from '../screens'
import DrawerContainer from './DrawerContainer';

const AuthStack = createStackNavigator({
  Home: { screen: LoginScreen },
  CreateAccount: { screen: CreateAccountScreen }
},
{
  navigationOptions: {
      headerStyle: {backgroundColor: '#74d419'},
      headerTitleStyle: {
          flex: 1,
          textAlign: 'center',
          alignSelf: 'center'
      },
  }
});

const TransactionStack = createStackNavigator({
  TransactionOverview: { screen: TransactionOverviewScreen },
  AddTransaction: { screen: AddTransactionScreen },
  TransactionDetail: { screen: TransactionDetailScreen },
  UpdateTransaction: { screen: UpdateTransactionScreen }
},
{
  initialRouteName: 'TransactionOverview',
  navigationOptions: {
      headerStyle: { backgroundColor: '#74d419' },
      headerTitleStyle: {
          flex: 1,
          textAlign: 'center',
          alignSelf: 'center'
      },
  }
});

const AnalyticsStack = createStackNavigator(
{
  Home: { screen: AnalyticsScreen }
},
{
  navigationOptions: {
      headerStyle: {backgroundColor: '#74d419'},
      headerTitleStyle: {
          flex: 1,
          textAlign: 'center',
          alignSelf: 'center'
      },
  }
});

const CategoryStack = createStackNavigator({
  CategoryOverview: CategoryOverviewScreen,
  AddCategory: AddCategoryScreen
},
{
  initialRouteName: 'CategoryOverview',
  navigationOptions: {
      headerStyle: {backgroundColor: '#74d419'},
      headerTitleStyle: {
          flex: 1,
          textAlign: 'center',
          alignSelf: 'center'
      },
  }
});

const AppDrawer = createDrawerNavigator(
{
  Transactions: TransactionStack,
  Categories: CategoryStack,
  Analytics: AnalyticsStack
},{
  initialRouteName: 'Transactions',
  contentComponent: DrawerContainer
});


export default RootNav = createSwitchNavigator(
  {
      Auth: AuthStack,
     App: AppDrawer
  },
  {
      initialRouteName: 'Auth',
     
  }
);
