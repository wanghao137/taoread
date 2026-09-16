import urllib.request, urllib.parse, re, html, subprocess, json, sys, os, time
UA = "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36"
COOKIE = "so_cookies.txt"

def fetch_page(url, ref=None):
    cmd = ["curl","-s","--max-time","25","-A",UA,"-c",COOKIE,"-b",COOKIE]
    if ref: cmd += ["-e", ref]
    cmd += [url]
    r = subprocess.run(cmd, capture_output=True, timeout=40)
    return r.stdout.decode("utf-8","ignore")

def search(q):
    url = "https://www.so.com/s?q=" + urllib.parse.quote(q)
    h = fetch_page(url)
    items = []
    for m in re.finditer(r'href="(https://www\.so\.com/link\?m=[^"]+)"[^>]*>(.*?)</h3>', h, re.S):
        link = m.group(1); title = html.unescape(re.sub(r"<[^>]+>","",m.group(2))).strip()
        if title and len(title) >= 5 and "其他人还搜" not in title and "相关搜索" not in title:
            items.append({"title": title, "so_link": link})
    # fallback: any link with h3
    if not items:
        for m in re.finditer(r'<h3[^>]*>\s*<a[^>]*href="(https://www\.so\.com/link\?m=[^"]+)"[^>]*>(.*?)</a>', h, re.S):
            items.append({"title": html.unescape(re.sub(r"<[^>]+>","",m.group(2))).strip(), "so_link": m.group(1)})
    seen, out = set(), []
    for it in items:
        if it["title"] in seen: continue
        seen.add(it["title"]); out.append(it)
    return out[:12]

def resolve(link, ref):
    h = fetch_page(link, ref)
    m = re.search(r'window\.location\.replace\("([^"]+)"\)', h) or re.search(r"URL='([^']+)'", h)
    if m: return m.group(1)
    return None

if __name__ == "__main__":
    q = sys.argv[1]
    ref = "https://www.so.com/s?q=" + urllib.parse.quote(q)
    items = search(q)
    print(f"[{q}] {len(items)} items")
    for it in items:
        time.sleep(0.3)
        real = resolve(it["so_link"], ref)
        it["url"] = real or "UNRESOLVED"
        print("  -", it["title"][:55], "=>", (real or "")[:100])
    fn = "so_" + re.sub(r"[^\w\u4e00-\u9fa5]+","_", q)[:40] + ".json"
    json.dump(items, open(fn,"w",encoding="utf-8"), ensure_ascii=False, indent=1)
    print("saved", fn)
