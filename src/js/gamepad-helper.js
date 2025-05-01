/**
 * Gamepad Helper Module
 * This module provides a set of utilities for working with gamepads in web applications.
 */
class GamepadHelper {
    constructor() {
        /**
         * Controller Types
         * @property {string} XBOX - Xbox family of controllers
         * @property {string} PLAYSTATION - PlayStation family of controllers
         * @property {string} SWITCH - Nintendo Switch controllers
         * @property {string} STANDARD - Generic or standard controllers
         */
        this.CONTROLLER_TYPES = {
            XBOX: 'xbox',
            PLAYSTATION: 'playstation',
            SWITCH: 'switch',
            STANDARD: 'standard'
        };

        /**
         * Exact Gamepad Mappings
         * This object maps specific gamepad API IDs to controller types and names.
         * @property {string} name - The name of the controller
         * @property {Array<string>} gamepad_api_ids - Array of gamepad API IDs for exact matching
         * @property {string} type - The type of controller (XBOX, PLAYSTATION, SWITCH, STANDARD)
         */
        this.exactGamepadMappings = {
            0: {
                name: "Generic Gamepad",
                gamepad_api_ids: [
                    "USB Gamepad (STANDARD GAMEPAD Vendor: 0079 Product: 0011)",
                    "Logitech Cordless RumblePad 2 (STANDARD GAMEPAD Vendor: 046d Product: c219)",
                    "Unknown Gamepad (Vendor: 2563 Product: 0575)",
                    "PC/PS3/Android (Vendor: 2563 Product: 0575)",
                    "Core (Plus) Wired Controller (Vendor: 20d6 Product: a711)",
                    "Wireless Controller Extended Gamepad",
                ],
                type: this.CONTROLLER_TYPES.STANDARD,
            },
            1: {
                name: "Sony PlayStation 3",
                gamepad_api_ids: [
                    "54c-268-PLAYSTATION(R)3 Controller",
                    "PLAYSTATION(R)3 Controller (STANDARD GAMEPAD Vendor: 054c Product: 0268)",
                    "PLAYSTATION(R)3 Controller (Vendor: 054c Product: 0268)",
                    "PS3 GamePad (Vendor: 054c Product: 0268)",
                    "PS3/PC Wired GamePad (Vendor: 2563 Product: 0523)",
                ],
                type: this.CONTROLLER_TYPES.PLAYSTATION
            },
            2: {
                name: "Sony DualShock (PS4)",
                gamepad_api_ids: [
                    "054c-05c4-Wireless Controller",
                    "Wireless controller (STANDARD GAMEPAD Vendor: 054c Product: 05c4)",
                    "054c-09cc-Unknown Gamepad",
                    "Unknown Gamepad (STANDARD GAMEPAD Vendor: 054c Product: 09cc)",
                    "DS4 Wired Controller (Vendor: 7545 Product: 0104)",
                ],
                type: this.CONTROLLER_TYPES.PLAYSTATION
            },
            3: {
                name: "Sony DualSense (PS5)",
                gamepad_api_ids: [
                    "054c-0ce6-Wireless Controller",
                    "Wireless Controller (Vendor: 054c Product: 0ce6)",
                    "Wireless Controller (STANDARD GAMEPAD Vendor: 054c Product: 0ce6)",
                ],
                type: this.CONTROLLER_TYPES.PLAYSTATION
            },
            4: {
                name: "Xbox",
                gamepad_api_ids: [
                    "xinput",
                    "Xbox Wireless Controller Extended Gamepad",
                    "Xbox Wireless Controller",
                ],
                type: this.CONTROLLER_TYPES.XBOX
            },
            5: {
                name: "Xbox 360",
                gamepad_api_ids: [
                ],
                type: this.CONTROLLER_TYPES.XBOX
            },
            6: {
                name: "Xbox One/Series",
                gamepad_api_ids: [
                    "HID-compliant game controller (STANDARD GAMEPAD Vendor: 045e Product: 0b13)",
                ],
                type: this.CONTROLLER_TYPES.XBOX
            },
            7: {
                name: "Nintendo Switch Pro Controller",
                gamepad_api_ids: [
                    "Pro Controller (STANDARD GAMEPAD Vendor: 057e Product: 2009)",
                ],
                type: this.CONTROLLER_TYPES.SWITCH
            },
            8: {
                name: "Stadia Controller",
                gamepad_api_ids: [
                    "Stadia Controller rev. A (STANDARD GAMEPAD Vendor: 18d1 Product: 9400)",
                ],
                type: this.CONTROLLER_TYPES.STANDARD,
            },
            9: {
                name: "SNES Gamepad",
                gamepad_api_ids: [
                    "usb gamepad (Vendor: 0810 Product: e501)",
                ],
                type: this.CONTROLLER_TYPES.STANDARD,
            }
        };

        /**
         * Exact ID Lookup
         * This object maps gamepad API IDs to their respective controller mappings.
         */
        this.exactIdLookup = {};
        Object.values(this.exactGamepadMappings).forEach(mapping => {
            mapping.gamepad_api_ids.forEach(id => {
                this.exactIdLookup[id] = mapping;
            });
        });

        /**
         * Controller Mappings
         * This object maps controller types to their respective button and axis mappings.
         * @property {Object} buttonMap - Maps button indices to button names
         * @property {Object} axisMap - Maps axis indices to axis names
         */
        this.controllerMappings = {
            // Xbox controllers
            [this.CONTROLLER_TYPES.XBOX]: {
                buttonMap: {
                    0: 'A',
                    1: 'B',
                    2: 'X',
                    3: 'Y',
                    4: 'LB',
                    5: 'RB',
                    6: 'LT',
                    7: 'RT',
                    8: 'Back',
                    9: 'Start',
                    10: 'LS',
                    11: 'RS',
                    12: 'DUp',
                    13: 'DDown',
                    14: 'DLeft',
                    15: 'DRight',
                    16: 'Home',
                },
                axisMap: {
                    0: 'Left Stick X',
                    1: 'Left Stick Y',
                    2: 'Right Stick X',
                    3: 'Right Stick Y'
                }
            },

            // PlayStation controllers
            [this.CONTROLLER_TYPES.PLAYSTATION]: {
                buttonMap: {
                    0: '×',
                    1: '○',
                    2: '□',
                    3: '△',
                    4: 'L1',
                    5: 'R1',
                    6: 'L2',
                    7: 'R2',
                    8: 'Share',
                    9: 'Options',
                    10: 'L3',
                    11: 'R3',
                    12: 'DUp',
                    13: 'DDown',
                    14: 'DLeft',
                    15: 'DRight',
                    16: 'PS',
                    17: 'TouchPad',
                },
                axisMap: {
                    0: 'Left Stick X',
                    1: 'Left Stick Y',
                    2: 'Right Stick X',
                    3: 'Right Stick Y'
                }
            },

            // Nintendo Switch controllers
            [this.CONTROLLER_TYPES.SWITCH]: {
                buttonMap: {
                    0: 'B',
                    1: 'A',
                    2: 'Y',
                    3: 'X',
                    4: 'L',
                    5: 'R',
                    6: 'ZL',
                    7: 'ZR',
                    8: 'Minus',
                    9: 'Plus',
                    10: 'LS',
                    11: 'RS',
                    12: 'DUp',
                    13: 'DDown',
                    14: 'DLeft',
                    15: 'DRight',
                    16: 'Home',
                    17: 'Capture',
                },
                axisMap: {
                    0: 'Left Stick X',
                    1: 'Left Stick Y',
                    2: 'Right Stick X',
                    3: 'Right Stick Y'
                }
            },

            // Default mapping for unknown controllers
            [this.CONTROLLER_TYPES.STANDARD]: {
                buttonMap: {},  // Will use index numbers by default
                axisMap: {
                    0: 'Axis 0',
                    1: 'Axis 1',
                    2: 'Axis 2',
                    3: 'Axis 3'
                }
            }
        };
    }

