import { ExtensionConfig } from '../types';

export const generateManifest = (config: ExtensionConfig): string => {
  return JSON.stringify(
    {
      display_name: config.name,
      author: config.author,
      version: config.version,
      description: config.description,
      loading_order: 100,
      requires: [],
      js: "index.js",
      css: "style.css"
    },
    null,
    2
  );
};

export const generateStyleCss = (config: ExtensionConfig): string => {
  return `
/* Floating Ball */
.cosyvoice-float-ball {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(135deg, #3b82f6, #8b5cf6);
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 20000;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.5);
    transition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.2s;
    font-size: 24px;
    user-select: none;
}

.cosyvoice-float-ball:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 20px rgba(59, 130, 246, 0.6);
}

.cosyvoice-float-ball:active {
    transform: scale(0.95);
}

/* Settings Panel */
.cosyvoice-panel {
    position: fixed;
    bottom: 85px;
    right: 20px;
    width: 320px;
    background: rgba(15, 23, 42, 0.95);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    border-radius: 16px;
    padding: 0;
    z-index: 19999;
    color: #e2e8f0;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.5), 0 10px 10px -5px rgba(0, 0, 0, 0.4);
    display: none;
    flex-direction: column;
    animation: cosySlideIn 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    overflow: hidden;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}

.cosyvoice-panel.visible {
    display: flex;
}

@keyframes cosySlideIn {
    from { 
        opacity: 0; 
        transform: translateY(20px) scale(0.95); 
    }
    to { 
        opacity: 1; 
        transform: translateY(0) scale(1); 
    }
}

/* Panel Header */
.cosyvoice-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 16px;
    background: rgba(255, 255, 255, 0.05);
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.cosyvoice-title {
    font-weight: 700;
    font-size: 1.1em;
    color: #fff;
    display: flex;
    align-items: center;
    gap: 8px;
}

.cosyvoice-close {
    cursor: pointer;
    opacity: 0.6;
    transition: opacity 0.2s;
    font-size: 1.2em;
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
}

.cosyvoice-close:hover {
    opacity: 1;
    background: rgba(255, 255, 255, 0.1);
}

/* Panel Body */
.cosyvoice-body {
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 16px;
    max-height: 70vh;
    overflow-y: auto;
}

/* Form Elements */
.cosyvoice-field {
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.cosyvoice-field label {
    font-size: 0.85em;
    color: #94a3b8;
    font-weight: 600;
    display: flex;
    justify-content: space-between;
}

.cosyvoice-input, 
.cosyvoice-select {
    background: #1e293b;
    border: 1px solid #334155;
    color: white;
    padding: 10px 12px;
    border-radius: 8px;
    font-size: 0.9em;
    outline: none;
    transition: border-color 0.2s;
    width: 100%;
    box-sizing: border-box;
}

.cosyvoice-input:focus, 
.cosyvoice-select:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
}

.cosyvoice-row {
    display: flex;
    align-items: center;
    gap: 8px;
}

/* Buttons */
.cosyvoice-btn {
    background: linear-gradient(to right, #3b82f6, #2563eb);
    color: white;
    border: none;
    padding: 10px 16px;
    border-radius: 8px;
    cursor: pointer;
    font-size: 0.9em;
    font-weight: 600;
    transition: filter 0.2s, transform 0.1s;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 6px;
}

.cosyvoice-btn:hover {
    filter: brightness(1.1);
}

.cosyvoice-btn:active {
    transform: translateY(1px);
}

.cosyvoice-btn.secondary {
    background: #334155;
}

.cosyvoice-icon-btn {
    padding: 10px;
    aspect-ratio: 1;
    background: #334155;
}

.cosyvoice-icon-btn:hover {
    background: #475569;
}

/* Toggle Switch */
.cosyvoice-toggle-wrapper {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 4px 0;
}

.cosyvoice-toggle-label {
    font-size: 0.9em;
    color: #e2e8f0;
}

.cosyvoice-switch {
    position: relative;
    display: inline-block;
    width: 44px;
    height: 24px;
}

.cosyvoice-switch input {
    opacity: 0;
    width: 0;
    height: 0;
}

.cosyvoice-slider {
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #334155;
    transition: .4s;
    border-radius: 24px;
}

.cosyvoice-slider:before {
    position: absolute;
    content: "";
    height: 18px;
    width: 18px;
    left: 3px;
    bottom: 3px;
    background-color: white;
    transition: .4s;
    border-radius: 50%;
}

input:checked + .cosyvoice-slider {
    background-color: #3b82f6;
}

input:checked + .cosyvoice-slider:before {
    transform: translateX(20px);
}

/* Range Slider */
input[type=range] {
    -webkit-appearance: none;
    width: 100%;
    background: transparent;
}

input[type=range]::-webkit-slider-thumb {
    -webkit-appearance: none;
    height: 16px;
    width: 16px;
    border-radius: 50%;
    background: #3b82f6;
    cursor: pointer;
    margin-top: -6px;
    box-shadow: 0 0 5px rgba(0,0,0,0.3);
}

input[type=range]::-webkit-slider-runnable-track {
    width: 100%;
    height: 4px;
    cursor: pointer;
    background: #334155;
    border-radius: 2px;
}
`;
};

