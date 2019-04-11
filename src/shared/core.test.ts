import * as core from "./core";

it("prize 100", () => {
    const machine: core.Slots = ["strawberry", "strawberry", "strawberry"];
    const prize = core.getPrize(machine);
    expect(prize).toBe(100);
});

it("prize 20 - 1", () => {
    const machine: core.Slots = ["strawberry", "strawberry", "banana"];
    const prize = core.getPrize(machine);
    expect(prize).toBe(20);
});

it("prize 20 - 2", () => {
    const machine: core.Slots = ["banana", "strawberry", "strawberry"];
    const prize = core.getPrize(machine);
    expect(prize).toBe(20);
});

it("prize 10", () => {
    const machine: core.Slots = ["strawberry", "banana", "strawberry"];
    const prize = core.getPrize(machine);
    expect(prize).toBe(10);
});

it("prize 0", () => {
    const machine: core.Slots = ["strawberry", "banana", "orange"];
    const prize = core.getPrize(machine);
    expect(prize).toBe(0);
});

it("initializes slots values", () => {
    expect(core.getSlots().every(v => core.states.includes(v)));
});

it("initializes slots count", () => {
    expect(core.getSlots()).toHaveLength(core.wheels);
});
