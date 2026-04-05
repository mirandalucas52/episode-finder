import { createHash } from "crypto";
import { supabase } from "@/lib/supabase";

const WINDOW_SECONDS = 60;
const MAX_REQUESTS = 10;

const hashIp = (ip: string): string => {
  return createHash("sha256")
    .update(ip + (process.env.GEMINI_API_KEY || "salt"))
    .digest("hex")
    .slice(0, 32);
};

export const checkRateLimit = async (
  ip: string
): Promise<{ allowed: boolean; remaining: number }> => {
  const ipHash = hashIp(ip);
  const since = new Date(Date.now() - WINDOW_SECONDS * 1000).toISOString();

  const { count } = await supabase
    .from("rate_limits")
    .select("*", { count: "exact", head: true })
    .eq("ip_hash", ipHash)
    .gte("created_at", since);

  const current = count || 0;
  if (current >= MAX_REQUESTS) {
    return { allowed: false, remaining: 0 };
  }

  await supabase.from("rate_limits").insert({ ip_hash: ipHash });

  // Best-effort async cleanup
  if (Math.random() < 0.05) {
    supabase.rpc("cleanup_rate_limits").then(() => {});
  }

  return { allowed: true, remaining: MAX_REQUESTS - current - 1 };
};
