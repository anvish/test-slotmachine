import React, { useState } from 'react';
import * as core from "../shared/core";
import * as state from '../shared/state';
import SpinningSlots from "../components/SpinningSlots";
import Prize from './Prize';
import Start from './Start';
import Stop from './Stop';

const Machine = () => {
    const [slots, setSlots] = useState<core.Slots | undefined>();
    const [canStart, setCanStart] = useState(false);
    const [canStop, setCanStop] = useState(false);
    const onStart = () => {
        setCanStart(false);
        setCanStop(true);
        setSlots(undefined)
    };
    const onStop = (state: state.StateStopped) => {
        setCanStart(true);
        setCanStop(false);
        setSlots(state.slots)
    };
    const doStart = () => machine.start();
    const doStop = () => machine.stop();
    const [machine] = useState(() => state.getMachine(onStart, onStop));
    const prize = slots && core.getPrize(slots);
    return <div>
        <div><SpinningSlots slots={slots} /></div>
        <div><Prize prize={prize} /></div>
        <div><Start canStart={canStart} onStart={doStart} /></div>
        <div><Stop canStop={canStop} onStop={doStop} /></div>
    </div>;
}

export default Machine;
