import { GreetProps } from './Greet.types';

export const Greet = ({ name }: GreetProps) => {
  return <div>Hello {name ? name : 'Guest'}</div>;
};
