/**
 * Controller visual rendering for Gamepad API consumers.
 */

const DEFAULT_ASSET_BASE_PATH = '/assets/img/gamepads/';
const SVG_NAMESPACE = 'http://www.w3.org/2000/svg';
const VALID_COLOR_SCHEMES = new Set(['Black', 'White']);

function createDPadButtonVisuals(shapes) {
    return shapes.map((shape, index) => ({
        index: index + 12,
        ...shape,
    }));
}

const CONTROLLER_VISUAL_CONFIGS = {
    xbox: {
        viewBox: '1050 450 2050 1350',
        imagePaths: {
            Black: 'xbox/Controller Images/Solid/Solid Black 4k.svg',
            White: 'xbox/Controller Images/Solid/Solid White SVG.svg',
        },
        buttons: [
            { index: 0, tag: 'circle', attributes: { cx: 2491, cy: 925, r: 70 } },
            { index: 1, tag: 'circle', attributes: { cx: 2606, cy: 811, r: 70 } },
            { index: 2, tag: 'circle', attributes: { cx: 2376, cy: 810, r: 70 } },
            { index: 3, tag: 'circle', attributes: { cx: 2491, cy: 695, r: 70 } },
            { index: 4, tag: 'path', attributes: { d: 'M1443,623.26s43.32-137.59,277-140.76c0,0,17.41,2.5,22.55,6.65,0,0,30.3,30.18,49.07,33.29C1791.65,522.44,1582.23,499.75,1443,623.26Z' } },
            { index: 5, tag: 'path', attributes: { d: 'M2653.21,623.26s-43.32-137.59-277-140.76c0,0-17.4,2.5-22.55,6.65,0,0-30.29,30.18-49.07,33.29C2304.6,522.44,2514,499.75,2653.21,623.26Z' } },
            { index: 8, tag: 'circle', attributes: { cx: 1922, cy: 808, r: 52 } },
            { index: 9, tag: 'circle', attributes: { cx: 2173, cy: 808, r: 52 } },
            { index: 10, tag: 'circle', attributes: { cx: 1602, cy: 816, r: 105 } },
            { index: 11, tag: 'circle', attributes: { cx: 2276, cy: 1073, r: 105 } },
            ...createDPadButtonVisuals([
                { tag: 'rect', attributes: { x: 1771, y: 964, width: 92, height: 82, rx: 13 } },
                { tag: 'rect', attributes: { x: 1771, y: 1139, width: 92, height: 82, rx: 13 } },
                { tag: 'rect', attributes: { x: 1692, y: 1046, width: 79, height: 93, rx: 13 } },
                { tag: 'rect', attributes: { x: 1863, y: 1046, width: 82, height: 93, rx: 13 } },
            ]),
            { index: 16, tag: 'circle', attributes: { cx: 2049, cy: 637, r: 65 } },
        ],
        sticks: [
            { buttonIndex: 10, axes: [0, 1], x: 1602, y: 816, range: 80 },
            { buttonIndex: 11, axes: [2, 3], x: 2276, y: 1073, range: 80 },
        ],
        triggers: [6, 7],
    },
    playstation: {
        viewBox: '950 400 2200 1350',
        imagePaths: {
            Black: 'playstation/Controller Images/Solid/Solid Black SVG.svg',
            White: 'playstation/Controller Images/Solid/Solid White SVG.svg',
        },
        buttons: [
            { index: 0, tag: 'circle', attributes: { cx: 2668, cy: 966, r: 72 } },
            { index: 1, tag: 'circle', attributes: { cx: 2815, cy: 819, r: 72 } },
            { index: 2, tag: 'circle', attributes: { cx: 2521, cy: 819, r: 72 } },
            { index: 3, tag: 'circle', attributes: { cx: 2668, cy: 672, r: 72 } },
            { index: 4, tag: 'path', attributes: { d: 'M1306.92,530.22v-24s64.45-44.31,142-52.75,109.72,5,109.72,5a57.45,57.45,0,0,1,4.74,28.49S1402.82,497.78,1306.92,530.22Z' } },
            { index: 5, tag: 'path', attributes: { d: 'M2787.64,530.22v-24s-64.45-44.31-142-52.75-109.71,5-109.71,5a57.52,57.52,0,0,0-4.75,28.49S2691.74,497.78,2787.64,530.22Z' } },
            { index: 8, tag: 'rect', attributes: { x: 1545, y: 530, width: 80, height: 145, rx: 35, transform: 'rotate(-8 1585 602)' } },
            { index: 9, tag: 'rect', attributes: { x: 2470, y: 530, width: 80, height: 145, rx: 35, transform: 'rotate(8 2510 602)' } },
            { index: 10, tag: 'circle', attributes: { cx: 1724, cy: 1094, r: 115 } },
            { index: 11, tag: 'circle', attributes: { cx: 2370, cy: 1093, r: 115 } },
            ...createDPadButtonVisuals([
                { tag: 'path', attributes: { d: 'M1449.18,658.32s-11.48-1.24-24-1.24-24,1.24-24,1.24-26.51,1.17-28.49,23.66l1.59,48.59a24.8,24.8,0,0,0,5.44,14.73l35,38.58a6.74,6.74,0,0,0,4.16,2.45,40.6,40.6,0,0,0,6.35.53,41.32,41.32,0,0,0,7.07-.67,4.91,4.91,0,0,0,3-1.79l34.52-38a28.88,28.88,0,0,0,6.33-17.17l1.55-47.22C1475.15,659.49,1449.18,658.32,1449.18,658.32Z' } },
                { tag: 'path', attributes: { d: 'M1401.18,976.94s11.47,1.25,24,1.25,24-1.25,24-1.25,26.5-1.17,28.48-23.65l-1.59-48.6a24.79,24.79,0,0,0-5.43-14.73l-35-38.58a6.68,6.68,0,0,0-4.16-2.44,39.28,39.28,0,0,0-6.34-.53,41.49,41.49,0,0,0-7.08.66,5,5,0,0,0-3,1.79l-34.51,38a28.85,28.85,0,0,0-6.34,17.17l-1.55,47.23C1375.2,975.77,1401.18,976.94,1401.18,976.94Z' } },
                { tag: 'path', attributes: { d: 'M1265.87,793.63s-1.25,11.48-1.25,24,1.25,24,1.25,24,1.17,26.51,23.65,28.49l48.6-1.6a24.73,24.73,0,0,0,14.73-5.43l38.58-35a6.68,6.68,0,0,0,2.44-4.16,39.42,39.42,0,0,0,.53-6.35,41.46,41.46,0,0,0-.66-7.07,5.06,5.06,0,0,0-1.79-3l-38-34.51a28.87,28.87,0,0,0-17.18-6.33l-47.22-1.55C1267,767.65,1265.87,793.63,1265.87,793.63Z' } },
                { tag: 'path', attributes: { d: 'M1584.48,841.63s1.25-11.47,1.25-24-1.25-24-1.25-24-1.17-26.5-23.65-28.48l-48.6,1.59a24.79,24.79,0,0,0-14.72,5.43l-38.59,35a6.77,6.77,0,0,0-2.44,4.16,39.28,39.28,0,0,0-.53,6.34,41.21,41.21,0,0,0,.67,7.07,5,5,0,0,0,1.78,3l38,34.51a28.94,28.94,0,0,0,17.18,6.34l47.22,1.55C1583.31,867.61,1584.48,841.63,1584.48,841.63Z' } },
            ]),
            { index: 16, tag: 'circle', attributes: { cx: 2048, cy: 1094, r: 70 } },
            { index: 17, tag: 'path', attributes: { d: 'M2446.36,528.91l-.06-.3c.6-17-2.64-40.77-23.6-49.54-7.28-3.05-28.57-5.62-57.54-7.79-96.28-9.84-316.91-10.41-316.91-10.41h-.45s-220.63.57-316.91,10.41c-29,2.17-50.27,4.74-57.54,7.79-21,8.77-24.2,32.57-23.6,49.54,0,.1,0,.2-.07.3l.1.48a105.85,105.85,0,0,0,2.21,17.72l52.22,255.56q1.63,5.87,3.63,11.19A112,112,0,0,0,1718,834.93a106.93,106.93,0,0,0,26,29.1,110.63,110.63,0,0,0,34.7,18.12,119.88,119.88,0,0,0,15.93,4c2.53.46,5.11.87,7.78,1.21h491.27c2.66-.34,5.25-.75,7.78-1.21a119.88,119.88,0,0,0,15.93-4,110.63,110.63,0,0,0,34.7-18.12,106.74,106.74,0,0,0,26-29.1,111.54,111.54,0,0,0,10.17-21.07c1.32-3.55,2.54-7.28,3.63-11.19l52.22-255.56a105.85,105.85,0,0,0,2.21-17.72Z' } },
        ],
        sticks: [
            { buttonIndex: 10, axes: [0, 1], x: 1724, y: 1094, range: 85 },
            { buttonIndex: 11, axes: [2, 3], x: 2370, y: 1093, range: 85 },
        ],
        triggers: [6, 7],
    },
    switch: {
        viewBox: '1050 450 2050 1350',
        imagePaths: {
            Black: 'switch/Controller Images/Pro Controller/Solid/Pro Controller Solid Black SVG.svg',
            White: 'switch/Controller Images/Pro Controller/Solid/Pro Controller Solid White SVG.svg',
        },
        buttons: [
            { index: 0, tag: 'circle', attributes: { cx: 2501, cy: 956, r: 70 } },
            { index: 1, tag: 'circle', attributes: { cx: 2637, cy: 841, r: 70 } },
            { index: 2, tag: 'circle', attributes: { cx: 2371, cy: 841, r: 70 } },
            { index: 3, tag: 'circle', attributes: { cx: 2501, cy: 725, r: 70 } },
            { index: 4, tag: 'path', attributes: { d: 'M1404.59,610.8c43.07-43.91,147.53-67.61,260.35-80.32l5.36-.59.62-.07c39.26-4.29,79.4-7.26,118.24-9.31C1759,511,1719,487.24,1719,487.24l-20-3.16c-210.46-1.59-285.89,86-285.89,86l-28.81,52.62A132.91,132.91,0,0,0,1404.59,610.8Z' } },
            { index: 5, tag: 'path', attributes: { d: 'M2424.51,529.82l.63.07,5.36.59c112.82,12.71,217.28,36.41,260.35,80.32a135.13,135.13,0,0,0,22.22,12.74l-29.3-53.49s-75.43-87.56-285.89-86l-20,3.16s-40.23,23.87-70.39,33.34C2345.93,522.63,2385.65,525.57,2424.51,529.82Z' } },
            { index: 8, tag: 'circle', attributes: { cx: 1837, cy: 711, r: 50 } },
            { index: 9, tag: 'circle', attributes: { cx: 2260, cy: 711, r: 50 } },
            { index: 10, tag: 'circle', attributes: { cx: 1578, cy: 841, r: 105 } },
            { index: 11, tag: 'circle', attributes: { cx: 2275, cy: 1072, r: 105 } },
            ...createDPadButtonVisuals([
                { tag: 'rect', attributes: { x: 1741, y: 950, width: 87, height: 83, rx: 17 } },
                { tag: 'rect', attributes: { x: 1741, y: 1120, width: 87, height: 83, rx: 17 } },
                { tag: 'rect', attributes: { x: 1658, y: 1033, width: 83, height: 87, rx: 17 } },
                { tag: 'rect', attributes: { x: 1828, y: 1033, width: 83, height: 87, rx: 17 } },
            ]),
            { index: 16, tag: 'circle', attributes: { cx: 2172, cy: 841, r: 55 } },
            { index: 17, tag: 'rect', attributes: { x: 1876, y: 791, width: 105, height: 105, rx: 18 } },
        ],
        sticks: [
            { buttonIndex: 10, axes: [0, 1], x: 1578, y: 841, range: 80 },
            { buttonIndex: 11, axes: [2, 3], x: 2275, y: 1072, range: 80 },
        ],
        triggers: [6, 7],
    },
};

