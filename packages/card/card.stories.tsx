import React from 'react';

import { Meta } from '@storybook/react';

import { Card, CardHeader, CardBody, CardFooter, CardActions, CardAction, CardImage } from './src/';
import { DisplaySmall, Heading, Body } from '@adamwebster/fc-typography';
export default {
  component: Card,
  title: 'Components/Card',
} as Meta;

export const Primary: React.VFC<{}> = () => (
  <Card>
    <CardHeader>Header</CardHeader>
    <CardImage>
      <img src="https://images.unsplash.com/photo-1636835002514-e277b1046e5c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1631&q=80" />
    </CardImage>
    <CardBody>
      <DisplaySmall as="h2"> Card Title</DisplaySmall>
      <Heading as="h3">Sub Title</Heading>
      <Body>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora dolores corporis porro quae cum illo
        voluptatibus possimus. Nobis vitae, illo, possimus obcaecati nam velit porro odio, delectus quisquam quo
        voluptatum.
      </Body>
    </CardBody>
    <CardActions>
      <CardAction>Action</CardAction>
      <CardAction>Action</CardAction>
      <CardAction>Action</CardAction>
    </CardActions>
    <CardFooter>Footer</CardFooter>
  </Card>
);
