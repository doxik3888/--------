gsap.registerPlugin(ScrollSmoother, ScrollTrigger)

const sensitivity = 0.4

document.addEventListener("mousemove", (e) =>{
    let dx = (e.clientX - window.innerWidth / 2)* sensitivity
    let dy = (e.clientY - window.innerHeight / 2)* sensitivity

    gsap.to(".layers_container", {
        duration: 1.5,
        x:dx,
        y:dy,
        rotationX: dy/10,
        rotationY: dx/10,
        ease: "power2.out",
    })
    gsap.to(".head-text", {
        duration: 1.5,
        x: -dx/2,
        y: -dy/2,
        ease: "power2.out",
    })

})

ScrollSmoother.create({
    wrapper: ".wrapper",
    content: ".wrapper_content",
    smooth: 1.5,
    effects: true
})

gsap.utils.toArray("section").forEach(section => {
    gsap.fromTo(
        section,
        {opacity: 0, y:25},
        {opacity: 1, y:0, scrollTrigger:{
            trigger: section,
            start:"top center+=100",
            end:"bottom center",
            toggleActions: "play none none reverse"
        }}
    )
});