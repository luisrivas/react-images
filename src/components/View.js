// @flow
// @jsx glam
import React from 'react';
import glam from 'glam';

import { Div, Img } from '../primitives';
import { type PropsWithStyles } from '../types';
import { className } from '../utils';
import { getSource } from './component-helpers';
import componentBaseClassNames from './componentBaseClassNames';

type Props = PropsWithStyles & {
  data: Object,
  isFullscreen: boolean,
  isModal: boolean,
};

export const viewCSS = () => ({
  lineHeight: 0,
  position: 'relative',
  textAlign: 'center',
});

const viewBaseClassName = componentBaseClassNames.View;

const View = (props: Props) => {
  const { data, formatters, getStyles, index, currentIndex, isFullscreen, isModal } = props;
  const [isInScreen, setIsInScreen] = React.useState(index === 0) ;
  const innerProps = {
    alt: formatters.getAltText({ data, index }),
    src: getSource({ data, isFullscreen }),
  };

  React.useEffect(() => {
    if(index >= currentIndex && !isInScreen) {
      setIsInScreen(true);
    }
  },[index,currentIndex]);

  return (
    <Div
      css={getStyles(viewBaseClassName, props)}
      className={className(viewBaseClassName, { isFullscreen, isModal })}
    >
      {isInScreen ? (
      <Img
        {...innerProps}
        className={className('view-image', { isFullscreen, isModal })}
        loading="lazy"
        css={{
          height: 'auto',
          maxHeight: '100%',
          maxWidth: '100%',
          userSelect: 'none',
        }}
      />
      ) : null}
    </Div>
  );
};

export default View;
