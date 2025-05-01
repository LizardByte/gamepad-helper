import {
    beforeEach,
    describe,
    expect,
    jest,
    test,
} from '@jest/globals';

const GamepadHelper = require('../src/js/gamepad-helper');

describe('GamepadHelper', () => {
    let helper;
    let mockGamepad;

    beforeEach(() => {
        // Setup basic mock of navigator.getGamepads
        global.navigator.getGamepads = jest.fn();

        // Create a new helper instance before each test
        helper = new GamepadHelper();

        // Create a basic mock gamepad
        mockGamepad = {
            id: "Xbox Wireless Controller",
            index: 0,
            connected: true,
            buttons: Array(17).fill({ pressed: false, value: 0 }),
            axes: [0, 0, 0, 0],
            mapping: "standard",
            vibrationActuator: {
                type: "dual-rumble",
                playEffect: jest.fn().mockResolvedValue({ success: true })
            }
        };
    });

    describe('Constructor and initialization', () => {
        test('initializes with correct controller types', () => {
            expect(helper.CONTROLLER_TYPES).toEqual({
                XBOX: 'xbox',
                PLAYSTATION: 'playstation',
                SWITCH: 'switch',
                STANDARD: 'standard'
            });
        });

        test('initializes exactIdLookup correctly', () => {
            // Check a few known mappings
            expect(helper.exactIdLookup['xinput'].type).toBe(helper.CONTROLLER_TYPES.XBOX);
            expect(helper.exactIdLookup['PLAYSTATION(R)3 Controller (Vendor: 054c Product: 0268)'].type).toBe(helper.CONTROLLER_TYPES.PLAYSTATION);
            expect(helper.exactIdLookup['Pro Controller (STANDARD GAMEPAD Vendor: 057e Product: 2009)'].type).toBe(helper.CONTROLLER_TYPES.SWITCH);
        });

        test('initializes controller mappings correctly', () => {
            expect(helper.controllerMappings).toBeDefined();
            expect(helper.controllerMappings[helper.CONTROLLER_TYPES.XBOX].buttonMap[0]).toBe('A');
            expect(helper.controllerMappings[helper.CONTROLLER_TYPES.PLAYSTATION].buttonMap[0]).toBe('×');
            expect(helper.controllerMappings[helper.CONTROLLER_TYPES.SWITCH].buttonMap[0]).toBe('B');
        });
    });

    describe('isSupported', () => {
        test('returns true when Gamepad API is supported', () => {
            expect(helper.isSupported()).toBe(true);
        });

        test('returns false when Gamepad API is not supported', () => {
            delete global.navigator.getGamepads;
            expect(helper.isSupported()).toBe(false);
        });
    });

    describe('getGamepadInfo', () => {
        test('returns generic info for null gamepadId', () => {
            const result = helper.getGamepadInfo(null);
            expect(result).toEqual({
                type: helper.CONTROLLER_TYPES.STANDARD,
                name: 'Generic Controller'
            });
        });

        test('returns exact match for known gamepadId', () => {
            const result = helper.getGamepadInfo('xinput');
            expect(result).toEqual({
                type: helper.CONTROLLER_TYPES.XBOX,
                name: 'Xbox'
            });
        });

        test('returns generic info for unknown gamepadId', () => {
            const result = helper.getGamepadInfo('unknown-controller-id');
            expect(result).toEqual({
                type: helper.CONTROLLER_TYPES.STANDARD,
                name: 'Generic Controller'
            });
        });
    });

    describe('detectControllerType', () => {
        test('detects Xbox controller', () => {
            expect(helper.detectControllerType('xinput')).toBe(helper.CONTROLLER_TYPES.XBOX);
        });

        test('detects PlayStation controller', () => {
            expect(helper.detectControllerType('054c-05c4-Wireless Controller')).toBe(helper.CONTROLLER_TYPES.PLAYSTATION);
        });

        test('detects Switch controller', () => {
            expect(helper.detectControllerType('Pro Controller (STANDARD GAMEPAD Vendor: 057e Product: 2009)')).toBe(helper.CONTROLLER_TYPES.SWITCH);
        });

        test('returns standard for unknown controllers', () => {
            expect(helper.detectControllerType('Unknown Controller')).toBe(helper.CONTROLLER_TYPES.STANDARD);
        });
    });

    describe('getButtonName', () => {
        test('returns correct button names for Xbox controller', () => {
            expect(helper.getButtonName(helper.CONTROLLER_TYPES.XBOX, 0)).toBe('A');
            expect(helper.getButtonName(helper.CONTROLLER_TYPES.XBOX, 4)).toBe('LB');
            expect(helper.getButtonName(helper.CONTROLLER_TYPES.XBOX, 12)).toBe('DUp');
        });

        test('returns correct button names for PlayStation controller', () => {
            expect(helper.getButtonName(helper.CONTROLLER_TYPES.PLAYSTATION, 0)).toBe('×');
            expect(helper.getButtonName(helper.CONTROLLER_TYPES.PLAYSTATION, 4)).toBe('L1');
            expect(helper.getButtonName(helper.CONTROLLER_TYPES.PLAYSTATION, 17)).toBe('TouchPad');
        });

        test('returns fallback for unknown button indices', () => {
            expect(helper.getButtonName(helper.CONTROLLER_TYPES.XBOX, 99)).toBe('B99');
        });

        test('falls back to standard controller for unknown type', () => {
            expect(helper.getButtonName('unknown-type', 0)).toBe('B0');
        });
    });

    describe('getAxisName', () => {
        test('returns correct axis names for known controller types', () => {
            expect(helper.getAxisName(helper.CONTROLLER_TYPES.XBOX, 0)).toBe('Left Stick X');
            expect(helper.getAxisName(helper.CONTROLLER_TYPES.PLAYSTATION, 1)).toBe('Left Stick Y');
            expect(helper.getAxisName(helper.CONTROLLER_TYPES.SWITCH, 3)).toBe('Right Stick Y');
        });

        test('returns generic axis name for unknown indices', () => {
            expect(helper.getAxisName(helper.CONTROLLER_TYPES.XBOX, 99)).toBe('Axis 99');
        });

        test('falls back to standard controller for unknown type', () => {
            expect(helper.getAxisName('unknown-type', 0)).toBe('Axis 0');
        });
    });

    describe('isVibrationSupported', () => {
        test('returns true when vibration actuator exists', () => {
            expect(helper.isVibrationSupported(mockGamepad)).toBe(true);
        });

        test('returns false when gamepad is null', () => {
            expect(helper.isVibrationSupported(null)).toBe(false);
        });

        test('returns false when vibration actuator does not exist', () => {
            delete mockGamepad.vibrationActuator;
            expect(helper.isVibrationSupported(mockGamepad)).toBe(false);
        });
    });

    describe('getVibrationCapabilities', () => {
        test('returns correct capabilities for supported gamepad', () => {
            const result = helper.getVibrationCapabilities(mockGamepad);
            expect(result).toEqual({
                supported: true,
                type: 'dual-rumble'
            });
        });

        test('returns unsupported for null gamepad', () => {
            const result = helper.getVibrationCapabilities(null);
            expect(result).toEqual({
                supported: false,
                type: null
            });
        });

        test('handles missing actuator type', () => {
            mockGamepad.vibrationActuator = { playEffect: jest.fn() };
            const result = helper.getVibrationCapabilities(mockGamepad);
            expect(result).toEqual({
                supported: true,
                type: 'unknown'
            });
        });
    });

    describe('vibrate', () => {
        test('calls playEffect with correct parameters for dual-rumble', async () => {
            await helper.vibrate(mockGamepad, {
                weakMagnitude: 0.3,
                strongMagnitude: 0.7,
                duration: 500,
                startDelay: 100
            });

            expect(mockGamepad.vibrationActuator.playEffect).toHaveBeenCalledWith(
                'dual-rumble',
                {
                    weakMagnitude: 0.3,
                    strongMagnitude: 0.7,
                    duration: 500,
                    startDelay: 100
                }
            );
        });

        test('uses default parameters when not provided', async () => {
            await helper.vibrate(mockGamepad);

            expect(mockGamepad.vibrationActuator.playEffect).toHaveBeenCalledWith(
                'dual-rumble',
                {
                    weakMagnitude: 0.5,
                    strongMagnitude: 0.5,
                    duration: 1000,
                    startDelay: 0
                }
            );
        });

        test('handles vibration actuator type correctly', async () => {
            mockGamepad.vibrationActuator.type = 'vibration';

            await helper.vibrate(mockGamepad, {
                weakMagnitude: 0.3,
                strongMagnitude: 0.7
            });

            expect(mockGamepad.vibrationActuator.playEffect).toHaveBeenCalledWith(
                'vibration',
                expect.objectContaining({
                    magnitude: 0.7  // Should use the max of weakMagnitude and strongMagnitude
                })
            );
        });

        test('rejects promise when vibration not supported', async () => {
            delete mockGamepad.vibrationActuator;

            await expect(helper.vibrate(mockGamepad)).rejects.toThrow('Vibration not supported');
        });

        test('tries fallback for unknown actuator types', async () => {
            console.warn = jest.fn();  // report generation fails if this is not mocked
            mockGamepad.vibrationActuator.type = 'unknown-type';

            // Mock implementation that throws on first call but succeeds on second
            mockGamepad.vibrationActuator.playEffect = jest.fn()
                .mockImplementationOnce(() => { throw new Error('Unknown type'); })
                .mockImplementationOnce(() => Promise.resolve({ success: true }));

            await helper.vibrate(mockGamepad);

            // Should have tried with unknown type first, then fallback
            expect(mockGamepad.vibrationActuator.playEffect).toHaveBeenCalledTimes(2);
            expect(mockGamepad.vibrationActuator.playEffect).toHaveBeenLastCalledWith(
                'dual-rumble',
                expect.anything()
            );
        });
    });

    describe('stopVibration', () => {
        test('calls vibrate with zero magnitudes', async () => {
            const vibrateSpy = jest.spyOn(helper, 'vibrate').mockResolvedValue({ success: true });

            await helper.stopVibration(mockGamepad);

            expect(vibrateSpy).toHaveBeenCalledWith(
                mockGamepad,
                { weakMagnitude: 0, strongMagnitude: 0 }
            );
        });

        test('rejects when vibration not supported', async () => {
            delete mockGamepad.vibrationActuator;

            await expect(helper.stopVibration(mockGamepad)).rejects.toThrow('Vibration not supported');
        });
    });

    describe('getConnectedGamepads', () => {
        test('returns empty array when API not supported', () => {
            delete global.navigator.getGamepads;
            expect(helper.getConnectedGamepads()).toEqual([]);
        });

        test('returns array of connected gamepads', () => {
            const mockGamepads = [mockGamepad, null, { id: 'gamepad-2', index: 2 }, null];
            global.navigator.getGamepads.mockReturnValue(mockGamepads);

            const result = helper.getConnectedGamepads();
            expect(result).toEqual([mockGamepad, { id: 'gamepad-2', index: 2 }]);
            expect(result.length).toBe(2);
        });
    });

    describe('getButtonImagePath', () => {
        test('returns correct path for Xbox controller buttons', () => {
            const path = helper.getButtonImagePath(helper.CONTROLLER_TYPES.XBOX, 0);
            expect(path).toBe('/assets/img/gamepads/xbox/Buttons Outline/White/SVG/A.svg');
        });

        test('returns correct path for PlayStation controller buttons', () => {
            const path = helper.getButtonImagePath(helper.CONTROLLER_TYPES.PLAYSTATION, 3);
            expect(path).toBe('/assets/img/gamepads/playstation/Buttons Outline/White/SVG/Triangle.svg');
        });

        test('returns correct path for Switch controller buttons', () => {
            const path = helper.getButtonImagePath(helper.CONTROLLER_TYPES.SWITCH, 1);
            expect(path).toBe('/assets/img/gamepads/switch/Buttons Outline/White/SVG/A.svg');
        });

        test('returns null for unknown button index', () => {
            const path = helper.getButtonImagePath(helper.CONTROLLER_TYPES.XBOX, 99);
            expect(path).toBe(null);
        });

        test('customizes base path when provided', () => {
            const path = helper.getButtonImagePath(
                helper.CONTROLLER_TYPES.XBOX,
                0,
                '/custom/path/'
            );
            expect(path).toBe('/custom/path/xbox/Buttons Outline/White/SVG/A.svg');
        });

        test('handles different button colors', () => {
            const path = helper.getButtonImagePath(
                helper.CONTROLLER_TYPES.XBOX,
                0,
                '/assets/img/gamepads/',
                'Black'
            );
            expect(path).toBe('/assets/img/gamepads/xbox/Buttons Outline/Black/SVG/A.svg');
        });

        test('handles different button types', () => {
            const path = helper.getButtonImagePath(
                helper.CONTROLLER_TYPES.XBOX,
                0,
                '/assets/img/gamepads/',
                'White',
                'Solid'
            );
            expect(path).toBe('/assets/img/gamepads/xbox/Buttons Solid/White/SVG/A.svg');
        });

        test('handles invalid button color', () => {
            console.warn = jest.fn();

            const path = helper.getButtonImagePath(
                helper.CONTROLLER_TYPES.XBOX,
                0,
                '/assets/img/gamepads/',
                'Invalid'
            );

            expect(console.warn).toHaveBeenCalledWith("Invalid buttonColor: Invalid. Using 'White' instead.");
            expect(path).toBe('/assets/img/gamepads/xbox/Buttons Outline/White/SVG/A.svg');
        });

        test('handles invalid button type', () => {
            console.warn = jest.fn();

            const path = helper.getButtonImagePath(
                helper.CONTROLLER_TYPES.XBOX,
                0,
                '/assets/img/gamepads/',
                'White',
                'Invalid'
            );

            expect(console.warn).toHaveBeenCalledWith("Invalid buttonType: Invalid. Using 'Outline' instead.");
            expect(path).toBe('/assets/img/gamepads/xbox/Buttons Outline/White/SVG/A.svg');
        });
    });
});