function normalizeBasePath(basePath) {
    return basePath.endsWith('/') ? basePath : `${basePath}/`;
}

function normalizeColorScheme(colorScheme) {
    if (VALID_COLOR_SCHEMES.has(colorScheme)) {
        return colorScheme;
    }

    console.warn(`Invalid colorScheme: ${colorScheme}. Using 'White' instead.`);
    return 'White';
}

function encodeAssetPath(relativePath) {
    return relativePath
        .split('/')
        .map(pathPart => encodeURIComponent(pathPart))
        .join('/');
}

function cloneVisualConfig(config) {
    if (!config) {
        return null;
    }

    return {
        viewBox: config.viewBox,
        imagePaths: { ...config.imagePaths },
        buttons: config.buttons.map(button => ({
            ...button,
            attributes: { ...button.attributes },
        })),
        sticks: config.sticks.map(stick => ({
            ...stick,
            axes: [...stick.axes],
        })),
        triggers: [...config.triggers],
    };
}

/**
 * Get a copy of the visual definition for a controller type.
 * @param {string} controllerType - Controller type reported by GamepadHelper
 * @returns {Object|null} Controller visual definition, or null when unavailable
 */
function getControllerVisualConfig(controllerType) {
    return cloneVisualConfig(CONTROLLER_VISUAL_CONFIGS[controllerType]);
}