    /**
     * Get the image path for a specific button on a controller
     * @param controllerType The type of controller (XBOX, PLAYSTATION, SWITCH)
     * @param buttonIndex The index of the button (int)
     * @param basePath The base path for the images, default is '/assets/img/gamepads/'
     * @param buttonColor The color of the button (Black or White), default is 'White'
     * @param buttonType The type of button (Outline, Solid, Full Solid), default is 'Outline'
     * @returns {null|string} The path to the button image or null if not found
     */
    getButtonImagePath(
        controllerType,
        buttonIndex,
        basePath = '/assets/img/gamepads/',
        buttonColor = 'White',
        buttonType = 'Outline',
    ) {
        // input validation
        if (!['Black', 'White'].includes(buttonColor)) {
            console.warn(`Invalid buttonColor: ${buttonColor}. Using 'White' instead.`);
            buttonColor = 'White';
        }

        if (!['Outline', 'Solid', 'Full Solid'].includes(buttonType)) {
            console.warn(`Invalid buttonType: ${buttonType}. Using 'Outline' instead.`);
            buttonType = 'Outline';
        }

        // Controller-specific paths and button mappings
        const imageMappings = {
            [this.CONTROLLER_TYPES.XBOX]: {
                folder: `xbox/Buttons ${buttonType}/${buttonColor}/SVG/`,
                buttons: {
                    0: 'A.svg',
                    1: 'B.svg',
                    2: 'X.svg',
                    3: 'Y.svg',
                    4: 'Left Bumper.svg',
                    5: 'Right Bumper.svg',
                    6: 'Left Trigger.svg',
                    7: 'Right Trigger.svg',
                    8: 'View.svg',
                    9: 'Menu.svg',
                    10: 'Left Stick.svg',
                    11: 'Right Stick.svg',
                    12: 'D-Pad Up.svg',
                    13: 'D-Pad Down.svg',
                    14: 'D-Pad Left.svg',
                    15: 'D-Pad Right.svg',
                    16: 'Home.svg'
                }
            },
            [this.CONTROLLER_TYPES.PLAYSTATION]: {
                folder: `playstation/Buttons ${buttonType}/${buttonColor}/SVG/`,
                buttons: {
                    0: 'Cross.svg',
                    1: 'Circle.svg',
                    2: 'Square.svg',
                    3: 'Triangle.svg',
                    4: 'L1.svg',
                    5: 'R1.svg',
                    6: 'L2.svg',
                    7: 'R2.svg',
                    8: 'Create.svg',
                    9: 'Options.svg',
                    10: 'Left Stick.svg',
                    11: 'Right Stick.svg',
                    12: 'D-Pad Up.svg',
                    13: 'D-Pad Down.svg',
                    14: 'D-Pad Left.svg',
                    15: 'D-Pad Right.svg',
                    16: 'Home.svg',
                    17: 'Touch Pad Press.svg'
                }
            },
            [this.CONTROLLER_TYPES.SWITCH]: {
                folder: `switch/Buttons ${buttonType}/${buttonColor}/SVG/`,
                buttons: {
                    0: 'B.svg',
                    1: 'A.svg',
                    2: 'Y.svg',
                    3: 'X.svg',
                    4: 'L.svg',
                    5: 'R.svg',
                    6: 'ZL.svg',
                    7: 'ZR.svg',
                    8: 'Minus.svg',
                    9: 'Plus.svg',
                    10: 'Left Stick.svg',
                    11: 'Right Stick.svg',
                    12: 'Pro D-Pad Up.svg',
                    13: 'Pro D-Pad Down.svg',
                    14: 'Pro D-Pad Left.svg',
                    15: 'Pro D-Pad Right.svg',
                    16: 'Home.svg',
                    17: 'Capture.svg'
                }
            }
        };

        // Check if we have an image mapping for this controller and button
        if (imageMappings[controllerType] && imageMappings[controllerType].buttons[buttonIndex]) {
            return basePath + imageMappings[controllerType].folder + imageMappings[controllerType].buttons[buttonIndex];
        }

        // Return null if no image is available
        return null;
    }

