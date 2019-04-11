import React from 'react';
import * as core from "../shared/core";

const toEmoji = (state: core.SlotState) => {
    switch (state) {
        case "banana": return "🍌";
        case "monkey": return "🐵";
        case "orange": return "🍊";
        case "strawberry": return "🍓";
    }
}

const style = { display: 'inline-block', width: '35px' };

const Slot = (props: { state: core.SlotState }) => <span style={style}>{toEmoji(props.state)}</span>

export default Slot;
