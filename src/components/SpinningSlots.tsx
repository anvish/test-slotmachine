import React, { useState, useEffect } from 'react';
import * as core from "../shared/core";
import Slots from './Slots';

const spinTimeout = 50;

const SpinningSlots = (props: { slots: core.Slots | undefined }) => {
    if (props.slots) return <Slots slots={props.slots} />;

    const [slots, setSlots] = useState(() => core.getSlots());

    useEffect(() => {
        const interval = setInterval(() => { setSlots(core.getSlots()) }, spinTimeout);
        return () => clearInterval(interval);
    }, [props.slots])

    return <Slots slots={slots} />
}

export default SpinningSlots;
