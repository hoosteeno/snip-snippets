var addon_self = self;

// blank out snippets-related localStorage
localStorage.removeItem('geoLastUpdated');
localStorage.removeItem('snippets');
localStorage.removeItem('snippets-cached-version');
localStorage.removeItem('snippets-last-update');
localStorage.removeItem('geoCountry');

// TODO: replace default snippet with a message saying snippets are off(?)
