import React, { useState } from 'react';
import styled from 'styled-components';
import LoginForm from '../Forms/LoginForm';
import RegisterForm from '../Forms/RegisterForm';

interface Theme {
  text: string;
  body: string;
  border: string;
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  color: ${(props) => (props.theme as Theme).text};
`;

const Wrapper = styled.div`
  height: fit-content;
  width: 400px;
  margin-top: 50px;
  padding: 5px;
  border-radius: 5px;
  background-color: ${(props) => (props.theme as Theme).body};
  box-shadow: 0 0 10px 3px rgba(0,0,0,0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;

const Tabs = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  border-radius: 10px;
  color: ${(props) => (props.theme as Theme).text};
`;

const TabButton = styled.button`
  border: none;
  cursor: pointer;
  padding: 5px;
  width: 100%;
  text-decoration: none;
  font-size: 1em;
  background-color: ${(props) => (props.theme as Theme).body};
  color: ${(props) => (props.theme as Theme).text};
  &:disabled {
    color: ${(props) => (props.theme as Theme).text};
    background-color: ${(props) => (props.theme as Theme).body};
    border-bottom: 5px solid #6bc5f2;
  };
  &:first-of-type + button {
    border-left: 1px solid ${(props) => (props.theme as Theme).border};
  }
`;

const Content = styled.div`
  height: 100%;
  background-color: ${(props) => (props.theme as Theme).body};
  border-top: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  padding-bottom: 10px;
`;

const NewTabs: React.FC = () => {
  const [currentTab, setCurrentTab] = useState('1');

  const tabs = [
    {
      id : '1',
      tabTitle: 'Login',
      title: 'Login',
    },
    {
      id : '2',
      tabTitle: 'Register',
      title: 'Register',
    }
  ];

  const handleTabClick = (e: React.MouseEvent) => {
    if (currentTab === '1'){
      setCurrentTab('2');
    } else{
      setCurrentTab('1');
    }
  }

  return (
    <Container>
      <Wrapper>
        <Tabs>
          {
            tabs.map( (tab, index) =>
              <TabButton key={index} id={tab.id} disabled={currentTab === tab.id}
              onClick={(handleTabClick)} >{tab.tabTitle}</TabButton>
            )
          }
        </Tabs>
        <Content>
          {
            currentTab === '1' ? (<LoginForm></LoginForm>) : (<RegisterForm></RegisterForm>)
          }
        </Content>
      </Wrapper>
    </Container>
  )

}

export default NewTabs;