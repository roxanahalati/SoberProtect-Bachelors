import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginPage from '../Frontend/components/Authentification/Login';
import AccountDetails from '../Frontend/components/Authentification/AccountDetails';
import SignUp from '../Frontend/components/Authentification/SignUp';
import HomePage from '../Frontend/components/Home/HomePage';
import SobrietyClock from '../Frontend/components/Clock/SobrietyClock';
import Accomplishments from '../Frontend/components/Accomplishments/Accomplishments';
import ForumMainPage from '../Frontend/components/Forum/ForumMainPage';
import ForumTopic from '../Frontend/components/Forum/ForumTopic';
import NewForumTopic from '../Frontend/components/Forum/NewForumTopic';
import TherapyMainPage from '../Frontend/components/Therapy/TherapyMainPage';
import Therapist from '../Frontend/components/Therapy/Therapist';
import TherapistTrue from './components/Therapy/TherapistTrue';
import TherapistFalse from './components/Therapy/TherapistFalse';
import MemoryGame from '../Frontend/components/Triggered/MemoryGame';
import Settings from '../Frontend/components/Settings/Settings';
import Chat from '../Frontend/components/Chat';
import TherapistLoginPage from '../Frontend/components/Therapist/TherapistLoginPage';
import TherapistPage from '../Frontend/components/Therapist/TherapistPage';
import ClientModal from '../Frontend/components/Therapist/Client';
import HomeworkMainPage from '../Frontend/components/Homework/HomeworkMainPage';
import HomeworkItem from '../Frontend/components/Homework/HomeworkItem';
import Assign from '../Frontend/components/Homework/Assign';
const Stack = createNativeStackNavigator();

const App = () => {
  

  return (
    <NavigationContainer>
      
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name="Login"  options={{headerShown: false}} component={LoginPage} />
        <Stack.Screen name="SignUp" component={SignUp} />
        <Stack.Screen name="AccountDetails" options={{ title: '' }} component={AccountDetails} />
        <Stack.Screen name="Home" options={{headerShown: false}} component={HomePage} />
        
        <Stack.Screen name="SobrietyClock" component={SobrietyClock} />

        <Stack.Screen name="Accomplishments"  component={Accomplishments} />

        <Stack.Screen name="Forum" component={ForumMainPage} />
        <Stack.Screen name="ForumTopic" options={{ title: '' }}component={ForumTopic} />
        <Stack.Screen name="NewDiscussion" options={{ title: '' }}component={NewForumTopic} />

        <Stack.Screen name="Therapy" component={TherapyMainPage} />
        <Stack.Screen name="Therapist" options={{ title: '' }}component={Therapist} />
        <Stack.Screen name="TherapistFalse" options={{ title: '' }}component={TherapistFalse} />
        <Stack.Screen name="TherapistTrue" options={{ title: '' }}component={TherapistTrue} />

        <Stack.Screen name="MemoryGame" options={{ title: '' }}component={MemoryGame} />

        <Stack.Screen name="Settings" component={Settings} />

        <Stack.Screen name="Chat" options={{ title: '' }}component={Chat} />

        <Stack.Screen name="TherapistLogin" options={{headerShown: false}} component={TherapistLoginPage} />
        <Stack.Screen name="TherapistPage" options={{headerShown: false}} component={TherapistPage} />
        <Stack.Screen name="ClientModal" options={{ title: 'Back to overview' }} component={ClientModal} />

        <Stack.Screen name="HomeworkMainPage" options={{ title: 'Homework' }} component={HomeworkMainPage} />
        <Stack.Screen name="HomeworkItem" options={{ title: '' }} component={HomeworkItem} />
        <Stack.Screen name="Assign" component={Assign} />
 
      </Stack.Navigator>
    </NavigationContainer>
  )
}
export default App;