/**
 * Get the image path for a full controller visual.
 * @param {string} controllerType - Controller type reported by GamepadHelper
 * @param {string} [basePath='/assets/img/gamepads/'] - Base path containing controller assets
 * @param {string} [colorScheme='White'] - Image color scheme ('Black' or 'White')
 * @returns {string|null} Encoded controller image path, or null when unavailable
 */
function getControllerImagePath(
    controllerType,
    basePath = DEFAULT_ASSET_BASE_PATH,
    colorScheme = 'White',
) {
    const config = CONTROLLER_VISUAL_CONFIGS[controllerType];
    if (!config) {
        return null;
    }

    const resolvedColorScheme = normalizeColorScheme(colorScheme);
    return normalizeBasePath(basePath) + encodeAssetPath(config.imagePaths[resolvedColorScheme]);
}

function clamp(value, minimum, maximum) {
    return Math.max(minimum, Math.min(maximum, Number(value) || 0));
}

/**
 * Render and update a controller visual in a caller-provided DOM container.
 */
class GamepadVisualizer {
    /**
     * @param {GamepadHelper} helper - GamepadHelper instance used for mappings and paths
     * @param {Element} container - DOM element that will contain the visual
     * @param {Object} [options] - Renderer options
     * @param {string} [options.assetBasePath='/assets/img/gamepads/'] - Base asset path
     * @param {string} [options.colorScheme='White'] - Controller and button image color
     * @param {string} [options.unavailableText] - Fallback text for unsupported visuals
     */
    constructor(helper, container, options = {}) {
        if (!container || typeof container.replaceChildren !== 'function') {
            throw new TypeError('GamepadVisualizer requires a DOM container element');
        }

        this.helper = helper;
        this.container = container;
        this.assetBasePath = normalizeBasePath(options.assetBasePath || DEFAULT_ASSET_BASE_PATH);
        this.colorScheme = normalizeColorScheme(options.colorScheme || 'White');
        this.unavailableText = options.unavailableText || 'A visual is not available for this controller.';
        this.buttonElements = new Map();
        this.stickElements = [];
        this.triggerElements = new Map();
        this.gamepad = null;
        this.gamepadId = null;
        this.controllerType = null;
    }

