import db from "../db";

export async function createNotification(userId: number | null, title: string, body: string, meta: any = {}) {
  // simple in-app notification store
  try {
    await db("notifications").insert({
      user_id: userId,
      title,
      body,
      meta: JSON.stringify(meta),
      read: 0,
      created_at: new Date()
    });
  } catch (err) {
    console.error("Notification error", err);
  }
}
