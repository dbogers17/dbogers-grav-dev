<?php
namespace Grav\Theme;

use Grav\Common\Theme;

// quark2's own theme class isn't autoloaded unless quark2 is the active
// theme, so it's pulled in explicitly here. Requires user/themes/quark2 to
// stay installed (even while inactive) - GPM updates keep it in place.
require_once __DIR__ . '/../quark2/quark2.php';

class Quark2Custom extends Quark2
{
    public function onTwigInitialized()
    {
        parent::onTwigInitialized();

        $twig = $this->grav['twig'];
        $twig->twig->addFunction(new \Twig\TwigFunction('q2_tech_feed', [$this, 'getTechFeed']));
        $twig->twig->addFunction(new \Twig\TwigFunction('q2_tech_feeds', [$this, 'getTechFeeds']));
        $twig->twig->addFilter(new \Twig\TwigFilter('q2_time_ago', [$this, 'timeAgo']));
    }

    /**
     * "3h ago" / "2d ago" style relative time from a unix timestamp.
     * Deliberately language-neutral (short English abbreviations) — this
     * mirrors how most dashboards show feed timestamps regardless of site
     * language, and keeps the shared EN/NL template simple.
     */
    public function timeAgo(?int $timestamp): string
    {
        if (!$timestamp) {
            return '';
        }

        $diff = max(0, time() - $timestamp);

        if ($diff < 60) {
            return 'just now';
        }
        if ($diff < 3600) {
            return floor($diff / 60) . 'm ago';
        }
        if ($diff < 86400) {
            return floor($diff / 3600) . 'h ago';
        }
        if ($diff < 2592000) {
            return floor($diff / 86400) . 'd ago';
        }
        return floor($diff / 2592000) . 'mo ago';
    }

    /**
     * Fetches an RSS feed server-side (avoids browser CORS issues entirely)
     * and returns a small, cached array of the latest items. Never throws —
     * a fetch/parse failure just yields an empty array so the widget can
     * hide itself instead of breaking the page.
     */
    public function getTechFeed(string $url, int $limit = 5): array
    {
        $cache = $this->grav['cache'];
        $cacheKey = 'q2-tech-feed-' . md5($url . $limit);
        $cached = $cache->fetch($cacheKey);
        if ($cached !== false) {
            return $cached;
        }

        $items = [];

        try {
            $context = stream_context_create([
                'http' => [
                    'method'  => 'GET',
                    'timeout' => 5,
                    'header'  => "User-Agent: dbogers.nl-feed-widget/1.0\r\n",
                ],
                'https' => [
                    'timeout' => 5,
                ],
            ]);

            $xml = @file_get_contents($url, false, $context);

            if ($xml !== false) {
                // LIBXML_NONET/NOENT off + no DTD loading: untrusted remote
                // XML must never be allowed to resolve external entities.
                $previous = libxml_use_internal_errors(true);
                $feed = simplexml_load_string($xml, \SimpleXMLElement::class, LIBXML_NONET);
                libxml_use_internal_errors($previous);

                if ($feed !== false && isset($feed->channel->item)) {
                    foreach ($feed->channel->item as $item) {
                        if (count($items) >= $limit) {
                            break;
                        }

                        $link = trim((string) $item->link);
                        // Only ever accept http(s) links — a compromised or
                        // malicious feed could otherwise smuggle a
                        // javascript: URI into an href.
                        if (!preg_match('#^https?://#i', $link) || !filter_var($link, FILTER_VALIDATE_URL)) {
                            continue;
                        }

                        $pubDate = trim((string) $item->pubDate);
                        $timestamp = $pubDate ? strtotime($pubDate) : false;

                        $items[] = [
                            'title'   => trim((string) $item->title),
                            'link'    => $link,
                            'date'    => $pubDate,
                            'date_ts' => $timestamp ?: null,
                            'is_new'  => $timestamp && (time() - $timestamp) < 172800, // < 48h
                        ];
                    }
                }
            }
        } catch (\Throwable $e) {
            $items = [];
        }

        // Cache for 30 minutes regardless of outcome, so a down feed doesn't
        // cause a slow remote fetch on every single page load.
        $cache->save($cacheKey, $items, 1800);

        return $items;
    }

    /**
     * Merges several RSS sources into one chronologically-sorted list, each
     * item tagged with which blog it came from. Each source is fetched
     * (and cached) individually via getTechFeed(), so one slow/down feed
     * never blocks the others. Items older than $daysWindow are dropped
     * before the $limit cap is applied, so "18 shown" always means "18
     * from the last N days", not just "the 18 newest regardless of age".
     *
     * @param array $sources List of ['label' => string, 'url' => string]
     */
    public function getTechFeeds(array $sources, int $limit = 18, int $perSourceLimit = 10, int $daysWindow = 90): array
    {
        $cutoff = time() - ($daysWindow * 86400);
        $items = [];
        $labels = [];

        foreach ($sources as $source) {
            $label = is_array($source) ? ($source['label'] ?? '') : '';
            $url = is_array($source) ? ($source['url'] ?? '') : '';
            if (!$url) {
                continue;
            }
            $labels[] = $label;
            foreach ($this->getTechFeed($url, $perSourceLimit) as $item) {
                if ($item['date_ts'] && $item['date_ts'] < $cutoff) {
                    continue;
                }
                $item['source'] = $label;
                $items[] = $item;
            }
        }

        usort($items, function ($a, $b) {
            return ($b['date_ts'] ?? 0) <=> ($a['date_ts'] ?? 0);
        });

        $items = array_slice($items, 0, $limit);

        // Stats derived only from the items actually shown, so the sidebar
        // never claims a count the visitor can't see and verify themselves.
        $sourceCounts = array_fill_keys($labels, 0);
        $newestTs = null;
        foreach ($items as $item) {
            if (isset($sourceCounts[$item['source']])) {
                $sourceCounts[$item['source']]++;
            }
            if ($item['date_ts'] && (!$newestTs || $item['date_ts'] > $newestTs)) {
                $newestTs = $item['date_ts'];
            }
        }

        return [
            'items'            => $items,
            'source_counts'    => $sourceCounts,
            'max_source_count' => $sourceCounts ? max($sourceCounts) : 0,
            'source_count'     => count($labels),
            'newest_ts'        => $newestTs,
        ];
    }
}