    /**
     * Check if the Gamepad API is supported in the current browser
     * @returns {boolean} True if supported, false otherwise
     */
    isSupported() {
        return !!navigator.getGamepads;
    }

    /**
     * Get gamepad information based on the gamepad ID
     * @param gamepadId The ID of the gamepad as given by the Gamepad API
     * @returns {{type: string, name: string}|{type, name}}
     */
    getGamepadInfo(gamepadId) {
        if (!gamepadId) {
            return {
                type: this.CONTROLLER_TYPES.STANDARD,
                name: 'Generic Controller'
            };
        }

        // Check for exact match first
        const exactMatch = this.exactIdLookup[gamepadId];
        if (exactMatch) {
            return {
                type: exactMatch.type,
                name: exactMatch.name
            };
        }

        return {
            type: this.CONTROLLER_TYPES.STANDARD,
            name: 'Generic Controller'
        };
    }

    /**
     * Detect the controller type based on the gamepad ID
      * @param gamepadId The ID of the gamepad as given by the Gamepad API
     * @returns {string|*} The type of controller (XBOX, PLAYSTATION, SWITCH, STANDARD)
     */
    detectControllerType(gamepadId) {
        return this.getGamepadInfo(gamepadId).type;
    }

    /**
     * Get button name for given controller type and button index
     * @param controllerType The type of controller (XBOX, PLAYSTATION, SWITCH)
     * @param buttonIndex The index of the button (int)
     * @returns {*|string} The name of the button (e.g., 'A', 'B', 'X', etc.)
     */
    getButtonName(controllerType, buttonIndex) {
        const mapping = this.controllerMappings[controllerType] || this.controllerMappings[this.CONTROLLER_TYPES.STANDARD];
        return mapping.buttonMap[buttonIndex] || `B${buttonIndex}`;
    }

