export type SlotState = "strawberry" | "banana" | "orange" | "monkey";

export type Slots = SlotState[];

export const states: SlotState[] = ["strawberry", "banana", "orange", "monkey"];

export const wheels = 3;

export const getSlots = () => Array.from({ length: wheels }, () => Math.floor(Math.random() * states.length)).map(i => states[i]);

export const getPrize = (slots: Slots) => {
    // The same symbol in all the wheels
    if (slots.every(i => i === slots[0])) {
        return 100;
    }

    // Two consecutive symbols
    if (slots.findIndex((_, i) => i > 0 && slots[i - 1] === slots[i]) > -1) {
        return 20;
    }

    // Two identical non-consecutive symbols
    if (new Set(slots).size != slots.length) {
        return 10;
    }

    return 0;
}
