# Add Currency Conversion to Formatters

Cache common and all used locales conversion rates on Nitro endpoint once per day, then use these values when converting currencies.

There isn’t really a universal web API standard for currency conversion like there is for something like Intl.DateTimeFormat in JavaScript, but there are a few widely used built-in APIs, standards, and easy-access libraries you can lean on depending on whether you need:
	•	Basic currency formatting (not conversion) — standardized by ECMAScript Intl and documented on MDN.
	•	Simple conversion — often handled by lightweight libraries or by querying open/public APIs that use common formats (e.g., ISO 4217 codes).

⸻

1. Standards & Built-ins

These don’t do live conversion, but they are standardized and universal.

Tool	Purpose	Notes
Intl.NumberFormat	Formats numbers as currency strings	Built into JS, no network calls; takes ISO 4217 currency codes.
ISO 4217	Defines standard 3-letter currency codes	Used by almost all APIs and libraries for identifying currencies.


⸻

2. Static / Non-Live Rate Sources

If you’re okay with non-live or infrequently updated rates, you can embed a static rate table and update it manually every so often.
	•	European Central Bank (ECB) Reference Rates — XML/JSON feed updated once daily. Widely used in open-source libraries.
	•	Example: https://www.ecb.europa.eu/stats/eurofxref/eurofxref-daily.xml
	•	IMF SDR rates — updated daily or monthly.
	•	Oanda Historical Exchange Rates — CSV/JSON, sometimes free for non-commercial use.

These can be bundled locally for offline conversion.

⸻

3. Popular Open/Free APIs

Most follow the same REST pattern: /convert?from=USD&to=EUR&amount=100 and return JSON.

API	Free Tier?	Notes
ExchangeRate.host	Yes, unlimited	Free, ECB-based; supports historical dates and symbols.
Frankfurter API	Yes	Simple JSON, ECB rates, open source.
Open Exchange Rates	Yes (1,000 calls/mo)	JSON, historical and latest.
CurrencyLayer	Yes (250 calls/mo)	JSON, ISO 4217 support, simple integration.


⸻

4. Easy-Access Libraries

Some libraries bundle static rates (good for “close enough” conversions without an API call).
	•	JavaScript
	•	money.js — small conversion lib; can be seeded with your own rates JSON.
	•	dinero.js — currency math + formatting, pluggable rate source.
	•	Python
	•	forex-python — wrapper for free conversion APIs.
	•	babel — currency formatting, not conversion.

⸻

✅ Recommendation if you want something like Intl but for conversion:
Use Intl.NumberFormat for formatting + a static rate source like ExchangeRate.host or Frankfurter API for occasional rate updates. Both are free, standards-aligned, and return JSON with ISO 4217 codes, so you can swap providers without changing your code structure.