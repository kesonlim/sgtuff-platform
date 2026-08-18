import urllib.request
import re
import os
import json

base_url = "https://sgtuff.org.sg"

pages_to_crawl = [
    "/",
    "/about-us/",
    "/membership-plan/",
    "/219-2/",
    "/business-network/",
    "/latest-news/",
    "/collaborate-with-us/",
    "/contract-development-for-fair-tenancy-course-3/",
    "/home-safety-eldercare-support-free-benefits-2/",
    "/home-safety-eldercare-support-free-benefits/"
]

output_dir = "/Users/kesonlim/.gemini/antigravity/scratch/sgtuff-platform/apps/main-site/src/pages_scraped"
os.makedirs(output_dir, exist_ok=True)

scraped_data = {}

print("--- Crawling & Exporting All Live WordPress Pages ---")

headers = {
    'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36'
}

for route in pages_to_crawl:
    url = base_url + route if route != "/" else base_url + "/"
    print(f"Fetching {url}...")
    try:
        req = urllib.request.Request(url, headers=headers)
        with urllib.request.urlopen(req) as response:
            html = response.read().decode('utf-8')
            scraped_data[route] = html
            print(f"  ✅ Saved {route} ({len(html)} bytes)")
    except Exception as e:
        print(f"  ❌ Error fetching {url}: {e}")

# Save json file
json_path = os.path.join(output_dir, "scraped_wp_pages.json")
with open(json_path, "w", encoding="utf-8") as f:
    json.dump(scraped_data, f, ensure_ascii=False, indent=2)

print(f"\n✅ All WordPress pages crawled and saved to {json_path}")
