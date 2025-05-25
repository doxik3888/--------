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

const themeChange = document.querySelector(".theme-change")
themeChange.addEventListener("click", ()=>{
    let isLight = localStorage.getItem("theme") == "light"

    if (isLight) {
        localStorage.setItem("theme", "dark")
        themeChange.innerHTML ='<i class="fas fa-moon"></i>'
        document.documentElement.style.setProperty("--primary","rgb(7, 85, 11)")
        document.documentElement.style.setProperty("--secondary","rgb(21, 117, 21)")
        document.documentElement.style.setProperty("--thirth","#344C11")
        document.documentElement.style.setProperty("--backgrColor","rgb(37, 37, 37)")
        document.documentElement.style.setProperty("--textColor","white")
        document.documentElement.style.setProperty("--light","#f2f2f2")
        document.documentElement.style.setProperty("--musicback","darkgray")

    } else{
        localStorage.setItem("theme", "light")
        themeChange.innerHTML ='<i class="fas fa-sun"></i>'
        document.documentElement.style.setProperty("--primary","#AEC09A")
        document.documentElement.style.setProperty("--secondary","#344C11")
        document.documentElement.style.setProperty("--thirth","#344C11")
        document.documentElement.style.setProperty("--backgrColor","white")
        document.documentElement.style.setProperty("--textColor","black")
        document.documentElement.style.setProperty("--light","#f2f2f2")
        document.documentElement.style.setProperty("--musicback","lightgray")
    }
}
)

function initPlayer(){
    const btn = document.querySelector(".play")
    const audio = document.getElementById("audioPlayer")
    const progres = document.querySelector(".progres")
    
    btn.addEventListener("click", () =>{
        if (audio.paused) {
            audio.play()
            btn.innerHTML = '<i class="fas fa-pause"></i>'
        } else {
            audio.pause()
            btn.innerHTML = '<i class="fas fa-play"></i>'
        }
    })

    const time = document.querySelector(".time")
    audio.addEventListener("timeupdate", () =>{
        progres.style.width = `${audio.currentTime / audio.duration * 100}%`
        let minute = Math.floor(audio.currentTime / 60)
        let seconds = Math.floor(audio.currentTime % 60).toString().padStart(2, "0")
        let maxMinutes = Math.floor(audio.duration / 60)
        let maxSeconds = Math.floor(audio.duration % 60).toString().padStart(2, "0")
        time.innerHTML = `${minute}:${seconds}/ ${maxMinutes}:${maxSeconds}`
    })
    document.querySelector(".line").addEventListener("click", (e) =>{
        const rect = e.target.getBoundingClientRect()
        const pos = (e.clientX - rect.left)/ rect.width
        audio.currentTime = pos * audio.duration
    })
}



document.addEventListener("DOMContentLoaded", initPlayer)

