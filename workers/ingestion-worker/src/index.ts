/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run `wrangler dev src/index.ts` in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run `wrangler publish src/index.ts --name my-worker` to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

export interface Env {
	// Example binding to KV. Learn more at https://developers.cloudflare.com/workers/runtime-apis/kv/
	// MY_KV_NAMESPACE: KVNamespace;
	//
	// Example binding to Durable Object. Learn more at https://developers.cloudflare.com/workers/runtime-apis/durable-objects/
	// MY_DURABLE_OBJECT: DurableObjectNamespace;
	//
	// Example binding to R2. Learn more at https://developers.cloudflare.com/workers/runtime-apis/r2/
	SPREADSHEET_BUCKET: R2Bucket;
}

export default {
	async scheduled(controller, env, ctx) {
    const url = new URL("https://docs.google.com/spreadsheets/d/1fJVVy5GVSoF1BR9VBmijiMmSHaVrroqQN2rif0FmDCI/gviz/tq?tqx=out:csv&sheet=Sheet1");
    const key = '/spread-sheet/csv'
    var response = await fetch(new Request(url))
    ctx.waitUntil(await env.SPREADSHEET_BUCKET.put(key, await response.text()));
	},
};
