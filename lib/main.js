var {Cc, Ci, Cr} = require('chrome');
var pageMod = require('sdk/page-mod');
var self = require('sdk/self');
var tabs = require('sdk/tabs');

// block URLs like this
var blocked = /^https?:\/\/(snippets-stats|geo|snippets)\.(mozilla|allizom)\.(com|org)/;

var httpRequestObserver;

exports.main = function() {
    httpRequestObserver = {
        observe: function(subject, topic, data) {
            if (topic === 'http-on-modify-request') {
                var page_url = tabs.activeTab.url;
                if (page_url === 'about:home') {
                    var httpChannel = subject.QueryInterface(Ci.nsIHttpChannel);
                    var request_url = httpChannel.URI.spec;
                    if (blocked.test(request_url)) { 
                        httpChannel.cancel(Cr.NS_BINDING_ABORTED);
                    }
                }
            }
        },
        get observerService() {
            return Cc['@mozilla.org/observer-service;1']
                .getService(Ci.nsIObserverService);
        },
        register: function() {
            this.observerService
                .addObserver(this, 'http-on-modify-request', false);
        },
        unregister: function() {
            this.observerService
                .removeObserver(this, 'http-on-modify-request');
        }
    };

    httpRequestObserver.register();
};

exports.onUnload = function(reason) {
    httpRequestObserver.unregister();
};

pageMod.PageMod({
    include: 'about:home',
    contentScriptWhen: 'start',
    contentScriptFile: [
        self.data.url('snip_worker.js')
    ],
    attachTo: ['existing', 'top']
});
