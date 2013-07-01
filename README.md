# snip-snippets

snip-snippets blocks requests from the default homepage in Firefox (about:home)
to Mozilla's servers. These requests are benign (in the opinion of this 
addon-maker): They include a request to grab snippets content[1], a request
to grab the country associated with the browser's IP address[2], and sometimes
a request to a statistics aggregator[3]. 

But Firefox is special precisely because it lets users control their experience
of the web. If you prefer to use Firefox without seeing snippets, or without 
your IP address being geolocated, this addon will prevent both.

Note: The about:home page comes delivered with default snippets content. This 
content will continue to appear in the current version of the addon.

[1]: Snippets content is the small informational blurb directly below the 
search bar. The code for this service is here: 
https://github.com/mozilla/snippets-service/

[2] Geolocated snippets content lets users see information specific to their
country. For example, product information only relevant to people in Spain.

[3] Anonymous statistical information is gathered to help Mozilla's metrics 
team understand the distribution and impact of various snippets.
