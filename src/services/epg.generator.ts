import EPG from "./epg.json";

export function* epgGenerator(): Generator<string, void, unknown> {
  yield `#EXTM3U url-tvg="${EPG.antifriz}"`;
  yield "";
}

export function* epgGeneratorUs(): Generator<string, void, unknown> {
  yield `#EXTM3U url-tvg="${EPG.epgshare}"`;
  yield "";
}