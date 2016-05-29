
"use strict"

var carousel = {
    "slideWidth": 0,
    "numberOfSlides": 0,
    "currentSlide": {},
    "currentSlideNumber": 0,
    "targetSlide": {},
    "targetSlideNumber": 0,
    "targetDotnumber": 0,
    "dotDiff": 0,
    "animationTime": "0",
    "direction": "null",
    "carouselObject": {},
    "slideArray": [],
    "lastSlide": {},
    "slideAnimateLeft": {},
    "interval": {}
};

$(function () {

    init();
    createNavigationItems();
    setActiveDot();
    startCarousel();

    $('#carousel').on('mouseenter', stopCarousel).on('mouseleave', startCarousel);

    $('.carousel-nav--dot').on('click', function (event) {
        carousel.targetDotnumberNumber = $(event.target).attr('data-slide');
        carousel.targetSlideNumber = carousel.targetDotnumberNumber;
        carousel.targetSlide = $('.carousel--content--item[data-slide="' + carousel.targetDotnumberNumber + '"]')
        var diff = carousel.targetDotnumberNumber - carousel.currentSlideNumber;
        carousel.dotDiff = diff;

        if (diff > 0) {
            carousel.direction = "right";
            animateCarouselWithDots()

        }
        else {
            carousel.direction = "left";
            prepareCarousel();
            animateCarouselWithDots()
        }
    });

    $('.arrow.arrow--left').click(function (event) {
        event.preventDefault;
        stopCarousel();
        carousel.direction = "left";
        animateCarouselWithArrow();
    });

    $('.arrow.arrow--right').click(function (event) {
        event.preventDefault;
        stopCarousel();
        carousel.direction = "right";
        animateCarouselWithArrow();
    });
});

function init() {
    carousel.carouselObject = $('#carousel');
    carousel.numberOfSlides = carousel.carouselObject.find('.carousel--content').children('.carousel--content--item').length;
    carousel.currentSlide = carousel.carouselObject.find('.carousel--content').children('.carousel--content--item').first();
    carousel.currentSlideNumber = parseInt(carousel.carouselObject.find('.carousel--content').children('.carousel--content--item').first().attr('data-slide'));
    carousel.targetSlide = carousel.currentSlide;
    carousel.targetSlideNumber = 0;
    carousel.lastSlide = carousel.carouselObject.find('.carousel--content').children('.carousel--content--item').last();
    carousel.direction = 'right';
    carousel.slideArray = carousel.carouselObject.find('.carousel--content').children('.carousel--content--item');
    carousel.animationTime = '2000';
    carousel.slideWidth = 300;
};


function createNavigationItems() {
    var numberOfSlides = carousel.numberOfSlides;
    carousel.carouselObject.append('<div class="carousel-nav"></div>');
    carousel.carouselNav = carousel.carouselObject.find('.carousel-nav');

    for (var i = 1; i <= numberOfSlides; i++) {
        carousel.carouselNav.append('<div data-slide=' + i + ' class="carousel-nav--dot"></div>');
    }

};

function startCarousel() {

    carousel.interval = setInterval(function () {
        carousel.direction = "right";
        animateCarouselWithArrow();
    }, carousel.animationTime)
}

function stopCarousel() {
    clearInterval(carousel.interval);
};

function animateCarouselWithArrow() {
    if (carousel.direction == "right") {
        var currentSlide = carousel.currentSlide;
        var slideWidth = carousel.slideWidth;
        currentSlide.animate({ marginLeft: -slideWidth }, function () {
            $(this).appendTo('#carousel .carousel--content').removeAttr('style');

            updateCarouselValues();
            setActiveDot();

        });
    }
    else if (carousel.direction === "left") {
        var lastSlide = carousel.lastSlide;

        lastSlide.prependTo('#carousel .carousel--content').removeAttr('style').css('margin-left', -carousel.slideWidth).animate({ marginLeft: '0' });

        updateCarouselValues();
        setActiveDot();
    }

}

function animateCarouselWithDots() {
    if (carousel.direction === "right") {
        var slideWidth = carousel.slideWidth;
        var diff = carousel.dotDiff;
        var currentSlide = carousel.currentSlide;
        var animationTime = carousel.animationTime;

        currentSlide.animate({ marginLeft: -slideWidth * diff }, animationTime, function () {

            updateCarousel();

            setActiveDot();
        });
    }
    else if (carousel.direction === "left") {
        carousel.targetSlide.animate({ marginLeft: '0' }, carousel.animationTime);
        carousel.currentSlide = carousel.targetSlide;
        carousel.currentSlideNumber = carousel.targetSlideNumber;
        carousel.lastSlide = carousel.carouselObject.find('.carousel--content').children('.carousel--content--item').last();

        setActiveDot();
    }
}

function updateCarousel() {
    var targetSlideNumber = carousel.targetSlideNumber;
    var targetSlide = carousel.targetSlide;
    var slideArray = carousel.slideArray;

    for (var i = 0; i < slideArray.length; i++) {
        if (slideArray[i].getAttribute('data-slide') < targetSlideNumber) {
            $(slideArray[i]).appendTo('#carousel .carousel--content').removeAttr('style');
        }
        if (slideArray[i].getAttribute('data-slide') == targetSlideNumber) {
            carousel.currentSlide = targetSlide;
            carousel.currentSlideNumber = targetSlideNumber;
            carousel.lastSlide = carousel.carouselObject.find('.carousel--content').children('.carousel--content--item').last();
        }
    }
}

function prepareCarousel() {
    var diff = carousel.dotDiff;
    var lastSlide;
    var posDiff = diff * -1;
    var pixels;
    var firstLeftSlide;
    var slideWidth = carousel.slideWidth;
    for (var i = 1; i <= posDiff; i++) {
        lastSlide = carousel.lastSlide;
        pixels = i * -slideWidth;

        firstLeftSlide = lastSlide.prependTo('#carousel .carousel--content').css('margin-left', pixels);
        firstLeftSlide.next().removeAttr('style');

        carousel.lastSlide = carousel.carouselObject.find('.carousel--content').children('.carousel--content--item').last();

    }
}

function updateCarouselValues() {
    carousel.currentSlide = carousel.carouselObject.find('.carousel--content').children('.carousel--content--item').first();
    carousel.currentSlideNumber = parseInt(carousel.carouselObject.find('.carousel--content').children('.carousel--content--item').first().attr('data-slide'));
    carousel.lastSlide = carousel.carouselObject.find('.carousel--content').children('.carousel--content--item').last();
}

function setActiveDot() {
    var list = $('.carousel-nav--dot');
    var currentSlideNumber = carousel.currentSlideNumber
    for (var i = 0; i < list.length; i++) {
        $(list[i]).removeClass('carousel-nav--dot--active');

        if (list[i].getAttribute('data-slide') == currentSlideNumber) {
            $(list[i]).addClass('carousel-nav--dot--active');
        }
    }
}
