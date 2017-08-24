import React from 'react'
import { ThemeProvider } from 'theming'
import { DEFAULT_THEME } from './../theme'

import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';
import { linkTo } from '@storybook/addon-links';

import { Button, Welcome } from '@storybook/react/demo';
import Portal from 'container/Portal'
import MainEditor from '../pages/index'


storiesOf('Welcome', module).add('to Storybook', () => <Welcome showApp={linkTo('Button')} />);

storiesOf('Button', module)
  .add('with text', () => <Button onClick={action('clicked')}> Hello Button</Button>)
  .add('with some emoji', () => <Button onClick={action('clicked')}> 😎 👍 💯</Button>);

storiesOf('Portal', module)
    .addDecorator((getStory) => {
        return (<ThemeProvider theme={DEFAULT_THEME}><div>{getStory()}</div></ThemeProvider>)
    })
    .add('default', () => <Portal> </Portal>)

storiesOf('Editor', module)
    .add('default', () => <MainEditor> </MainEditor>)