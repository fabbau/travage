import $ from 'jquery';
import MobilMenu from './modules/MobilMenu';
import RevealOnScroll from './modules/RevealOnScroll';
import StickyHeader from './modules/StickyHeader';

var mobileMenu = new MobilMenu();

new RevealOnScroll($('.feature-item'), '85%');
new RevealOnScroll($('.testimonial'), '75%');

var stickyHeader = new StickyHeader();