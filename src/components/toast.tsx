import * as React from 'react';
import { styled, keyframes, CSSAttribute } from 'goober';

import { usePreserve } from '../core/use-preserve';
import { Status, StatusType } from '../status';
import { Indicator } from './indicator';

const StatusBarWrapper = styled('div')`
  position: fixed;
  display: flex;
  justify-content: center;
  left: 0;
  right: 0;
  top: 0;
`;
// Animations generated with: https://rawgit.com/sktt/springish-css/master/index.html
// Enter
// A: -80, k: 200, damping: 12
// (val) => `transform: translate3d(0, ${val}px, 0) scale(${Number(val)/250 + 1}); opacity: ${Number(val)/160 + 1}`

// const enterSpring = `
// 0.00% {transform: translate3d(0, -80.00px, 0) scale(0.67999); opacity: 0.5;}
// 40.27% {transform: translate3d(0, 1.42px, 0) scale(1.00568); opacity: 1.008875;}
// 100.00% {transform: translate3d(0, -0.01px, 0) scale(1); opacity: 1;}
// `;

// const enterAnimation: CSSAttribute = {
//   animation: `${keyframes`${enterSpring}`} forwards`,
//   animationDuration: '0.7s',
//   animationTimingFunction: 'cubic-bezier(0.445, 0.05, 0.55, 0.95)',
// };

// Animations generated with: https://rawgit.com/sktt/springish-css/master/index.html
// Enter
// A: -80, k: 200, damping: 12
// (val) => `transform: translate3d(0, ${val}px, 0) scale(${Number(val)/250 + 1}); opacity: ${Number(val)/160 + 1}`

// const enterSpring = `
// 0.00% {transform: translate3d(0, -80.00px, 0) scale(0.67999); opacity: 0.5;}
// 40.27% {transform: translate3d(0, 1.42px, 0) scale(1.00568); opacity: 1.008875;}
// 100.00% {transform: translate3d(0, -0.01px, 0) scale(1); opacity: 1;}
// `;

// const enterAnimation: CSSAttribute = {
//   animation: `${keyframes`${enterSpring}`} forwards`,
//   animationDuration: '0.7s',
//   animationTimingFunction: 'cubic-bezier(0.445, 0.05, 0.55, 0.95)',
// };

const enterSpring = `
0% {transform: translate3d(0,-80px,0) scale(0.6); opacity:.5;}
100% {transform: translate3d(0,0,0) scale(1); opacity:1;}
`;

const enterAnimation: CSSAttribute = {
  zIndex: 1,
  animation: `${keyframes`${enterSpring}`} forwards`,
  animationDuration: '0.3s',
  animationTimingFunction: 'cubic-bezier(.21,1.02,.73,1)',
};

const exitSpring = `
0% {transform: translate3d(0, 0, 0) scale(1); opacity: 1;}
100% {transform: translate3d(0,-130px, 0) scale(0.5); opacity: 0;}
`;

const exitAnimation: CSSAttribute = {
  animation: `${keyframes`${exitSpring}`} 0.5s forwards cubic-bezier(.06,.71,.55,1)`,
};

// Animated
const StatusBarBase = styled('div')`
  display: flex;
  position: absolute;
  align-items: center;
  width: 2;
  background: white;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1), 0 3px 3px rgba(0, 0, 0, 0.05);
  padding: 6px 12px;
  margin-top: 20px;
  border-radius: 8px;
`;

const IndicatorWrapper = styled('div')`
  display: absolute;
`;

const Message = styled('p')`
  margin: 4px;
  margin-left: 10px;
  color: #363636;
  flex: 1;
  text-align: center;
`;

interface StatusBarProps {
  status?: Status;
  index: number;
  visible: boolean;
}

const firstLineAnimation = keyframes`
  from {
    transform: scale(0.6);
	 opacity: 0.4;
  }

  to {
    transform: scale(1);
	 opacity: 1;
  }
`;

const CustomIndicator = styled('div')`
  position: relative;
  transform: scale(0.6);
  opacity: 0.4;
  animation: ${firstLineAnimation} 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)
    forwards;
  animation-delay: 0.12s;
`;

export const StatusBar: React.FC<StatusBarProps> = React.memo((props) => {
  const status = usePreserve(props.status);
  const visible = !!props.visible;

  return (
    <StatusBarWrapper
      key="status-bar"
      style={{
        transition: 'all 200ms cubic-bezier(0.59,0,0.5,1.15)',
        // transitionDelay: `${props.index * 5}ms`,
        transform: `translateY(${props.index * 50}px)`,
      }}
    >
      <StatusBarBase style={visible ? enterAnimation : exitAnimation}>
        <IndicatorWrapper>
          {status?.type === StatusType.Custom ? (
            <CustomIndicator>🔥</CustomIndicator>
          ) : (
            <Indicator
              statusType={status ? status.type : undefined}
              delay={100}
            />
          )}
        </IndicatorWrapper>
        <Message role="alert" aria-live="polite">
          {status && status.message}
        </Message>
      </StatusBarBase>
    </StatusBarWrapper>
  );
});
