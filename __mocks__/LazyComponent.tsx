import React from 'react';

interface Props {
  readonly text: string;
}

const LazyComponent = ({ text }: Props) => {
  return <p>{text}</p>;
};

export default LazyComponent;
