import * as core from "./core";

export interface MachineConfig {
    spinTimeout: number,
    autoStartTimeout: number,
    autoStopTimeout: number,
}

export const defaultConfig: MachineConfig = {
    spinTimeout: 50,
    autoStartTimeout: 5000,
    autoStopTimeout: 10000,
}

export interface StateInitial {
    kind: 'initial',
    slots: core.Slots,
    start: () => StateSpinning,
}

export interface StateSpinning {
    kind: 'spinning',
    stop: () => StateStopped,
}

export interface StateStopped {
    kind: 'stopped',
    slots: core.Slots,
    prize: number,
    start: () => StateSpinning,
}

export type State = StateInitial | StateSpinning | StateStopped;

const getSpinning: () => StateSpinning = () => ({
    kind: 'spinning',
    stop: getStopped,
})

const getInitial: () => StateInitial = () => ({
    kind: 'initial',
    slots: core.getSlots(),
    start: getSpinning,
})

const getStopped: () => StateStopped = () => {
    const machine = core.getSlots();
    const prize = core.getPrize(machine);
    return {
        kind: 'stopped',
        slots: machine,
        prize: prize,
        start: getSpinning,
    }
}

export const initialState: State = getInitial();

interface Machine {
    start: () => void,
    stop: () => void,
    turnOff: () => void,
}

export const getMachine = (onStart: (state: StateSpinning) => void, onStop: (state: StateStopped) => void, config?: MachineConfig) => {
    let state: State = getInitial();
    let initialToStartHandle: NodeJS.Timeout | undefined;
    let startToStopHandle: NodeJS.Timeout | undefined;
    let stopToStartHandle: NodeJS.Timeout | undefined;
    let conf = config || defaultConfig;
    let start = () => {
        initialToStartHandle && clearTimeout(initialToStartHandle);
        stopToStartHandle && clearTimeout(stopToStartHandle);
        startToStopHandle = setTimeout(() => stop(), conf.autoStopTimeout);
        switch (state.kind) {
            case "initial":
            case "stopped":
                state = state.start();
                onStart(state);
        }
    };
    let stop = () => {
        startToStopHandle && clearTimeout(startToStopHandle);
        stopToStartHandle = setTimeout(() => start(), conf.autoStartTimeout);
        switch (state.kind) {
            case "spinning":
                state = state.stop();
                onStop(state);
        }
    };
    let turnOff = () => {
        initialToStartHandle && clearTimeout(initialToStartHandle);
        stopToStartHandle && clearTimeout(stopToStartHandle);
        startToStopHandle && clearTimeout(startToStopHandle);
    }
    initialToStartHandle = setTimeout(() => start(), conf.autoStartTimeout);
    return { start, stop, turnOff } as Machine;
}
