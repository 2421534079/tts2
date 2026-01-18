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
    },
    null,
    2
  );
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
        autoMatchCharacter: true // Try to use ST character name as speaker name
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
        // Merge defaults with saved settings
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
            const response = await fetch(url);
            if (response.ok) {
                const data = await response.json();
                // Expecting [{name: "...", voice_id: "..."}, ...]
                availableSpeakers = data.map(s => s.name);
                toastr.success(\`Loaded \${availableSpeakers.length} speakers from CosyVoice\`);
                updateSpeakerDropdown();
            } else {
                toastr.error("Failed to load speakers list");
            }
        } catch (e) {
            console.error(e);
            toastr.error("Could not connect to CosyVoice API");
        }
    }

    function updateSpeakerDropdown() {
        const select = $('#cosy_speaker_select');
        if (select.length === 0) return;

        select.empty();
        select.append('<option value="" disabled selected>Select a speaker...</option>');
        
        // Add manual entry option if current setting is not in list
        if (settings.speaker && !availableSpeakers.includes(settings.speaker)) {
             select.append(\`<option value="\${settings.speaker}">\${settings.speaker} (Custom)</option>\`);
        }

        availableSpeakers.forEach(spk => {
            const isSelected = settings.speaker === spk ? 'selected' : '';
            select.append(\`<option value="\${spk}" \${isSelected}>\${spk}</option>\`);
        });

        // Update text input when dropdown changes
        select.off('change').on('change', function() {
            const val = $(this).val();
            $('#cosy_speaker').val(val);
            settings.speaker = val;
        });
    }

    // Settings Menu UI
    function addSettings() {
        const html = \`
        <div class="cosyvoice-settings">
            <div class="inline-drawer">
                <div class="inline-drawer-toggle inline-drawer-header">
                    <b>CosyVoice TTS Settings</b>
                    <div class="inline-drawer-icon fa-solid fa-circle-chevron-down down"></div>
                </div>
                <div class="inline-drawer-content">
                    <label class="checkbox_label">
                        <input type="checkbox" id="cosy_enabled" \${settings.enabled ? 'checked' : ''} />
                        Enable TTS
                    </label>

                    <label class="checkbox_label" title="If checked, tries to use the SillyTavern character name as the CosyVoice speaker name.">
                        <input type="checkbox" id="cosy_auto_match" \${settings.autoMatchCharacter ? 'checked' : ''} />
                        Auto-match Character Name
                    </label>
                    
                    <hr />

                    <label>API URL</label>
                    <input type="text" id="cosy_api_url" class="text_pole" value="\${settings.apiUrl}" placeholder="http://127.0.0.1:9880" />
                    
                    <label>Default Speaker</label>
                    <div style="display: flex; gap: 5px;">
                        <input type="text" id="cosy_speaker" class="text_pole" value="\${settings.speaker}" placeholder="Speaker Name in Config" style="flex: 1;" />
                        <button id="cosy_refresh_speakers" class="menu_button" title="Fetch speakers from API"><i class="fa-solid fa-sync"></i></button>
                    </div>
                    <select id="cosy_speaker_select" class="text_pole" style="margin-top: 5px;"></select>

                    <label>Instruction (Instruct Text)</label>
                    <input type="text" id="cosy_instruction" class="text_pole" value="\${settings.instruction || ''}" placeholder="e.g. 用生气的语气" />

                    <label>Speed: <span id="cosy_speed_val">\${settings.speed}</span></label>
                    <input type="range" id="cosy_speed" min="0.5" max="2.0" step="0.1" value="\${settings.speed}" />
                    
                    <div style="margin-top: 10px; text-align: right;">
                        <button id="cosy_save" class="menu_button">Save Settings</button>
                    </div>
                </div>
            </div>
        </div>
        \`;
        
        // Inject into extensions menu
        $('#extensions_settings').append(html);

        // Populate initial dropdown if we have cached speakers, or just layout
        updateSpeakerDropdown();

        // Event Listeners
        $('#cosy_refresh_speakers').click((e) => {
            e.preventDefault();
            settings.apiUrl = $('#cosy_api_url').val(); // update URL before fetch
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
            toastr.success('CosyVoice settings saved!');
        });
    }

    // TTS Logic
    async function generateSpeech(text, characterName) {
        if (!settings.enabled) return;
        if (!text) return;

        try {
            // Determine which speaker to use
            let targetSpeaker = settings.speaker;
            
            // If Auto-match is on, and we have a character name
            if (settings.autoMatchCharacter && characterName) {
                // If we have a speaker list, check if it exists
                if (availableSpeakers.length > 0) {
                    if (availableSpeakers.includes(characterName)) {
                        targetSpeaker = characterName;
                        log(\`Auto-matched speaker: \${characterName}\`);
                    } else {
                        log(\`Character "\${characterName}" not found in speaker list, using default: \${targetSpeaker}\`);
                    }
                } else {
                    // No list loaded? Just try sending the name. 
                    // The API will error if it doesn't exist, but that might be desired behavior for some.
                    // For safety, let's just try using the name, assuming the user knows their config matches ST names.
                    targetSpeaker = characterName;
                }
            }

            if (!targetSpeaker) {
                toastr.warning('No speaker configured for CosyVoice', extensionName);
                return;
            }

            // Using the tavern-compatible endpoint from the Python script
            const endpoint = \`\${settings.apiUrl}\`; // The root endpoint '/' is tts_tavern
            
            const payload = {
                text: text,
                speaker: targetSpeaker,
                speed: settings.speed,
                instruct_text: settings.instruction || undefined
            };
            
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                const errData = await response.json().catch(() => ({}));
                throw new Error(errData.error || 'API Request Failed');
            }

            const audioBlob = await response.blob();
            if (audioBlob.size === 0) throw new Error('Received empty audio');

            const audioUrl = URL.createObjectURL(audioBlob);
            const audio = new Audio(audioUrl);
            audio.play();

        } catch (error) {
            console.error(error);
            toastr.error('TTS Error: ' + error.message, extensionName);
        }
    }

    // Hook into SillyTavern's message received event
    const onMessageReceived = async (data) => {
        if (!settings.enabled) return;
        
        // Only speak if it's the character (not user)
        if (!data.isUser) { 
            // Strip code blocks, asterisks (actions), and extra spaces
            let cleanText = data.mes.replace(/\\*.*?\\*/g, ''); // remove actions
            cleanText = cleanText.replace(/\`\`\`[\\s\\S]*?\`\`\`/g, ''); // remove code blocks
            cleanText = cleanText.trim();
            
            if(cleanText.length > 0) {
                await generateSpeech(cleanText, data.name);
            }
        }
    };

    // Register Extension
    jQuery(async () => {
        await loadSettings();
        addSettings();
        
        // Listen for new messages
        if (typeof eventSource !== 'undefined') {
             eventSource.on(event_types.MESSAGE_RECEIVED, onMessageReceived);
        } else {
            console.warn("[CosyVoice] eventSource not found. Is SillyTavern loaded?");
        }
        
        log("Extension Loaded. API: " + settings.apiUrl);
    });

})();
`;
};

export const generateReadme = (config: ExtensionConfig): string => {
  return `# ${config.name}

${config.description}

## 功能 (Features)

*   **TTS Integration**: Connects SillyTavern to a locally running CosyVoice API.
*   **Auto-Match**: Can automatically use the SillyTavern character name as the CosyVoice speaker ID.
*   **Instruction Control**: Supports setting global prompt instructions (e.g. "Use a happy tone").
*   **Speed Control**: Adjustable playback speed.

## 安装 (Installation)

1. Open **SillyTavern**.
2. Navigate to **Extensions** -> **Install Extension**.
3. Paste the GitHub URL of this repository:
   \`https://github.com/${config.author || 'yourusername'}/${config.name.toLowerCase().replace(/\s+/g, '-')}\`
4. Click **Install**.
5. Reload SillyTavern.

## 配置 (Configuration)

1. Go to the **Extensions** menu (Puzzle icon).
2. Expand **CosyVoice TTS Settings**.
3. **API URL**: Set to your CosyVoice API address (Default from your python script: \`${config.apiUrl}\`).
   *   *Note: Ensure your Python server is running (\`python api.py\`)*.
4. **Speaker**: 
   *   Click the **Refresh** icon to load speakers from \`config/角色.json\`.
   *   Select a default speaker.
5. **Auto-match**: If enabled, the extension will try to find a speaker in CosyVoice that matches the name of the character currently chatting.

## 服务端要求 (Server Requirements)

This extension requires the \`api.py\` script provided in your CosyVoice setup.
Ensure the server is running on port 9880 (or your custom port).

\`\`\`bash
python api.py --port 9880
\`\`\`
`;
};