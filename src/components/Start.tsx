import React from 'react';

const Start = (props: { canStart: boolean, onStart: () => void }) => {
    const { canStart, onStart } = props;
    return <button disabled={!canStart} onClick={onStart}>Start</button>;
}

export default Start;
