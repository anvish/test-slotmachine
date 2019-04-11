import React from 'react';

const Stop = (props: { canStop: boolean, onStop: () => void }) => {
    const { canStop, onStop } = props;
    return <button disabled={!canStop} onClick={onStop}>Stop</button>;
}

export default Stop;
