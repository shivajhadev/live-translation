const sourceLanguage = document.getElementById('source-language');
const targetLanguage = document.getElementById('target-language');
const sourceText = document.getElementById('source-text');
const targetText = document.getElementById('target-text');

const languages = {
    'en': 'English',
    'es': 'Spanish',
    'fr': 'French',
    'de': 'German',
    'it': 'Italian',
    'pt': 'Portuguese',
    'ru': 'Russian',
    'ja': 'Japanese',
    'ko': 'Korean',
    'zh-CN': 'Chinese (Simplified)',
    'hi': 'Hindi',
};

function populateLanguages() {
    for (const code in languages) {
        const option = document.createElement('option');
        option.value = code;
        option.textContent = languages[code];
        sourceLanguage.appendChild(option.cloneNode(true));
        targetLanguage.appendChild(option);
    }
    sourceLanguage.value = 'en';
    targetLanguage.value = 'es';
}

async function translate() {
    const sourceLang = sourceLanguage.value;
    const targetLang = targetLanguage.value;
    const text = sourceText.value;

    if (text.trim() === '') {
        targetText.value = '';
        return;
    }

    const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${sourceLang}|${targetLang}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        if (data.responseData) {
            targetText.value = data.responseData.translatedText;
        } else {
            targetText.value = 'Error: Could not translate.';
        }
    } catch (error) {
        console.error('Translation error:', error);
        targetText.value = 'Error: Translation failed.';
    }
}


document.addEventListener('DOMContentLoaded', populateLanguages);
sourceText.addEventListener('input', translate);
sourceLanguage.addEventListener('change', translate);
targetLanguage.addEventListener('change', translate);