export const generateIndexJs = (config: ExtensionConfig): string => {
  return `
// SillyTavern CosyVoice Extension
// Author: ${config.author}
// Generated for CosyVoice API (Port 9880)

(function () {
    const extensionName = "${config.name}";
    const extensionId = "cosyvoice-tts-extension";
    
    // Default Configuration
    const defaultSettings = {
        apiUrl: "${config.apiUrl}",
        speaker: "${config.defaultSpeaker}",
        instruction: "${config.defaultInstruction}",
        speed: 1.0,
        enabled: true,
        autoMatchCharacter: true 
    };

    let settings = defaultSettings;
    let availableSpeakers = [];

    // Helper to log messages
    const log = (msg) => {
        console.log(\`[\${extensionName}] \${msg}\`);
    };

    // Load Settings
    async function loadSettings() {
        if (!extensions[extensionId]) {
            extensions[extensionId] = {};
        }
        settings = { ...defaultSettings, ...(extensions[extensionId].settings || {}) };
    }

    // Save Settings
    function saveSettings() {
        extensions[extensionId].settings = settings;
        saveExtensionsSettings();
    }

    // Fetch Speakers from API
    async function fetchSpeakers() {
        const url = \`\${settings.apiUrl}/speakers\`;
        try {
            const btnIcon = $('#cosy_refresh_icon');
            btnIcon.addClass('fa-spin');
            
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                availableSpeakers = data.map(s => s.name);
                toastr.success(\`Loaded \${availableSpeakers.length} speakers\`);
                updateSpeakerDropdown();
            } else {
                toastr.error("Failed to load speakers list");
            }
            btnIcon.removeClass('fa-spin');
        } catch (e) {
            console.error(e);
            toastr.error("Could not connect to CosyVoice API");
            $('#cosy_refresh_icon').removeClass('fa-spin');
        }
    }

    function updateSpeakerDropdown() {
        const select = $('#cosy_speaker_select');
        if (select.length === 0) return;

        select.empty();
        select.append('<option value="" disabled selected>Select a speaker...</option>');
        
        if (settings.speaker && !availableSpeakers.includes(settings.speaker)) {
             select.append(\`<option value="\${settings.speaker}">\${settings.speaker} (Custom)</option>\`);
        }

        availableSpeakers.forEach(spk => {
            const isSelected = settings.speaker === spk ? 'selected' : '';
            select.append(\`<option value="\${spk}" \${isSelected}>\${spk}</option>\`);
        });

        select.off('change').on('change', function() {
            const val = $(this).val();
            $('#cosy_speaker').val(val);
            settings.speaker = val;
            saveSettings();
        });
    }

    // UI Construction
    function createUI() {
        // Remove existing elements if any
        $('.cosyvoice-float-ball').remove();
        $('.cosyvoice-panel').remove();

        // 1. Floating Ball
        const ball = $(\`
            <div class="cosyvoice-float-ball" title="CosyVoice Settings">
                <i class="fa-solid fa-microphone-lines"></i>
            </div>
        \`);

        // 2. Settings Panel
        const panel = $(\`
            <div class="cosyvoice-panel">
                <div class="cosyvoice-header">
                    <div class="cosyvoice-title">
                        <i class="fa-solid fa-music text-primary"></i> CosyVoice TTS
                    </div>
                    <div class="cosyvoice-close">
                        <i class="fa-solid fa-xmark"></i>
                    </div>
                </div>
                
                <div class="cosyvoice-body">
                    <!-- Enable Switch -->
                    <div class="cosyvoice-toggle-wrapper">
                        <span class="cosyvoice-toggle-label">Enable TTS</span>
                        <label class="cosyvoice-switch">
                            <input type="checkbox" id="cosy_enabled" \${settings.enabled ? 'checked' : ''}>
                            <span class="cosyvoice-slider"></span>
                        </label>
                    </div>

                    <!-- Auto Match Switch -->
                    <div class="cosyvoice-toggle-wrapper">
                        <span class="cosyvoice-toggle-label" title="Match ST Character to CosyVoice Speaker">Auto-Match Character</span>
                        <label class="cosyvoice-switch">
                            <input type="checkbox" id="cosy_auto_match" \${settings.autoMatchCharacter ? 'checked' : ''}>
                            <span class="cosyvoice-slider"></span>
                        </label>
                    </div>

                    <hr style="border-color: rgba(255,255,255,0.1); width: 100%; margin: 0;">

                    <!-- API URL -->
                    <div class="cosyvoice-field">
                        <label>API URL</label>
                        <input type="text" id="cosy_api_url" class="cosyvoice-input" value="\${settings.apiUrl}" placeholder="http://127.0.0.1:9880">
                    </div>

                    <!-- Speaker Selection -->
                    <div class="cosyvoice-field">
                        <label>Speaker / Voice ID</label>
                        <div class="cosyvoice-row">
                            <input type="text" id="cosy_speaker" class="cosyvoice-input" value="\${settings.speaker}" placeholder="Default Speaker">
                            <button id="cosy_refresh_speakers" class="cosyvoice-btn secondary cosyvoice-icon-btn" title="Refresh List">
                                <i id="cosy_refresh_icon" class="fa-solid fa-sync"></i>
                            </button>
                        </div>
                        <select id="cosy_speaker_select" class="cosyvoice-select"></select>
                    </div>

                    <!-- Instruction -->
                    <div class="cosyvoice-field">
                        <label>Instruction <span style="font-weight:normal; opacity:0.7;">(Emotion/Tone)</span></label>
                        <input type="text" id="cosy_instruction" class="cosyvoice-input" value="\${settings.instruction || ''}" placeholder="e.g. Happy, Sad, Angry">
                    </div>

                    <!-- Speed -->
                    <div class="cosyvoice-field">
                        <label>Speed: <span id="cosy_speed_val" style="color:#3b82f6">\${settings.speed}</span></label>
                        <input type="range" id="cosy_speed" min="0.5" max="2.0" step="0.1" value="\${settings.speed}">
                    </div>

                    <!-- Save Button -->
                    <button id="cosy_save" class="cosyvoice-btn">
                        <i class="fa-solid fa-floppy-disk"></i> Save Settings
                    </button>
                </div>
            </div>
        \`);

        $('body').append(ball).append(panel);

        // Events
        ball.on('click', () => {
            panel.toggleClass('visible');
        });

        panel.find('.cosyvoice-close').on('click', () => {
            panel.removeClass('visible');
        });

        // Close panel when clicking outside
        $(document).on('click', (e) => {
            if (!$(e.target).closest('.cosyvoice-panel, .cosyvoice-float-ball').length) {
                panel.removeClass('visible');
            }
        });

        // Input Bindings
        $('#cosy_refresh_speakers').click(() => {
            settings.apiUrl = $('#cosy_api_url').val();
            fetchSpeakers();
        });

        $('#cosy_speed').on('input', function() {
            $('#cosy_speed_val').text($(this).val());
        });

        $('#cosy_save').click(() => {
            settings.enabled = $('#cosy_enabled').is(':checked');
            settings.autoMatchCharacter = $('#cosy_auto_match').is(':checked');
            settings.apiUrl = $('#cosy_api_url').val();
            settings.speaker = $('#cosy_speaker').val();
            settings.instruction = $('#cosy_instruction').val();
            settings.speed = Number($('#cosy_speed').val());
            saveSettings();
            toastr.success('Settings Saved', extensionName);
        });

        // Initial Load
        updateSpeakerDropdown();
    }

    // TTS Logic
    async function generateSpeech(text, characterName) {
        if (!settings.enabled) return;
        if (!text) return;

        try {
            let targetSpeaker = settings.speaker;
            
            if (settings.autoMatchCharacter && characterName) {
                if (availableSpeakers.length > 0) {
                    if (availableSpeakers.includes(characterName)) {
                        targetSpeaker = characterName;
                        log(\`Auto-matched: \${characterName}\`);
                    }
                } else {
                    // Try blindly if list not loaded
                    targetSpeaker = characterName;
                }
            }

            if (!targetSpeaker) {
                return; // Silent fail if no speaker
            }

            const endpoint = \`\${settings.apiUrl}\`; 
            
            const payload = {
                text: text,
                speaker: targetSpeaker,
                speed: settings.speed,
                instruct_text: settings.instruction || undefined
            };
            
            // Show toast
            toastr.info(\`Generating audio for \${characterName}...\`, extensionName);

            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });

            if (!response.ok) throw new Error('API Error');

            const audioBlob = await response.blob();
            if (audioBlob.size === 0) throw new Error('Empty Audio');

            const audioUrl = URL.createObjectURL(audioBlob);
            const audio = new Audio(audioUrl);
            audio.play();

        } catch (error) {
            console.error(error);
            toastr.error('TTS Failed', extensionName);
        }
    }

    const onMessageReceived = async (data) => {
        if (!settings.enabled) return;
        
        if (!data.isUser) { 
            let cleanText = data.mes.replace(/\\*.*?\\*/g, '');
            cleanText = cleanText.replace(/\`\`\`[\\s\\S]*?\`\`\`/g, '');
            cleanText = cleanText.trim();
            
            if(cleanText.length > 0) {
                await generateSpeech(cleanText, data.name);
            }
        }
    };

    // Initialization
    jQuery(async () => {
        await loadSettings();
        createUI();
        
        // Try to fetch speakers silently on load
        if(settings.apiUrl) {
             const url = \`\${settings.apiUrl}/speakers\`;
             fetch(url).then(r => r.json()).then(data => {
                 availableSpeakers = data.map(s => s.name);
                 updateSpeakerDropdown();
             }).catch(() => {});
        }

        if (typeof eventSource !== 'undefined') {
             eventSource.on(event_types.MESSAGE_RECEIVED, onMessageReceived);
        }
        
        log("Extension Loaded");
    });

})();
`;
};

export const generateReadme = (config: ExtensionConfig): string => {
  return `# ${config.name}

${config.description}

## Author
${config.author}

## Version
${config.version}

## Configuration
This extension connects SillyTavern to a CosyVoice API.

**Default API URL:** \`${config.apiUrl}\`

## Installation
1. Install via SillyTavern Extensions menu using this repository URL.
2. Ensure your CosyVoice API is running.
3. Reload SillyTavern.

## Usage
- Open the CosyVoice settings panel (floating button).
- Select a speaker or enable "Auto-Match Character".
- Chat!
`;
};
