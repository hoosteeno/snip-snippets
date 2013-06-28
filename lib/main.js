var {Cc, Ci} = require("chrome");

var httpRequestObserver;

exports.main = function() {
    //TODO: get rid of snippets? clear localstorage?
    httpRequestObserver = {
        observe: function(subject, topic, data) {
            if (topic == "http-on-modify-request") {
                var httpChannel = subject.QueryInterface(Ci.nsIHttpChannel);
                var url = httpChannel.URI.spec
                console.log('Attempting to load URL: ' + url);
                /*
                TODO: block these:
                https://snippets-stats.mozilla.org
                http://gtssl-ocsp.geotrust.com/
                https://snippets.mozilla.com/
                */
            }
        },
        get observerService() {
            return Cc["@mozilla.org/observer-service;1"]
                             .getService(Ci.nsIObserverService);
        },
        register: function() {
            this.observerService.addObserver(this, "http-on-modify-request", false);
        },
        unregister: function() {
            this.observerService.removeObserver(this, "http-on-modify-request");
        }
    };

    httpRequestObserver.register();
};

exports.onUnload = function (reason) {
    httpRequestObserver.unregister();
};

