import React from 'react';
import * as core from "../shared/core";
import Slot from './Slot';

const Slots = (props: { slots: core.Slots }) => {
    const { slots } = props;
    const slotSpans = slots.map((slot, i) => <span key={i}><Slot state={slot} /></span>);
    return <div>{slotSpans}</div>
}

export default Slots;
