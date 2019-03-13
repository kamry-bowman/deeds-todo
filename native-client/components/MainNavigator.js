import React from 'react';
import { createStackNavigator, createAppContainer } from 'react-navigation';
import TodoList from '../views/TodoList';
import SingleTodo from '../views/SingleTodo';

export default createAppContainer(
  createStackNavigator(
    {
      TodoList,
      SingleTodo,
    },
    {
      initialRouteName: 'TodoList',
    }
  )
);
