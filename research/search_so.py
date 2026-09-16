import urllib.request, urllib.parse, re, html, subprocess, json, sys
def search(q, limit=15):
    url = "https://www.so.com/s?q=" + urllib.parse.quote(q)
    req = urllib.request.Request(url, headers={"User-Agent":"Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120 Safari/537.36"})
    h = urllib.request.urlopen(req, timeout=30).read().decode("utf-8", "ignore")
    items = []
    for m in re.finditer(r'href="(https://www\.so\.com/link\?m=[^"]+)".*?<h3[^>]*>(.*?)</h3>', h, re.S):
        link, title = m.group(1), html.unescape(re.sub(r"<[^>]+>","",m.group(2))).strip()
        if title and len(title) > 4:
            items.append({"title": title, "so_link": link})
    seen, out = set(), []
    for it in items:
        if it["title"] in seen: continue
        seen.add(it["title"]); out.append(it)
        if len(out) >= limit: break
    return out
def resolve(so_link):
    try:
        r = subprocess.run(["curl","-sL","-o","/dev/null","-w","%{url_effective}","--max-time","20","-A","Mozilla/5.0 (Windows NT 10.0; Win64; x64)", so_link], capture_output=True, text=True, timeout=30)
        return r.stdout.strip()
    except Exception as e:
        return "ERR"
if __name__ == "__main__":
    q = sys.argv[1]
    res = search(q)
    for it in res:
        real = resolve(it["so_link"])
        it["url"] = real
        print(it["title"][:60], "=>", real[:110])
    json.dump(res, open("sq_" + re.sub(r"[^\w\u4e00-\u9fa5]+","_",q)[:30] + ".json","w",encoding="utf-8"), ensure_ascii=False, indent=1)
