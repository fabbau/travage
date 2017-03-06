import $ from 'jquery';
import waypoints from '../../../../node_modules/waypoints/lib/noframework.waypoints';
import smoothScroll from 'jquery-smooth-scroll'

class StickyHeader {
	constructor() {
		this.lazyImages = $('.lazyload');
		this.siteHeader = $('.site-header');
		this.headerTriggerElemet = $('.large-hero__title');
		this.createHeaderWaypoint();
		this.pageSections = $('.page-section');
		this.headerLinks = $('.primary-nav a');
		this.createPageSectionWaypoints();
		this.addSmoothScrolling();
		//doesn't work, breaks the modal -> deactiaved
		//this.refreshWaypoints(); //need to be called only once, than all waypaints are updated (e.g. those on RevealOnScroll.js)
	}

	refreshWaypoints() {
		this.lazyImages.load(function() {
			Waypoint.refreshAll(); //refreshes all Waypoints (including this in RevealOnScroll.js)
		});
	}

	addSmoothScrolling() {
		this.headerLinks.smoothScroll();
	}

	createHeaderWaypoint() {
		var that = this;
		new Waypoint({
			element: this.headerTriggerElemet[0], //cause of jquery
			handler: function(direction) {
				if (direction == 'down') {
					that.siteHeader.addClass('site-header--dark');
				} else {
					that.siteHeader.removeClass('site-header--dark');
				}
				console.log('direction: ' + direction);
			}
		});
	}

	createPageSectionWaypoints() { /*color the links in the header*/
		var that = this;
		this.pageSections.each(function() {
			var currentPageSection = this;

			new Waypoint({
				element: currentPageSection,
				handler: function(direction) {
					if (direction == 'down') {
						var machtingHeaderLink = currentPageSection.getAttribute('data-matching-link');
						that.headerLinks.removeClass('is-current-link');
						$(machtingHeaderLink).addClass('is-current-link');
					}
				},
				offset: '18%'
			});

			new Waypoint({
				element: currentPageSection,
				handler: function(direction) {
					if (direction == 'up') {
						var machtingHeaderLink = currentPageSection.getAttribute('data-matching-link');
						that.headerLinks.removeClass('is-current-link');
						$(machtingHeaderLink).addClass('is-current-link');
					}
				},
				offset: '-40%'
			});
		});
	}
}

export default StickyHeader;