    createSvgElement(tag, attributes = {}) {
        const element = this.container.ownerDocument.createElementNS(SVG_NAMESPACE, tag);
        Object.entries(attributes).forEach(([name, value]) => {
            element.setAttribute(name, value);
        });
        return element;
    }

    showUnavailable() {
        const message = this.container.ownerDocument.createElement('span');
        message.className = 'gamepad-visual-unavailable';
        message.textContent = this.unavailableText;
        this.container.replaceChildren(message);
    }

    createTriggerVisual(controllerType, buttonIndex) {
        const document = this.container.ownerDocument;
        const buttonName = this.helper.getButtonName(controllerType, buttonIndex);
        const trigger = document.createElement('div');
        trigger.className = 'gamepad-trigger-visual';
        trigger.setAttribute('role', 'progressbar');
        trigger.setAttribute('aria-label', `${buttonName} trigger pressure`);
        trigger.setAttribute('aria-valuemin', '0');
        trigger.setAttribute('aria-valuemax', '1');
        trigger.setAttribute('aria-valuenow', '0');

        const fill = document.createElement('span');
        fill.className = 'gamepad-trigger-fill';
        trigger.appendChild(fill);

        const image = document.createElement('img');
        image.className = 'gamepad-trigger-image';
        image.src = this.helper.getButtonImagePath(
            controllerType,
            buttonIndex,
            this.assetBasePath,
            this.colorScheme,
        );
        image.alt = buttonName;
        trigger.appendChild(image);

        const fallback = document.createElement('span');
        fallback.className = 'gamepad-trigger-name';
        fallback.textContent = buttonName;
        trigger.appendChild(fallback);

        image.addEventListener('error', () => {
            image.classList.add('gamepad-trigger-image-unavailable');
            fallback.classList.add('visible');
        }, { once: true });

        const value = document.createElement('span');
        value.className = 'gamepad-trigger-value';
        value.textContent = '0.00';
        trigger.appendChild(value);

        this.triggerElements.set(buttonIndex, { element: trigger, value });
        return trigger;
    }

