import {
    afterEach,
    beforeEach,
    describe,
    expect,
    jest,
    test,
} from '@jest/globals';

const fs = require('node:fs');
const path = require('node:path');
const GamepadHelper = require('../src/js/gamepad-helper');
const { getControllerImagePath } = require('../src/js/gamepad-visualizer');

describe('Gamepad visual APIs', () => {
    let container;
    let gamepad;
    let helper;

    beforeEach(() => {
        document.body.replaceChildren();
        container = document.createElement('div');
        document.body.appendChild(container);
        helper = new GamepadHelper();
        gamepad = {
            id: 'Xbox Wireless Controller',
            index: 0,
            connected: true,
            buttons: Array.from({ length: 18 }, () => ({ pressed: false, value: 0 })),
            axes: [0, 0, 0, 0],
            mapping: 'standard',
        };
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    describe('controller visual metadata', () => {
        test.each(['xbox', 'playstation', 'switch'])('references packaged assets for %s', controllerType => {
            const config = helper.getControllerVisualConfig(controllerType);

            expect(config.buttons.length).toBeGreaterThan(0);
            expect(config.sticks).toHaveLength(2);
            expect(config.triggers).toEqual([6, 7]);

            Object.values(config.imagePaths).forEach(relativePath => {
                const assetPath = path.join(
                    __dirname,
                    '..',
                    'assets',
                    'img',
                    'gamepads',
                    ...relativePath.split('/'),
                );
                expect(fs.existsSync(assetPath)).toBe(true);
            });
        });

        test('returns independent visual definition copies', () => {
            const config = helper.getControllerVisualConfig('xbox');
            config.imagePaths.White = 'changed.svg';
            config.buttons[0].attributes.cx = 0;
            config.sticks[0].axes[0] = 99;
            config.triggers[0] = 99;

            const freshConfig = helper.getControllerVisualConfig('xbox');
            expect(freshConfig.imagePaths.White).not.toBe('changed.svg');
            expect(freshConfig.buttons[0].attributes.cx).toBe(2491);
            expect(freshConfig.sticks[0].axes[0]).toBe(0);
            expect(freshConfig.triggers[0]).toBe(6);
        });

        test('returns null for controllers without a visual', () => {
            expect(helper.getControllerVisualConfig('standard')).toBeNull();
        });
    });

    describe('getControllerImagePath', () => {
        test('returns an encoded controller image path', () => {
            expect(helper.getControllerImagePath('xbox')).toBe(
                '/assets/img/gamepads/xbox/Controller%20Images/Solid/Solid%20White%20SVG.svg',
            );
            expect(getControllerImagePath('xbox')).toBe(
                '/assets/img/gamepads/xbox/Controller%20Images/Solid/Solid%20White%20SVG.svg',
            );
        });

        test('normalizes a custom base path and color scheme', () => {
            expect(helper.getControllerImagePath('switch', 'https://example.test/assets', 'Black')).toBe(
                'https://example.test/assets/switch/Controller%20Images/Pro%20Controller/Solid/Pro%20Controller%20Solid%20Black%20SVG.svg',
            );
        });

        test('falls back to white for an invalid color scheme', () => {
            jest.spyOn(console, 'warn').mockImplementation(() => {});

            expect(helper.getControllerImagePath('playstation', '/images/', 'Blue')).toBe(
                '/images/playstation/Controller%20Images/Solid/Solid%20White%20SVG.svg',
            );
            expect(console.warn).toHaveBeenCalledWith("Invalid colorScheme: Blue. Using 'White' instead.");
        });

        test('returns null for controllers without a visual', () => {
            expect(helper.getControllerImagePath('standard')).toBeNull();
        });
    });

    describe('GamepadVisualizer', () => {
        test('is exposed without changing the default GamepadHelper export', () => {
            const visualizer = helper.createVisualizer(container);
            const directVisualizer = new GamepadHelper.GamepadVisualizer(helper, container);

            expect(visualizer).toBeInstanceOf(GamepadHelper.GamepadVisualizer);
            expect(directVisualizer).toBeInstanceOf(GamepadHelper.GamepadVisualizer);
            expect(helper).toBeInstanceOf(GamepadHelper);
        });

        test('requires a DOM container', () => {
            expect(() => helper.createVisualizer(null)).toThrow(
                'GamepadVisualizer requires a DOM container element',
            );
        });

        test('mounts accessible controller, trigger, button, and stick visuals', () => {
            const visualizer = helper.createVisualizer(container, {
                assetBasePath: 'https://example.test/gamepads',
                colorScheme: 'Black',
            });

            expect(visualizer.mount(gamepad)).toBe(visualizer);
            const svg = container.querySelector('.gamepad-visual-svg');
            const controllerImage = svg.querySelector('image');

            expect(svg.getAttribute('viewBox')).toBe('1050 450 2050 1350');
            expect(svg.getAttribute('role')).toBe('img');
            expect(svg.getAttribute('aria-label')).toBe('Xbox input visual');
            expect(svg.querySelector('title').textContent).toBe('Xbox input visual');
            expect(controllerImage.getAttribute('href')).toContain('Solid%20Black%204k.svg');
            expect(container.querySelectorAll('.gamepad-trigger-visual')).toHaveLength(2);
            expect(container.querySelectorAll('.gamepad-stick-indicator')).toHaveLength(2);
            expect(container.querySelector('[data-button-index="0"]')).not.toBeNull();
        });

        test('updates digital buttons, analog triggers, and stick positions', () => {
            const visualizer = helper.createVisualizer(container).mount(gamepad);
            gamepad.buttons[0] = { pressed: false, value: 0.5 };
            gamepad.buttons[1] = { pressed: false, value: 0 };
            gamepad.buttons[6] = { pressed: true, value: 0.75 };
            gamepad.axes = [0.5, -1, 2, undefined];

            expect(visualizer.update(gamepad)).toBe(visualizer);

            const activeButton = container.querySelector('[data-button-index="0"]');
            const inactiveButton = container.querySelector('[data-button-index="1"]');
            const leftTrigger = container.querySelector('.gamepad-trigger-visual');
            const stickButtons = container.querySelectorAll('[data-button-index="10"], [data-button-index="11"]');

            expect(activeButton.classList.contains('active')).toBe(true);
            expect(activeButton.style.fillOpacity).toBe('0.45');
            expect(inactiveButton.classList.contains('active')).toBe(false);
            expect(inactiveButton.style.fillOpacity).toBe('0');
            expect(leftTrigger.classList.contains('active')).toBe(true);
            expect(leftTrigger.style.getPropertyValue('--gamepad-trigger-value')).toBe('75%');
            expect(leftTrigger.getAttribute('aria-valuenow')).toBe('0.75');
            expect(leftTrigger.querySelector('.gamepad-trigger-value').textContent).toBe('0.75');
            expect(stickButtons[0].getAttribute('transform')).toBe('translate(40.0 -80.0)');
            expect(stickButtons[1].getAttribute('transform')).toBe('translate(80.0 0.0)');
        });

        test('remounts when a different gamepad is supplied', () => {
            const visualizer = helper.createVisualizer(container).mount(gamepad);
            const playstationGamepad = {
                ...gamepad,
                id: '054c-0ce6-Wireless Controller',
            };

            visualizer.update(playstationGamepad);

            expect(container.querySelector('svg').getAttribute('aria-label')).toBe(
                'Sony DualSense (PS5) input visual',
            );
            expect(container.querySelector('svg').getAttribute('viewBox')).toBe('950 400 2200 1350');
        });

        test('remounts the current gamepad when the color changes', () => {
            const visualizer = helper.createVisualizer(container).mount(gamepad);

            expect(visualizer.setColorScheme('Black')).toBe(visualizer);
            expect(container.querySelector('image').getAttribute('href')).toContain('Solid%20Black%204k.svg');
        });

        test('falls back when a trigger image cannot load', () => {
            const visualizer = helper.createVisualizer(container).mount(gamepad);
            const image = container.querySelector('.gamepad-trigger-image');
            const fallback = container.querySelector('.gamepad-trigger-name');

            image.dispatchEvent(new Event('error'));

            expect(image.classList.contains('gamepad-trigger-image-unavailable')).toBe(true);
            expect(fallback.classList.contains('visible')).toBe(true);
            expect(visualizer.update()).toBe(visualizer);
        });

        test('shows caller-provided fallback text for unsupported controllers', () => {
            const visualizer = helper.createVisualizer(container, {
                unavailableText: 'No matching artwork.',
            });
            const genericGamepad = { ...gamepad, id: 'Unknown Controller' };

            visualizer.mount(genericGamepad);

            expect(container.querySelector('.gamepad-visual-unavailable').textContent).toBe(
                'No matching artwork.',
            );
        });

        test('shows fallback text when the controller image cannot load', () => {
            helper.createVisualizer(container).mount(gamepad);

            container.querySelector('svg image').dispatchEvent(new Event('error'));

            expect(container.querySelector('.gamepad-visual-unavailable').textContent).toContain(
                'not available',
            );
        });

        test('unmounts on an empty update and can be destroyed', () => {
            const visualizer = helper.createVisualizer(container).mount(gamepad);

            visualizer.update(null);
            expect(container.querySelector('.gamepad-visual-unavailable')).not.toBeNull();

            expect(visualizer.destroy()).toBe(visualizer);
            expect(container.childElementCount).toBe(0);
            expect(visualizer.gamepad).toBeNull();
            expect(visualizer.controllerType).toBeNull();
        });

        test('normalizes invalid constructor and setter color schemes', () => {
            jest.spyOn(console, 'warn').mockImplementation(() => {});
            const visualizer = helper.createVisualizer(container, { colorScheme: 'Blue' });

            visualizer.mount(gamepad);
            visualizer.setColorScheme('Green');

            expect(console.warn).toHaveBeenNthCalledWith(1, "Invalid colorScheme: Blue. Using 'White' instead.");
            expect(console.warn).toHaveBeenNthCalledWith(2, "Invalid colorScheme: Green. Using 'White' instead.");
        });
    });
});

describe('browser/controller compatibility issues', () => {
    const switchGamepad = {
        id: '057e-2009-HID VHF Driver',
        buttons: [],
        axes: [],
    };
    let helper;

    beforeEach(() => {
        helper = new GamepadHelper();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    test('extracts only Firefox major versions', () => {
        expect(helper.getFirefoxMajorVersion('Mozilla/5.0 Firefox/154.0')).toBe(154);
        expect(helper.getFirefoxMajorVersion('Mozilla/5.0 Chrome/154.0')).toBeNull();
        expect(helper.getFirefoxMajorVersion(null)).toBeNull();
    });

    test('returns a structured issue for affected Firefox Switch controllers', () => {
        expect(helper.getCompatibilityIssues(switchGamepad, {
            userAgent: 'Mozilla/5.0 Firefox/154.0',
        })).toEqual([{
            code: 'firefox-switch-gamepad-mapping',
            severity: 'warning',
            browser: 'firefox',
            browserVersion: 154,
            controllerType: 'switch',
            fixedVersion: 155,
            issueUrl: 'https://bugzilla.mozilla.org/show_bug.cgi?id=1704419',
            message: 'Firefox versions before 155 can report incorrect buttons and axes for Nintendo Switch controllers.',
        }]);
    });

    test('uses navigator.userAgent by default', () => {
        jest.spyOn(globalThis.navigator, 'userAgent', 'get').mockReturnValue('Firefox/154.0');

        expect(helper.getCompatibilityIssues(switchGamepad)).toHaveLength(1);
    });

    test('handles an environment without navigator user-agent data', () => {
        const navigatorDescriptor = Object.getOwnPropertyDescriptor(globalThis, 'navigator');
        Object.defineProperty(globalThis, 'navigator', {
            configurable: true,
            value: undefined,
        });

        try {
            expect(helper.getCompatibilityIssues(switchGamepad)).toEqual([]);
        } finally {
            Object.defineProperty(globalThis, 'navigator', navigatorDescriptor);
        }
    });

    test('does not report unaffected combinations', () => {
        const xboxGamepad = { ...switchGamepad, id: 'xinput' };

        expect(helper.getCompatibilityIssues(null, { userAgent: 'Firefox/154.0' })).toEqual([]);
        expect(helper.getCompatibilityIssues(switchGamepad, { userAgent: 'Firefox/155.0' })).toEqual([]);
        expect(helper.getCompatibilityIssues(switchGamepad, { userAgent: 'Chrome/154.0' })).toEqual([]);
        expect(helper.getCompatibilityIssues(xboxGamepad, { userAgent: 'Firefox/154.0' })).toEqual([]);
    });

});
