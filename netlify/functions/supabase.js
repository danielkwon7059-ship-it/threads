exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      },
      body: ''
    };
  }
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  const headers = { 'Access-Control-Allow-Origin': '*' };
  const SUPA_URL = process.env.SUPABASE_URL;
  const SUPA_KEY = process.env.SUPABASE_KEY;

  try {
    const { action, data } = JSON.parse(event.body);

    if (action === 'saveKB') {
      const res = await fetch(`${SUPA_URL}/rest/v1/knowledge_base`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPA_KEY,
          'Authorization': `Bearer ${SUPA_KEY}`,
          'Prefer': 'return=representation'
        },
        body: JSON.stringify(data)
      });
      const result = await res.json();
      return { statusCode: 200, headers, body: JSON.stringify(result) };
    }

    if (action === 'saveProject') {
      const res = await fetch(`${SUPA_URL}/rest/v1/projects`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'apikey': SUPA_KEY, 'Authorization': `Bearer ${SUPA_KEY}`, 'Prefer': 'return=representation' },
        body: JSON.stringify(data)
      });
      const result = await res.json();
      return { statusCode: 200, headers, body: JSON.stringify(result) };
    }

    if (action === 'loadProjects') {
      const res = await fetch(`${SUPA_URL}/rest/v1/projects?order=created_at.desc`, {
        headers: { 'apikey': SUPA_KEY, 'Authorization': `Bearer ${SUPA_KEY}` }
      });
      const result = await res.json();
      return { statusCode: 200, headers, body: JSON.stringify(result) };
    }

    if (action === 'deleteProject') {
      const id = data?.id;
      await Promise.all([
        fetch(`${SUPA_URL}/rest/v1/projects?id=eq.${id}`, { method: 'DELETE', headers: { 'apikey': SUPA_KEY, 'Authorization': `Bearer ${SUPA_KEY}` } }),
        fetch(`${SUPA_URL}/rest/v1/knowledge_base?project_id=eq.${id}`, { method: 'DELETE', headers: { 'apikey': SUPA_KEY, 'Authorization': `Bearer ${SUPA_KEY}` } })
      ]);
      return { statusCode: 200, headers, body: JSON.stringify({ ok: true }) };
    }

    if (action === 'saveProject') {
      const res = await fetch(`${SUPA_URL}/rest/v1/projects`, {
        method: 'POST',
        headers: { 'Content-Type':'application/json', 'apikey':SUPA_KEY, 'Authorization':`Bearer ${SUPA_KEY}`, 'Prefer':'return=representation' },
        body: JSON.stringify(data)
      });
      return { statusCode:200, headers, body: JSON.stringify(await res.json()) };
    }

    if (action === 'loadProjects') {
      const res = await fetch(`${SUPA_URL}/rest/v1/projects?order=created_at.desc`, {
        headers: { 'apikey':SUPA_KEY, 'Authorization':`Bearer ${SUPA_KEY}` }
      });
      return { statusCode:200, headers, body: JSON.stringify(await res.json()) };
    }

    if (action === 'deleteProject') {
      await fetch(`${SUPA_URL}/rest/v1/projects?id=eq.${data.id}`, {
        method:'DELETE', headers:{ 'apikey':SUPA_KEY, 'Authorization':`Bearer ${SUPA_KEY}` }
      });
      return { statusCode:200, headers, body: JSON.stringify({ ok:true }) };
    }

    if (action === 'loadKB') {
      const projectId = data?.project_id;
      const url = projectId
        ? `${SUPA_URL}/rest/v1/knowledge_base?project_id=eq.${projectId}&order=created_at.desc&limit=20`
        : `${SUPA_URL}/rest/v1/knowledge_base?order=created_at.desc&limit=20`;
      const res = await fetch(url, {
        headers: { 'apikey': SUPA_KEY, 'Authorization': `Bearer ${SUPA_KEY}` }
      });
      const result = await res.json();
      return { statusCode: 200, headers, body: JSON.stringify(result) };
    }

    if (action === 'saveScheduled') {
      const res = await fetch(`${SUPA_URL}/rest/v1/scheduled_posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPA_KEY,
          'Authorization': `Bearer ${SUPA_KEY}`,
          'Prefer': 'return=representation'
        },
        body: JSON.stringify(data)
      });
      const result = await res.json();
      return { statusCode: 200, headers, body: JSON.stringify(result) };
    }

    if (action === 'deleteKB') {
      const id = data?.id;
      await Promise.all([
        fetch(`${SUPA_URL}/rest/v1/knowledge_base?id=eq.${id}`, { method:'DELETE', headers:{ 'apikey':SUPA_KEY, 'Authorization':`Bearer ${SUPA_KEY}` } }),
        fetch(`${SUPA_URL}/rest/v1/context?kb_id=eq.${id}`, { method:'DELETE', headers:{ 'apikey':SUPA_KEY, 'Authorization':`Bearer ${SUPA_KEY}` } }),
        fetch(`${SUPA_URL}/rest/v1/parts?kb_id=eq.${id}`, { method:'DELETE', headers:{ 'apikey':SUPA_KEY, 'Authorization':`Bearer ${SUPA_KEY}` } })
      ]);
      return { statusCode: 200, headers, body: JSON.stringify({ ok: true }) };
    }

    if (action === 'saveFeedback') {
      const res = await fetch(`${SUPA_URL}/rest/v1/feedback`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPA_KEY,
          'Authorization': `Bearer ${SUPA_KEY}`,
          'Prefer': 'return=representation'
        },
        body: JSON.stringify(data)
      });
      const result = await res.json();
      return { statusCode: 200, headers, body: JSON.stringify(result) };
    }

    if (action === 'loadFeedback') {
      const res = await fetch(`${SUPA_URL}/rest/v1/feedback?order=created_at.desc&limit=20`, {
        headers: { 'apikey': SUPA_KEY, 'Authorization': `Bearer ${SUPA_KEY}` }
      });
      const result = await res.json();
      return { statusCode: 200, headers, body: JSON.stringify(result) };
    }

    if (action === 'loadContents') {
      const res = await fetch(`${SUPA_URL}/rest/v1/contents?order=created_at.desc&limit=20`, {
        headers: { 'apikey': SUPA_KEY, 'Authorization': `Bearer ${SUPA_KEY}` }
      });
      const result = await res.json();
      return { statusCode: 200, headers, body: JSON.stringify(result) };
    }

    if (action === 'deleteContent') {
      const id = data?.id;
      await fetch(`${SUPA_URL}/rest/v1/contents?id=eq.${id}`, {
        method: 'DELETE',
        headers: { 'apikey': SUPA_KEY, 'Authorization': `Bearer ${SUPA_KEY}` }
      });
      return { statusCode: 200, headers, body: JSON.stringify({ ok: true }) };
    }

    if (action === 'saveContext') {
      const res = await fetch(`${SUPA_URL}/rest/v1/context`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPA_KEY,
          'Authorization': `Bearer ${SUPA_KEY}`,
          'Prefer': 'return=representation'
        },
        body: JSON.stringify(data)
      });
      const result = await res.json();
      return { statusCode: 200, headers, body: JSON.stringify(result) };
    }

    if (action === 'saveParts') {
      const res = await fetch(`${SUPA_URL}/rest/v1/parts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'apikey': SUPA_KEY,
          'Authorization': `Bearer ${SUPA_KEY}`,
          'Prefer': 'return=representation'
        },
        body: JSON.stringify(data)
      });
      const result = await res.json();
      return { statusCode: 200, headers, body: JSON.stringify(result) };
    }

    if (action === 'loadParts') {
      const kbId = data?.kb_id;
      const [ctxRes, partsRes] = await Promise.all([
        fetch(`${SUPA_URL}/rest/v1/context?kb_id=eq.${kbId}`, {
          headers: { 'apikey': SUPA_KEY, 'Authorization': `Bearer ${SUPA_KEY}` }
        }),
        fetch(`${SUPA_URL}/rest/v1/parts?kb_id=eq.${kbId}`, {
          headers: { 'apikey': SUPA_KEY, 'Authorization': `Bearer ${SUPA_KEY}` }
        })
      ]);
      const ctx = await ctxRes.json();
      const parts = await partsRes.json();
      return { statusCode: 200, headers, body: JSON.stringify({ context: ctx[0]?.content || '', parts }) };
    }

    return { statusCode: 400, headers, body: JSON.stringify({ error: 'Unknown action' }) };

  } catch (e) {
    return { statusCode: 500, headers, body: JSON.stringify({ error: e.message }) };
  }
};