    /**
     * Get axis name for given controller type and axis index
     * @param controllerType The type of controller (XBOX, PLAYSTATION, SWITCH)
     * @param axisIndex The index of the axis (int)
     * @returns {Object|*|string} The name of the axis (e.g., 'Left Stick X', 'Right Stick Y', etc.)
     */
    getAxisName(controllerType, axisIndex) {
        const mapping = this.controllerMappings[controllerType] || this.controllerMappings[this.CONTROLLER_TYPES.STANDARD];
        return mapping.axisMap && mapping.axisMap[axisIndex] || `Axis ${axisIndex}`;
    }

    /**
     * Check if vibration is supported on the gamepad
     * @param gamepad The gamepad object from the Gamepad API
     * @returns {boolean} True if vibration is supported, false otherwise
     */
    isVibrationSupported(gamepad) {
        if (!gamepad || !gamepad.vibrationActuator) return false;

        // Return true for any actuator type, not just dual-rumble
        return true;
    }

    /**
     * Get vibration capabilities of the gamepad
     * @param gamepad
     * @returns {{supported: boolean, type: string}|{supported: boolean, type: null}}
     */
    getVibrationCapabilities(gamepad) {
        if (!gamepad || !gamepad.vibrationActuator) {
            return { supported: false, type: null };
        }

        return {
            supported: true,
            type: gamepad.vibrationActuator.type || 'unknown'
        };
    }

    /**
     * Vibrate the gamepad
     * @param gamepad The gamepad object from the Gamepad API
     * @param options {Object} Options for vibration
     * @returns {Promise<never>|Promise<GamepadHapticsResult>}
     */
    vibrate(gamepad, options = {}) {
        const { weakMagnitude = 0.5, strongMagnitude = 0.5, duration = 1000, startDelay = 0 } = options;

        if (!gamepad || !gamepad.vibrationActuator) {
            return Promise.reject(new Error('Vibration not supported on this gamepad'));
        }

        const actuator = gamepad.vibrationActuator;
        const actuatorType = actuator.type || 'unknown';

        // Different handling based on actuator type
        switch (actuatorType) {
            case 'dual-rumble':
                return actuator.playEffect("dual-rumble", {
                    startDelay: startDelay,
                    duration: duration,
                    weakMagnitude: weakMagnitude,
                    strongMagnitude: strongMagnitude
                });

            case 'vibration':
                // Some devices just have a simple vibration effect
                const magnitude = Math.max(weakMagnitude, strongMagnitude);
                return actuator.playEffect("vibration", {
                    startDelay: startDelay,
                    duration: duration,
                    magnitude: magnitude
                });

            default:
                // Try the default effect type for unknown actuators
                try {
                    return actuator.playEffect(actuator.type, {
                        startDelay: startDelay,
                        duration: duration,
                        weakMagnitude: weakMagnitude,
                        strongMagnitude: strongMagnitude,
                        magnitude: Math.max(weakMagnitude, strongMagnitude)
                    });
                } catch (e) {
                    console.warn(`Attempted to use unknown actuator type: ${actuatorType}`);
                    // Fallback to dual-rumble as it's the most common
                    return actuator.playEffect("dual-rumble", {
                        startDelay: startDelay,
                        duration: duration,
                        weakMagnitude: weakMagnitude,
                        strongMagnitude: strongMagnitude
                    });
                }
        }
    }

    /**
     * Stop vibration on the gamepad
     * @param gamepad The gamepad object from the Gamepad API
     * @returns {Promise<never>|Promise<GamepadHapticsResult>|Promise<never>}
     */
    stopVibration(gamepad) {
        if (gamepad && gamepad.vibrationActuator) {
            return this.vibrate(gamepad, { weakMagnitude: 0, strongMagnitude: 0 });
        }

        return Promise.reject(new Error('Vibration not supported on this browser or gamepad'));
    }

    /**
     * Get all connected gamepads
     * @returns {Array} Array of connected gamepad objects
     */
    getConnectedGamepads() {
        if (!this.isSupported()) return [];

        const gamepads = navigator.getGamepads();
        return Array.from(gamepads).filter(gamepad => gamepad !== null);
    }
}
