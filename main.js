gsap.registerPlugin(MotionPathPlugin);

function IntegrationAnimation() {
    this.tl = gsap.timeline();
    this.svg = document.querySelector(".circles-integration");
    this.icons = document.querySelectorAll(".icons-integration [data-icon]");
    this.circles = this.svg.querySelectorAll("g:not(.integration-logo)");
    this.circleOne = this.svg.querySelector(".circle-1");
    this.circleTwo = this.svg.querySelector(".circle-2");
    this.circleThree = this.svg.querySelector(".circle-3");
    this.iconsCircleOne = [this.icons[0], this.icons[1], this.icons[2]];
    this.iconsCircleTwo = [this.icons[3], this.icons[4], this.icons[5]];
    this.iconsCircleThree = [this.icons[6], this.icons[7]];
}

IntegrationAnimation.prototype.animate = function() {
    this.tl
    .add(this.showCircles())
    .add(this.moveIcons({
        circle: this.circleOne,
        icons: this.iconsCircleOne,
        start: function(i) {
            if(!i) return 0.4
            else if(i === 1) return 0.1
            else return 0.9;
        },
        end: function(i) {
            if(!i) return 1.4
            else if(i === 1) return 1.2
            else return 1.9;
        },
    }), ">")
    .add(this.moveIcons({
        circle: this.circleTwo,
        icons: this.iconsCircleTwo,
        start: function(i) {
            if(!i) return 1.6
            else if(i === 1) return 1.8;
            else return 1.25;
        },
        end: function(i) {
            if(!i) return 0.6
            else if(i === 1) return 0.8
            else return 0.25;
        },
    }), "<")
    .add(this.moveIcons({
        circle: this.circleThree,
        icons: this.iconsCircleThree,
        start: function(i) {
            if(!i) return 0
            else return 0.5;
        },
        end: function(i) {
            if(!i) return 1
            else return 1.5;
        },
    }), "<")
    .add(this.showIcons(), "<");

    return this.tl;
}

IntegrationAnimation.prototype.moveIcons = function(config) {
    const tl = gsap.timeline({
        defaults: {
            repeat: -1, 
            ease: Power0.easeNone, 
            duration: !config.duration ? 280 : config.duration
        }
    });

    tl.to(config.icons, {
        motionPath: {
            path: config.circle,
            align: config.circle,
            alignOrigin: [0.5, 0.5],
            start: config.start,
            end: config.end,
        }
    });

    gsap.set(config.icons, {autoAlpha: 1});
    
    return tl;
}

IntegrationAnimation.prototype.showIcons = function() {
    const tl = gsap.timeline();
    const imgs = [...this.icons].map(container => container.firstElementChild);

    tl.fromTo(imgs, {
        scale: 0,
        autoAlpha: 0,
        rotate: 180,
    }, {
        rotate: 0,
        scale: 1,
        autoAlpha: 1,
        stagger: 0.1,
        ease: Back.easeOut.config(1.1),
        duration: 0.6
    })
    
    return tl;
}

IntegrationAnimation.prototype.showCircles = function() {
    const tl = gsap.timeline();
    tl.fromTo(
        this.circles,
        {
            autoAlpha: 0,
            scale: 0.5,
            transformOrigin: "center",
        },
        {
            autoAlpha: 1,
            scale: 1,
            ease: Back.easeInOut.config(1.7),
            duration: 0.6,
            stagger: {
                each: 0.1,
                from: "end",
            }
    });
    return tl;
}

const integration = new IntegrationAnimation();
integration.animate();