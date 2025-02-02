const startBtn = document.getElementById('start-btn');
const stopBtn = document.getElementById('stop-btn');
const transcriptElement = document.getElementById('transcript');

let recognition;

if ('webkitSpeechRecognition' in window) {
    recognition = new webkitSpeechRecognition();
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    recognition.onstart = function() {
        startBtn.disabled = true;
        stopBtn.disabled = false;
        transcriptElement.textContent = 'Listening...';
    };

    recognition.onresult = function(event) {
        const transcript = event.results[0][0].transcript;
        transcriptElement.textContent = transcript;
    };

    recognition.onend = function() {
        startBtn.disabled = false;
        stopBtn.disabled = true;
        transcriptElement.textContent += ' (Stopped Listening)';
    };

    recognition.onerror = function(event) {
        console.error('Error occurred in recognition: ' + event.error);
    };

    startBtn.addEventListener('click', () => {
        recognition.start();
    });

    stopBtn.addEventListener('click', () => {
        recognition.stop();
    });
} else {
    alert('Speech recognition not supported in this browser.');
}
