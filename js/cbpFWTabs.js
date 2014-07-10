/**
 * cbpFWTabs.js v1.0.0
 * http://www.codrops.com
 *
 * Licensed under the MIT license.
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * Copyright 2014, Codrops
 * http://www.codrops.com
 */
;( function( window ) {
	
	'use strict';

	function extend( a, b ) {
		for( var key in b ) { 
			if( b.hasOwnProperty( key ) ) {
				a[key] = b[key];
			}
		}
		return a;
	}

	function CBPFWTabs( el, options ) {
		this.el = el;
		this.options = extend( {}, this.options );
  		extend( this.options, options );
  		this._init();
	}

	CBPFWTabs.prototype.options = {
		nav : 'nav',
		start : 0,
		skip : []
	};

	CBPFWTabs.prototype._init = function() {
		// tabs elemes
		this.tabs = [].slice.call( this.el.querySelectorAll( this.options.nav + ' > ul > li' ) );
		// content items
		this.items = [].slice.call( this.el.querySelectorAll( '.content > section' ) );
		// current index
		this.current = -1;
		// show current content item
		this._show();
		// init events
		this._initEvents();
	};

	CBPFWTabs.prototype._initEvents = function() {
		var self = this;
		var skip = this.options.skip;
        this.tabs.forEach( function( tab, idx ) {
            if (skip.indexOf(idx) == -1) {
                tab.addEventListener( 'click', function( ev ) {
                    ev.preventDefault();
                    self._show( idx );
                } );
            }
        } );
	};

	CBPFWTabs.prototype._show = function( idx ) {
		if( this.current >= 0 ) {
			// remove and add class thanks to Apollo.js (github.com/toddmotto/apollo)
            this.tabs[ this.current ].className = this.tabs[ this.current ].className.replace(new RegExp('(^|\\s)*' + 'tab-current' + '(\\s|$)*', 'g'), '');
            this.items[ this.current ].className = this.items[ this.current ].className.replace(new RegExp('(^|\\s)*' + 'content-current' + '(\\s|$)*', 'g'), '');
		}
		// change current
		this.current = idx != undefined ? idx : this.options.start >= 0 && this.options.start < this.items.length ? this.options.start : 0;
		this.tabs[ this.current ].className += (this.tabs[ this.current ].className ? ' ' : '') + 'tab-current';
		this.items[ this.current ].className += (this.items[ this.current ].className ? ' ' : '') + 'content-current';
	};

	// add to global namespace
	window.CBPFWTabs = CBPFWTabs;

})( window );