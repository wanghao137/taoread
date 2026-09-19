import json, time, urllib.request, urllib.parse, os

OUT = r"D:\codesolo\taoread\research\appdata.json"

# (term, country, label_group)
QUERIES = [
    # international kids
    ("vooks", "us", "intl_kids"),
    ("epic reading kids", "us", "intl_kids"),
    ("homer learning kids", "us", "intl_kids"),
    ("reading eggs", "us", "intl_kids"),
    ("abcmouse", "us", "intl_kids"),
    ("speakaboos", "us", "intl_kids"),
    ("bookful", "us", "intl_kids"),
    ("skybrary reading rainbow", "us", "intl_kids"),
    ("khan academy kids", "us", "intl_kids"),
    # chinese kids (CN store)
    ("凯叔讲故事", "cn", "cn_kids"),
    ("喜马拉雅儿童", "cn", "cn_kids"),
    ("叽里呱啦", "cn", "cn_kids"),
    ("伴鱼绘本", "cn", "cn_kids"),
    ("洪恩识字", "cn", "cn_kids"),
    ("KaDa故事", "cn", "cn_kids"),
    ("口袋故事", "cn", "cn_kids"),
    ("宝宝巴士故事", "cn", "cn_kids"),
    # adult reading
    ("微信读书", "cn", "adult"),
    ("多看阅读", "cn", "adult"),
    ("得到", "cn", "adult"),
    ("kindle", "us", "adult"),
    ("google play books", "us", "adult"),
    ("apple books", "us", "adult"),
]

def fetch(term, country):
    url = "https://itunes.apple.com/search?term=" + urllib.parse.quote(term) + \
          "&entity=software&limit=8&country=" + country
    req = urllib.request.Request(url, headers={"User-Agent": "Mozilla/5.0"})
    with urllib.request.urlopen(req, timeout=25) as r:
        return json.loads(r.read().decode("utf-8"))

results = {}
for term, country, grp in QUERIES:
    key = f"{term}|{country}"
    ok = False
    for attempt in range(3):
        try:
            data = fetch(term, country)
            results[key] = {
                "group": grp,
                "country": country,
                "resultCount": data.get("resultCount"),
                "apps": [
                    {
                        "trackName": a.get("trackName"),
                        "trackId": a.get("trackId"),
                        "bundleId": a.get("bundleId"),
                        "sellerName": a.get("sellerName"),
                        "averageUserRating": a.get("averageUserRating"),
                        "userRatingCount": a.get("userRatingCount"),
                        "primaryGenreName": a.get("primaryGenreName"),
                        "minimumOsVersion": a.get("minimumOsVersion"),
                        "releaseDate": a.get("releaseDate"),
                        "currentVersionReleaseDate": a.get("currentVersionReleaseDate"),
                        "version": a.get("version"),
                        "description": (a.get("description") or "")[:400],
                        "trackViewUrl": a.get("trackViewUrl"),
                        "artworkUrl512": a.get("artworkUrl512"),
                        "screenshotUrls": (a.get("screenshotUrls") or [])[:6],
                    }
                    for a in data.get("results", [])
                ],
            }
            ok = True
            break
        except Exception as e:
            time.sleep(4)
    print(f"{'OK ' if ok else 'FAIL'} {key} -> {results.get(key, {}).get('resultCount')}")
    time.sleep(1.5)

os.makedirs(os.path.dirname(OUT), exist_ok=True)
with open(OUT, "w", encoding="utf-8") as f:
    json.dump(results, f, ensure_ascii=False, indent=2)
print("saved", OUT)
