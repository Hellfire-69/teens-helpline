import { POST } from '../app/api/nova/route';

async function test() {
  const req = {
    json: async () => ({
      message: "Hello Nova",
      history: [],
      moodContext: "Happy",
      journalContext: "Good day."
    })
  } as any;
  
  const res = await POST(req);
  const data = await res.json();
  console.log("Response JSON:", data);
}

test();
