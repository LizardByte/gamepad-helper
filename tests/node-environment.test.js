/**
 * @jest-environment node
 */

import {
    describe,
    expect,
    test,
} from '@jest/globals';

describe('Node.js module loading', () => {
    test('does not require a browser window', () => {
        const GamepadHelper = require('../src/js/gamepad-helper');

        expect(globalThis.window).toBeUndefined();
        expect(new GamepadHelper()).toBeInstanceOf(GamepadHelper);
    });
});
