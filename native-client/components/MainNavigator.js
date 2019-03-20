import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import TodoList from '../views/TodoList';
import SingleTodo from '../views/SingleTodo';
import Header from './Header';

const MainNavigator = createStackNavigator(
  {
    TodoList,
    SingleTodo,
  },
  {
    initialRouteName: 'TodoList',
    headerMode: 'screen',
    defaultNavigationOptions: {
      header: <Header />,
    },
  }
);
const MainApp = createAppContainer(MainNavigator);
export default MainApp;
