gsap.registerPlugin(ScrollSmoother, ScrollTrigger)

const sensitivity = 0.1

document.addEventListener("mousemove", (e) =>{
    let dx = (e.clientX - window.innerWidth / 2)* sensitivity
    let dy = (e.clientY - window.innerHeight / 2)* sensitivity

    gsap.to(".layers_container", {
        duration: 1.5,
        x:-dx,
        y:-dy,
        rotationX: dy/15,
        rotationY: dx/15,
        ease: "power2.out",
    })
    gsap.to(".head-text", {
        duration: 1.5,
        x: dx/3,
        y: dy/3,
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


function initGallery(){
    let gallery = document.querySelector(".gallery")
    let galleryItem = document.querySelectorAll(".gallery-item")
    gallery.style.setProperty("--total-item", galleryItem.length)

    gallery.addEventListener("click", (event) =>{
        let clicked = event.target.closest(".gallery-item")
        if (!clicked || clicked.classList.contains("active")) return

        galleryItem.forEach((item) => {
            item.classList.remove("active")
        })
        clicked.classList.add("active")
    })

}

document.addEventListener("DOMContentLoaded",initGallery)