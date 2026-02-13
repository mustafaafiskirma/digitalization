/* ============================================
   FLOATING CHAT WIDGET – Copilot Studio Agent
   DirectLine Integration
   ============================================ */
(function () {

    // ── Config ──
    const TOKEN_ENDPOINT = 'https://defaultc490a67cdea04aaaae0ff99bae3ace.b9.environment.api.powerplatform.com/copilotstudio/dataverse-backed/authenticated/bots/auto_agent_mYZP3/conversations?api-version=2022-03-01-preview';

    // ── State ──
    let isOpen = false;
    let directLine = null;
    let conversationId = null;
    let streamUrl = null;
    let ws = null;
    let watermark = null;

    // ── DOM Elements ──
    const bubble = document.getElementById('chatBubble');
    const panel = document.getElementById('chatPanel');
    const closeBtn = document.getElementById('chatClose');
    const msgContainer = document.getElementById('chatMessages');
    const input = document.getElementById('chatInput');
    const sendBtn = document.getElementById('chatSend');

    if (!bubble || !panel) return;

    // ── Toggle Chat ──
    bubble.addEventListener('click', () => {
        isOpen = !isOpen;
        panel.classList.toggle('open', isOpen);
        bubble.classList.toggle('active', isOpen);

        if (isOpen && !directLine) {
            startConversation();
        }

        if (isOpen) {
            setTimeout(() => input.focus(), 300);
        }
    });

    closeBtn.addEventListener('click', () => {
        isOpen = false;
        panel.classList.remove('open');
        bubble.classList.remove('active');
    });

    // ── Send Message ──
    sendBtn.addEventListener('click', sendMessage);
    input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            sendMessage();
        }
    });

    function sendMessage() {
        const text = input.value.trim();
        if (!text || !conversationId) return;

        appendMessage(text, 'user');
        input.value = '';

        // POST activity to DirectLine
        fetch(`https://directline.botframework.com/v3/directline/conversations/${conversationId}/activities`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${directLine.token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                type: 'message',
                from: { id: 'user', name: 'User' },
                text: text
            })
        }).catch(err => {
            console.error('Send error:', err);
            appendMessage('Mesaj gönderilemedi. Lütfen tekrar deneyin.', 'system');
        });

        showTypingIndicator();
    }

    // ── Start Conversation ──
    async function startConversation() {
        appendMessage('Bağlanılıyor...', 'system');

        try {
            // Step 1: Get token from Copilot Studio token endpoint
            const tokenRes = await fetch(TOKEN_ENDPOINT);
            if (!tokenRes.ok) throw new Error(`Token error: ${tokenRes.status}`);
            const tokenData = await tokenRes.json();

            directLine = { token: tokenData.token };
            conversationId = tokenData.conversationId;

            // Remove "connecting" message
            msgContainer.innerHTML = '';

            // Step 2: Connect via WebSocket if available
            if (tokenData.streamUrl) {
                connectWebSocket(tokenData.streamUrl);
            } else {
                // Fallback: start DirectLine conversation and get streamUrl
                const convRes = await fetch('https://directline.botframework.com/v3/directline/conversations', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${directLine.token}`,
                        'Content-Type': 'application/json'
                    }
                });

                if (!convRes.ok) throw new Error(`Conversation error: ${convRes.status}`);
                const convData = await convRes.json();
                conversationId = convData.conversationId;
                connectWebSocket(convData.streamUrl);
            }

            appendMessage('Merhaba! 👋 Size nasıl yardımcı olabilirim?', 'bot');

        } catch (err) {
            console.error('Connection error:', err);
            msgContainer.innerHTML = '';
            appendMessage('Bağlantı kurulamadı. Lütfen sayfayı yenileyin.', 'system');
        }
    }

    // ── WebSocket Connection ──
    function connectWebSocket(url) {
        if (ws) ws.close();

        ws = new WebSocket(url);

        ws.onopen = () => {
            console.log('WebSocket connected');
        };

        ws.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                if (data.activities && data.activities.length > 0) {
                    data.activities.forEach(activity => {
                        // Only process bot messages, not user echo
                        if (activity.from && activity.from.id !== 'user' && activity.type === 'message') {
                            hideTypingIndicator();
                            if (activity.text) {
                                appendMessage(activity.text, 'bot');
                            }
                            // Handle adaptive cards or attachments
                            if (activity.attachments && activity.attachments.length > 0) {
                                activity.attachments.forEach(att => {
                                    if (att.contentType === 'application/vnd.microsoft.card.adaptive') {
                                        renderAdaptiveCard(att.content);
                                    } else if (att.contentType === 'application/vnd.microsoft.card.hero') {
                                        renderHeroCard(att.content);
                                    }
                                });
                            }
                        }
                        // Handle typing indicator from bot
                        if (activity.type === 'typing' && activity.from && activity.from.id !== 'user') {
                            showTypingIndicator();
                        }
                    });
                    if (data.watermark) {
                        watermark = data.watermark;
                    }
                }
            } catch (e) {
                console.error('WS message parse error:', e);
            }
        };

        ws.onclose = () => {
            console.log('WebSocket closed, reconnecting in 5s...');
            setTimeout(() => {
                if (isOpen && conversationId) {
                    // Reconnect
                    fetch(`https://directline.botframework.com/v3/directline/conversations/${conversationId}`, {
                        method: 'GET',
                        headers: { 'Authorization': `Bearer ${directLine.token}` }
                    })
                        .then(r => r.json())
                        .then(d => connectWebSocket(d.streamUrl))
                        .catch(err => console.error('Reconnect error:', err));
                }
            }, 5000);
        };

        ws.onerror = (err) => {
            console.error('WebSocket error:', err);
        };
    }

    // ── UI Helpers ──
    function appendMessage(text, sender) {
        const msg = document.createElement('div');
        msg.className = `chat-msg ${sender}`;

        const bubble = document.createElement('div');
        bubble.className = 'msg-bubble';

        // Simple markdown-like rendering
        let html = text
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
            .replace(/\*(.*?)\*/g, '<em>$1</em>')
            .replace(/\n/g, '<br>');

        bubble.innerHTML = html;
        msg.appendChild(bubble);

        // Timestamp
        const time = document.createElement('div');
        time.className = 'msg-time';
        const now = new Date();
        time.textContent = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;
        msg.appendChild(time);

        msgContainer.appendChild(msg);
        scrollToBottom();
    }

    function showTypingIndicator() {
        hideTypingIndicator();
        const typing = document.createElement('div');
        typing.className = 'chat-msg bot typing-indicator';
        typing.id = 'typingIndicator';
        typing.innerHTML = `
      <div class="msg-bubble">
        <div class="typing-dots">
          <span></span><span></span><span></span>
        </div>
      </div>
    `;
        msgContainer.appendChild(typing);
        scrollToBottom();
    }

    function hideTypingIndicator() {
        const el = document.getElementById('typingIndicator');
        if (el) el.remove();
    }

    function scrollToBottom() {
        msgContainer.scrollTop = msgContainer.scrollHeight;
    }

    // ── Render Cards ──
    function renderAdaptiveCard(content) {
        const msg = document.createElement('div');
        msg.className = 'chat-msg bot';

        const bubble = document.createElement('div');
        bubble.className = 'msg-bubble card-bubble';

        if (content.body) {
            content.body.forEach(block => {
                if (block.type === 'TextBlock') {
                    const p = document.createElement('p');
                    p.textContent = block.text || '';
                    if (block.weight === 'Bolder') p.style.fontWeight = '700';
                    if (block.size === 'Large') p.style.fontSize = '1.1rem';
                    bubble.appendChild(p);
                }
            });
        }

        if (content.actions) {
            const actions = document.createElement('div');
            actions.className = 'card-actions';
            content.actions.forEach(action => {
                const btn = document.createElement('button');
                btn.className = 'card-action-btn';
                btn.textContent = action.title || 'Action';
                if (action.type === 'Action.OpenUrl' && action.url) {
                    btn.addEventListener('click', () => window.open(action.url, '_blank'));
                }
                actions.appendChild(btn);
            });
            bubble.appendChild(actions);
        }

        msg.appendChild(bubble);
        msgContainer.appendChild(msg);
        scrollToBottom();
    }

    function renderHeroCard(content) {
        const msg = document.createElement('div');
        msg.className = 'chat-msg bot';

        const bubble = document.createElement('div');
        bubble.className = 'msg-bubble card-bubble';

        if (content.title) {
            const h = document.createElement('strong');
            h.textContent = content.title;
            bubble.appendChild(h);
        }

        if (content.text) {
            const p = document.createElement('p');
            p.textContent = content.text;
            bubble.appendChild(p);
        }

        if (content.buttons) {
            const actions = document.createElement('div');
            actions.className = 'card-actions';
            content.buttons.forEach(btn => {
                const b = document.createElement('button');
                b.className = 'card-action-btn';
                b.textContent = btn.title || 'Action';
                if (btn.type === 'openUrl' && btn.value) {
                    b.addEventListener('click', () => window.open(btn.value, '_blank'));
                }
                actions.appendChild(b);
            });
            bubble.appendChild(actions);
        }

        msg.appendChild(bubble);
        msgContainer.appendChild(msg);
        scrollToBottom();
    }

})();
