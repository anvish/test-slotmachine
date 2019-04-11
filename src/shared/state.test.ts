import * as state from "./state";

const config = { spinTimeout: 1, autoStartTimeout: 1, autoStopTimeout: 1 };

it('auto starts', done => {
    let startCalls = 0;
    let stopCalls = 0;
    const onStart = () => {
        startCalls++;
        expect(startCalls).toBe(1);
        expect(stopCalls).toBe(0);

        machine.turnOff();
        done();
    };
    const onStop = () => {
        stopCalls++;

        done.fail();
    };
    const machine = state.getMachine(onStart, onStop, config);
}, 10);

it('auto stops', done => {
    let startCalls = 0;
    let stopCalls = 0;
    const onStart = () => {
        startCalls++;
        expect(startCalls).toBe(1);
        expect(stopCalls).toBe(0);
    };
    const onStop = () => {
        stopCalls++;
        expect(startCalls).toBe(1);
        expect(stopCalls).toBe(1);

        machine.turnOff();
        done();
    };
    const machine = state.getMachine(onStart, onStop, config);
}, 10);

it('starts manually', () => {
    let startCalls = 0;
    let stopCalls = 0;
    const onStart = () => startCalls++;
    const onStop = () => stopCalls++;
    const machine = state.getMachine(onStart, onStop, config);
    machine.start();
    machine.stop();
    machine.turnOff();
    expect(startCalls).toBe(1);
    expect(stopCalls).toBe(1);
});

it('second start and stop ignored', () => {
    let startCalls = 0;
    let stopCalls = 0;
    const onStart = () => startCalls++;
    const onStop = () => stopCalls++;
    const machine = state.getMachine(onStart, onStop, config);
    machine.start();
    machine.start();
    machine.stop();
    machine.stop();
    machine.turnOff();
    expect(startCalls).toBe(1);
    expect(stopCalls).toBe(1);
});

it('consequent start and stop', () => {
    let startCalls = 0;
    let stopCalls = 0;
    const onStart = () => startCalls++;
    const onStop = () => stopCalls++;
    const machine = state.getMachine(onStart, onStop, config);
    machine.start();
    machine.stop();
    machine.start();
    machine.stop();
    machine.turnOff();
    expect(startCalls).toBe(2);
    expect(stopCalls).toBe(2);
});
