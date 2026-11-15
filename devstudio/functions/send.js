export async function onRequestPost(context) {
  const BOT_TOKEN = '9040487354:AAEtXGUK_puPn7_CBYxp08-mm4_qEn3i49A';
  const CHAT_ID = '6167515262';

  try {
    const { text } = await context.request.json();
    const tgResponse = await fetch(`https://telegram.org{BOT_TOKEN}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ chat_id: CHAT_ID, text: text })
    });
    const data = await tgResponse.json();

    return new Response(JSON.stringify(data), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    return new Response(JSON.stringify({ ok: false, error: err.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