    /**
     * Mount a visual for a gamepad and apply its current input state.
     * @param {Gamepad|null} gamepad - Gamepad to render
     * @returns {GamepadVisualizer} This visualizer
     */
    mount(gamepad) {
        this.buttonElements = new Map();
        this.stickElements = [];
        this.triggerElements = new Map();
        this.gamepad = gamepad || null;
        this.gamepadId = gamepad?.id || null;
        this.controllerType = gamepad ? this.helper.detectControllerType(gamepad.id) : null;
        this.container.replaceChildren();

        const config = getControllerVisualConfig(this.controllerType);
        if (!gamepad || !config) {
            this.showUnavailable();
            return this;
        }

        const gamepadInfo = this.helper.getGamepadInfo(gamepad.id);
        this.container.appendChild(this.createTriggerVisual(this.controllerType, config.triggers[0]));

        const visual = this.createSvgElement('svg', {
            class: 'gamepad-visual-svg',
            viewBox: config.viewBox,
            role: 'img',
            'aria-label': `${gamepadInfo.name} input visual`,
        });
        const title = this.createSvgElement('title');
        title.textContent = `${gamepadInfo.name} input visual`;
        visual.appendChild(title);

        const controllerImage = this.createSvgElement('image', {
            href: getControllerImagePath(this.controllerType, this.assetBasePath, this.colorScheme),
            width: 4096,
            height: 2160,
            preserveAspectRatio: 'xMidYMid meet',
        });
        controllerImage.addEventListener('error', () => this.showUnavailable(), { once: true });
        visual.appendChild(controllerImage);

        config.buttons.forEach(button => {
            const control = this.createSvgElement(button.tag, button.attributes);
            control.classList.add('gamepad-visual-control');
            control.dataset.buttonIndex = button.index;
            visual.appendChild(control);
            this.buttonElements.set(button.index, control);
        });

        config.sticks.forEach(stick => {
            const indicator = this.createSvgElement('circle', {
                class: 'gamepad-stick-indicator',
                cx: stick.x,
                cy: stick.y,
                r: 28,
            });
            visual.appendChild(indicator);
            this.stickElements.push({
                ...stick,
                buttonElement: this.buttonElements.get(stick.buttonIndex),
                indicator,
            });
        });

        this.container.appendChild(visual);
        this.container.appendChild(this.createTriggerVisual(this.controllerType, config.triggers[1]));
        return this.update(gamepad);
    }

    /**
     * Update the mounted visual with the latest Gamepad API state.
     * @param {Gamepad} [gamepad] - Latest gamepad state; defaults to the mounted gamepad
     * @returns {GamepadVisualizer} This visualizer
     */
    update(gamepad = this.gamepad) {
        if (!gamepad) {
            return this.mount(null);
        }

        const controllerType = this.helper.detectControllerType(gamepad.id);
        if (gamepad.id !== this.gamepadId || controllerType !== this.controllerType) {
            return this.mount(gamepad);
        }

        this.gamepad = gamepad;
        gamepad.buttons.forEach((button, index) => {
            const control = this.buttonElements.get(index);
            if (!control) {
                return;
            }

            const value = clamp(button.value, 0, 1);
            const isActive = Boolean(button.pressed) || value > 0.1;
            const opacity = Math.max(0.35, value * 0.9);
            control.classList.toggle('active', isActive);
            control.style.fillOpacity = isActive ? opacity.toFixed(2) : '0';
        });

        this.triggerElements.forEach((trigger, buttonIndex) => {
            const button = gamepad.buttons[buttonIndex];
            const value = clamp(button?.value, 0, 1);
            const isActive = Boolean(button?.pressed) || value > 0.1;
            trigger.element.classList.toggle('active', isActive);
            trigger.element.style.setProperty('--gamepad-trigger-value', `${(value * 100).toFixed(0)}%`);
            trigger.element.setAttribute('aria-valuenow', value.toFixed(2));
            trigger.value.textContent = value.toFixed(2);
        });

        this.stickElements.forEach(stick => {
            const horizontalValue = clamp(gamepad.axes[stick.axes[0]], -1, 1);
            const verticalValue = clamp(gamepad.axes[stick.axes[1]], -1, 1);
            const transform = `translate(${(horizontalValue * stick.range).toFixed(1)} ${(verticalValue * stick.range).toFixed(1)})`;
            stick.buttonElement?.setAttribute('transform', transform);
            stick.indicator.setAttribute('transform', transform);
        });

        return this;
    }

    /**
     * Change image colors and remount the current gamepad.
     * @param {string} colorScheme - Image color scheme ('Black' or 'White')
     * @returns {GamepadVisualizer} This visualizer
     */
    setColorScheme(colorScheme) {
        this.colorScheme = normalizeColorScheme(colorScheme);
        return this.mount(this.gamepad);
    }

    /**
     * Remove the rendered visual and release references to the mounted gamepad.
     * @returns {GamepadVisualizer} This visualizer
     */
    destroy() {
        this.container.replaceChildren();
        this.buttonElements.clear();
        this.stickElements = [];
        this.triggerElements.clear();
        this.gamepad = null;
        this.gamepadId = null;
        this.controllerType = null;
        return this;
    }
}

module.exports = {
    GamepadVisualizer,
    getControllerImagePath,
    getControllerVisualConfig,
};
