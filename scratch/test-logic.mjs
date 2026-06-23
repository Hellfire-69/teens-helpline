const messages = [];
const userMessage = { id: '1', role: 'user', content: 'hello' };
const newMessages = [...messages, userMessage];

const history = newMessages.slice(-8).map(m => ({
  role: m.role,
  parts: [{ text: m.content }]
}));

console.log('History:', JSON.stringify(history));

const body = JSON.stringify({
  message: 'hello',
  history,
  moodContext: undefined,
  journalContext: undefined
});

console.log('Body:', body);
